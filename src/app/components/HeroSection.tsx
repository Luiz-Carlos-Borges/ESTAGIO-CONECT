import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';

// HeroSection.tsx: seção inicial do site com título, descrição e busca de vagas
interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Envia o termo de busca para o App ao submeter o formulário
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

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
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-4 py-4 bg-gray-50 rounded-xl border border-gray-100">
                <Search className="w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Área de estágio"
                  className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Buscar Estágios</span>
              </button>
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
          </div>

        </div>

      </div>
    </section>
  );
}
