'use server'

import { prisma } from '@/lib/db'

export async function getChatbotServices() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { basePrice: 'asc' },
    select: {
      name: true,
      description: true,
      basePrice: true,
      durationMinutes: true,
    },
  })

  return services.map((s) => ({
    name: s.name,
    description: s.description,
    price: Number(s.basePrice),
    duration: s.durationMinutes,
  }))
}

export async function getChatbotSettings() {
  const settings = await prisma.siteSettings.findFirst({
    select: {
      businessName: true,
      phone: true,
      email: true,
      address: true,
    },
  })

  return settings
}
