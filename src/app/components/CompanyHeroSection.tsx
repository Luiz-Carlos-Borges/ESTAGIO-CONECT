import { Search, Briefcase, Building2, Users, ShieldCheck, ArrowRight } from 'lucide-react';

// CompanyHeroSection.tsx: seção voltada para empresas que desejam publicar vagas e contratar estagiários
interface CompanyHeroSectionProps {
  onBackToWelcome: () => void;
  onStartCreateJob: () => void;
}

export function CompanyHeroSection({ onBackToWelcome, onStartCreateJob }: CompanyHeroSectionProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-center">
            <div className="p-10 lg:p-16">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/90 mb-6">
                <Briefcase className="w-5 h-5" />
                Soluções para Empresas
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Encontre talentos universitários prontos para crescer com sua equipe
              </h1>

              <p className="mt-6 text-lg text-white/85 max-w-xl">
                Conectamos sua empresa aos melhores candidatos de estágio, com ferramentas de triagem, gestão de vagas e comunicação direta.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-white/15 mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Banco de talentos</h3>
                  <p className="mt-2 text-sm text-white/80">Acesse perfis qualificados e filtre por curso, habilidades e disponibilidade.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-white/15 mb-4">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">Seleção segura</h3>
                  <p className="mt-2 text-sm text-white/80">Tenha mais controle no processo seletivo com filtros e avaliações claras.</p>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={onStartCreateJob}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-purple-700 px-8 py-4 text-sm font-semibold shadow-lg shadow-purple-900/20 hover:bg-blue-50 transition"
                >
                  Começar agora
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onBackToWelcome}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white/90 hover:bg-white/15 transition"
                >
                  Voltar
                </button>
              </div>
            </div>

            <div className="relative p-8 lg:p-10">
              <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
              <div className="rounded-[2rem] bg-white/10 p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-500/20 text-white">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm uppercase text-white/70">Destaque da plataforma</p>
                    <p className="font-semibold text-white">Mais de 850 empresas parceiras</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                    <p className="text-sm text-white/80">Publicação ilimitada de vagas</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                    <p className="text-sm text-white/80">Acesso rápido a currículos compatíveis</p>
                  </div>
                  <div className="rounded-3xl bg-white/10 p-5 border border-white/10">
                    <p className="text-sm text-white/80">Comunicação direta com candidatos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
