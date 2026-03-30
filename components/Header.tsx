"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaYoutube, FaSpotify, FaInstagram, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Bio", path: "/bio" },
    { name: "Música", path: "/musica" },
    { name: "Arte", path: "/arte" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#1a1a1a]/90 border-b border-white/10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-playfair font-bold text-xl text-[#C2B280] tracking-wider uppercase">
          Santiago Crepsac
        </Link>
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 ${isActive
                    ? "text-[#C2B280] font-semibold"
                    : "text-white/70 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center gap-4 border-l border-white/20 pl-6">
            <a href="https://youtube.com/@SantiagoGCrepsac" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#1db954] transition-colors" aria-label="Spotify">
              <FaSpotify className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/santigcrepsac" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#e1306c] transition-colors" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white/80 hover:text-white p-2 transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg flex flex-col pt-4 pb-8 px-6 overflow-hidden origin-top animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-6 items-center">
            {links.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg tracking-widest uppercase transition-colors duration-300 ${isActive
                    ? "text-[#C2B280] font-bold"
                    : "text-white/70 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="flex items-center gap-6 mt-4 pt-6 border-t border-white/10 w-1/2 justify-center">
              <a href="https://youtube.com/@SantiagoGCrepsac" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#1db954] transition-colors" aria-label="Spotify">
                <FaSpotify className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/santigcrepsac" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#e1306c] transition-colors" aria-label="Instagram">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
