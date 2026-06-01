import { db } from '../server/db.js';

async function inspect() {
  console.log('Arquivo do banco: server/data/database.sqlite');
  const tables = ['users', 'jobs', 'applications'];

  for (const table of tables) {
    try {
      const countRow = await db(table).count('id as cnt').first();
      const cnt = countRow?.cnt ?? 0;
      console.log(`\nTabela: ${table} — ${cnt} registros`);
      const rows = await db(table).select('*').limit(10);
      console.log(JSON.stringify(rows, null, 2));
    } catch (err) {
      console.error(`Erro ao ler tabela ${table}:`, err.message || err);
    }
  }

  process.exit(0);
}

inspect().catch((err) => {
  console.error('Erro no script:', err);
  process.exit(1);
});
