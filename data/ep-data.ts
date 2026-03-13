export interface Song {
    id: string;
    title: string;
    hotspot: { top: number; left: number; width: number; height: number };
    spotify: string;
    youtube: string;
    creditsFile: string;
    image: string;
    lyricsFile?: string;
}

export const EP_DATA = {
    mainCover: "/images/EP-Template3.jpg",
    tempCover: "/images/EP-Temporal.png",
    songs: [
        {
            id: "song-1",
            title: "Desesperacion",
            hotspot: { top: 5, left: 49, width: 4, height: 3 },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/desesperacion-credits.md",
            image: "/images/desesperacion.jpg",
            lyricsFile: "/lyrics/Desesperación.md"
        },

        {
            id: "song-2",
            title: "A donde van",
            hotspot: { top: 5, left: 54, width: 4, height: 3 },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/adondevan-credits.md",
            image: "/images/A donde van.jpeg",
            lyricsFile: "/lyrics/A dónde van.md"
        },

        {
            id: "song-3",
            title: "Soledad",
            hotspot: { top: 9, left: 49, width: 4, height: 3 },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/soledad-credits.md",
            image: "/images/soledad.jpg",
            lyricsFile: "/lyrics/Soledad.md"
        },

        {
            id: "song-4",
            title: "Catarata",
            hotspot: { top: 9, left: 54, width: 4, height: 3 },
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            creditsFile: "/credits/catarata-credits.md",
            image: "/images/catarata.jpg",
            lyricsFile: "/lyrics/Catarata.md"
        }
    ] as Song[]
};