import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import knexLib from 'knex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data');

// Garante que a pasta de dados exista antes de criar o arquivo SQLite.
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = knexLib({
  client: 'sqlite3',
  connection: {
    filename: path.join(dataDir, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// Inicializa o banco de dados SQLite, criando tabelas se ainda não existirem.
// Também carrega dados de exemplo na primeira execução.
export async function initDatabase() {
  const hasUsers = await db.schema.hasTable('users');
  if (!hasUsers) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('passwordHash').notNullable();
      table.string('role').notNullable(); // 'candidate', 'company', 'admin'
      
      // Campos de CANDIDATO
      table.string('candidatePhone').nullable();
      table.string('candidateCity').nullable();
      table.string('candidateCourse').nullable();
      table.string('candidatePeriod').nullable();
      
      // Campos de EMPRESA
      table.string('companyName').nullable();
      table.string('companyPhone').nullable();
      table.text('companyAbout').nullable();
      table.string('website').nullable();
      
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  } else {
    // Verifica se as colunas já existem antes de tentar adicionar
    const hasPhoneColumn = await db.schema.hasColumn('users', 'candidatePhone');
    if (!hasPhoneColumn) {
      // Adiciona colunas de candidato se não existirem
      await db.schema.table('users', (table) => {
        table.string('candidatePhone').nullable();
        table.string('candidateCity').nullable();
        table.string('candidateCourse').nullable();
        table.string('candidatePeriod').nullable();
      });
    }
    
    const hasCompanyPhoneColumn = await db.schema.hasColumn('users', 'companyPhone');
    if (!hasCompanyPhoneColumn) {
      // Adiciona coluna de telefone de empresa se não existir
      await db.schema.table('users', (table) => {
        table.string('companyPhone').nullable();
      });
    }
  }

  const hasJobs = await db.schema.hasTable('jobs');
  if (!hasJobs) {
    await db.schema.createTable('jobs', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('company').notNullable();
      table.string('location').notNullable();
      table.string('type').notNullable();
      table.string('salary').notNullable();
      table.string('posted').notNullable();
      table.string('logo').notNullable();
      table.text('tags').notNullable();
      table.boolean('featured').notNullable().defaultTo(false);
      table.text('description').notNullable();
      table.text('responsibilities').notNullable();
      table.text('requirements').notNullable();
      table.text('benefits').notNullable();
      table.text('companyInfo').notNullable();
      table.text('stats').notNullable();
      table.integer('ownerId').nullable();
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  }

  const hasApplications = await db.schema.hasTable('applications');
  if (!hasApplications) {
    await db.schema.createTable('applications', (table) => {
      table.increments('id').primary();
      table.integer('jobId').notNullable();
      table.integer('userId').nullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('phone').notNullable();
      table.string('city').nullable();
      table.string('portfolio').nullable();
      table.string('linkedin').nullable();
      table.string('github').nullable();
      table.text('coverLetter').nullable();
      table.string('resumePath').notNullable();
      table.string('status').defaultTo('novo'); // 'novo', 'em-analise', 'aceito', 'rejeitado'
      table.timestamp('createdAt').defaultTo(db.fn.now());
    });
  } else {
    // Adiciona coluna status se não existir
    const hasStatusColumn = await db.schema.hasColumn('applications', 'status');
    if (!hasStatusColumn) {
      await db.schema.table('applications', (table) => {
        table.string('status').defaultTo('novo');
      });
    }
  }

  const existingJobs = await db('jobs').count('id as count').first();
  const seedCount = Number(existingJobs?.count ?? 0);
  if (seedCount === 0) {
    await seedInitialJobs();
  }
  
  // Faz o id:7 virar admin
  const user7 = await db('users').where({ id: 7 }).first();
  if (user7 && user7.role !== 'admin') {
    await db('users').where({ id: 7 }).update({ role: 'admin' });
    console.log('✓ Usuário id:7 atualizado para admin');
  }
}

// Insere vagas iniciais no banco para popular a aplicação na primeira execução.
async function seedInitialJobs() {
  const sampleJobs = [
    {
      title: 'Desenvolvimento Web',
      company: 'TechCorp Brasil',
      location: 'São Paulo, SP',
      type: 'Presencial',
      salary: 'R$ 1.500 - R$ 2.000',
      posted: 'Há 2 dias',
      logo: '💻',
      tags: JSON.stringify(['React', 'JavaScript', 'HTML/CSS']),
      featured: true,
      description:
        'Buscamos um estudante com vontade de aprender e participar do desenvolvimento de soluções web modernas. Você trabalhará em equipe em projetos reais e terá contato com o ciclo completo de desenvolvimento.',
      responsibilities: JSON.stringify([
        'Desenvolver interfaces web responsivas usando React.',
        'Auxiliar na manutenção de aplicações existentes.',
        'Participar de reuniões de planejamento e code review.',
        'Testar e documentar funcionalidades novas.',
      ]),
      requirements: JSON.stringify([
        'Cursando Ciência da Computação, Engenharia de Software ou áreas afins.',
        'Conhecimentos básicos em HTML, CSS e JavaScript.',
        'Desejo de aprender React e ferramentas modernas.',
        'Boa comunicação e trabalho em equipe.',
      ]),
      benefits: JSON.stringify([
        'Auxílio transporte.',
        'Vale refeição.',
        'Horário flexível.',
        'Certificado de estágio.',
        'Treinamentos técnicos.',
      ]),
      companyInfo: JSON.stringify({
        description:
          'A TechCorp Brasil é uma empresa focada em soluções digitais para negócios. Trabalhamos com tecnologia e inovação para criar produtos de impacto.',
        size: '51-200 funcionários',
        founded: '2018',
        website: 'www.techcorp.com.br',
      }),
      stats: JSON.stringify({ applicants: 47, deadline: '15 dias restantes', views: 234 }),
    },
    {
      title: 'Design UI/UX',
      company: 'Creative Studio',
      location: 'Rio de Janeiro, RJ',
      type: 'Híbrido',
      salary: 'R$ 1.200 - R$ 1.800',
      posted: 'Há 1 dia',
      logo: '🎨',
      tags: JSON.stringify(['Figma', 'Photoshop', 'UI Design']),
      featured: true,
      description:
        'Estamos à procura de um estagiário de design para ajudar na criação de interfaces elegantes e experiências intuitivas. Você fará parte do processo criativo do conceito ao protótipo.',
      responsibilities: JSON.stringify([
        'Criar layouts e protótipos de interfaces em Figma.',
        'Apoiar a equipe de UX em testes de usabilidade.',
        'Colaborar com desenvolvedores para implementação de designs.',
        'Ajustar conceitos visuais com base em feedback.',
      ]),
      requirements: JSON.stringify([
        'Cursando Design, Publicidade e Propaganda ou áreas correlatas.',
        'Noções de design de interface e experiência do usuário.',
        'Conhecimento em Figma ou Sketch.',
        'Olhar atento aos detalhes e criatividade.',
      ]),
      benefits: JSON.stringify([
        'Auxílio transporte.',
        'Vale refeição.',
        'Ambiente criativo.',
        'Acesso a workshops de design.',
        'Feedback constante de profissionais experientes.',
      ]),
      companyInfo: JSON.stringify({
        description:
          'Creative Studio desenvolve experiências digitais e identidades visuais para marcas que querem se destacar no mercado. Nosso time é formado por designers e estrategistas apaixonados.',
        size: '21-50 funcionários',
        founded: '2020',
        website: 'www.creativestudio.com.br',
      }),
      stats: JSON.stringify({ applicants: 32, deadline: '10 dias restantes', views: 189 }),
    },
    {
      title: 'Marketing Digital',
      company: 'Marketing Pro',
      location: 'Belo Horizonte, MG',
      type: 'Remoto',
      salary: 'R$ 1.000 - R$ 1.500',
      posted: 'Há 3 dias',
      logo: '📊',
      tags: JSON.stringify(['Redes Sociais', 'Google Ads', 'Conteúdo']),
      featured: false,
      description:
        'Se você gosta de redes sociais, produção de conteúdo e métricas, esse estágio é para você. Atuará na criação de campanhas e análise de resultados para melhorar a performance digital.',
      responsibilities: JSON.stringify([
        'Apoiar na criação e publicação de conteúdos para redes sociais.',
        'Auxiliar no planejamento de campanhas de marketing.',
        'Acompanhar métricas e elaborar relatórios simples.',
        'Participar de brainstorms e reuniões estratégicas.',
      ]),
      requirements: JSON.stringify([
        'Cursando Publicidade, Marketing ou Comunicação Social.',
        'Interesse por mídias digitais e marketing de conteúdo.',
        'Conhecimento básico de ferramentas de analytics.',
        'Boa redação e organização.',
      ]),
      benefits: JSON.stringify([
        'Home office parcial.',
        'Vale refeição.',
        'Acesso a cursos de marketing digital.',
        'Horário flexível.',
        'Mentoria com especialistas.',
      ]),
      companyInfo: JSON.stringify({
        description:
          'Marketing Pro ajuda marcas a crescer por meio de estratégias digitais bem planejadas. Nossa equipe cria campanhas que geram resultados mensuráveis.',
        size: '31-100 funcionários',
        founded: '2016',
        website: 'www.marketingpro.com.br',
      }),
      stats: JSON.stringify({ applicants: 58, deadline: '7 dias restantes', views: 310 }),
    },
  ]; 

  await db('jobs').insert(sampleJobs);
}

// Converte os campos do banco de dados que estão armazenados como JSON em objetos/arrays reais.
export function formatJob(row) {
  return {
    ...row,
    tags: parseJson(row.tags) || [],
    responsibilities: parseJson(row.responsibilities) || [],
    requirements: parseJson(row.requirements) || [],
    benefits: parseJson(row.benefits) || [],
    companyInfo: parseJson(row.companyInfo) || {},
    stats: parseJson(row.stats) || {},
    featured: Boolean(row.featured),
  };
}
