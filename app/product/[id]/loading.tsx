// app/product/[id]/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center fixed inset-0 z-50">
      {/* วงกลมหมุนๆ สีทอง */}
      <div className="w-16 h-16 border-4 border-[#222] border-t-[#c6a87c] rounded-full animate-spin mb-6"></div>
      
      {/* ข้อความกระพริบแบบนุ่มนวล */}
      <h2 className="text-[#c6a87c] font-['Playfair_Display'] text-xl uppercase tracking-[0.2em] animate-pulse">
        Loading Detail...
      </h2>
    </div>
  );
}