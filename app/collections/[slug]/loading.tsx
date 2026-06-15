import React from 'react';

// src/app/product/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center">
      {/* วงกลมหมุนๆ สีทอง */}
      <div className="w-16 h-16 border-4 border-[#333] border-t-[#c6a87c] rounded-full animate-spin mb-6"></div>
      <h2 className="text-[#c6a87c] font-['Playfair_Display'] text-xl uppercase tracking-[0.2em] animate-pulse">
        Loading Detail...
      </h2>
    </div>
  );
}