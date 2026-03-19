export default function BioPage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12 pt-12 px-4 pb-12">
      
      {/* Left Column: Image */}
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

      {/* Right Column: Text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-8 text-[#2c271d] drop-shadow-sm tracking-wide text-center lg:text-left">
          Biografía
        </h1>
        <div className="bg-white/40 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl text-[#2c271d] border border-[#2c271d]/10 leading-relaxed text-lg font-serif">
          <p className="mb-6">
            La música siempre ha sido mi refugio y mi forma más sincera de comunicarme. Soy un cantautor venezolano y, aunque desde hace ocho años Buenos Aires es mi hogar y el lugar donde mi proyecto cobró vida, en cada acorde busco honrar mis raíces y llevar el nombre de mi país a lo más alto.
          </p>
          <p className="mb-6">
            Acompañado siempre por mi guitarra y el piano, me muevo dentro del universo indie. Mis canciones nacen de la honestidad absoluta: compongo desde lo que siento, explorando desde mis pensamientos más oscuros hasta los rincones más libres de mi creatividad. Crecí escuchando la magia atemporal de Los Beatles y la poesía profunda de Jorge Drexler y Silvio Rodríguez. Mi mayor anhelo es que, al darle play a mi música, puedas sentir esa misma emoción y esa misma compañía que yo encontré en los artistas que me inspiran.
          </p>
          <p>
            Comencé a darle forma a mis propias letras en 2023, y en 2025 me animé a dar el salto a los escenarios para compartirlas en vivo. Hoy, toda esa energía está puesta en mi primer EP, Reflexiones I, que verá la luz a mediados de este año. Te invito a acompañarme en este viaje.
          </p>
        </div>
      </div>

    </div>
  );
}
