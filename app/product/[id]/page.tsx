import { supabase } from '@/app/lib/supabase';
// 1. เพิ่ม Import notFound
import { notFound } from 'next/navigation'; 
// 2. เพิ่ม Import ProductDetailClient (ตรวจสอบ Path ด้านล่างนี้ให้ตรงกับโฟลเดอร์งานจริงของคุณด้วยนะครับ)
import ProductDetailClient from './ProductDetailClient'; 

// 3. ประกาศ Type สำหรับ PageProps (รองรับ Next.js เวอร์ชันใหม่ที่ params เป็น Promise)
type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ style?: string }>;
};

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { style } = await searchParams;

  // เพิ่ม Error Handling ให้อุ่นใจขึ้น
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*, product_variants (*)')
      .eq('id', id)
      .single();

    if (error || !product) return notFound();

    return (
      <main className="min-h-screen pt-20"> 
        <ProductDetailClient 
          product={product} 
          variants={product.product_variants || []} 
          initialStyle={style ? decodeURIComponent(style) : null}
        />
      </main>
    );
  } catch (e) {
    return (
      <div className="text-white text-center pt-20">
        พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
      </div>
    );
  }
}