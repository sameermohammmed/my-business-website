import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isLoggedIn = request.cookies.get('adminLoggedIn')?.value === 'true'

  // If trying to access admin routes without being logged in
  if (isAdminRoute && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If trying to access login page while already logged in
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 