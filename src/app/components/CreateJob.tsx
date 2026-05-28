import {
  Search,
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  FileText,
  CheckCircle,
  Plus,
  X,
  Building2,
  Clock,
  Award,
  TrendingUp,
  AlertCircle,
  Save,
  Eye,
} from 'lucide-react';
import { FormEvent, KeyboardEvent, useState } from 'react';

interface CreateJobProps {
  onBackToCompany: () => void;
}

const areas = ['Tecnologia', 'Marketing', 'Design', 'Administração', 'Finanças', 'Recursos Humanos'];
const jobTypes = ['Presencial', 'Remoto', 'Híbrido'];
const sectors = ['Tecnologia', 'Educação', 'Saúde', 'Finanças', 'Serviços', 'Logística'];
const companySizes = ['1-10', '11-50', '51-200', '201-500', '500+'];

export function CreateJob({ onBackToCompany }: CreateJobProps) {
  const [title, setTitle] = useState('');
  const [area, setArea] = useState(areas[0]);
  const [jobType, setJobType] = useState(jobTypes[0]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [vacancies, setVacancies] = useState(1);
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [requirements, setRequirements] = useState(['']);
  const [benefits, setBenefits] = useState(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');
  const [companySector, setCompanySector] = useState(sectors[0]);
  const [companySize, setCompanySize] = useState(companySizes[0]);

  const updateItem = (items: string[], setItems: (value: string[]) => void, index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };

  const addItem = (items: string[], setItems: (value: string[]) => void) => {
    setItems([...items, '']);
  };

  const removeItem = (items: string[], setItems: (value: string[]) => void, index: number) => {
    if (items.length <= 1) return;
    const updated = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(updated);
  };

  const addTag = () => {
    const normalized = newTag.trim();
    if (!normalized || tags.includes(normalized)) return;
    setTags([...tags, normalized]);
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert('Vaga salva com sucesso! (Simulação)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToCompany}
              aria-label="Voltar para empresa"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Empresa</p>
              <h1 className="text-2xl font-bold text-gray-900">Criar nova vaga de estágio</h1>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <button className="rounded-full bg-purple-600 px-4 py-2 text-white shadow-sm hover:bg-purple-700 transition">Dashboard</button>
            <button className="rounded-full border border-gray-200 bg-white px-4 py-2 hover:border-purple-600 hover:text-purple-600 transition">Candidatos</button>
            <button className="rounded-full border border-gray-200 bg-white px-4 py-2 hover:border-purple-600 hover:text-purple-600 transition">Minhas Vagas</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-2 text-sm font-semibold text-yellow-800">
                <AlertCircle className="h-4 w-4" />
                Sua vaga será analisada pela equipe antes da publicação
              </p>
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Preencha os dados da vaga</h2>
              <p className="text-gray-600">Campos obrigatórios estão marcados com *</p>
            </div>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-3">
              <div className="rounded-3xl bg-blue-50 p-4 text-center">
                <TrendingUp className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                <p className="text-sm font-semibold text-blue-700">Visibilidade</p>
              </div>
              <div className="rounded-3xl bg-green-50 p-4 text-center">
                <Award className="mx-auto mb-2 h-6 w-6 text-green-600" />
                <p className="text-sm font-semibold text-green-700">Credibilidade</p>
              </div>
              <div className="rounded-3xl bg-purple-50 p-4 text-center">
                <CheckCircle className="mx-auto mb-2 h-6 w-6 text-purple-600" />
                <p className="text-sm font-semibold text-purple-700">Controle</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-10">
            <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                <Briefcase className="h-5 w-5 text-purple-600" />
                Informações Básicas
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Título da vaga *</span>
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Ex: Estágio em Desenvolvimento"
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Área *</span>
                  <select
                    value={area}
                    onChange={(event) => setArea(event.target.value)}
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >
                    {areas.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Tipo de trabalho *</span>
                  <select
                    value={jobType}
                    onChange={(event) => setJobType(event.target.value)}
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >
                    {jobTypes.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Cidade *</span>
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="São Paulo"
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Estado *</span>
                  <input
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    placeholder="SP"
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </label>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Número de vagas *</span>
                  <input
                    type="number"
                    min={1}
                    value={vacancies}
                    onChange={(event) => setVacancies(Number(event.target.value))}
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Salário mínimo</span>
                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      value={salaryMin}
                      onChange={(event) => setSalaryMin(event.target.value)}
                      placeholder="R$ 1.500"
                      className="w-full rounded-3xl border border-gray-200 bg-white px-10 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Salário máximo</span>
                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      value={salaryMax}
                      onChange={(event) => setSalaryMax(event.target.value)}
                      placeholder="R$ 3.500"
                      className="w-full rounded-3xl border border-gray-200 bg-white px-10 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Prazo de candidatura *</span>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={deadline}
                      onChange={(event) => setDeadline(event.target.value)}
                      className="w-full rounded-3xl border border-gray-200 bg-white px-10 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                </label>
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                <FileText className="h-5 w-5 text-purple-600" />
                Descrição da Vaga
              </div>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-gray-700">Descrição completa *</span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={7}
                  placeholder="Descreva as responsabilidades, cultura da empresa e o que espera do candidato."
                  className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </label>
            </section>

            <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span>Responsabilidades</span>
                </div>
                <div className="md:col-span-2 text-sm text-gray-600">Adicione as principais atividades do estágio.</div>
              </div>
              <div className="space-y-4">
                {responsibilities.map((item, index) => (
                  <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto] items-start">
                    <input
                      value={item}
                      onChange={(event) => updateItem(responsibilities, setResponsibilities, index, event.target.value)}
                      placeholder="Ex: Auxiliar no desenvolvimento de software"
                      className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addItem(responsibilities, setResponsibilities)}
                        aria-label="Adicionar responsabilidade"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(responsibilities, setResponsibilities, index)}
                        aria-label="Remover responsabilidade"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Requisitos</span>
                </div>
                <div className="md:col-span-2 text-sm text-gray-600">Liste as competências e experiência desejada.</div>
              </div>
              <div className="space-y-4">
                {requirements.map((item, index) => (
                  <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto] items-start">
                    <input
                      value={item}
                      onChange={(event) => updateItem(requirements, setRequirements, index, event.target.value)}
                      placeholder="Ex: Conhecimento em JavaScript"
                      className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addItem(requirements, setRequirements)}
                        aria-label="Adicionar requisito"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(requirements, setRequirements, index)}
                        aria-label="Remover requisito"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span>Benefícios</span>
                </div>
                <div className="md:col-span-2 text-sm text-gray-600">Mostre o que a empresa oferece ao estagiário.</div>
              </div>
              <div className="space-y-4">
                {benefits.map((item, index) => (
                  <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto] items-start">
                    <input
                      value={item}
                      onChange={(event) => updateItem(benefits, setBenefits, index, event.target.value)}
                      placeholder="Ex: Vale transporte"
                      className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addItem(benefits, setBenefits)}
                        aria-label="Adicionar benefício"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-white hover:bg-purple-700 transition"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(benefits, setBenefits, index)}
                        aria-label="Remover benefício"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span>Habilidades / Tags</span>
                </div>
                <div className="md:col-span-2 text-sm text-gray-600">Pressione Enter ou adicione novas tags manualmente.</div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                <div className="flex items-center gap-3 rounded-3xl border border-gray-200 bg-white px-4 py-3">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    value={newTag}
                    onChange={(event) => setNewTag(event.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Ex: React, JavaScript, UX"
                    className="w-full border-none bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={addTag}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar tag
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm text-blue-700">
                    {tag}
                    <button
                      type="button"
                      aria-label={`Remover tag ${tag}`}
                      onClick={() => removeTag(tag)}
                      className="rounded-full p-1 text-blue-600 hover:bg-blue-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <span>Informações da Empresa</span>
                </div>
                <div className="md:col-span-2 text-sm text-gray-600">Conte um pouco sobre sua marca e o ambiente de trabalho.</div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Nome da empresa *</span>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    placeholder="Ex: Tech Connect"
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Setor de atuação *</span>
                  <select
                    value={companySector}
                    onChange={(event) => setCompanySector(event.target.value)}
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >
                    {sectors.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-gray-700">Sobre a empresa</span>
                <textarea
                  value={companyAbout}
                  onChange={(event) => setCompanyAbout(event.target.value)}
                  rows={5}
                  placeholder="Descreva cultura, missão e o que torna a empresa especial."
                  className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </label>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold text-gray-700">Tamanho da empresa</span>
                  <select
                    value={companySize}
                    onChange={(event) => setCompanySize(event.target.value)}
                    className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  >
                    {companySizes.map((item) => (
                      <option key={item} value={item}>{item} colaboradores</option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <div className="grid gap-4 lg:grid-cols-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-100 transition"
              >
                <Eye className="h-4 w-4 text-gray-600" />
                Visualizar Prévia
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition"
              >
                <Save className="h-4 w-4" />
                Salvar Rascunho
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-900/20 hover:bg-purple-700 transition"
              >
                <CheckCircle className="h-4 w-4" />
                Publicar Vaga
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
