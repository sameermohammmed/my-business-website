import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/admin/login'
  const isAdminPath = path.startsWith('/admin')

  // Get the user from cookies
  const user = request.cookies.get('user')?.value

  // Redirect logic
  if (isPublicPath && user) {
    // If user is logged in and tries to access login page, redirect to admin dashboard
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (isAdminPath && !isPublicPath && !user) {
    // If user is not logged in and tries to access protected route, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*']
} 