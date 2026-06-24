import { X } from 'lucide-react';

// PolicyModal.tsx: modal reutilizável para exibir conteúdo institucional de políticas
export type PolicyType = 'termos' | 'privacidade' | 'lgpd' | 'cookies' | 'sobre' | 'ajuda' | 'contato';

const CONTENT: Record<PolicyType, { title: string; body: string }> = {
  termos: {
    title: 'Termos de Uso',
    body: 'Ao utilizar o EstágioConnect, você concorda com os nossos Termos de Uso. Este documento descreve as regras de utilização da plataforma, as responsabilidades dos usuários e as diretrizes de conduta. O conteúdo completo estará disponível em breve.',
  },
  privacidade: {
    title: 'Política de Privacidade',
    body: 'Levamos sua privacidade a sério. Nossa Política de Privacidade descreve como coletamos, usamos e protegemos seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (LGPD). O documento completo estará disponível em breve.',
  },
  lgpd: {
    title: 'LGPD — Lei Geral de Proteção de Dados',
    body: 'A Lei nº 13.709/2018 (LGPD) regula o tratamento de dados pessoais no Brasil. Ao utilizar o EstágioConnect, seus dados são coletados e processados exclusivamente para fins de processo seletivo, com base no seu consentimento. Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento através do nosso suporte.',
  },
  cookies: {
    title: 'Política de Cookies',
    body: 'Utilizamos cookies para melhorar sua experiência na plataforma. Cookies essenciais garantem o funcionamento básico do site. Cookies de análise nos ajudam a entender como os usuários interagem com a plataforma. Você pode gerenciar suas preferências a qualquer momento.',
  },
  sobre: {
    title: 'Sobre Nós',
    body: 'O EstágioConnect nasceu com a missão de aproximar estudantes universitários das melhores oportunidades de estágio do mercado. Acreditamos que o primeiro passo na carreira é fundamental e queremos torná-lo mais fácil, rápido e acessível para todos.',
  },
  ajuda: {
    title: 'Central de Ajuda',
    body: 'Precisa de suporte? Nossa equipe está disponível para ajudar com dúvidas sobre cadastro, candidaturas, publicação de vagas e muito mais. Em breve disponibilizaremos nossa central de ajuda completa com artigos e tutoriais.',
  },
  contato: {
    title: 'Contato',
    body: 'Entre em contato com a equipe EstágioConnect. Seja para dúvidas, sugestões ou parcerias, estamos sempre abertos a conversar. Nossa central de atendimento estará disponível em breve.',
  },
};

interface PolicyModalProps {
  type: PolicyType;
  onClose: () => void;
}

export function PolicyModal({ type, onClose }: PolicyModalProps) {
  const { title, body } = CONTENT[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-8 py-6">
          <p className="text-gray-600 leading-relaxed">{body}</p>
        </div>
        <div className="px-8 pb-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
