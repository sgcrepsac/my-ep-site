"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {EP_DATA, Song} from '../data/ep-data';

export default function EPCoverExplorer() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square overflow-hidden rounded-lg shadow-2xl">
      {/* 1. The Main Image */}
      <img src={EP_DATA.mainCover} alt="EP Cover" className="w-full h-full object-cover" />

      {/* 2. The Hotspots */}
      {EP_DATA.songs.map((song) => (
        <button
          key={song.id}
          className="absolute border-2 border-transparent hover:border-white/50 transition-colors cursor-pointer bg-red-500/50"
          style={{
            top: `${song.hotspot.top}%`,
            left: `${song.hotspot.left}%`,
            width: `${song.hotspot.width}%`,
            height: `${song.hotspot.height}%`,
          }}
          onClick={() => setSelectedSong(song)}
        />
      ))}

      {/* 3. The Detail Overlay */}
      <AnimatePresence>
        {selectedSong && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center"
          >
            <h2 className="text-3xl font-bold mb-2">{selectedSong.title}</h2>
            <p className="text-gray-300 mb-6">{selectedSong.description}</p>
           
            <div className="flex gap-4">
              <a href={selectedSong.spotify} className="bg-green-500 px-4 py-2 rounded-full font-bold">Spotify</a>
              <a href={selectedSong.youtube} className="bg-red-600 px-4 py-2 rounded-full font-bold">YouTube</a>
            </div>

            <button
              onClick={() => setSelectedSong(null)}
              className="mt-8 text-sm underline opacity-70"
            >
              Back to Cover
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}