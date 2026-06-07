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

// Rota para empresas publicarem novas vagas (exige autenticação).
app.post('/api/jobs', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'company') {
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

// Rota para envio de candidatura, incluindo upload de currículo.
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
