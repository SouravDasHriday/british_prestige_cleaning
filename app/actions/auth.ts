'use server'

import { signIn, signOut, auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error: any) {
    // AuthError from next-auth
    if (error?.type === 'CredentialsSignin' || error?.code === 'credentials') {
      redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`)
    }
    // If it's a NEXT_REDIRECT, rethrow it
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error
    }
    redirect(`/login?error=${encodeURIComponent('Invalid email or password')}`)
  }

  // Fetch user role directly from DB because auth() session isn't updated 
  // immediately after signIn in the same server action.
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (user?.role === 'ADMIN') {
    redirect('/admin')
  } else {
    redirect('/dashboard')
  }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const fullName = `${firstName} ${lastName}`.trim()

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    redirect(`/register?error=${encodeURIComponent('An account with this email already exists')}`)
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 12)

  // Create user and customer profile in a transaction
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: 'CUSTOMER',
      },
    })

    await tx.customer.create({
      data: {
        userId: user.id,
        fullName,
        email,
      },
    })
  })

  // Auto-login after signup
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error: any) {
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error
    }
  }

  redirect('/dashboard')
}

export async function logout() {
  await signOut({ redirect: false })
  redirect('/login')
}
