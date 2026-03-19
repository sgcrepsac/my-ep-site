"use client";

import { useState } from "react";
import EPCoverExplorer from "@/components/EPCoverExplorer";
import { EP_DATA } from "@/data/ep-data";

export default function MusicaPage() {
  const [activeEP, setActiveEP] = useState<string | null>(null);

  if (activeEP === "reflexiones-i") {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-8 focus:outline-none">
        <button 
          onClick={() => setActiveEP(null)}
          className="mb-8 self-start ml-4 sm:ml-0 z-50 text-[#2c271d]/70 hover:text-[#2c271d] font-serif uppercase tracking-widest text-sm transition-colors border-b border-transparent hover:border-[#2c271d]/30 pb-0.5"
        >
          ← Volver a Discografía
        </button>
        <EPCoverExplorer />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-16 px-4">
      <h1 className="font-playfair text-4xl font-bold mb-16 text-[#2c271d] drop-shadow-sm tracking-wide">
        Discografía
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-3xl">
        {/* Reflexiones I EP Thumbnail */}
        <div 
          className="group cursor-pointer flex flex-col items-center"
          onClick={() => setActiveEP("reflexiones-i")}
        >
          <div className="relative w-full aspect-square overflow-hidden rounded-md shadow-lg mb-5 border border-[#2c271d]/10 group-hover:shadow-2xl transition-all duration-300">
            <img 
              src={EP_DATA.mainCover} 
              alt="Reflexiones I Cover" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Soft overlay on hover */}
            <div className="absolute inset-0 bg-[#2c271d]/0 group-hover:bg-[#2c271d]/5 transition-colors duration-300" />
          </div>
          <h3 className="font-playfair text-xl font-bold text-[#2c271d] group-hover:text-[#8a7342] transition-colors">
            Reflexiones I
          </h3>
          <p className="text-[#2c271d]/60 font-medium text-sm mt-1 uppercase tracking-widest">
            EP • 2026
          </p>
        </div>
      </div>
    </div>
  );
}
