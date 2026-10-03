'use server'

import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SERVICES } from '@/lib/constants'

export async function getServices() {
  let services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { basePrice: 'asc' },
  })

  // Auto-seed if empty
  if (services.length === 0) {
    console.log("Auto-seeding default services...");
    for (const s of SERVICES) {
      await prisma.service.create({
        data: {
          name: s.name,
          slug: s.slug,
          shortDescription: s.shortDescription,
          description: s.description,
          priceType: s.priceType,
          basePrice: s.basePrice || 0,
          durationMinutes: s.duration,
          isActive: true,
          imageUrl: s.image || "",
          icon: s.icon || "Sparkles",
          features: s.features || [],
        }
      });
    }
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { basePrice: 'asc' },
    })
  }

  return services.map((s) => {
    const matchedConstant = SERVICES.find(cs => cs.slug === s.slug || cs.id === s.id);
    const resolvedImage = (s.imageUrl && s.imageUrl !== "/images/hero-cleaning-v4.jpg") 
      ? s.imageUrl 
      : (matchedConstant?.image || `/images/service-${s.slug}.jpg`);

    return {
      ...s,
      shortDescription: s.shortDescription || matchedConstant?.shortDescription || "",
      description: s.description || matchedConstant?.description || "",
      priceType: s.priceType,
      base_price: Number(s.basePrice),
      duration_minutes: s.durationMinutes,
      is_active: s.isActive,
      image_url: resolvedImage,
      icon: s.icon || matchedConstant?.icon || "Sparkles",
      features: (Array.isArray(s.features) && (s.features as string[]).length > 0) 
        ? (s.features as string[]) 
        : (matchedConstant?.features || []),
    };
  });
}

export async function getAvailableSlots(dateStr: string) {
  const queryDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0,0,0,0);
  
  // Don't return slots for past dates
  if (queryDate < today) return [];

  let slots = await prisma.availabilitySlot.findMany({
    where: {
      date: queryDate,
      status: 'AVAILABLE',
    },
    orderBy: { startTime: 'asc' },
  })

  // Auto-generate standard slots if NO slots exist for this date AT ALL
  const totalSlotsCount = await prisma.availabilitySlot.count({
    where: { date: queryDate }
  });

  if (totalSlotsCount === 0) {
    console.log(`Auto-generating default time slots for ${dateStr}...`);
    // Standard working hours: 09:00, 11:00, 13:00, 15:00
    const defaultTimes = [
      { start: '09:00:00', end: '11:00:00' },
      { start: '11:00:00', end: '13:00:00' },
      { start: '13:00:00', end: '15:00:00' },
      { start: '15:00:00', end: '17:00:00' }
    ];

    for (const time of defaultTimes) {
      const startTime = new Date(`${dateStr}T${time.start}Z`);
      const endTime = new Date(`${dateStr}T${time.end}Z`);
      
      await prisma.availabilitySlot.create({
        data: {
          date: queryDate,
          startTime: startTime,
          endTime: endTime,
          status: 'AVAILABLE'
        }
      });
    }
    
    // Fetch newly created available slots
    slots = await prisma.availabilitySlot.findMany({
      where: {
        date: queryDate,
        status: 'AVAILABLE',
      },
      orderBy: { startTime: 'asc' },
    })
  }

  // Transform for compatibility with existing UI
  return slots.map((s) => ({
    ...s,
    start_time: s.startTime.toISOString().split('T')[1].substring(0, 8),
    end_time: s.endTime.toISOString().split('T')[1].substring(0, 8),
    date: s.date.toISOString().split('T')[0],
  }))
}

export async function createBooking(formData: any) {
  const session = await auth()

  let customerId: string | null = null

  if (session?.user) {
    const customer = await prisma.customer.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    })
    if (customer) customerId = customer.id
  }

  // Guest checkout: find or create customer by email
  if (!customerId) {
    const existingCustomer = await prisma.customer.findFirst({
      where: { email: formData.email },
      select: { id: true },
    })

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      const newCustomer = await prisma.customer.create({
        data: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.address,
          city: formData.city,
          postcode: formData.postcode,
        },
      })
      customerId = newCustomer.id
    }
  }

  // Get service and slot data
  let service: any = null;
  let finalServiceId = formData.serviceId;

  if (formData.serviceId === 'custom-request') {
    const customService = await prisma.service.findUnique({ where: { slug: 'custom-request' } });
    if (!customService) throw new Error('Custom service not found');
    finalServiceId = customService.id;
    service = { basePrice: Number(formData.customBudget) || 0, name: customService.name };
  } else {
    service = await prisma.service.findUnique({
      where: { id: formData.serviceId },
      select: { basePrice: true, name: true },
    });
  }

  const slot = await prisma.availabilitySlot.findUnique({
    where: { id: formData.slotId },
    select: { date: true, startTime: true, endTime: true },
  })

  if (!service || !slot) throw new Error('Invalid service or slot selected')

  // Generate booking reference
  const count = await prisma.booking.count()
  const bookingReference = `CP-${String(count + 1).padStart(6, '0')}`

  // Create booking and mark slot as booked in a transaction
  const booking = await prisma.$transaction(async (tx) => {
    const newBooking = await tx.booking.create({
      data: {
        bookingReference,
        customerId: customerId!,
        serviceId: finalServiceId,
        availabilitySlotId: formData.slotId,
        serviceAddress: formData.address,
        serviceCity: formData.city,
        servicePostcode: formData.postcode,
        propertyType: formData.propertyType,
        numberOfFloors: parseInt(formData.floors) || 1,
        customerNotes: formData.customerNotes,
        appointmentDate: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        subtotal: service.basePrice,
        totalAmount: service.basePrice,
        status: 'PENDING',
      },
    })

    await tx.availabilitySlot.update({
      where: { id: formData.slotId },
      data: { status: 'BOOKED' },
    })

    return newBooking
  })

  return {
    id: booking.id,
    booking_reference: booking.bookingReference,
  }
}

export async function cancelBooking(bookingId: string, reason: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized');

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { customer: true }
  });

  if (!booking) throw new Error('Booking not found');

  // Verify ownership or admin
  if ((session.user as any).role !== 'ADMIN' && booking.customer.userId !== session.user.id) {
    throw new Error('Unauthorized to cancel this booking');
  }

  // Enforce 48-hour rule for customers
  if ((session.user as any).role !== 'ADMIN') {
    const appointmentDate = new Date(`${booking.appointmentDate.toISOString().split('T')[0]}T${booking.startTime.toISOString().split('T')[1]}`);
    const now = new Date();
    const diffHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 48) {
      throw new Error('Bookings cannot be cancelled within 48 hours of the appointment time.');
    }
  }

  const updatedNotes = booking.customerNotes 
    ? `${booking.customerNotes}\n\n[CANCELLED REASON]: ${reason}`
    : `[CANCELLED REASON]: ${reason}`;

  await prisma.$transaction(async (tx) => {
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        customerNotes: updatedNotes,
      }
    });

    await tx.availabilitySlot.update({
      where: { id: booking.availabilitySlotId },
      data: { status: 'AVAILABLE' }
    });
  });

  return { success: true };
}
