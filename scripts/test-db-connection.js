import { db, initDatabase } from '../server/db.js';

async function main() {
  try {
    console.log('Rodando initDatabase()...');
    await initDatabase();
    console.log('initDatabase() executado com sucesso. Testando query simples...');

    const raw = await db.raw('select 1+1 as result');
    console.log('raw result:', raw);

    try {
      const cnt = await db('jobs').count('id as count').first();
      console.log('jobs count:', cnt?.count ?? cnt);
    } catch (e) {
      console.warn('Não foi possível contar vagas (talvez tabela não exista):', e.message || e);
    }

    await db.destroy();
    console.log('Conexão finalizada.');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao conectar/consultar DB:', err && err.stack ? err.stack : err);
    try { await db.destroy(); } catch (e) {}
    process.exit(1);
  }
}

main();
