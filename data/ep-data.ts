export interface Song {
    id: string;
    title: string;
    hotspot: {
        top: number;
        left: number;
        width: number;
        height: number;
        rotate?: number;
        borderRadius?: string;
    };
    spotify: string;
    youtube: string;
    appleMusic?: string;
    deezer?: string;
    creditsFile: string;
    image: string;
    lyricsFile?: string;
    released: boolean;
    releaseDate?: string;
}

export const EP_DATA = {
    mainCover: "/images/SantiagoCrepsac_Reflexiones1.jpg",
    tempCover: "/images/EP-Temporal.png",
    songs: [
        {
            id: "song-4",
            title: "Catarata",
            hotspot: { top: 47.5, left: 41.3, width: 3.6, height: 5.5, borderRadius: "50%" },
            spotify: "https://open.spotify.com/track/5AX8aOwIVeuJE8QR1m22r0?si=28cf8a35e0db49af",
            youtube: "https://youtu.be/rbanT3aTG8E?si=1KEyJ5lgpG8DakRk",
            appleMusic: "https://music.apple.com/ar/album/catarata-single/6797176586",
            deezer: "https://link.deezer.com/s/347M5JobGpwXjGLPXVao3",
            creditsFile: "/credits/catarata-credits.md",
            image: "/images/SantiagoCrepsac_Cataratas.jpg",
            lyricsFile: "/lyrics/Catarata.md",
            released: true
        },
        {
            id: "song-2",
            title: "¿A dónde van?",
            hotspot: { top: 1, left: 45, width: 9, height: 27, rotate: 49, borderRadius: "10px" },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/adondevan-credits.md",
            image: "/images/SantiagoCrepsac_ADondeVan.jpg",
            lyricsFile: "/lyrics/A dónde van.md",
            released: false,
            releaseDate: "Coming Soon"
        },
        {
            id: "song-3",
            title: "Soledad",
            hotspot: { top: 40, left: 55, width: 12.5, height: 6, borderRadius: "50%" },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/soledad-credits.md",
            image: "/images/SantiagoCrepsac_Soledad.jpg",
            lyricsFile: "/lyrics/Soledad.md",
            released: false,
            releaseDate: "Coming Soon"
        },
        {
            id: "song-1",
            title: "Desesperación",
            hotspot: { top: 41, left: 37, width: 5, height: 5.5, borderRadius: "50%" },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/desesperacion-credits.md",
            image: "/images/SantiagoCrepsac_Desesperacion.jpg",
            lyricsFile: "/lyrics/Desesperación.md",
            released: false,
            releaseDate: "Coming Soon"
        }
    ] as Song[]
};