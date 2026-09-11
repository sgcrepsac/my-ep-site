"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EP_DATA, Song } from '../data/ep-data';
import { FaSpotify, FaYoutube, FaApple, FaDeezer, FaPlay, FaPause, FaPen, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { useEffect } from 'react';
import { Amatic_SC } from 'next/font/google';

const amaticSC = Amatic_SC({ weight: "700", subsets: ["latin"] });

export default function EPCoverExplorer() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShowingVideo, setIsShowingVideo] = useState(false);
  const [showLyricsPdf, setShowLyricsPdf] = useState(false);
  const [creditsContent, setCreditsContent] = useState<string>("");

  // Fetch the markdown credits file when a song becomes selected
  useEffect(() => {
    setIsShowingVideo(false);
    setIsFlipped(false);
    setShowLyricsPdf(false);
    if (selectedSong?.creditsFile) {
      setCreditsContent("Loading credits...");
      fetch(selectedSong.creditsFile)
        .then((res) => {
          if (!res.ok) throw new Error("Credits not found");
          return res.text();
        })
        .then((text) => setCreditsContent(text))
        .catch(() => setCreditsContent("Could not load credits for this song."));
    }
  }, [selectedSong]);

  const getTransformProps = (song: Song | null) => {
    if (!song) return { scale: 1, x: "0%", y: "0%" };

    // Find the scale needed to fill ~75% of the container:
    // This leaves room at the bottom for the title text overlay
    const maxDimension = Math.max(song.hotspot.width, song.hotspot.height);
    const targetScale = 75 / maxDimension;

    // Find the original geometric center of the hotspot
    const originX = song.hotspot.left + song.hotspot.width / 2;
    const originY = song.hotspot.top + song.hotspot.height / 2;

    // Calculate translation percentages to bring it precisely to 50% 50%
    // Multiply distance by targetScale because the distance itself scales
    const x = -(originX - 50) * targetScale;
    const y = -(originY - 50) * targetScale;

    return { scale: targetScale, x: `${x}%`, y: `${y}%` };
  };

  return (
    <>
      <div className="relative w-full max-w-[min(100vw-2rem,85vh)] mx-auto overflow-hidden">

        {/* 1. The Main Wrap for Mathematical Zooming */}
        <motion.div
          className="w-full h-full relative flex items-center justify-center"
          initial={false}
          animate={getTransformProps(selectedSong)}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          style={{
            transformOrigin: '50% 50%',
          }}
        >
          {/* Main Cover */}
          <motion.img
            src={EP_DATA.mainCover}
            alt="EP Cover Background"
            className="w-full h-auto block z-0 pointer-events-none"
            animate={{ filter: selectedSong ? 'brightness(0.2) saturate(0.5)' : 'brightness(1) saturate(1)' }}
            transition={{ duration: 1.0 }}
          />

          {/* The Clickable Hotspots */}
          <AnimatePresence>
            {!selectedSong && EP_DATA.songs.filter(song => song.released).map((song) => (
              <motion.button
                key={`btn-${song.id}`}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute border border-transparent hover:border-white/40 transition-colors cursor-pointer bg-white/5 hover:bg-white/10 z-30"
                style={{
                  top: `${song.hotspot.top}%`,
                  left: `${song.hotspot.left}%`,
                  width: `${song.hotspot.width}%`,
                  height: `${song.hotspot.height}%`,
                  transform: song.hotspot.rotate ? `rotate(${song.hotspot.rotate}deg)` : undefined,
                  borderRadius: song.hotspot.borderRadius || '0px',
                }}
                onClick={() => setSelectedSong(song)}
                aria-label={`View ${song.title}`}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 2. The Detail Overlay UI (Full screen layout with layout morphing) */}
      <AnimatePresence>
        {selectedSong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex flex-col items-center p-4 sm:p-8 pointer-events-auto bg-black/70 backdrop-blur-md overflow-y-auto w-full h-full"
          >
            {/* Inner wrapper to handle centering and vertical sizing gracefully */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-full py-8">

              {/* Title Centered on Top */}
              <h2
                className={`text-6xl sm:text-7xl md:text-8xl mb-8 tracking-wider text-white drop-shadow-2xl text-center ${amaticSC.className}`}
              >
                {selectedSong.title}
              </h2>

              {/* Middle Layout: Interactive 3D Flip Card */}
              <div
                className={`relative group perspective-1000 mb-12 flex justify-center ${isShowingVideo ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => {
                  if (!isShowingVideo) {
                    setIsFlipped(!isFlipped);
                  }
                }}
              >
                <motion.div
                  className="relative flex justify-center items-center w-[70%] sm:w-[50%] md:w-[30%] mx-auto"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of Card: The Morphing Image or Moving Video */}
                  <motion.div
                    className="relative w-auto h-auto backface-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 group-hover:ring-4 group-hover:ring-white/20 transition-all duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {isShowingVideo && selectedSong.movingImage && selectedSong.released ? (
                      <video
                        src={selectedSong.movingImage}
                        autoPlay
                        muted
                        playsInline
                        onEnded={() => setIsShowingVideo(false)}
                        onError={() => setIsShowingVideo(false)}
                        className="w-full h-auto block rounded-xl object-cover"
                      />
                    ) : (
                      <motion.img
                        layoutId={`song-img-morph-${selectedSong.id}`}
                        src={selectedSong.image}
                        alt={selectedSong.title}
                        className={`w-full h-auto block rounded-xl ${!selectedSong.released ? 'blur-md opacity-80' : ''}`}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    )}
                    {!selectedSong.released && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10">
                        <span className="text-2xl font-bold text-white tracking-widest uppercase mb-2 drop-shadow-lg">Unreleased</span>
                        <span className="text-lg text-white/90 drop-shadow-md">{selectedSong.releaseDate}</span>
                      </div>
                    )}
                    {selectedSong.released && !isFlipped && (
                      <div className="absolute top-3 right-3 z-30 flex flex-col gap-2.5 items-end">
                        {/* Play Canvas Animation Button */}
                        {selectedSong.movingImage && (
                          <div className="relative group/btn">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsShowingVideo((prev) => !prev);
                              }}
                              className="p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md shadow-lg border border-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
                              title="Play Canvas Animation"
                              aria-label="Play Canvas Animation"
                            >
                              {isShowingVideo ? <FaPause className="w-3.5 h-3.5" /> : <FaPlay className="w-3.5 h-3.5 ml-0.5" />}
                            </button>
                            <div className="absolute right-0 top-full mt-2 hidden group-hover/btn:block bg-black/85 text-white text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap backdrop-blur-md shadow-lg border border-white/10 pointer-events-none z-40">
                              Play Canvas Animation
                            </div>
                          </div>
                        )}

                        {/* Lyrics Button (Pencil Icon) */}
                        {selectedSong.lyricsPdf && !isShowingVideo && (
                          <div className="relative group/btn">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsShowingVideo(false);
                                setShowLyricsPdf(true);
                              }}
                              className="p-2.5 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md shadow-lg border border-white/20 hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
                              title="Ver Letra"
                              aria-label="Ver Letra"
                            >
                              <FaPen className="w-3.5 h-3.5 text-white/90" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 hidden group-hover/btn:block bg-black/85 text-white text-xs font-medium px-2.5 py-1 rounded-md whitespace-nowrap backdrop-blur-md shadow-lg border border-white/10 pointer-events-none z-40">
                              Ver Letra
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-2xl bg-[#1a1a1a] border border-white/20 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="w-full h-full">
                      {selectedSong.released ? (
                        <img
                          src={selectedSong.creditsImage || "/credits/Creditos_Catarata-02.jpg"}
                          alt={`Credits for ${selectedSong.title}`}
                          className="w-full h-full object-cover block rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <p className="text-white/50 italic text-xl text-center">Credits will be revealed on release day.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom: Buttons */}
              <div className="flex flex-col items-center gap-6 mt-4">
                {selectedSong.released && (
                  <div className="flex flex-wrap justify-center gap-6">
                    <a
                      href={selectedSong.spotify}
                      target="_blank" rel="noopener noreferrer"
                      className="bg-[#1DB954] hover:bg-[#1ed760] text-black w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-xl"
                      aria-label="Listen on Spotify"
                    >
                      <FaSpotify className="w-6 h-6" />
                    </a>
                    <a
                      href={selectedSong.youtube}
                      target="_blank" rel="noopener noreferrer"
                      className="bg-[#FF0000] hover:bg-[#ff4d4d] text-white w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-xl"
                      aria-label="Watch on YouTube"
                    >
                      <FaYoutube className="w-6 h-6" />
                    </a>
                    {selectedSong.appleMusic && (
                      <a
                        href={selectedSong.appleMusic}
                        target="_blank" rel="noopener noreferrer"
                        className="bg-[#FA243C] hover:bg-[#ff4d61] text-white w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-xl"
                        aria-label="Listen on Apple Music"
                      >
                        <FaApple className="w-6 h-6 mb-0.5" />
                      </a>
                    )}
                    {selectedSong.deezer && (
                      <a
                        href={selectedSong.deezer}
                        target="_blank" rel="noopener noreferrer"
                        className="bg-[#000000] hover:bg-[#222222] text-white w-12 h-12 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-xl"
                        aria-label="Listen on Deezer"
                      >
                        <FaDeezer className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                )}

                {/* Text-based Utilities */}
                <div className="flex flex-col items-center mt-4">
                  {/* Return to Cover Button */}
                  <button
                    onClick={() => {
                      setSelectedSong(null);
                      setIsFlipped(false); // Reset flip state for next open
                    }}
                    className="text-white hover:text-white/80 text-xs uppercase tracking-[0.2em] pb-1 border-b border-white/30 hover:border-white transition-all duration-300 drop-shadow-md"
                  >
                    Return to Cover
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Lyrics PDF Popup Modal */}
      <AnimatePresence>
        {showLyricsPdf && selectedSong?.lyricsPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden"
            onClick={() => setShowLyricsPdf(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-2xl border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-3">
                  <FaPen className="w-4 h-4 text-white/90" />
                  <h3 className={`text-2xl sm:text-3xl text-white font-bold tracking-wide ${amaticSC.className}`}>
                    Letra - {selectedSong.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={selectedSong.lyricsPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    Abrir PDF
                  </a>
                  <button
                    onClick={() => setShowLyricsPdf(false)}
                    className="p-1.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                    aria-label="Cerrar ventana"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Responsive PDF Viewer Frame */}
              <div className="w-full flex-1 bg-[#181818] overflow-hidden relative">
                <iframe
                  src={`${selectedSong.lyricsPdf}#view=FitH&toolbar=0`}
                  className="w-full h-full border-0 rounded-b-2xl"
                  title={`Letra de ${selectedSong.title}`}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}