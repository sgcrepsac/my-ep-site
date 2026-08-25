"use client";

import EPCoverExplorer from "@/components/EPCoverExplorer";

export default function ArtePage() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-8 px-4">
      <div className="w-full flex flex-col items-center justify-center focus:outline-none">
        <EPCoverExplorer />
      </div>
    </div>
  );
}
