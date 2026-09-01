"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa";

export default function FotosGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fotos")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load photos", err);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[#2c271d]/50" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full text-center py-20 text-[#2c271d]/60 font-medium">
        No hay fotos disponibles.
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-3xl mx-auto flex flex-col items-center">
      <div className="relative w-full aspect-[3/2] sm:aspect-[16/9] overflow-hidden rounded-xl bg-transparent">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={`/images/Fotos/${images[currentIndex]}`}
            alt={`Foto ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Previous photo"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Next photo"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-6 overflow-x-auto max-w-full pb-2 px-2 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "ring-2 ring-[#8a7342] opacity-100 scale-105"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={`/images/Fotos/${img}`}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
