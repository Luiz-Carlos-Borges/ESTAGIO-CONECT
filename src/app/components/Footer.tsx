import { Search, Facebook, Twitter, Instagram, Linkedin, Youtube, X } from 'lucide-react';
import { useState } from 'react';

// Footer.tsx: rodapé com links de navegação, redes sociais e modais institucionais
type ModalKey =
  | 'sobre-nos' | 'buscar-estagios' | 'criar-curriculo' | 'alertas' | 'dicas' | 'blog'
  | 'publicar' | 'planos' | 'buscar-candidatos' | 'recursos' | 'blog-rh'
  | 'termos' | 'privacidade' | 'cookies';

const MODAL_CONTENT: Record<ModalKey, { title: string; content: string }> = {
  'sobre-nos': {
    title: 'Sobre Nós',
    content: 'O EstágioConnect nasceu com a missão de aproximar estudantes universitários das melhores oportunidades de estágio do mercado. Acreditamos que o primeiro passo na carreira é fundamental e queremos torná-lo mais fácil, rápido e acessível para todos.',
  },
  'buscar-estagios': {
    title: 'Buscar Estágios',
    content: 'Encontre vagas de estágio nas melhores empresas do Brasil. Filtre por área, cidade, período e muito mais. Nossa plataforma é atualizada diariamente com novas oportunidades.',
  },
  'criar-curriculo': {
    title: 'Criar Currículo',
    content: 'Em breve você poderá montar seu currículo profissional diretamente na plataforma, com dicas personalizadas para cada área. Fique de olho nas novidades!',
  },
  'alertas': {
    title: 'Alertas de Estágio',
    content: 'Cadastre alertas para receber notificações assim que surgirem vagas no seu perfil. Configure por área, cidade ou empresa e nunca perca uma oportunidade.',
  },
  'dicas': {
    title: 'Dicas de Carreira',
    content: 'Acesse conteúdos exclusivos sobre como se preparar para processos seletivos, montar um currículo atraente, se destacar em entrevistas e muito mais.',
  },
  'blog': {
    title: 'Blog',
    content: 'No nosso blog você encontra artigos, histórias de sucesso e tendências do mercado de estágios. Novos conteúdos toda semana!',
  },
  'publicar': {
    title: 'Publicar Estágio',
    content: 'Empresas parceiras podem publicar vagas de estágio de forma rápida e simples. Alcance milhares de candidatos qualificados em todo o Brasil.',
  },
  'planos': {
    title: 'Planos e Preços',
    content: 'Oferecemos planos flexíveis para empresas de todos os portes. Desde o plano gratuito para experimentar até planos premium com recursos avançados de triagem e gestão.',
  },
  'buscar-candidatos': {
    title: 'Buscar Candidatos',
    content: 'Acesse nosso banco de talentos e encontre o candidato ideal para sua vaga. Filtre por curso, período, habilidades e localização.',
  },
  'recursos': {
    title: 'Recursos para Empresas',
    content: 'Ferramentas de triagem automática, gestão de candidaturas, comunicação com candidatos e relatórios de processo seletivo — tudo em um só lugar.',
  },
  'blog-rh': {
    title: 'Blog para RH',
    content: 'Conteúdo especializado para profissionais de Recursos Humanos: como atrair estagiários, boas práticas de onboarding, tendências de recrutamento e muito mais.',
  },
  'termos': {
    title: 'Termos de Uso',
    content: 'Ao utilizar o EstágioConnect, você concorda com os nossos Termos de Uso. Este documento descreve as regras de utilização da plataforma, responsabilidades dos usuários e diretrizes de conduta. O conteúdo completo estará disponível em breve.',
  },
  'privacidade': {
    title: 'Política de Privacidade',
    content: 'Levamos sua privacidade a sério. Nossa Política de Privacidade descreve como coletamos, usamos e protegemos seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD). O documento completo estará disponível em breve.',
  },
  'cookies': {
    title: 'Política de Cookies',
    content: 'Utilizamos cookies para melhorar sua experiência na plataforma. Cookies essenciais garantem o funcionamento básico do site. Cookies de análise nos ajudam a entender como os usuários interagem com a plataforma. Você pode gerenciar suas preferências a qualquer momento.',
  },
};

export function Footer() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

  const open = (key: ModalKey) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenModal(key);
  };

  const close = () => setOpenModal(null);

  const modal = openModal ? MODAL_CONTENT[openModal] : null;

  return (
    <>
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
                <li><a href="#" onClick={open('buscar-estagios')} className="hover:text-blue-400 transition">Buscar Estágios</a></li>
                <li><a href="#" onClick={open('criar-curriculo')} className="hover:text-blue-400 transition">Criar Currículo</a></li>
                <li><a href="#" onClick={open('alertas')} className="hover:text-blue-400 transition">Alertas de Estágio</a></li>
                <li><a href="#" onClick={open('dicas')} className="hover:text-blue-400 transition">Dicas de Carreira</a></li>
                <li><a href="#" onClick={open('blog')} className="hover:text-blue-400 transition">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Para Empresas</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={open('publicar')} className="hover:text-blue-400 transition">Publicar Estágio</a></li>
                <li><a href="#" onClick={open('planos')} className="hover:text-blue-400 transition">Planos e Preços</a></li>
                <li><a href="#" onClick={open('buscar-candidatos')} className="hover:text-blue-400 transition">Buscar Candidatos</a></li>
                <li><a href="#" onClick={open('recursos')} className="hover:text-blue-400 transition">Recursos</a></li>
                <li><a href="#" onClick={open('blog-rh')} className="hover:text-blue-400 transition">Blog para RH</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Sobre</h3>
              <ul className="space-y-2">
                <li><a href="#" onClick={open('sobre-nos')} className="hover:text-blue-400 transition">Sobre Nós</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2026 EstágioConnect. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" onClick={open('termos')} className="hover:text-blue-400 transition">Termos de Uso</a>
                <a href="#" onClick={open('privacidade')} className="hover:text-blue-400 transition">Política de Privacidade</a>
                <a href="#" onClick={open('cookies')} className="hover:text-blue-400 transition">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal institucional */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={close}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{modal.title}</h2>
              <button
                type="button"
                onClick={close}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-8 py-6">
              <p className="text-gray-600 leading-relaxed">{modal.content}</p>
            </div>
            <div className="px-8 pb-8">
              <button
                type="button"
                onClick={close}
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
