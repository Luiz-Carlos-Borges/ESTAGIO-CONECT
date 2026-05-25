export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  logo: string;
  tags: string[];
  featured: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyInfo: {
    description: string;
    size: string;
    founded: string;
    website: string;
  };
  stats: {
    applicants: number;
    deadline: string;
    views: number;
  };
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Estágio em Desenvolvimento Web',
    company: 'TechCorp Brasil',
    location: 'São Paulo, SP',
    type: 'Presencial',
    salary: 'R$ 1.500 - R$ 2.000',
    posted: 'Há 2 dias',
    logo: '💻',
    tags: ['React', 'JavaScript', 'HTML/CSS'],
    featured: true,
    description: 'Buscamos um estudante com vontade de aprender e participar do desenvolvimento de soluções web modernas. Você trabalhará em equipe em projetos reais e terá contato com o ciclo completo de desenvolvimento.',
    responsibilities: [
      'Desenvolver interfaces web responsivas usando React.',
      'Auxiliar na manutenção de aplicações existentes.',
      'Participar de reuniões de planejamento e code review.',
      'Testar e documentar funcionalidades novas.'
    ],
    requirements: [
      'Cursando Ciência da Computação, Engenharia de Software ou áreas afins.',
      'Conhecimentos básicos em HTML, CSS e JavaScript.',
      'Desejo de aprender React e ferramentas modernas.',
      'Boa comunicação e trabalho em equipe.'
    ],
    benefits: [
      'Auxílio transporte.',
      'Vale refeição.',
      'Horário flexível.',
      'Certificado de estágio.',
      'Treinamentos técnicos.'
    ],
    companyInfo: {
      description: 'A TechCorp Brasil é uma empresa focada em soluções digitais para negócios. Trabalhamos com tecnologia e inovação para criar produtos de impacto.',
      size: '51-200 funcionários',
      founded: '2018',
      website: 'www.techcorp.com.br'
    },
    stats: {
      applicants: 47,
      deadline: '15 dias restantes',
      views: 234
    }
  },
  {
    id: 2,
    title: 'Estágio em Design UI/UX',
    company: 'Creative Studio',
    location: 'Rio de Janeiro, RJ',
    type: 'Híbrido',
    salary: 'R$ 1.200 - R$ 1.800',
    posted: 'Há 1 dia',
    logo: '🎨',
    tags: ['Figma', 'Photoshop', 'UI Design'],
    featured: true,
    description: 'Estamos à procura de um estagiário de design para ajudar na criação de interfaces elegantes e experiências intuitivas. Você fará parte do processo criativo do conceito ao protótipo.',
    responsibilities: [
      'Criar layouts e protótipos de interfaces em Figma.',
      'Apoiar a equipe de UX em testes de usabilidade.',
      'Colaborar com desenvolvedores para implementação de designs.',
      'Ajustar conceitos visuais com base em feedback.'
    ],
    requirements: [
      'Cursando Design, Publicidade e Propaganda ou áreas correlatas.',
      'Noções de design de interface e experiência do usuário.',
      'Conhecimento em Figma ou Sketch.',
      'Olhar atento aos detalhes e criatividade.'
    ],
    benefits: [
      'Auxílio transporte.',
      'Vale refeição.',
      'Ambiente criativo.',
      'Acesso a workshops de design.',
      'Feedback constante de profissionais experientes.'
    ],
    companyInfo: {
      description: 'Creative Studio desenvolve experiências digitais e identidades visuais para marcas que querem se destacar no mercado. Nosso time é formado por designers e estrategistas apaixonados.',
      size: '21-50 funcionários',
      founded: '2020',
      website: 'www.creativestudio.com.br'
    },
    stats: {
      applicants: 32,
      deadline: '10 dias restantes',
      views: 189
    }
  },
  {
    id: 3,
    title: 'Estágio em Marketing Digital',
    company: 'Marketing Pro',
    location: 'Belo Horizonte, MG',
    type: 'Remoto',
    salary: 'R$ 1.000 - R$ 1.500',
    posted: 'Há 3 dias',
    logo: '📊',
    tags: ['Redes Sociais', 'Google Ads', 'Conteúdo'],
    featured: false,
    description: 'Se você gosta de redes sociais, produção de conteúdo e métricas, esse estágio é para você. Atuará na criação de campanhas e análise de resultados para melhorar a performance digital.',
    responsibilities: [
      'Apoiar na criação e publicação de conteúdos para redes sociais.',
      'Auxiliar no planejamento de campanhas de marketing.',
      'Acompanhar métricas e elaborar relatórios simples.',
      'Participar de brainstorms e reuniões estratégicas.'
    ],
    requirements: [
      'Cursando Publicidade, Marketing ou Comunicação Social.',
      'Interesse por mídias digitais e marketing de conteúdo.',
      'Conhecimento básico de ferramentas de analytics.',
      'Boa redação e organização.'
    ],
    benefits: [
      'Home office parcial.',
      'Vale refeição.',
      'Acesso a cursos de marketing digital.',
      'Horário flexível.',
      'Mentoria com especialistas.'
    ],
    companyInfo: {
      description: 'Marketing Pro ajuda marcas a crescer por meio de estratégias digitais bem planejadas. Nossa equipe cria campanhas que geram resultados mensuráveis.',
      size: '31-100 funcionários',
      founded: '2016',
      website: 'www.marketingpro.com.br'
    },
    stats: {
      applicants: 58,
      deadline: '7 dias restantes',
      views: 310
    }
  },
  {
    id: 4,
    title: 'Estágio em Administração',
    company: 'Consultoria Empresarial',
    location: 'Curitiba, PR',
    type: 'Presencial',
    salary: 'R$ 1.300 - R$ 1.700',
    posted: 'Há 4 dias',
    logo: '📈',
    tags: ['Excel', 'Gestão', 'Processos'],
    featured: false,
    description: 'Buscamos um estagiário para apoiar rotinas administrativas e processos internos. Você terá contato com gestão financeira, controle de documentos e suporte à equipe administrativa.',
    responsibilities: [
      'Auxiliar no controle de documentos e planilhas.',
      'Apoiar processos internos de gestão.',
      'Atender e direcionar solicitações de colaboradores.',
      'Participar da organização de reuniões e relatórios.'
    ],
    requirements: [
      'Cursando Administração, Ciências Contábeis ou áreas similares.',
      'Conhecimento em Excel básico/intermediário.',
      'Organização e atenção aos detalhes.',
      'Boa comunicação.',
    ],
    benefits: [
      'Auxílio transporte.',
      'Vale refeição.',
      'Ambiente profissional.',
      'Possibilidade de efetivação.',
      'Aprendizado em rotinas administrativas.'
    ],
    companyInfo: {
      description: 'Consultoria Empresarial oferece soluções de gestão e apoio administrativo para empresas de pequeno e médio porte. Nosso foco é eficiência e melhoria contínua.',
      size: '51-200 funcionários',
      founded: '2014',
      website: 'www.consultoriaempresarial.com.br'
    },
    stats: {
      applicants: 24,
      deadline: '12 dias restantes',
      views: 142
    }
  },
  {
    id: 5,
    title: 'Estágio em Recursos Humanos',
    company: 'RH Soluções',
    location: 'Porto Alegre, RS',
    type: 'Híbrido',
    salary: 'R$ 1.200 - R$ 1.600',
    posted: 'Há 1 dia',
    logo: '👥',
    tags: ['Recrutamento', 'Treinamento', 'People'],
    featured: true,
    description: 'Apoie a área de RH em atividades de recrutamento, onboarding e suporte aos colaboradores. Ótima oportunidade para quem deseja conhecer o funcionamento de uma área de people em profundidade.',
    responsibilities: [
      'Apoiar processos de recrutamento e seleção.',
      'Acompanhar onboarding de novos colaboradores.',
      'Auxiliar em treinamentos e atividades de desenvolvimento.',
      'Organizar documentação de RH e feedbacks.'
    ],
    requirements: [
      'Cursando Psicologia, Administração ou Recursos Humanos.',
      'Interesse em gestão de pessoas.',
      'Boa comunicação e empatia.',
      'Organização e sigilo profissional.'
    ],
    benefits: [
      'Vale refeição.',
      'Horário flexível.',
      'Acesso a workshops de RH.',
      'Ambiente colaborativo.',
      'Oportunidade de crescimento na área.'
    ],
    companyInfo: {
      description: 'RH Soluções é especializada em consultoria de gestão de pessoas, treinamento e desenvolvimento. Acreditamos em processos humanos e eficientes.',
      size: '21-50 funcionários',
      founded: '2019',
      website: 'www.rhsolucoes.com.br'
    },
    stats: {
      applicants: 29,
      deadline: '8 dias restantes',
      views: 176
    }
  },
  {
    id: 6,
    title: 'Estágio em Engenharia',
    company: 'Engenharia Inovadora',
    location: 'Florianópolis, SC',
    type: 'Presencial',
    salary: 'R$ 1.800 - R$ 2.200',
    posted: 'Há 2 dias',
    logo: '⚙️',
    tags: ['AutoCAD', 'Projetos', 'Análise'],
    featured: false,
    description: 'Participe do desenvolvimento de projetos de engenharia e suporte técnico em um ambiente colaborativo. Ideal para estudantes que querem vivenciar etapas de projeto e análise de soluções.',
    responsibilities: [
      'Auxiliar na elaboração de desenhos técnicos.',
      'Apoiar a equipe em análise de projetos.',
      'Participar de reuniões técnicas e visitas de obra.',
      'Organizar documentação de engenharia.'
    ],
    requirements: [
      'Cursando Engenharia Civil, Engenharia de Produção ou áreas similares.',
      'Conhecimento básico em AutoCAD ou similar.',
      'Interesse em projetos e processos técnicos.',
      'Proatividade e atenção aos detalhes.'
    ],
    benefits: [
      'Auxílio transporte.',
      'Vale refeição.',
      'Treinamentos técnicos.',
      'Ambiente de aprendizagem.',
      'Possibilidade de efetivação.'
    ],
    companyInfo: {
      description: 'Engenharia Inovadora atua no desenvolvimento de projetos sustentáveis e eficientes. Nossa equipe busca soluções inteligentes para desafios reais.',
      size: '31-100 funcionários',
      founded: '2017',
      website: 'www.engenhariainovadora.com.br'
    },
    stats: {
      applicants: 37,
      deadline: '11 dias restantes',
      views: 205
    }
  }
];
