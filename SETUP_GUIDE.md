# Guia de Execução - EstágioConnect

## Desenvolvimento Local

### Pré-requisitos
- Node.js v18+ instalado
- npm ou yarn

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o Backend E Frontend (opção recomendada)
```bash
npm run dev:all
```

Isso iniciará:
- **Backend**: `http://localhost:4000` (Express + SQLite)
- **Frontend**: `http://localhost:5173` (Vite + React)

### 3. Ou iniciar separadamente em dois terminais

**Terminal 1 - Backend:**
```bash
npm run backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## Solução de Problemas

### ❌ "Erro ao conectar com o servidor"

**Causa mais comum**: O backend não está rodando.

**Solução**:
1. Verifique se está executando `npm run dev:all` ou ambos os comandos
2. Confirme que o backend iniciou com sucesso em `http://localhost:4000`
3. Verifique no console do navegador (F12) se há erros de rede

### ❌ "CORS Error" ou "Failed to fetch"

**Causa**: Backend não acessível ou porta bloqueada.

**Soluções**:
1. Confirme que nenhuma aplicação está usando a porta 4000
2. Tente fazer restart: `npm run dev:all`
3. Verificar firewall/antivírus bloqueando conexão

### ❌ "Network request failed"

**Causa**: Possível problema com o proxy do Vite ou conexão.

**Soluções**:
1. Limpar cache: `rm -rf node_modules .vite` (ou `rmdir` no Windows)
2. Reinstalar: `npm install`
3. Reiniciar aplicação: `npm run dev:all`

---

## Produção

### Build da Aplicação
```bash
npm run build
```

Gera:
- Frontend compilado em `dist/`
- Backend em `server/`

### Variáveis de Ambiente para Produção

Crie um arquivo `.env` na raiz do projeto:

```env
# URL da API em produção
VITE_API_URL=https://seu-servidor-api.com

# Porta do Backend (padrão: 4000)
PORT=4000

# Secret JWT (IMPORTANTE: mudar em produção!)
JWT_SECRET=sua-chave-secreta-super-segura
```

### Executar em Produção

```bash
# Terminal 1 - Backend em produção
NODE_ENV=production node server/index.js

# Terminal 2 - Servir frontend estático
# Use um servidor web (nginx, apache, vercel, etc.)
# ou próxima página
```

---

## Configuração Detalhada

### Desenvolvimento
- ✅ Proxy do Vite redireciona `/api` → `http://localhost:4000`
- ✅ URLs relativas funcionam automaticamente
- ✅ Hot reload ativado

### Produção
- ❌ Proxy do Vite **NÃO funciona**
- ✅ Variável de ambiente `VITE_API_URL` define URL da API
- ✅ Sem `VITE_API_URL`, tenta `localhost:4000` (para deploy local)

---

## Portas Padrão

| Serviço | URL | Variável |
|---------|-----|----------|
| Frontend | `http://localhost:5173` | - |
| Backend | `http://localhost:4000` | `PORT` |
| API | `/api/*` | `VITE_API_URL` |

---

## Scripts Disponíveis

```bash
npm run dev          # Frontend em desenvolvimento
npm run backend      # Backend em desenvolvimento
npm run dev:all      # ⭐ Frontend + Backend (RECOMENDADO)
npm run build        # Compilar para produção
npm run preview      # Preview da build (localhost:4173)
```

---

## Verificação Rápida

### ✅ Como saber se está tudo funcionando?

1. **Backend está rodando?**
   - Abra `http://localhost:4000/api/jobs` no navegador
   - Deve retornar um JSON com vagas

2. **Frontend está conectado?**
   - Abra `http://localhost:5173` 
   - Tente criar conta ou fazer login
   - Não deve aparecer erro de conexão

3. **Banco de dados existe?**
   - Procure arquivo: `server/data/database.sqlite`
   - Deve existir após primeira execução do backend

---

## Estrutura de Pastas

```
.
├── src/                    # Frontend (React + TypeScript)
│   ├── app/components/     # Componentes de tela
│   ├── config/api.ts       # ⭐ Configuração centralized da API
│   └── styles/             # CSS
├── server/                 # Backend (Express + Node.js)
│   ├── index.js            # Servidor principal
│   ├── db.js               # Banco de dados SQLite
│   └── data/               # Dados SQLite
├── vite.config.ts          # Configuração do proxy Vite
├── .env.example            # Exemplo de variáveis
└── package.json            # Dependências
```

---

## ⚠️ Importante

- **Segurança**: Nunca commit `.env` com dados sensíveis no Git
- **JWT_SECRET**: Em produção, use uma chave criptográfica forte
- **Dados**: Backup `server/data/database.sqlite` regularmente
- **Firewall**: Libere porta 4000 (backend) se necessário

---

Dúvidas? Verifique os logs do console do navegador (F12) e do terminal!
