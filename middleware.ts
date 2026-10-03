import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const user = req.auth?.user
  const role = (user as any)?.role

  // Protected routes: require login
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/book')) && !user) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Admin routes: require ADMIN role
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    if (role !== 'ADMIN') {
      const url = req.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from auth pages
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && user) {
    const url = req.nextUrl.clone()
    url.pathname = role === 'ADMIN' ? '/admin' : '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
