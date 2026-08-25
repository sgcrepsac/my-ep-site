"use client";

import { useState } from "react";
import { EP_DATA } from "@/data/ep-data";
import { FaSpotify, FaYoutube, FaApple, FaDeezer } from "react-icons/fa";
import { Amatic_SC } from "next/font/google";

const amaticSC = Amatic_SC({ weight: "700", subsets: ["latin"] });

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
              <h1 className={`text-5xl font-bold text-[#2c271d] mb-2 tracking-wide ${amaticSC.className}`}>
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
                <div className="relative font-medium text-[#2c271d] flex items-center h-full">
                  <span className={`block transition-colors ${song.released ? 'group-hover:text-[#8a7342]' : 'blur-[6px] opacity-60 select-none'}`}>
                    {song.title}
                  </span>
                  {!song.released && (
                    <span className="absolute inset-0 flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#2c271d] z-10 whitespace-nowrap pt-1">
                      {song.releaseDate}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {song.released && (
                    <>
                      <a href={song.spotify} target="_blank" rel="noopener noreferrer" className="text-[#1DB954] hover:scale-110 transition-transform" aria-label={`Listen to ${song.title} on Spotify`}>
                        <FaSpotify className="w-4 h-4" />
                      </a>
                      <a href={song.youtube} target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:scale-110 transition-transform" aria-label={`Listen to ${song.title} on YouTube`}>
                        <FaYoutube className="w-4 h-4" />
                      </a>
                      {song.appleMusic && (
                        <a href={song.appleMusic} target="_blank" rel="noopener noreferrer" className="text-[#FA243C] hover:scale-110 transition-transform" aria-label={`Listen to ${song.title} on Apple Music`}>
                          <FaApple className="w-4 h-4" />
                        </a>
                      )}
                      {song.deezer && (
                        <a href={song.deezer} target="_blank" rel="noopener noreferrer" className="text-[#000000] hover:scale-110 transition-transform" aria-label={`Listen to ${song.title} on Deezer`}>
                          <FaDeezer className="w-4 h-4" />
                        </a>
                      )}
                    </>
                  )}
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
      <h1 className={`text-6xl font-bold mb-16 text-[#2c271d] drop-shadow-sm tracking-wide ${amaticSC.className}`}>
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
          <h3 className={`text-3xl font-bold text-[#2c271d] group-hover:text-[#8a7342] transition-colors ${amaticSC.className}`}>
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
