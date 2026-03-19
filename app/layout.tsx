import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santiago Crepsac",
  description: "Official website for Santiago Crepsac",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}
        style={{
          backgroundColor: '#f9f6f0',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      >
        <Header />
        <main className="flex-grow w-full flex flex-col p-4 text-[#2c271d]">
          {children}
        </main>
        <footer className="w-full bg-[#1a1a1a]/90 text-white/70 py-6 mt-auto border-t border-white/10 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm font-medium tracking-wider">
            Copyright © 2026, Santiago Crepsac
          </div>
        </footer>
      </body>
    </html>
  );
}
