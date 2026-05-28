import { UserPlus, Search, FileText, CheckCircle } from 'lucide-react';

// HowItWorks.tsx: seção explicando o fluxo do usuário em 4 passos para conseguir um estágio
export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Crie seu perfil',
      description: 'Cadastre-se gratuitamente e adicione suas informações acadêmicas',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Search,
      title: 'Busque estágios',
      description: 'Explore oportunidades que combinam com seu curso e interesses',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: FileText,
      title: 'Candidate-se',
      description: 'Envie seu currículo e carta de apresentação com facilidade',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: CheckCircle,
      title: 'Inicie seu estágio',
      description: 'Conecte-se com empresas e comece sua jornada profissional',
      color: 'bg-green-100 text-green-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-gray-600">
            Encontre seu estágio ideal em 4 passos simples
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="relative mb-6">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto`}>
                  <step.icon className="w-8 h-8" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                )}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
