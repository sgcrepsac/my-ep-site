"use client";
import { motion } from "framer-motion";
import { Amatic_SC } from "next/font/google";

const amaticSC = Amatic_SC({ weight: "700", subsets: ["latin"] });

export default function Home() {
  const text = "SANTIAGO CREPSAC";
  const letters = Array.from(text);

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
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center pt-24 min-h-[60vh] overflow-hidden">
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
    </div>
  );
}

