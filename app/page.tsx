import EPCoverExplorer from "@/components/EPCoverExplorer";
import EPCoverTemporal from "@/components/EPCoverTemporal"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2x1 font-bold mb-8 uppercase tracking-widest">
          .
        </h1>

        <EPCoverTemporal /> 
        {/*<EPCoverExplorer /> */}

        <footer className="mt-12 opacity-50 text-sm">
          © 2026 Crepsac
        </footer>
    </main>
  );
}

