"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { Amatic_SC } from "next/font/google";

const amaticSC = Amatic_SC({ weight: "700", subsets: ["latin"] });

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if the user has already dismissed the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPromoPopup");

    if (!hasSeenPopup) {
      // Delay showing the popup by 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenPromoPopup", "true");
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log("Audio play failed:", e));
    } else {
      audioRef.current.muted = true;
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setIsMuted(!isMuted);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#f9f6f0] rounded-2xl shadow-2xl overflow-hidden border border-[#2c271d]/20 animate-in zoom-in-95 duration-300">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
          aria-label="Close promo popup"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Content Wrapper */}
        <div className="flex flex-col">
          {/* Placeholder Image Area */}
          <div className="w-full aspect-square bg-[#e5e1d8] flex items-center justify-center relative group">
            {/* Replace the src with your actual image later */}
            <img src="/images/SantiagoCrepsac_Soledad.jpg" alt="Promo" className="w-full h-full object-cover" />
            {/* <span className="text-[#2c271d]/40 font-medium tracking-widest uppercase">
              Promo Image Placeholder
            </span> */}

            {/* Audio Toggle Button overlayed on image */}
            <button
              onClick={toggleAudio}
              className="absolute bottom-4 right-4 p-3 bg-[#2c271d] text-[#f9f6f0] rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
              aria-label={isMuted ? "Unmute and play sound" : "Mute sound"}
            >
              {isMuted ? <FaVolumeMute className="w-5 h-5" /> : <FaVolumeUp className="w-5 h-5" />}
            </button>
          </div>

          {/* Text Area */}
          <div className="p-6 text-center flex flex-col items-center">
            <h3 className={`text-4xl font-bold text-[#2c271d] mb-2 tracking-wider ${amaticSC.className}`}>
              Escucha Soledad ahora!
            </h3>
            <p className="text-[#2c271d]/70 text-sm font-medium mb-6">
              Escucha un adelanto exclusivo de mi nuevo sencillo. ¡No te lo pierdas!
            </p>
            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#2c271d] hover:bg-[#1a1711] text-[#f9f6f0] rounded-lg font-bold tracking-widest uppercase text-sm transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Hidden Audio Element */}
        {/* Replace the src with your actual audio file later */}
        <audio
          ref={audioRef}
          src="/audios/PromoSoledad.mp3"
          preload="auto"
          loop
        />
      </div>
    </div>
  );
}
