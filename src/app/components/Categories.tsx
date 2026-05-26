import { Code, Palette, TrendingUp, ShoppingBag, Heart, Wrench, GraduationCap, DollarSign } from 'lucide-react';

// Categories.tsx: cards de categorias populares com ícones e contagem de vagas
const categories = [
  { icon: Code, name: 'Tecnologia', count: '345 estágios', color: 'bg-blue-100 text-blue-600' },
  { icon: Palette, name: 'Design', count: '156 estágios', color: 'bg-purple-100 text-purple-600' },
  { icon: TrendingUp, name: 'Marketing', count: '234 estágios', color: 'bg-pink-100 text-pink-600' },
  { icon: GraduationCap, name: 'Administração', count: '278 estágios', color: 'bg-green-100 text-green-600' },
  { icon: DollarSign, name: 'Finanças', count: '189 estágios', color: 'bg-teal-100 text-teal-600' },
  { icon: Heart, name: 'Recursos Humanos', count: '112 estágios', color: 'bg-red-100 text-red-600' },
  { icon: Wrench, name: 'Engenharia', count: '167 estágios', color: 'bg-orange-100 text-orange-600' },
  { icon: ShoppingBag, name: 'Comunicação', count: '143 estágios', color: 'bg-yellow-100 text-yellow-600' },
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Estágios por Área
          </h2>
          <p className="text-lg text-gray-600">
            Encontre oportunidades na sua área de estudo
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <button
              key={category.name}
              className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-600 transition group"
            >
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
