import { Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Comece sua carreira com o estágio ideal
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Conectamos estudantes universitários às melhores oportunidades de estágio.
            Dê o primeiro passo na sua jornada profissional.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-2xl mx-auto space-y-4">
            
            <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 rounded-xl border border-gray-100">
              <Search className="w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Área de estágio"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <button className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              <span>Buscar Estágios</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-600">
              Áreas populares:
            </span>

            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
              Tecnologia
            </button>

            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
              Marketing
            </button>

            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
              Design
            </button>

            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
              Administração
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
