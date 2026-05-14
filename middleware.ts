import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 🟢 1. เปิดทางด่วนให้ไฟล์ระบบที่จำเป็น! ปล่อยผ่านทันทีไม่ต้องเช็คบอท
  // (เพื่อให้บอทเข้ามาอ่านกฎ robots.txt ของเราได้ และไม่ให้หน้าเว็บแจ้งเตือน error ไฟล์ภาพ)
  const allowedPaths = ['/robots.txt', '/sitemap.xml', '/favicon.ico', '/favicon.png']
  if (allowedPaths.some(path => request.nextUrl.pathname === path)) {
    return NextResponse.next()
  }

  // 🟡 2. ดึงค่า User-Agent ที่ส่งมา
  const userAgent = request.headers.get('user-agent') || ''

  // 🚫 3. รายชื่อบอทที่นายต้องการบล็อก (ตัวเล็กทั้งหมด)
  const blockedBots = [
    'claude-searchbot',
    'ahrefsbot',
    'semrushbot',
    'semrush',
    'mj12bot',
    'dotbot',
    'petalbot',
    'rogerbot',
    'oai-searchbot',
    'chatgpt-user',
    'applebot'
  ]

  // 🔴 4. เช็คว่า User-Agent มีคำที่ตรงกับชื่อบอทด้านบนไหม
  const isBlocked = blockedBots.some(bot => userAgent.toLowerCase().includes(bot))

  if (isBlocked) {
    // ถ้าเป็นบอทในลิสต์ เตะทิ้งทันที! (403 Forbidden)
    return new NextResponse('Forbidden: Access Denied for Bots', { status: 403 })
  }

  // 🟢 5. ถ้าเป็นคนปกติ (หรือ Googlebot ที่ไม่ได้อยู่ในลิสต์) ปล่อยผ่านปกติ
  return NextResponse.next()
}

// ตั้งค่าให้ดักจับทุก Path ในเว็บ ยกเว้นพวกไฟล์ static ของ Next.js
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     */
    '/((?!_next/static|_next/image).*)',
  ],
}