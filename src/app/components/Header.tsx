import { Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  onSignUp?: () => void;
  onSignIn?: () => void;
}

export function Header({ onSignUp, onSignIn }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EstágioConnect</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Estágios</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Empresas</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Dicas</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition">Sobre</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
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
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
