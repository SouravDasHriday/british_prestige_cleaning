'use server'

import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function getCustomerProfile() {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const userId = session.user.id

  // 1. Try to fetch by userId
  let customer = await prisma.customer.findUnique({
    where: { userId },
  })

  // 2. Auto-heal: if customer profile is missing, create one
  if (!customer) {
    // Check if a guest customer exists with this email
    const guestCustomer = await prisma.customer.findFirst({
      where: {
        email: session.user.email!,
        userId: null,
      },
    })

    if (guestCustomer) {
      // Link the guest account
      customer = await prisma.customer.update({
        where: { id: guestCustomer.id },
        data: { userId },
      })
    } else {
      // Create a fresh customer record
      customer = await prisma.customer.create({
        data: {
          userId,
          email: session.user.email!,
          fullName: session.user.name || 'Unknown',
        },
      })
    }
  }

  if (!customer) {
    throw new Error('Failed to resolve customer profile')
  }

  return { user: session.user, customer }
}

export async function getCustomerBookings() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const customer = await prisma.customer.findUnique({
    where: { userId: session.user.id },
  })

  if (!customer) throw new Error('Customer profile not found')

  const bookings = await prisma.booking.findMany({
    where: { customerId: customer.id },
    include: {
      service: {
        select: { name: true, imageUrl: true },
      },
    },
    orderBy: [
      { appointmentDate: 'asc' },
      { startTime: 'asc' },
    ],
  })

  // Transform for compatibility with existing UI components
  return bookings.map((b) => ({
    ...b,
    services: { name: b.service.name, image_url: b.service.imageUrl },
    total_amount: Number(b.totalAmount),
    appointment_date: b.appointmentDate.toISOString().split('T')[0],
    start_time: b.startTime.toISOString().split('T')[1].substring(0, 8),
    end_time: b.endTime.toISOString().split('T')[1].substring(0, 8),
    booking_reference: b.bookingReference,
    service_address: b.serviceAddress,
    service_city: b.serviceCity,
    service_postcode: b.servicePostcode,
    property_type: b.propertyType,
    number_of_floors: b.numberOfFloors,
    availability_slot_id: b.availabilitySlotId,
  }))
}

export async function acceptQuote(bookingId: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  // Ensure the booking belongs to this customer
  const customer = await prisma.customer.findUnique({
    where: { userId: session.user.id },
  })
  if (!customer) throw new Error('Unauthorized')

  await prisma.booking.updateMany({
    where: {
      id: bookingId,
      customerId: customer.id,
    },
    data: { status: 'CONFIRMED' },
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/bookings')
}

export async function rejectQuote(bookingId: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const customer = await prisma.customer.findUnique({
    where: { userId: session.user.id },
  })
  if (!customer) throw new Error('Unauthorized')

  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      customerId: customer.id,
    },
  })

  if (!booking) throw new Error('Booking not found')

  await prisma.$transaction([
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    }),
    prisma.availabilitySlot.update({
      where: { id: booking.availabilitySlotId },
      data: { status: 'AVAILABLE' },
    }),
  ])

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/bookings')
}
