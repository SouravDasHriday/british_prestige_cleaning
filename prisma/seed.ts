import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Create Admin User
  const adminPasswordHash = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'sdhriday007@gmail.com' },
    update: {},
    create: {
      email: 'sdhriday007@gmail.com',
      passwordHash: adminPasswordHash,
      fullName: 'System Admin',
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // 2. Create Site Settings
  await prisma.siteSettings.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      businessName: 'British Prestige Cleaning Solutions',
      phone: '+44 123 456 7890',
      email: 'info@britishprestigecleaning.co.uk',
      currency: 'GBP',
      timezone: 'Europe/London',
      bookingsEnabled: true,
    },
  })
  console.log('✅ Site settings created')

  // 3. Create Sample Services
  const services = [
    {
      name: 'Regular Cleaning',
      slug: 'regular-cleaning',
      description: 'Our standard cleaning service covers all rooms including dusting, vacuuming, mopping, and surface cleaning.',
      basePrice: 60,
      durationMinutes: 120,
      isActive: true,
    },
    {
      name: 'Deep Cleaning',
      slug: 'deep-cleaning',
      description: 'A thorough deep clean that covers every corner. Includes inside appliances, windows, and detailed scrubbing.',
      basePrice: 120,
      durationMinutes: 240,
      isActive: true,
    },
    {
      name: 'End of Tenancy',
      slug: 'end-of-tenancy',
      description: 'Professional end of tenancy cleaning designed to help you get your full deposit back. Covers every inch.',
      basePrice: 200,
      durationMinutes: 360,
      isActive: true,
    },
    {
      name: 'Office Cleaning',
      slug: 'office-cleaning',
      description: 'Professional commercial cleaning for offices and workspaces of all sizes.',
      basePrice: 150,
      durationMinutes: 180,
      isActive: true,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }
  console.log('✅ Services created:', services.length)

  // 4. Create Sample Availability Slots (next 30 days)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const timeSlots = [
    { start: '08:00', end: '10:00' },
    { start: '10:00', end: '12:00' },
    { start: '12:00', end: '14:00' },
    { start: '14:00', end: '16:00' },
    { start: '16:00', end: '18:00' },
  ]

  let slotCount = 0
  for (let dayOffset = 1; dayOffset <= 30; dayOffset++) {
    const date = new Date(today)
    date.setDate(date.getDate() + dayOffset)

    // Skip Sundays
    if (date.getDay() === 0) continue

    for (const ts of timeSlots) {
      const startTime = new Date(`2000-01-01T${ts.start}:00.000Z`)
      const endTime = new Date(`2000-01-01T${ts.end}:00.000Z`)

      try {
        await prisma.availabilitySlot.create({
          data: {
            date,
            startTime,
            endTime,
            status: 'AVAILABLE',
          },
        })
        slotCount++
      } catch {
        // Slot already exists, skip
      }
    }
  }
  console.log('✅ Availability slots created:', slotCount)

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
