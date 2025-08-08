import React from 'react';
import { Award, Users, Target, Globe, Heart, Lightbulb, ShieldCheck, Timer, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const coreValues = [
    { icon: Award, title: t('excellence'), description: t('excellenceDesc') },
    { icon: ShieldCheck, title: t('integrity'), description: t('integrityDesc') },
    { icon: Lightbulb, title: t('innovation'), description: t('innovationDesc') },
    { icon: Users, title: t('collaboration'), description: t('collaborationDesc') },
    { icon: Timer, title: t('reliability'), description: t('reliabilityDesc') },
    { icon: Leaf, title: t('sustainability'), description: t('sustainabilityDesc') },
  ];

  const timeline = [
    {
      year: '2020',
      title: t('timeline2020Title'),
      description: t('timeline2020Desc')
    },
    {
      year: '2021',
      title: t('timeline2021Title'),
      description: t('timeline2021Desc')
    },
    {
      year: '2022',
      title: t('timeline2022Title'),
      description: t('timeline2022Desc')
    },
    {
      year: '2023',
      title: t('timeline2023Title'),
      description: t('timeline2023Desc')
    },
    {
      year: '2024',
      title: t('timeline2024Title'),
      description: t('timeline2024Desc')
    },
    {
      year: '2026',
      title: t('timeline2026Title'),
      description: t('timeline2026Desc')
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t('aboutTitle')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                {t('aboutHeroDescription')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">5+</div>
                  <div className="text-blue-100">{t('yearsExperience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">20+</div>
                  <div className="text-blue-100">{t('projectsCompleted')}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AWJ International Team"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-3xl opacity-60"></div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('ourMission')}</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {t('missionDescription')}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-3xl opacity-60"></div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('ourVision')}</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {t('visionDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('coreValues')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('coreValuesDescription')}</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white mb-6 shadow-lg">
                  <value.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('ourJourney')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('journeyDescription')}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-600 to-blue-400"></div>
            
            {/* Mobile Timeline Line - Visible only on mobile */}
            <div className="md:hidden absolute right-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-400"></div>

            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative ${
                  // Mobile: all items aligned to the right with consistent layout
                  // Desktop: alternating left/right layout
                  'md:flex md:items-center ' + (index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')
                }`}>
                  {/* Timeline Dot */}
                  <div className="absolute right-4 md:left-1/2 md:transform md:-translate-x-1/2 transform -translate-y-1/2 top-6 md:top-auto w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg z-10"></div>

                  {/* Content */}
                  <div className={`
                    pr-12 md:pr-0 md:w-1/2 
                    ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}
                  `}>
                    <div className={`
                      bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700
                      text-right md:text-left
                      ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}
                    `}>
                      <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

       
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
            {t('readyToBuild')}
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('experienceTheDifference')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 text-lg"
                >
                  {t('getInTouch')}
                </a>
                <a
                  href="/projects"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30 text-lg"
                >
                  {t('viewOurWork')}
                </a>
              </div>


          
        </div>
      </section>

    
    </div>
  );
};

export default About;