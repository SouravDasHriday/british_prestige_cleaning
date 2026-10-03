'use server'

import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

async function checkAdmin() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
}

export async function getPendingBookings() {
  await checkAdmin()

  const bookings = await prisma.booking.findMany({
    where: {
      status: { in: ['PENDING', 'QUOTE_PROVIDED'] },
    },
    include: {
      customer: {
        select: { fullName: true, email: true, phone: true },
      },
      service: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Transform for compatibility with existing UI
  return bookings.map((b) => ({
    ...b,
    customers: {
      full_name: b.customer.fullName,
      email: b.customer.email,
      phone: b.customer.phone,
    },
    services: { name: b.service.name },
    total_amount: Number(b.totalAmount),
    booking_reference: b.bookingReference,
    service_address: b.serviceAddress,
    service_city: b.serviceCity,
    service_postcode: b.servicePostcode,
    property_type: b.propertyType,
    number_of_floors: b.numberOfFloors,
    appointment_date: b.appointmentDate.toISOString().split('T')[0],
    start_time: b.startTime.toISOString().split('T')[1].substring(0, 8),
    end_time: b.endTime.toISOString().split('T')[1].substring(0, 8),
  }))
}

export async function provideQuote(bookingId: string, newPrice: number) {
  await checkAdmin()

  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      totalAmount: newPrice,
      status: 'QUOTE_PROVIDED',
    },
  })

  revalidatePath('/dashboard/bookings')
}

export async function getConfirmedBookings() {
  await checkAdmin()

  const bookings = await prisma.booking.findMany({
    where: {
      status: 'CONFIRMED',
    },
    include: {
      customer: {
        select: { fullName: true, email: true, phone: true },
      },
      service: {
        select: { name: true },
      },
    },
    orderBy: [
      { appointmentDate: 'asc' },
      { startTime: 'asc' }
    ],
  })

  // Transform for compatibility with existing UI
  return bookings.map((b) => ({
    ...b,
    customers: {
      full_name: b.customer.fullName,
      email: b.customer.email,
      phone: b.customer.phone,
    },
    services: { name: b.service.name },
    total_amount: Number(b.totalAmount),
    booking_reference: b.bookingReference,
    service_address: b.serviceAddress,
    service_city: b.serviceCity,
    service_postcode: b.servicePostcode,
    property_type: b.propertyType,
    number_of_floors: b.numberOfFloors,
    appointment_date: b.appointmentDate.toISOString().split('T')[0],
    start_time: b.startTime.toISOString().split('T')[1].substring(0, 8),
    end_time: b.endTime.toISOString().split('T')[1].substring(0, 8),
  }))
}

export async function getAllBookings() {
  await checkAdmin()

  const bookings = await prisma.booking.findMany({
    include: {
      customer: {
        select: { fullName: true, email: true, phone: true },
      },
      service: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Transform for compatibility with existing UI
  return bookings.map((b) => ({
    ...b,
    customers: {
      full_name: b.customer.fullName,
      email: b.customer.email,
      phone: b.customer.phone,
    },
    services: { name: b.service.name },
    total_amount: Number(b.totalAmount),
    booking_reference: b.bookingReference,
    service_address: b.serviceAddress,
    service_city: b.serviceCity,
    service_postcode: b.servicePostcode,
    property_type: b.propertyType,
    number_of_floors: b.numberOfFloors,
    appointment_date: b.appointmentDate.toISOString().split('T')[0],
    start_time: b.startTime.toISOString().split('T')[1].substring(0, 8),
    end_time: b.endTime.toISOString().split('T')[1].substring(0, 8),
    created_at: b.createdAt.toISOString(),
  }))
}

export async function markBookingCompleted(bookingId: string) {
  await checkAdmin()

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'COMPLETED' },
  })

  revalidatePath('/admin')
  revalidatePath('/dashboard/bookings')
}

// --- Service Management ---

export async function getAdminServices() {
  await checkAdmin()

  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return services.map((s) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    shortDescription: s.shortDescription || "",
    description: s.description || "",
    category: s.category || "",
    priceType: s.priceType,
    base_price: Number(s.basePrice),
    duration_minutes: s.durationMinutes,
    is_active: s.isActive,
    image_url: s.imageUrl || "",
    icon: s.icon || "Sparkles",
    features: (s.features as string[]) || [],
  }))
}

export async function toggleServiceStatus(serviceId: string, isActive: boolean) {
  await checkAdmin()

  await prisma.service.update({
    where: { id: serviceId },
    data: { isActive },
  })

  revalidatePath('/admin/services')
  revalidatePath('/book')
}

export async function updateService(serviceId: string, updates: any) {
  await checkAdmin()

  await prisma.service.update({
    where: { id: serviceId },
    data: {
      name: updates.name,
      shortDescription: updates.shortDescription,
      description: updates.description,
      priceType: updates.priceType,
      basePrice: Number(updates.base_price),
      durationMinutes: Number(updates.duration_minutes) || 120,
      imageUrl: updates.image_url,
      icon: updates.icon,
      features: updates.features ? JSON.parse(JSON.stringify(updates.features)) : [],
    },
  })

  revalidatePath('/admin/services')
  revalidatePath('/book')
}

export async function createService(data: any) {
  await checkAdmin()

  await prisma.service.create({
    data: {
      name: data.name,
      slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription: data.shortDescription,
      description: data.description,
      priceType: data.priceType || 'FROM_PRICE',
      basePrice: Number(data.base_price),
      durationMinutes: Number(data.duration_minutes) || 120,
      isActive: true,
      imageUrl: data.image_url,
      icon: data.icon || 'Sparkles',
      features: data.features ? JSON.parse(JSON.stringify(data.features)) : [],
    },
  })

  revalidatePath('/admin/services')
  revalidatePath('/book')
}

// --- Settings Management ---

export async function getSiteSettings() {
  await checkAdmin()

  const settings = await prisma.siteSettings.findFirst()
  if (!settings) throw new Error('Failed to fetch settings')

  return {
    ...settings,
    business_name: settings.businessName,
    bookings_enabled: settings.bookingsEnabled,
    address_line_1: settings.address,
    city: "",
    postcode: "",
  }
}

export async function updateSiteSettings(updates: any) {
  await checkAdmin()

  const currentSettings = await prisma.siteSettings.findFirst()
  if (!currentSettings) throw new Error('Settings not found')

  await prisma.siteSettings.update({
    where: { id: currentSettings.id },
    data: {
      businessName: updates.business_name,
      phone: updates.phone,
      email: updates.email,
      address: updates.address_line_1,
      bookingsEnabled: updates.bookings_enabled,
      coveredAreas: updates.coveredAreas,
      whatsapp: updates.whatsapp,
      openingHours: updates.openingHours ? JSON.parse(JSON.stringify(updates.openingHours)) : null,
      cancellationHours: Number(updates.cancellationHours) || 24,
      currency: updates.currency || 'GBP',
      timezone: updates.timezone || 'Europe/London',
      heroHeadline: updates.heroHeadline,
      heroSubtitle: updates.heroSubtitle,
      availableWindow: updates.availableWindow,
    },
  })

  revalidatePath('/')
  revalidatePath('/admin/settings')
}

import Papa from 'papaparse'

export async function uploadServicesCSV(formData: FormData) {
  await checkAdmin()

  const file = formData.get('file') as File
  if (!file) throw new Error('No file uploaded')

  const text = await file.text()
  
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          let added = 0
          let updated = 0
          let deleted = 0

          for (const row of results.data as any[]) {
            const action = row['Action (ADD/UPDATE/DELETE)']?.toUpperCase()
            const name = row['Service Name']
            if (!action || !name) continue

            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

            if (action === 'DELETE') {
              await prisma.service.deleteMany({ where: { slug } })
              deleted++
            } else if (action === 'ADD' || action === 'UPDATE') {
              const data = {
                name,
                slug,
                category: row['Category'] || null,
                description: row['Description'] || null,
                basePrice: Number(row['Base Price (£)']) || 0,
                durationMinutes: Number(row['Duration (mins)']) || 120,
                isActive: row['Is Active (yes/no)']?.toLowerCase() === 'yes',
                imageUrl: row['Image URL (optional)'] || null,
              }

              if (action === 'ADD') {
                await prisma.service.upsert({
                  where: { slug },
                  update: data,
                  create: data,
                })
                added++
              } else {
                await prisma.service.updateMany({
                  where: { slug },
                  data,
                })
                updated++
              }
            }
          }

          revalidatePath('/')
          revalidatePath('/book')
          revalidatePath('/admin/services')
          resolve({ success: true, added, updated, deleted })
        } catch (error: any) {
          reject(new Error(error.message))
        }
      },
      error: (error: any) => {
        reject(new Error(error.message))
      }
    })
  })
}

export async function getAdminStats() {
  await checkAdmin()
  
  const totalPendingBookings = await prisma.booking.count({
    where: { status: { in: ['PENDING', 'QUOTE_PROVIDED'] } }
  })
  
  const totalServices = await prisma.service.count({
    where: { isActive: true }
  })
  
  const totalAdmins = await prisma.user.count({
    where: { role: 'ADMIN' }
  })
  
  return {
    totalPendingBookings,
    totalServices,
    totalAdmins
  }
}

export async function getAdmins() {
  await checkAdmin()
  return await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { id: true, fullName: true, email: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function createAdmin(formData: FormData) {
  await checkAdmin()
  
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!fullName || !email || !password) {
    return { success: false, error: 'All fields are required.' }
  }
  
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { success: false, error: 'Email already exists.' }
  }
  
  const passwordHash = await bcrypt.hash(password, 12)
  
  await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      role: 'ADMIN'
    }
  })
  
  revalidatePath('/admin/admins')
  return { success: true }
}
