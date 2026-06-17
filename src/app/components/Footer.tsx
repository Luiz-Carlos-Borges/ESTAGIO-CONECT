import { Search, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

// Footer.tsx: rodapé com links de navegação e redes sociais
export function Footer() {
  return (
    <footer id="site-footer" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EstágioConnect</span>
            </div>
            <p className="text-gray-400 mb-6">
              Conectando estudantes universitários com as melhores oportunidades de estágio. Comece sua jornada profissional aqui.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Para Estudantes</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition">Buscar Estágios</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Criar Currículo</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Alertas de Estágio</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Dicas de Carreira</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Para Empresas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition">Publicar Estágio</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Planos e Preços</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Buscar Candidatos</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Recursos</a></li>
              <li><a href="#" className="hover:text-blue-500 transition">Blog para RH</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition">Sobre Nós</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 EstágioConnect. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-500 transition">Termos de Uso</a>
              <a href="#" className="hover:text-blue-500 transition">Política de Privacidade</a>
              <a href="#" className="hover:text-blue-500 transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
