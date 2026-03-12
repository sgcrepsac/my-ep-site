export interface Song {
    id: string;
    title: string;
    hotspot: { top: number; left: number; width: number; height: number };
    spotify: string;
    youtube: string;
    description: string;
}

export const EP_DATA = {
    mainCover: "/images/EP-Temporal.png",
    songs: [
        {
            id: "song-1",
            title: "Desesperacion",
            hotspot: {top: 4, left: 15, width: 36, height: 19},
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            description: "boludeces"
        },

        {
            id: "song-2",
            title: "A donde van",
            hotspot: {top: 4, left: 51, width: 36, height: 19},
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            description: "boludeces"
        },

        {
            id: "song-3",
            title: "Soledad",
            hotspot: {top: 23, left: 15, width: 36, height: 19},
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            description: "boludeces"
        },

        {
            id: "song-4",
            title: "Catarata",
            hotspot: {top: 23, left: 51, width: 36, height: 19},
            spotify: "https://open.spotify.com/...",
            youtube: "https://youtube.com/...",
            description: "boludeces"
        }
    ] as Song[]
};