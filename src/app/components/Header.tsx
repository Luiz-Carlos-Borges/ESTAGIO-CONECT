import { useState } from 'react';
import { Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  onSignUp?: () => void;
  onSignIn?: () => void;
  userName?: string;
  onSignOut?: () => void;
  onMyApplications?: () => void;
  userRole?: string;
}

export function Header({
  onSignUp,
  onSignIn,
  userName,
  onSignOut,
  onMyApplications,
  userRole,
}: HeaderProps) {
  const [showTips, setShowTips] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>

              <span className="text-xl font-bold text-gray-900">
                EstágioConnect
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">

              <button
                onClick={() => setShowTips(true)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dicas
              </button>

              <button
                onClick={() => setShowAbout(true)}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Sobre
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {userName ? (
              <>
                <span className="hidden md:inline text-gray-700">
                  Olá, {userName}
                </span>

                {userRole === 'candidate' && (
                  <button
                    onClick={onMyApplications}
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition text-sm font-medium"
                  >
                    Minhas Candidaturas
                  </button>
                )}

                <button
                  onClick={onSignOut}
                  className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <User className="w-5 h-5" />
                  <span>Entrar</span>
                </button>

                <button
                  onClick={onSignUp}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Cadastrar
                </button>
              </>
            )}

            <button className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* POP-UP DICAS */}
      {showTips && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              Dicas para conseguir um estágio
            </h2>

            <p className="text-gray-700 mb-6">
              • Mantenha seu currículo atualizado.
              <br />
              • Faça cursos complementares.
              <br />
              • Crie um perfil no LinkedIn.
              <br />
              • Participe de projetos acadêmicos.
              <br />
              • Desenvolva habilidades práticas.
              <br />
              • Demonstre interesse e vontade de aprender.
            </p>

            <button
              onClick={() => setShowTips(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* POP-UP SOBRE */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              Sobre o EstágioConnect
            </h2>

            <p className="text-gray-700 mb-6">
             Esse sistema é um projeto acadêmico desenvolvido por estudantes de Análise e Desenvolvimento de Sistemas, com o objetivo de facilitar a conexão entre estudantes e empresas para oportunidades de estágio. Ele oferece uma plataforma intuitiva para busca de estágios, cadastro de currículos e dicas para ajudar os estudantes a se destacarem no mercado de trabalho.
             <br />
             <br />
            </p>

            <button
              onClick={() => setShowAbout(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}