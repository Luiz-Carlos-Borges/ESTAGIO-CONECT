import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, initDatabase, formatJob } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');

// Garante que a pasta de uploads exista para armazenar currículos enviados.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 5 * 1024 * 1024, // limite de 5MB por upload
  },
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

const JWT_SECRET = process.env.JWT_SECRET || 'estagio-conect-secret';
const PORT = process.env.PORT || 4000;

await initDatabase();

// Cria um token JWT para o usuário autenticado.
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Middleware para validar o token JWT enviado no cabeçalho Authorization.
function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
}

// Rota de registro de usuário.
app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      companyName,
      companyPhone,
      companyAbout,
      website,
      candidatePhone,
      candidateCity,
      candidateCourse,
      candidatePeriod,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Campos obrigatórios não enviados.' });
    }

    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ error: 'Email já cadastrado.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [userId] = await db('users').insert({
      name,
      email,
      passwordHash,
      role,
      // Dados de empresa
      companyName: role === 'company' ? companyName : null,
      companyPhone: role === 'company' ? companyPhone : null,
      companyAbout: role === 'company' ? companyAbout : null,
      website: role === 'company' ? website : null,
      // Dados de candidato
      candidatePhone: role === 'candidate' ? candidatePhone : null,
      candidateCity: role === 'candidate' ? candidateCity : null,
      candidateCourse: role === 'candidate' ? candidateCourse : null,
      candidatePeriod: role === 'candidate' ? candidatePeriod : null,
    });

    const user = {
      id: userId,
      name,
      email,
      role,
      ...(role === 'company' && {
        company: {
          name: companyName,
          phone: companyPhone,
          about: companyAbout,
          website,
        },
      }),
      ...(role === 'candidate' && {
        candidate: {
          phone: candidatePhone,
          city: candidateCity,
          course: candidateCourse,
          period: candidatePeriod,
        },
      }),
    };

    const token = createToken(user);
    return res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Rota de login de usuário.
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      ...(user.role === 'company' && {
        company: {
          name: user.companyName,
          phone: user.companyPhone,
          about: user.companyAbout,
          website: user.website,
        },
      }),
      ...(user.role === 'candidate' && {
        candidate: {
          phone: user.candidatePhone,
          city: user.candidateCity,
          course: user.candidateCourse,
          period: user.candidatePeriod,
        },
      }),
    };
    const token = createToken(payload);
    return res.json({ token, user: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao autenticar usuário.' });
  }
});

// Rota protegida que retorna os dados do usuário logado.
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  return res.json({ user: req.user });
});

// Rota para a empresa atualizar seus próprios dados de perfil (nome, telefone, sobre, site).
app.put('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'company' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas empresas podem editar o perfil da empresa.' });
    }

    const { company } = req.body;
    if (!company || typeof company !== 'object') {
      return res.status(400).json({ error: 'Dados da empresa não enviados.' });
    }

    const { name, phone, about, website } = company;
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'O nome da empresa é obrigatório.' });
    }

    const userRow = await db('users').where({ id: req.user.id }).first();
    if (!userRow) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await db('users').where({ id: req.user.id }).update({
      companyName: name,
      companyPhone: phone || null,
      companyAbout: about || null,
      website: website || null,
    });

    const updatedRow = await db('users').where({ id: req.user.id }).first();

    const payload = {
      id: updatedRow.id,
      name: updatedRow.name,
      email: updatedRow.email,
      role: updatedRow.role,
      company: {
        name: updatedRow.companyName,
        phone: updatedRow.companyPhone,
        about: updatedRow.companyAbout,
        website: updatedRow.website,
      },
    };

    // Gera um novo token com os dados atualizados, já que o token antigo tem os dados antigos.
    const token = createToken(payload);

    return res.json({ token, user: payload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar perfil da empresa.' });
  }
});

// Rota para listar vagas com pesquisa opcional.
app.get('/api/jobs', async (req, res) => {
  try {
    const search = String(req.query.search || '').trim().toLowerCase();
    const jobsQuery = db('jobs');

    if (search) {
      jobsQuery.where((builder) => {
        builder
          .whereRaw('LOWER(title) like ?', [`%${search}%`])
          .orWhereRaw('LOWER(company) like ?', [`%${search}%`])
          .orWhereRaw('LOWER(location) like ?', [`%${search}%`])
          .orWhereRaw('LOWER(tags) like ?', [`%${search}%`])
          .orWhereRaw('LOWER(description) like ?', [`%${search}%`]);
      });
    }

    const rows = await jobsQuery.orderBy('createdAt', 'desc');
    return res.json(rows.map(formatJob));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar vagas.' });
  }
});

// Rota para empresas ver suas vagas publicadas (exige autenticação)
// Deve vir antes da rota genérica /api/jobs/:id para evitar conflito com o caminho "my-jobs".
app.get('/api/jobs/my-jobs', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'company' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas empresas podem acessar suas vagas.' });
    }

    const rows = await db('jobs')
      .where({ ownerId: req.user.id })
      .orderBy('createdAt', 'desc');
    
    return res.json(rows.map(formatJob));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar vagas.' });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const row = await db('jobs').where({ id: Number(req.params.id) }).first();
    if (!row) {
      return res.status(404).json({ error: 'Vaga não encontrada.' });
    }
    return res.json(formatJob(row));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar vaga.' });
  }
});

// Rota para ver candidaturas de uma vaga específica (exige autenticação)
app.get('/api/jobs/:jobId/applications', authMiddleware, async (req, res) => {
  try {
    const jobId = Number(req.params.jobId);
    
    // Verificar se a empresa é dona da vaga
    const job = await db('jobs').where({ id: jobId }).first();
    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada.' });
    }
    
    if (job.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Você não tem permissão para ver as candidaturas desta vaga.' });
    }

    const applications = await db('applications')
      .where({ jobId })
      .orderBy('createdAt', 'desc');
    
    return res.json(applications);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar candidaturas.' });
  }
});

// Rota para atualizar status de uma candidatura (exige autenticação)
app.patch('/api/applications/:appId', authMiddleware, async (req, res) => {
  try {
    const appId = Number(req.params.appId);
    const { status } = req.body;

    if (!status || !['novo', 'em-analise', 'aceito', 'rejeitado'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido.' });
    }

    const application = await db('applications').where({ id: appId }).first();
    if (!application) {
      return res.status(404).json({ error: 'Candidatura não encontrada.' });
    }

    // Verificar se a empresa é dona da vaga
    const job = await db('jobs').where({ id: application.jobId }).first();
    if (!job || (job.ownerId !== req.user.id && req.user.role !== 'admin')) {
      return res.status(403).json({ error: 'Você não tem permissão para atualizar esta candidatura.' });
    }

    await db('applications').where({ id: appId }).update({ status });
    
    const updated = await db('applications').where({ id: appId }).first();
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar candidatura.' });
  }
});


// Rota para empresas publicarem novas vagas (exige autenticação).
app.post('/api/jobs', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'company' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas empresas podem publicar vagas.' });
    }

    const {
      title,
      location,
      type,
      salary,
      posted,
      logo,
      tags,
      description,
      responsibilities,
      requirements,
      benefits,
      companyAbout,
      companySize,
      companyFounded,
      companyWebsite,
      deadline,
    } = req.body;

    if (!title || !location || !type || !salary || !tags || !description) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    const companyName = req.user.companyName || 'Empresa Parceira';
    const jobPayload = {
      title,
      company: companyName,
      location,
      type,
      salary,
      posted: posted || 'Há pouco tempo',
      logo: logo || '💼',
      tags: JSON.stringify(tags),
      featured: false,
      description,
      responsibilities: JSON.stringify(responsibilities || []),
      requirements: JSON.stringify(requirements || []),
      benefits: JSON.stringify(benefits || []),
      companyInfo: JSON.stringify({
        description: companyAbout || '',
        size: companySize || 'Indefinido',
        founded: companyFounded || 'A definir',
        website: companyWebsite || req.user.website || '',
      }),
      stats: JSON.stringify({ applicants: 0, deadline: deadline || 'A definir', views: 0 }),
      ownerId: req.user.id,
    };

    const [id] = await db('jobs').insert(jobPayload);
    const row = await db('jobs').where({ id }).first();
    return res.status(201).json(formatJob(row));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar vaga.' });
  }
});

// Rota para a empresa atualizar uma vaga (ex: editar campos, ativar/desativar mudando o prazo).
app.patch('/api/jobs/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'company' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas empresas podem editar vagas.' });
    }

    const { id } = req.params;
    const job = await db('jobs').where({ id }).first();

    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada.' });
    }

    if (job.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Você não tem permissão para editar esta vaga.' });
    }

    const {
      title,
      location,
      type,
      salary,
      tags,
      description,
      responsibilities,
      requirements,
      benefits,
      deadline,
      toggleActive,
    } = req.body;

    const updatePayload = {};

    if (title !== undefined) updatePayload.title = title;
    if (location !== undefined) updatePayload.location = location;
    if (type !== undefined) updatePayload.type = type;
    if (salary !== undefined) updatePayload.salary = salary;
    if (tags !== undefined) updatePayload.tags = JSON.stringify(tags);
    if (description !== undefined) updatePayload.description = description;
    if (responsibilities !== undefined) updatePayload.responsibilities = JSON.stringify(responsibilities);
    if (requirements !== undefined) updatePayload.requirements = JSON.stringify(requirements);
    if (benefits !== undefined) updatePayload.benefits = JSON.stringify(benefits);

    // Atualiza estatísticas (deadline) preservando applicants e views existentes.
    if (deadline !== undefined || toggleActive !== undefined) {
      const currentStats = JSON.parse(job.stats || '{}');
      let newDeadline = deadline !== undefined ? deadline : currentStats.deadline;

      // toggleActive: se true, ativa (prazo futuro); se false, expira a vaga (prazo passado).
      if (toggleActive === true) {
        const future = new Date();
        future.setDate(future.getDate() + 30);
        newDeadline = future.toISOString();
      } else if (toggleActive === false) {
        const past = new Date();
        past.setDate(past.getDate() - 1);
        newDeadline = past.toISOString();
      }

      updatePayload.stats = JSON.stringify({ ...currentStats, deadline: newDeadline });
    }

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar.' });
    }

    await db('jobs').where({ id }).update(updatePayload);
    const updatedRow = await db('jobs').where({ id }).first();
    return res.json(formatJob(updatedRow));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar vaga.' });
  }
});

// Rota para a empresa excluir uma vaga publicada.
app.delete('/api/jobs/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'company' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Apenas empresas podem excluir vagas.' });
    }

    const { id } = req.params;
    const job = await db('jobs').where({ id }).first();

    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada.' });
    }

    if (job.ownerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Você não tem permissão para excluir esta vaga.' });
    }

    // Remove primeiro as candidaturas vinculadas, depois a vaga.
    await db('applications').where({ jobId: id }).del();
    await db('jobs').where({ id }).del();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao excluir vaga.' });
  }
});
app.post('/api/applications', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, name, email, phone, city, portfolio, linkedin, github, coverLetter } = req.body;
    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Currículo é obrigatório.' });
    }

    const job = await db('jobs').where({ id: Number(jobId) }).first();
    if (!job) {
      return res.status(404).json({ error: 'Vaga não encontrada.' });
    }

    const [id] = await db('applications').insert({
      jobId: Number(jobId),
      userId: req.user?.id || null,
      name,
      email,
      phone,
      city: city || null,
      portfolio: portfolio || null,
      linkedin: linkedin || null,
      github: github || null,
      coverLetter: coverLetter || null,
      resumePath: req.file.filename,
    });

    return res.status(201).json({ id, message: 'Candidatura enviada com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao enviar candidatura.' });
  }
});

// Middleware de tratamento de erros genéricos.
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({ error: 'Erro interno do servidor.' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║  🚀 EstágioConnect Backend Iniciado       ║');
  console.log(`║  URL: http://localhost:${PORT}`.padEnd(45) + '║');
  console.log('║  Banco de dados: SQLite                    ║');
  console.log('║  CORS: Habilitado                          ║');
  console.log('╚════════════════════════════════════════════╝\n');
  console.log('Conecte o frontend em desenvolvimento com:');
  console.log('  $ npm run dev\n');
});