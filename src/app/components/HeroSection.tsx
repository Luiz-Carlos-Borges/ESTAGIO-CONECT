import { Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Comece sua carreira com o estágio ideal
            </h1>
            <p className="text-lg text-gray-600">
              Conectamos estudantes universitários às melhores oportunidades de estágio. 
              Dê o primeiro passo na sua jornada profissional.
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Área de estágio"
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                <span>Buscar Estágios</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Áreas populares:</span>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
                Tecnologia
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
                Marketing
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
                Design
              </button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-600 hover:text-blue-600 transition">
                Administração
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1587614203976-365c74645e83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvcmtpbmd8ZW58MXx8fHwxNzcyMDI0Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Profissional trabalhando"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
