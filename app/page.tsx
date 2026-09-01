"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Amatic_SC, Quicksand } from "next/font/google";
import { EP_DATA } from "@/data/ep-data";
import { FaSpotify, FaYoutube, FaApple, FaDeezer } from "react-icons/fa";
import EPCoverExplorer from "@/components/EPCoverExplorer";
import FotosGallery from "@/components/FotosGallery";

const amaticSC = Amatic_SC({ weight: "700", subsets: ["latin"] });
const quicksand = Quicksand({ weight: ["400", "500", "600"], subsets: ["latin"] });

export default function Home() {
  const text = "SANTIAGO CREPSAC";
  const letters = Array.from(text);

  const [activeEP, setActiveEP] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      rotate: -10,
      scale: 0.8,
      filter: "blur(2px)",
    },
  };

  return (
    <div className="w-full flex flex-col gap-48 pb-48">
      {/* INICIO SECTION */}
      <section id="Inicio" className="scroll-mt-24 w-full max-w-5xl mx-auto flex flex-col items-center justify-center pt-24 min-h-[85vh] overflow-hidden">
        <motion.div
          className="flex flex-wrap justify-center overflow-hidden pb-4 px-4 text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {letters.map((letter, index) => {
            if (letter === " ") {
              return <div key={index} className="w-full h-4 md:w-12 md:h-auto" />;
            }
            return (
              <motion.span
                variants={child}
                key={index}
                className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1a1a1a] drop-shadow-lg tracking-wider uppercase inline-block mx-px selection:bg-[#C2B280] selection:text-white ${amaticSC.className}`}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.div>
      </section>

      {/* BIO SECTION */}
      <section id="Bio" className="scroll-mt-24 w-full max-w-6xl mx-auto px-4 min-h-[85vh] flex flex-col justify-center">
        <h2 className={`text-5xl sm:text-6xl font-bold mb-8 text-[#2c271d] drop-shadow-sm tracking-wide text-center lg:text-left ${amaticSC.className}`}>
          Biografía
        </h2>

        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Left Column: Text */}
          <div className="w-full lg:w-1/2 flex justify-start">
            <div className={`bg-white/40 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl text-[#2c271d] border border-[#2c271d]/10 leading-relaxed text-lg md:text-xl w-full font-medium ${quicksand.className}`}>
              <p className="mb-6">
                Santiago Crepsac es un cantautor venezolano radicado en Buenos Aires, para el cual la música siempre ha sido el refugio y el canal de comunicación más sincero. Desde que su proyecto tomó forma en la capital argentina —donde reside desde hace ocho años—, su propuesta busca honrar sus raíces e integrarlas en una sonoridad propia.
              </p>
              <p className="mb-6">
                Guiado por la guitarra y el piano, se mueve dentro de un universo indie caracterizado por la honestidad compositiva, explorando en sus letras tanto los pensamientos más introspectivos como los rincones más libres de su creatividad. Influenciado por la atemporalidad de The Beatles y la poesía de cantautores como Jorge Drexler y Silvio Rodríguez, su trabajo busca ofrecer una compañía genuina a través de la canción.
              </p>
              <p>
                Tras comenzar a escribir su propio material en 2023 y dar el salto a los escenarios en 2025, el artista se prepara para el lanzamiento de su primer EP, Reflexiones I, un trabajo cargado de emoción e intimidad.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[28rem] aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl border border-[#2c271d]/10 group">
              <img
                src="/images/BioImage.jpeg"
                alt="Santiago Crepsac Bio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#2c271d]/0 group-hover:bg-[#2c271d]/10 transition-colors duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* DISCOGRAFIA SECTION */}
      <section id="Discografia" className="scroll-mt-24 w-full max-w-4xl mx-auto px-4 min-h-[85vh] flex flex-col justify-center">
        {activeEP === "reflexiones-i" ? (
          <div className="w-full flex flex-col items-center">
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
                  <h3 className={`text-5xl font-bold text-[#2c271d] mb-2 tracking-wide ${amaticSC.className}`}>
                    Reflexiones I
                  </h3>
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
        ) : (
          <div className="w-full flex flex-col items-center">
            <h2 className={`text-6xl font-bold mb-16 text-[#2c271d] drop-shadow-sm tracking-wide ${amaticSC.className}`}>
              Discografía
            </h2>

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
        )}
      </section>

      {/* ARTE SECTION */}
      <section id="Arte" className="scroll-mt-24 w-full max-w-4xl mx-auto px-4 min-h-[85vh] flex flex-col justify-center">
        <h2 className={`text-6xl font-bold mb-8 text-[#2c271d] drop-shadow-sm tracking-wide text-center ${amaticSC.className}`}>
          Arte
        </h2>
        <div className="w-full flex flex-col items-center justify-center focus:outline-none">
          <EPCoverExplorer />
        </div>
      </section>

      {/* FOTOS SECTION */}
      <section id="Fotos" className="scroll-mt-24 w-full max-w-6xl mx-auto px-4 min-h-[85vh] flex flex-col justify-center">
        <h2 className={`text-6xl font-bold mb-8 text-[#2c271d] drop-shadow-sm tracking-wide text-center ${amaticSC.className}`}>
          Fotos
        </h2>
        <FotosGallery />
      </section>

    </div>
  );
}
