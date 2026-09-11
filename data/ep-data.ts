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
    creditsImage?: string;
    image: string;
    movingImage?: string;
    lyricsFile?: string;
    lyricsPdf?: string;
    released: boolean;
    releaseDate?: string;
}

export const EP_DATA = {
    mainCover: "/images/SantiagoCrepsac_Reflexiones1_ThreeReleases.jpg",
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
            creditsImage: "/credits/Creditos_Catarata-02.jpg",
            image: "/images/SantiagoCrepsac_Cataratas.jpg",
            movingImage: "/movingImages/Cataratas_GIF.mp4",
            lyricsFile: "/lyrics/Catarata.md",
            lyricsPdf: "/lyrics/CatarataLetra.pdf",
            released: true
        },
        {
            id: "song-2",
            title: "¿A dónde van?",
            hotspot: { top: 1, left: 45, width: 9, height: 27, rotate: 49, borderRadius: "10px" },
            spotify: "https://open.spotify.com/track/1jbSQq4uiXqA8M0J1WPhui?si=81962c8da90e46e6",
            youtube: "https://youtu.be/Qnl90ntOlz4?si=4ZcXZy-Y6YGIkXhR",
            appleMusic: "https://music.apple.com/ar/song/a-d%C3%B3nde-van/6801283659",
            deezer: "https://link.deezer.com/s/34i4zoYJvro1d0Oy05rlw",
            creditsFile: "/credits/adondevan-credits.md",
            creditsImage: "/credits/Creditos_notAvailable.jpg",
            image: "/images/SantiagoCrepsac_ADondeVan.jpg",
            movingImage: "/movingImages/ADondeVan_GIF.mp4",
            lyricsFile: "/lyrics/A dónde van.md",
            lyricsPdf: "/lyrics/ADondeVanLetra.pdf",
            released: true
        },
        {
            id: "song-3",
            title: "Soledad",
            hotspot: { top: 40, left: 55, width: 12.5, height: 6, borderRadius: "50%" },
            spotify: "https://open.spotify.com/track/7BLqWPpIM1XyFaIiYgso7t?si=69efcb3dcd194021",
            youtube: "https://youtu.be/kPK6y1prk-M?si=7YOaupbN78vT-4A0",
            appleMusic: "https://music.apple.com/ar/song/soledad/6801318732",
            deezer: "https://link.deezer.com/s/34mZ7LeUjk7u7Iq1HWDat",
            creditsFile: "/credits/soledad-credits.md",
            creditsImage: "/credits/Creditos_notAvailable.jpg",
            image: "/images/SantiagoCrepsac_Soledad.jpg",
            movingImage: "/movingImages/Soledad_GIF.mp4",
            lyricsFile: "/lyrics/Soledad.md",
            lyricsPdf: "/lyrics/SoledadLetra.pdf",
            released: true
        },
        {
            id: "song-1",
            title: "Desesperación",
            hotspot: { top: 41, left: 37, width: 5, height: 5.5, borderRadius: "50%" },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/desesperacion-credits.md",
            image: "/images/SantiagoCrepsac_Desesperacion.jpg",
            movingImage: "/movingImages/Desesperacion_GIF.mp4",
            lyricsFile: "/lyrics/Desesperación.md",
            lyricsPdf: "/lyrics/DesesperacionLetra.pdf",
            released: false,
            releaseDate: "16/09/2026"
        }
    ] as Song[]
};