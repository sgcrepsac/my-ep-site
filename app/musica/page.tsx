"use client";

import { useState } from "react";
import { EP_DATA } from "@/data/ep-data";

export default function MusicaPage() {
  const [activeEP, setActiveEP] = useState<string | null>(null);

  if (activeEP === "reflexiones-i") {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-16 px-4 pb-16">
        <div className="w-full flex justify-start mb-8">
          <button 
            onClick={() => setActiveEP(null)}
            className="text-[#2c271d]/70 hover:text-[#2c271d] font-serif uppercase tracking-widest text-sm transition-colors border-b border-transparent hover:border-[#2c271d]/30 pb-0.5"
          >
            ← Volver a Discografía
          </button>
        </div>

        <div className="w-full max-w-2xl bg-white/50 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-sm border border-[#2c271d]/10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            <img 
              src={EP_DATA.mainCover} 
              alt="Reflexiones I Cover" 
              className="w-48 h-48 object-cover rounded-md shadow-lg border border-[#2c271d]/10"
            />
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4">
              <h1 className="font-playfair text-4xl font-bold text-[#2c271d] mb-2 tracking-wide">
                Reflexiones I
              </h1>
              <p className="text-[#2c271d]/60 font-medium text-sm uppercase tracking-widest mb-6">
                EP • 2026 • 4 Canciones
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://open.spotify.com/" 
                  target="_blank" rel="noopener noreferrer" 
                  className="bg-[#1DB954] hover:bg-[#1ed760] text-white px-6 py-2 rounded-full font-medium text-sm tracking-wide transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <span className="font-semibold uppercase tracking-wider text-xs">Escuchar en Spotify</span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="grid grid-cols-[3rem_1fr_auto] items-center px-4 py-3 text-xs uppercase tracking-widest text-[#2c271d]/50 border-b border-[#2c271d]/10 mb-2">
              <span className="text-center">#</span>
              <span>Título</span>
              <span>Enlaces</span>
            </div>
            {EP_DATA.songs.map((song, index) => (
              <div 
                key={song.id} 
                className="group grid grid-cols-[3rem_1fr_auto] items-center px-4 py-3 rounded-lg hover:bg-white/60 transition-colors"
              >
                <div className="text-center text-[#2c271d]/40 font-medium group-hover:text-[#2c271d]/80 transition-colors">
                  {index + 1}
                </div>
                <div className="font-medium text-[#2c271d] group-hover:text-[#8a7342] transition-colors">
                  {song.title}
                </div>
                <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  <a href={song.spotify} target="_blank" rel="noopener noreferrer" className="text-[#1DB954] hover:scale-110 transition-transform" aria-label={`Listen to ${song.title} on Spotify`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.68 18.72 12.96c.36.181.54.78.241 1.08zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
                  </a>
                  <a href={song.youtube} target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 transition-transform" aria-label={`Listen to ${song.title} on YouTube`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
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
