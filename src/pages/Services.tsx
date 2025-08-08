import React, { useState, useEffect } from 'react';
import { Building, Home, Factory, Wrench, Shield, Zap, Users, Award, CheckCircle, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Define the Service type based on the database schema
interface Service {
  id: number;
  title: string;
  description: string;
  short_description: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  category: string;
  is_active: boolean;
  display_order: number;
}

// Map icon names from the database to Lucide icon components
const iconMap: { [key: string]: LucideIcon } = {
  Building,
  Home,
  Factory,
  Wrench,
  Shield,
  Zap,
  Users,
  Award,
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
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

    fetchServices();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('servicesTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            {t('servicesSubtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {loading && <p className="text-center text-gray-500">{t('loading')}...</p>}
            {error && <p className="text-center text-red-500">{t('error')}: {error}</p>}
            {!loading && !error && services.map((service) => {
                const IconComponent = iconMap[service.icon] || Building; // Fallback to a default icon
                return (
                  <div
                    key={service.id}
                    className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {service.description}
                      </p>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                      الميزات الرئيسية
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            التميز في كل خدمة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              نهجنا الشامل يضمن التعامل مع كل جانب من جوانب مشروعك بأعلى معايير الجودة والمهنية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('fastEfficient')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('fastEfficientDesc')}
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              جودة حائزة على جوائز
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('awardWinningQualityDesc')}
              </p>
            </div>

            <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('safetyFirst')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('safetyFirstDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('pricingTitle')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('pricingSubtitle')}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Basic Package */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('basicPackageTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('basicPackageDesc')}</p>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('basicPackagePrice')}</div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-semibold">{t('basicPackageDelivery')}</p>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
                {[t('basicPackageFeature1'), t('basicPackageFeature2'), t('basicPackageFeature3'), t('basicPackageFeature4'), t('basicPackageFeature5'), t('basicPackageFeature6')].map(feature => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <a href="/contact" className="mt-auto w-full text-center px-6 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{t('choosePackage')}</a>
            </div>

            {/* Advanced Package */}
            <div className="relative bg-blue-900 text-white rounded-2xl p-8 shadow-2xl transform lg:scale-105 flex flex-col h-full">
              <span className="absolute top-0 right-8 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-b-lg">{t('mostPopular')}</span>
              <h3 className="text-2xl font-bold mb-2">{t('advancedPackageTitle')}</h3>
              <p className="text-blue-200 mb-6">{t('advancedPackageDesc')}</p>
              <div className="text-4xl font-bold mb-2">{t('advancedPackagePrice')}</div>
              <p className="text-blue-300 mb-6 font-semibold">{t('advancedPackageDelivery')}</p>
              <ul className="space-y-4 text-blue-200 mb-8">
                {[t('advancedPackageFeature1'), t('advancedPackageFeature2'), t('advancedPackageFeature3'), t('advancedPackageFeature4'), t('advancedPackageFeature5'), t('advancedPackageFeature6'), t('advancedPackageFeature7'), t('advancedPackageFeature8')].map(feature => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-yellow-400 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <a href="/contact" className="mt-auto w-full text-center px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300">{t('choosePackage')}</a>
            </div>

            {/* Professional Package */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('professionalPackageTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('professionalPackageDesc')}</p>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('professionalPackagePrice')}</div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-semibold">{t('professionalPackageDelivery')}</p>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
                {[t('professionalPackageFeature1'), t('professionalPackageFeature2'), t('professionalPackageFeature3'), t('professionalPackageFeature4'), t('professionalPackageFeature5'), t('professionalPackageFeature6'), t('professionalPackageFeature7'), t('professionalPackageFeature8'), t('professionalPackageFeature9'), t('professionalPackageFeature10')].map(feature => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <a href="/contact" className="mt-auto w-full text-center px-6 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{t('choosePackage')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}></div>
            <div className="relative p-12 sm:p-16 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('customServiceTitle')}
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                {t('customServiceDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 text-lg"
                >
                  {t('getCustomOffer')}
                </a>
                <a
                  href="/projects"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30 text-lg"
                >
                  {t('viewOurWork')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;