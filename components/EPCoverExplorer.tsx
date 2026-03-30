"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EP_DATA, Song } from '../data/ep-data';
import { FaSpotify, FaYoutube } from 'react-icons/fa';
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
          {/* Main Cover Image (dimmed when something is selected) */}
          <motion.img
            src={EP_DATA.mainCover}
            alt="EP Cover Background"
            className="w-full h-auto block z-0 pointer-events-none"
            animate={{ filter: selectedSong ? 'brightness(0.2) saturate(0.5)' : 'brightness(1) saturate(1)' }}
            transition={{ duration: 1.0 }}
          />

          {/* The Embedded Song Images (permanently part of the cover) */}
          {EP_DATA.songs.map((song) => {
            if (selectedSong?.id === song.id) return null; // hide the original when selected to allow layout morph
            return (
              <motion.img
                key={`img-hotspot-${song.id}`}
                layoutId={`song-img-morph-${song.id}`}
                src={song.image}
                alt={song.title}
                className="absolute object-cover object-center pointer-events-none"
                style={{
                  top: `${song.hotspot.top}%`,
                  left: `${song.hotspot.left}%`,
                  width: `${song.hotspot.width}%`,
                  height: `${song.hotspot.height}%`,
                }}
                initial={false}
                animate={{
                  filter: selectedSong ? 'brightness(0.1)' : 'brightness(1)',
                  zIndex: 10,
                }}
                transition={{ duration: 0.8 }}
              />
            );
          })}

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
                className="relative w-72 md:w-[28rem] aspect-[4/3] cursor-pointer group perspective-1000 mb-12"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  className="w-full h-full relative"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of Card: The Morphing Image */}
                  <motion.div
                    className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 group-hover:ring-4 group-hover:ring-white/20 transition-all duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.img
                      layoutId={`song-img-morph-${selectedSong.id}`}
                      src={selectedSong.image}
                      alt={selectedSong.title}
                      className="w-full h-full object-cover"
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />


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
                      <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                        {creditsContent}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom: Buttons */}
              <div className="flex flex-col items-center gap-6 mt-4">
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
                </div>

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