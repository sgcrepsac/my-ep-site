"use client";
import { motion } from "framer-motion";

export default function Home() {
  const text = "CREPSAC";
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center pt-24 min-h-[60vh] overflow-hidden">
      <motion.div
        className="flex overflow-hidden pb-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            variants={child}
            key={index}
            className="font-playfair text-[5rem] sm:text-8xl md:text-9xl font-bold text-[#1a1a1a] drop-shadow-2xl tracking-widest uppercase inline-block mx-px selection:bg-[#C2B280] selection:text-white"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
        className="mt-6 text-[#2c271d]/70 font-serif text-lg md:text-2xl tracking-[0.4em] uppercase"
      >
        Santiago
      </motion.div>
    </div>
  );
}

