import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  completion: number;
  value: string;
  duration: string;
  location: string;
  client: string;
  image: string;
  startDate: string;
  endDate: string;
}

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#10B981'; // green-500
      case 'in progress':
      case 'in-progress':
        return '#3B82F6'; // blue-500
      case 'planning':
        return '#F59E0B'; // amber-500
      default:
        return '#6B7280'; // gray-500
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'commercial':
        return 'rgba(168, 85, 247, 0.2)'; // purple-500 with opacity
      case 'residential':
        return 'rgba(249, 115, 22, 0.2)'; // orange-500 with opacity
      case 'industrial':
        return 'rgba(107, 114, 128, 0.2)'; // gray-500 with opacity
      default:
        return 'rgba(59, 130, 246, 0.2)'; // blue-500 with opacity
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">{t('loading')}...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{t('error')}: {error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white py-32 px-4 sm:px-6 lg:px-8">
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            {t('ourProjects')}
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            {t('projectsPageSubtitle')}
          </p>
        </div>
      </section>
 



      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="relative">
                  <img src={getImageUrl(project.image) || 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'} alt={project.title} className="w-full h-56 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <div className='flex items-center'>
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getStatusColor(project.status) }}></div>
                      <span className="font-bold text-white text-sm">{t(project.status.replace(/\s+/g, '').toLowerCase())}</span>
                    </div>
                    <div className="text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ backgroundColor: getCategoryColor(project.category) }}>
                      {t(project.category.toLowerCase())}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-4 py-2 rounded-xl">
                    {project.value}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700/50">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-r-full"
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm flex-grow">{project.description}</p>

                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{project.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{project.client}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Value Highlights (non-numeric) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">قيم نوعية تعكس أثرنا</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">نبرز ما يميز عملنا من جودة، أمان، التزام، وشراكات—بعيدًا عن الأرقام.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">قيمة مضافة</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">حلول تحقق أهدافك</div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">شراكات ناجحة</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">علاقات طويلة المدى</div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">التزام بالمواعيد</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">تخطيط وتسليم مسؤول</div>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">حضور واسع</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">خبرة في قطاعات متعددة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('yourProjectCouldBeNext')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('joinOurPortfolio')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              {t('startYourProject')}
            </a>
            <a
              href="/register"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              {t('registerAsClient')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;