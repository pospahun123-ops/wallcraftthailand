// app/layout.tsx
import type { Metadata } from "next";
import { Prompt, Noto_Sans_Thai } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import NextTopLoader from 'nextjs-toploader'; // นำเข้าตัวโหลดดิ้งบาร์
import "./globals.css";

import ConditionalNavbar from "./components/Navbar";
import ConditionalFooter from "./components/ConditionalFooter";

// ย้ายคำสั่งตั้งค่ามาไว้ตรงนี้ครับ (หลังจาก import ทุกอย่างเสร็จหมดแล้ว)
config.autoAddCss = false;
export const dynamic = 'force-dynamic';

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-prompt",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wallcraft | Home Page",
  description: "Wallcraft Editorial Material Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${prompt.variable} ${notoSansThai.variable}`}>
      <body className={`antialiased noise font-sans text-[#808080]`}>
        
        {/* แถบโหลดดิ้งสีทองตอนเปลี่ยนหน้า */}
        <NextTopLoader 
          color="#c6a87c"          
          initialPosition={0.08}   
          crawlSpeed={200}
          height={3}               
          crawl={true}
          showSpinner={false}      
          easing="ease"
          speed={200}
        />
        
        <ConditionalNavbar />
        {children}
        <ConditionalFooter />
        
      </body>
    </html>
  );
}