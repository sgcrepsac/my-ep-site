"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaYoutube, FaSpotify, FaInstagram } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Bio", path: "/bio" },
    { name: "Música", path: "/musica" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#1a1a1a]/90 border-b border-white/10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-playfair font-bold text-xl text-[#C2B280] tracking-wider uppercase">
          Santiago Crepsac
        </Link>
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6">
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
          <div className="flex items-center gap-4 border-l border-white/20 pl-6">
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
        </div>
      </div>
    </header>
  );
}
