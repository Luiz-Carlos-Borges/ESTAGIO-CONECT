#!/usr/bin/env node

/**
 * Script de diagnóstico - EstágioConnect
 * Verifica se tudo está configurado corretamente
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(icon, message, color = colors.blue) {
  console.log(`${color}${icon}${colors.reset} ${message}`);
}

function checkPort(port, name) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', () => {
      log('❌', `Porta ${port} (${name}) está ocupada`, colors.red);
      resolve(false);
    });
    server.once('listening', () => {
      server.close();
      log('✅', `Porta ${port} (${name}) disponível`, colors.green);
      resolve(true);
    });
    server.listen(port, 'localhost');
  });
}

function checkDirectory(dir, name) {
  const exists = fs.existsSync(dir);
  if (exists) {
    log('✅', `Diretório ${name} encontrado`, colors.green);
  } else {
    log('❌', `Diretório ${name} não encontrado`, colors.red);
  }
  return exists;
}

function checkFile(file, name) {
  const exists = fs.existsSync(file);
  if (exists) {
    log('✅', `Arquivo ${name} encontrado`, colors.green);
  } else {
    log('⚠️ ', `Arquivo ${name} não encontrado (opcional)`, colors.yellow);
  }
  return exists;
}

async function runDiagnostics() {
  console.log('\n' + colors.blue + '╔════════════════════════════════════╗' + colors.reset);
  console.log(colors.blue + '║  🔍 Diagnóstico EstágioConnect    ║' + colors.reset);
  console.log(colors.blue + '╚════════════════════════════════════╝' + colors.reset + '\n');

  // Verificar Node.js
  log('📦', `Node.js versão: ${process.version}`, colors.blue);

  // Verificar diretórios
  console.log(colors.yellow + '\n📁 Verificando diretórios...' + colors.reset);
  checkDirectory(path.join(__dirname, 'src'), 'src/');
  checkDirectory(path.join(__dirname, 'server'), 'server/');
  checkDirectory(path.join(__dirname, 'node_modules'), 'node_modules/');

  // Verificar arquivos
  console.log(colors.yellow + '\n📄 Verificando arquivos...' + colors.reset);
  checkFile(path.join(__dirname, 'package.json'), 'package.json');
  checkFile(path.join(__dirname, 'vite.config.ts'), 'vite.config.ts');
  checkFile(path.join(__dirname, 'server/index.js'), 'server/index.js');
  checkFile(path.join(__dirname, '.env'), '.env');

  // Verificar banco de dados
  console.log(colors.yellow + '\n🗄️  Verificando banco de dados...' + colors.reset);
  const dbPath = path.join(__dirname, 'server/data/database.sqlite');
  if (fs.existsSync(dbPath)) {
    log('✅', `Banco de dados encontrado: ${dbPath}`, colors.green);
  } else {
    log('ℹ️ ', 'Banco de dados será criado na primeira execução do backend', colors.blue);
  }

  // Verificar portas
  console.log(colors.yellow + '\n🔌 Verificando portas...' + colors.reset);
  const port4000 = await checkPort(4000, 'Backend');
  const port5173 = await checkPort(5173, 'Frontend');

  // Recomendações
  console.log(colors.yellow + '\n💡 Próximos passos:' + colors.reset);
  
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    log('1️⃣ ', 'Instale dependências: npm install', colors.yellow);
  } else {
    log('✅', 'Dependências instaladas', colors.green);
  }

  if (port4000 && port5173) {
    log('2️⃣ ', 'Inicie com: npm run dev:all', colors.yellow);
  } else {
    log('⚠️ ', 'Libere as portas 4000 e 5173 antes de iniciar', colors.red);
  }

  console.log('\n' + colors.blue + '📖 Documentação: SETUP_GUIDE.md' + colors.reset + '\n');
}

runDiagnostics().catch(console.error);
