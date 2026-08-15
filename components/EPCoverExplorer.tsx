"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EP_DATA, Song } from '../data/ep-data';
import { FaSpotify, FaYoutube, FaApple, FaDeezer } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { useEffect } from 'react';

export default function EPCoverExplorer() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [creditsContent, setCreditsContent] = useState<string>("");

  // Fetch the markdown credits file when a song becomes selected
  useEffect(() => {
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
      <div className="relative w-full max-w-[min(100vw-2rem,65vh)] mx-auto overflow-hidden">

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
          {/* Main Cover Blurred Base */}
          <motion.img
            src={EP_DATA.mainCover}
            alt="EP Cover Background Blurred"
            className="w-full h-auto block z-0 pointer-events-none opacity-80"
            animate={{ filter: selectedSong ? 'brightness(0.2) saturate(0.5) blur(10px)' : 'brightness(1) saturate(1) blur(10px)' }}
            transition={{ duration: 1.0 }}
          />

          {/* Main Cover Clear Overlay (Masked to show only released songs) */}
          <motion.img
            src={EP_DATA.mainCover}
            alt="EP Cover Background Clear"
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
            animate={{ filter: selectedSong ? 'brightness(0.2) saturate(0.5)' : 'brightness(1) saturate(1)' }}
            transition={{ duration: 1.0 }}
            style={{
              WebkitMaskImage: EP_DATA.songs.some(s => s.released)
                ? EP_DATA.songs
                  .filter((s) => s.released)
                  .map((s) => {
                    const cx = s.hotspot.left + s.hotspot.width / 2;
                    const cy = s.hotspot.top + s.hotspot.height / 2;
                    return `radial-gradient(circle at ${cx}% ${cy}%, black 3.5%, transparent 5%)`;
                  })
                  .join(', ')
                : 'linear-gradient(transparent, transparent)',
              maskImage: EP_DATA.songs.some(s => s.released)
                ? EP_DATA.songs
                  .filter((s) => s.released)
                  .map((s) => {
                    const cx = s.hotspot.left + s.hotspot.width / 2;
                    const cy = s.hotspot.top + s.hotspot.height / 2;
                    return `radial-gradient(circle at ${cx}% ${cy}%, black 3.5%, transparent 5%)`;
                  })
                  .join(', ')
                : 'linear-gradient(transparent, transparent)',
            }}
          />

          {/* The Embedded Song Images (permanently part of the cover) removed as per user request */}

          {/* The Clickable Hotspots */}
          <AnimatePresence>
            {!selectedSong && EP_DATA.songs.map((song) => (
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 sm:p-8 pointer-events-auto bg-black/70 backdrop-blur-md overflow-y-auto w-full h-full"
          >
            {/* Inner wrapper to handle centering and vertical sizing gracefully */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto min-h-min py-12">

              {/* Title Centered on Top */}
              <h2
                className="text-5xl sm:text-7xl mb-12 tracking-wider text-white drop-shadow-2xl text-center"
                style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontWeight: 600 }}
              >
                {selectedSong.title}
              </h2>

              {/* Middle Layout: Interactive 3D Flip Card */}
              <div
                className="relative cursor-pointer group perspective-1000 mb-12 flex justify-center"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  className="relative flex justify-center items-center"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of Card: The Morphing Image */}
                  <motion.div
                    className="relative w-auto h-auto backface-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 group-hover:ring-4 group-hover:ring-white/20 transition-all duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.img
                      layoutId={`song-img-morph-${selectedSong.id}`}
                      src={selectedSong.image}
                      alt={selectedSong.title}
                      className={`w-auto h-auto max-h-[60vh] max-w-[90vw] object-contain ${!selectedSong.released ? 'blur-md opacity-80' : ''}`}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                    {!selectedSong.released && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10">
                        <span className="text-2xl font-bold text-white tracking-widest uppercase mb-2 drop-shadow-lg">Unreleased</span>
                        <span className="text-lg text-white/90 drop-shadow-md">{selectedSong.releaseDate}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Back of Card: The Credits */}
                  <motion.div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-2xl bg-[#1a1a1a] border border-white/20 flex flex-col items-center justify-center p-8 overflow-y-auto"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="prose prose-invert prose-p:text-white/80 prose-p:leading-relaxed text-center font-playfair text-lg w-full max-w-sm mx-auto prose-strong:font-bold prose-strong:text-white prose-em:italic prose-a:text-[#C2B280] hover:prose-a:text-white transition-colors tracking-wide">
                      {selectedSong.released ? (
                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                          {creditsContent}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-white/50 italic text-xl">Credits will be revealed on release day.</p>
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
    </>
  );
}