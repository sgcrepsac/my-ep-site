import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Amatic_SC } from "next/font/google";
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

const amaticSC = Amatic_SC({
  variable: "--font-amatic",
  weight: ["400", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${amaticSC.variable} antialiased min-h-screen flex flex-col`}
        style={{
          backgroundColor: '#f9f6f0',
          backgroundImage: `url("/images/background.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <Header />
        <main className="flex-grow w-full flex flex-col p-4 text-[#2c271d]">
          {children}
        </main>
        <footer className="w-full bg-[#f9f6f0]/80 text-[#2c271d]/70 py-6 mt-auto border-t border-[#2c271d]/10 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm font-medium tracking-wider">
            Copyright © 2026, Santiago Crepsac
          </div>
        </footer>
      </body>
    </html>
  );
}
