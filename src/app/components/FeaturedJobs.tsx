import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import { jobs } from '../bd/jobs';

interface FeaturedJobsProps {
  onJobClick?: (jobId: number) => void;
}

export function FeaturedJobs({ onJobClick }: FeaturedJobsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Estágios em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Oportunidades perfeitas para iniciar sua carreira
            </p>
          </div>
          <button className="hidden md:block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            Ver Todos
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-6 hover:shadow-xl transition border border-gray-100"
            >
              {job.featured && (
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-4">
                  ⭐ Destaque
                </span>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-2xl">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Salvar vaga">
                  <Bookmark className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{job.type}</span>
                  <span className="text-gray-400">•</span>
                  <span>{job.posted}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => onJobClick?.(job.id)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Candidatar-se
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 md:hidden">
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            Ver Todos os Estágios
          </button>
        </div>
      </div>
    </section>
  );
}
