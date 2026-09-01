"use client";

import { useState, useEffect } from "react";
import { Amatic_SC } from "next/font/google";
import { FaYoutube, FaSpotify, FaInstagram, FaBars, FaTimes, FaApple, FaDeezer } from "react-icons/fa";

const amaticSC = Amatic_SC({ weight: "700", subsets: ["latin"] });

export default function Header() {
  const [activeSection, setActiveSection] = useState("Inicio");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Inicio", id: "Inicio" },
    { name: "Bio", id: "Bio" },
    { name: "Música", id: "Discografia" },
    { name: "Arte", id: "Arte" },
    { name: "Fotos", id: "Fotos" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else if (id === "Inicio") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#f9f6f0]/80 border-b border-[#2c271d]/10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#Inicio" onClick={(e) => handleLinkClick(e, 'Inicio')} className={`font-bold text-3xl text-[#2c271d] tracking-wider uppercase ${amaticSC.className}`}>
          Santiago Crepsac
        </a>
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-lg tracking-widest uppercase transition-colors duration-300 ${amaticSC.className} ${isActive
                    ? "text-[#C2B280] font-bold"
                    : "text-[#2c271d]/70 hover:text-[#2c271d]"
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center gap-4 border-l border-[#2c271d]/20 pl-6">
            <a href="https://open.spotify.com/artist/4vCt0v0K3dtK8L8VJ61vbm?si=Z93mb9wTQyOsNwwk-rvR7Q" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#1db954] transition-colors" aria-label="Spotify">
              <FaSpotify className="w-5 h-5" />
            </a>
            <a href="http://www.youtube.com/@SantiagoCrepsac" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="https://music.apple.com/ar/artist/santiago-crepsac/6797105457" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#ff4d61] transition-colors" aria-label="Apple Music">
              <FaApple className="w-5 h-5 mb-0.5" />
            </a>
            <a href="https://link.deezer.com/s/347MdjtFcAMwbrQg4PRJ7" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#000000] transition-colors" aria-label="Deezer">
              <FaDeezer className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/santigcrepsac" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#e1306c] transition-colors" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#2c271d]/80 hover:text-[#2c271d] p-2 transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#f9f6f0]/95 backdrop-blur-xl border-b border-[#2c271d]/10 shadow-lg flex flex-col pt-4 pb-8 px-6 overflow-hidden origin-top animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-6 items-center">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-xl tracking-widest uppercase transition-colors duration-300 ${amaticSC.className} ${isActive
                    ? "text-[#C2B280] font-bold"
                    : "text-[#2c271d]/70 hover:text-[#2c271d]"
                    }`}
                >
                  {link.name}
                </a>
              );
            })}

            <div className="flex items-center gap-6 mt-4 pt-6 border-t border-[#2c271d]/10 w-full justify-center flex-wrap">
              <a href="https://open.spotify.com/artist/4vCt0v0K3dtK8L8VJ61vbm?si=Z93mb9wTQyOsNwwk-rvR7Q" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#1db954] transition-colors" aria-label="Spotify">
                <FaSpotify className="w-6 h-6" />
              </a>
              <a href="http://www.youtube.com/@SantiagoCrepsac" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="https://music.apple.com/ar/artist/santiago-crepsac/6797105457" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#ff4d61] transition-colors" aria-label="Apple Music">
                <FaApple className="w-6 h-6 mb-0.5" />
              </a>
              <a href="https://link.deezer.com/s/347MdjtFcAMwbrQg4PRJ7" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#000000] transition-colors" aria-label="Deezer">
                <FaDeezer className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/santigcrepsac" target="_blank" rel="noopener noreferrer" className="text-[#2c271d]/70 hover:text-[#e1306c] transition-colors" aria-label="Instagram">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
