import React, { useState, useEffect } from 'react';
import { Quote, Linkedin, Mail, Briefcase, Award, BrainCircuit, Loader, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  experience: string;
  specialty: string;
  achievements: string[];
  linkedin: string;
  email: string;
  department?: string;
  skills?: string[];
}

const Leadership: React.FC = () => {
  const { t } = useLanguage();
  const [leaders, setLeaders] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/team-members');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeaders(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        console.error('Failed to fetch team members:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <Loader className="w-16 h-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-50 dark:bg-gray-900 text-red-700 dark:text-red-300">
        <AlertTriangle className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold mb-2">{t('error_loading_data')}</h2>
        <p>{t('error_check_console')}</p>
        <p className="mt-2 text-sm text-gray-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Award className="h-20 w-20 mx-auto mb-6 opacity-90 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('leadershipTeam')}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            {t('visionaryLeaders')}
          </p>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('messagesFromLeaders')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('discoverVision')}
            </p>
          </div>

          <div className="space-y-20">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Leader Image */}
                <div className="lg:w-1/3">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl">
                      <div className="w-64 h-64 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{leader.name}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">{leader.position}</p>
                      </div>
                      <div className="mt-6 flex justify-center space-x-4">
                        {leader.linkedin && (
                          <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <Linkedin className="w-6 h-6" />
                          </a>
                        )}
                        {leader.email && (
                          <a href={`mailto:${leader.email}`} className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                            <Mail className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leader Message & Achievements */}
                <div className="lg:w-2/3">
                  <div className="relative bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <Quote className="absolute -top-4 -left-4 w-16 h-16 text-blue-200 dark:text-blue-800 opacity-50" />
                    <blockquote className="relative text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                      "{leader.bio}"
                    </blockquote>
                    {/* Meta badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {leader.department && (
                        <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {leader.department}
                        </span>
                      )}
                      {leader.specialty && (
                        <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          {leader.specialty}
                        </span>
                      )}
                      {leader.experience && (
                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          {leader.experience}
                        </span>
                      )}
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-3 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-yellow-500" />
                        {t('keyAchievements')}
                      </h4>
                      <ul className="space-y-2">
                        {leader.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-yellow-500 mr-2 mt-1">◆</span>
                            <span className="text-gray-600 dark:text-gray-400">{ach}</span>
                          </li>
                        ))}
                      </ul>
                      {leader.skills && leader.skills.length > 0 && (
                        <div className="mt-6">
                          <h5 className="font-semibold text-gray-800 dark:text-white mb-2">{t('skills') || 'المهارات'}</h5>
                          <div className="flex flex-wrap gap-2">
                            {leader.skills.map((s, idx) => (
                              <span key={idx} className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values Driven by Leadership */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('leadershipDrivenValues')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('leadershipValuesDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('visionaryLeadership')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('visionaryLeadershipDesc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('commitmentToExcellence')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('commitmentToExcellenceDesc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg text-center border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('collaborativeSpirit')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('collaborativeSpiritDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('partnerWithProvenLeadership')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('experienceLeadershipDifference')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              {t('startYourProject')}
            </a>
            <a
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              {t('learnMoreAboutUs')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;