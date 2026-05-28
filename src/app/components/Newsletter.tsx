import { Mail } from 'lucide-react';

// Newsletter.tsx: seção de inscrição por email para receber novidades sobre vagas
export function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Receba novos estágios no seu email
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Cadastre-se e seja o primeiro a saber sobre oportunidades de estágio na sua área
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-6 py-4 rounded-lg outline-none text-gray-900 placeholder:text-gray-400"
            />
            <button className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold">
              Inscrever-se
            </button>
          </div>
          
          <p className="text-sm text-blue-100 mt-4">
            Sem spam. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}
