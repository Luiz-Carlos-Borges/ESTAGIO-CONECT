const base = 'http://localhost:4000';

async function safeFetch(url, opts) {
  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: res.status, data };
}

async function main() {
  try {
    console.log('1) Registrando empresa...');
    const reg = await safeFetch(base + '/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Empresa Teste',
        email: 'company@test.local',
        password: 'Pass1234',
        role: 'company',
        companyName: 'Empresa Teste Ltda',
        companyAbout: 'Sobre a empresa teste',
        website: 'https://empresa.local'
      })
    });
    console.log('register status:', reg.status, 'response:', JSON.stringify(reg.data));

    console.log('2) Logando empresa...');
    const login = await safeFetch(base + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'company@test.local', password: 'Pass1234' })
    });
    console.log('login status:', login.status, 'response:', JSON.stringify(login.data));
    const token = login.data?.token;
    if (!token) {
      console.error('Não obteve token da API. Abortando.');
      process.exit(1);
    }

    console.log('3) Criando vaga com token...');
    const jobPayload = {
      title: 'Vaga E2E Teste',
      location: 'Remoto',
      type: 'Remoto',
      salary: 'R$ 1.000 - R$ 1.500',
      posted: 'Agora',
      logo: '🏢',
      tags: ['Node', 'Test'],
      description: 'Vaga criada pelo script de teste E2E',
      responsibilities: [],
      requirements: [],
      benefits: [],
      companyAbout: 'Empresa criada para teste E2E',
      companySize: '1-10',
      companyFounded: '2020',
      companyWebsite: 'https://empresa.local',
      deadline: '30 dias'
    };

    const createJob = await safeFetch(base + '/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(jobPayload)
    });

    console.log('create job status:', createJob.status, 'response:', JSON.stringify(createJob.data));
    const jobId = createJob.data?.id || createJob.data?.id === 0 ? createJob.data.id : (createJob.data && createJob.data.id);
    if (!jobId && createJob.data?.id === undefined) {
      // Sometimes server returns the whole job object
      const created = createJob.data;
      if (created && created.id) {
        console.log('Vaga criada com id:', created.id);
        console.log(created);
        console.log('Fim do script. Use o id acima para testar candidatura.');
        return;
      }
      console.error('Falha ao criar vaga.');
      process.exit(1);
    }

    console.log('Vaga criada com id:', jobId);
    console.log('Pronto — agora execute o upload do currículo apontando jobId igual a esse id.');
  } catch (err) {
    console.error('Erro no script:', err);
    process.exit(1);
  }
}

main();
