import { Amatic_SC, Quicksand } from "next/font/google";

const amaticSC = Amatic_SC({ weight: "700", subsets: ["latin"] });
const quicksand = Quicksand({ weight: ["400", "500", "600"], subsets: ["latin"] });

export default function BioPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pt-12 px-4 pb-12">

      {/* Title */}
      <h1 className={`text-5xl sm:text-6xl font-bold mb-8 text-[#2c271d] drop-shadow-sm tracking-wide text-center lg:text-left ${amaticSC.className}`}>
        Biografía
      </h1>

      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-12">

        {/* Left Column: Text */}
        <div className="w-full lg:w-1/2 flex justify-start">
          <div className={`bg-white/40 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl text-[#2c271d] border border-[#2c271d]/10 leading-relaxed text-lg md:text-xl w-full font-medium ${quicksand.className}`}>
            <p className="mb-6">
              Santiago Crepsac es un cantautor venezolano radicado en Buenos Aires, para el cual la música siempre ha sido el refugio y el canal de comunicación más sincero. Desde que su proyecto tomó forma en la capital argentina —donde reside desde hace ocho años—, su propuesta busca honrar sus raíces e integrarlas en una sonoridad propia.
            </p>
            <p className="mb-6">
              Guiado por la guitarra y el piano, se mueve dentro de un universo indie caracterizado por la honestidad compositiva, explorando en sus letras tanto los pensamientos más introspectivos como los rincones más libres de su creatividad. Influenciado por la atemporalidad de The Beatles y la poesía de cantautores como Jorge Drexler y Silvio Rodríguez, su trabajo busca ofrecer una compañía genuina a través de la canción.
            </p>
            <p>
              Tras comenzar a escribir su propio material en 2023 y dar el salto a los escenarios en 2025, el artista se prepara para el lanzamiento de su primer EP, Reflexiones I, un trabajo cargado de emoción e intimidad.          </p>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[28rem] aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl border border-[#2c271d]/10 group">
            <img
              src="/images/BioImage.jpeg"
              alt="Santiago Crepsac Bio"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#2c271d]/0 group-hover:bg-[#2c271d]/10 transition-colors duration-500" />
          </div>
        </div>

      </div>
    </div>
  );
}