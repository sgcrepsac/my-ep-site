"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Bio", path: "/bio" },
    { name: "Música", path: "/musica" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#2c271d]/80 border-b border-[#C2B280]/20 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-playfair font-bold text-xl text-[#C2B280] tracking-wider uppercase">
          Santiago Crepsac
        </Link>
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
      </div>
    </header>
  );
}
