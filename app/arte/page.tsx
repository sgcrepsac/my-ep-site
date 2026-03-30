"use client";

import EPCoverExplorer from "@/components/EPCoverExplorer";

export default function ArtePage() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-8 px-4">
      <h1 
        className="font-playfair text-5xl md:text-6xl font-bold mb-8 text-[#2c271d] drop-shadow-sm tracking-widest uppercase"
        style={{ fontStyle: "italic", fontWeight: 600 }}
      >
        Reflexiones I
      </h1>
      <div className="w-full flex flex-col items-center justify-center focus:outline-none">
        <EPCoverExplorer />
      </div>
    </div>
  );
}
