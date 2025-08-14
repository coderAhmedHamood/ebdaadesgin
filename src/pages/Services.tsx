import React, { useState, useEffect } from 'react';
import { Building, Home, Factory, Wrench, Shield, Zap, Users, Award, CheckCircle, Palette, Code, Smartphone, Activity, Megaphone, ShoppingCart, type LucideIcon } from 'lucide-react';
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

// Define Package type based on DB schema
interface PackageItem {
  id: number;
  title: string;
  description: string;
  price: number | null;
  delivery_time: string | null;
  features: string[];
  category: string | null;
  is_active: boolean;
  display_order: number | null;
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
  // Packages state
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [pkLoading, setPkLoading] = useState<boolean>(true);
  const [pkError, setPkError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages');
        if (!res.ok) throw new Error('Failed to fetch packages');
        const data = await res.json();
        // Filter active packages and sort by display_order then id
        const sorted = (Array.isArray(data) ? data : [])
          .filter((p: PackageItem) => p.is_active)
          .sort((a: PackageItem, b: PackageItem) => {
            const ao = a.display_order ?? 999999;
            const bo = b.display_order ?? 999999;
            if (ao !== bo) return ao - bo;
            return (a.id || 0) - (b.id || 0);
          });
        setPackages(sorted);
        setPkError(null);
      } catch (e) {
        setPkError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setPkLoading(false);
      }
    };
    fetchPackages();
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

      {/* Services Grid
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
      </section> */}

     

      {/* Comprehensive Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('servicesFullTitle')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('servicesFullSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Design */}
            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('webDesignTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('webDesignDesc')}</p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                {[t('webDesignFeature1'), t('webDesignFeature2'), t('webDesignFeature3'), t('webDesignFeature4'), t('webDesignFeature5')].map((feature) => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('webDesignDelivery')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('webDesignReviews')}</div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{t('webDesignPrice')}</div>
                <a href="/contact" className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{}</a>
              </div>
            </div>

            {/* Web Development */}

         




            {/* Digital Marketing (Comprehensive Service) */}
            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-600 to-rose-700 rounded-xl flex items-center justify-center mb-6">
                <Megaphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('marketingTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('marketingDesc')}</p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                {[t('marketingFeature1'), t('marketingFeature2'), t('marketingFeature3'), t('marketingFeature4'), t('marketingFeature5')].map((feature) => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('marketingDelivery')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('marketingReviews')}</div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{t('marketingPrice')}</div>
                <a href="/contact" className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{}</a>
              </div>
            </div>

            {/* Store Management (Comprehensive Service) */}
            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center mb-6">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('storeMgmtTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('storeMgmtDesc')}</p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                {[t('storeMgmtFeature1'), t('storeMgmtFeature2'), t('storeMgmtFeature3'), t('storeMgmtFeature4'), t('storeMgmtFeature5')].map((feature) => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('storeMgmtDelivery')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('storeMgmtReviews')}</div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{t('storeMgmtPrice')}</div>
                <a href="/contact" className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{}</a>
              </div>
            </div>



     {/* الكارت الأول (تصميمه الرمادي، لكن نصوص برمجة) */}
     <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6">
            <Code className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('webDevTitle')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{t('webDevDesc')}</p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
            {[t('webDevFeature1'), t('webDevFeature2'), t('webDevFeature3'), t('webDevFeature4'), t('webDevFeature5')].map((feature) => (
              <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
            ))}
          </ul>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('webDevDelivery')}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('webDevReviews')}</div>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900 dark:text-white">{t('webDevPrice')}</div>
            <a href="/contact" className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{}</a>
          </div>
        </div>

            

            {/* Responsive Design */}
            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('responsiveTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('responsiveDesc')}</p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                {[t('responsiveFeature1'), t('responsiveFeature2'), t('responsiveFeature3'), t('responsiveFeature4'), t('responsiveFeature5')].map((feature) => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('responsiveDelivery')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('responsiveReviews')}</div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{t('responsivePrice')}</div>
                <a href="/contact" className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{}</a>
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('perfTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('perfDesc')}</p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                {[t('perfFeature1'), t('perfFeature2'), t('perfFeature3'), t('perfFeature4'), t('perfFeature5')].map((feature) => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('perfDelivery')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('perfReviews')}</div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{t('perfPrice')}</div>
                <a href="/contact" className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{}</a>
              </div>
            </div>

        

            {/* Support and Maintenance */}
            <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('supportTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{t('supportDesc')}</p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                {[t('supportFeature1'), t('supportFeature2'), t('supportFeature3'), t('supportFeature4'), t('supportFeature5')].map((feature) => (
                  <li key={feature} className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /><span>{feature}</span></li>
                ))}
              </ul>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t('supportDelivery')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('supportReviews')}</div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900 dark:text-white">{t('supportPrice')}</div>
                <a href="/contact" className="px-4 py-2 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">{}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section (Dynamic from DB) */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('pricingTitle')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t('pricingSubtitle')}</p>
          </div>

          {pkLoading && (
            <p className="text-center text-gray-500">{t('loading')}...</p>
          )}
          {pkError && (
            <p className="text-center text-red-500">{t('error')}: {pkError}</p>
          )}

          {!pkLoading && !pkError && (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {packages.map((pkg, idx) => {
                const isFeatured = (pkg.display_order ?? 999999) === 1 || idx === 0;
                return (
                  <div
                    key={pkg.id}
                    className={
                      isFeatured
                        ? 'relative bg-blue-900 text-white rounded-2xl p-8 shadow-2xl transform lg:scale-105 flex flex-col h-full'
                        : 'bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg flex flex-col h-full'
                    }
                  >
                    {isFeatured && (
                      <span className="absolute top-0 right-8 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-b-lg">{t('mostPopular')}</span>
                    )}
                    <h3 className={`text-2xl font-bold mb-2 ${isFeatured ? '' : 'text-gray-900 dark:text-white'}`}>{pkg.title}</h3>
                    <p className={`${isFeatured ? 'text-blue-200' : 'text-gray-600 dark:text-gray-400'} mb-6`}>{pkg.description}</p>
                    <div className={`text-4xl font-bold mb-2 ${isFeatured ? '' : 'text-gray-900 dark:text-white'}`}>
                      {pkg.price != null ? `${pkg.price} ريال` : t('pricingContact')}
                    </div>
                    <p className={`${isFeatured ? 'text-blue-300' : 'text-gray-500 dark:text-gray-400'} mb-6 font-semibold`}>
                      {pkg.delivery_time || ''}
                    </p>
                    <ul className={`space-y-4 mb-8 ${isFeatured ? 'text-blue-200' : 'text-gray-600 dark:text-gray-300'}`}>
                      {pkg.features?.map((f, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className={`w-5 h-5 mr-3 ${isFeatured ? 'text-yellow-400' : 'text-green-500'}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/contact"
                      className={
                        isFeatured
                          ? 'mt-auto w-full text-center px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300'
                          : 'mt-auto w-full text-center px-6 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300'
                      }
                    >
                      {t('choosePackage')}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}></div>
            <div className="relative p-12 sm:p-16 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('customQuoteTitle')}
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                {t('customQuoteDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/quote"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 text-lg"
                >
                  {t('goToCustomQuote')}
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

 {/* Why Choose Our Services */}
 <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl ring-1 ring-gray-100 dark:ring-gray-700 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-yellow-500 to-green-600" />
            <div className="relative p-10 sm:p-14">
              <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">
                  {t('whyChooseTitle')}
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                  {t('whyChooseSubtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-10 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-100 dark:ring-gray-700">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('fastEfficient')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('fastEfficientDesc')}
                  </p>
                </div>

                <div className="text-center p-10 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-100 dark:ring-gray-700">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('awardWinningQuality')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('awardWinningQualityDesc')}
                  </p>
                </div>

                <div className="text-center p-10 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-100 dark:ring-gray-700">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('safetyFirst')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {t('safetyFirstDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
};

export default Services;