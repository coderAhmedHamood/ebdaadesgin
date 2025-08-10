import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Award, TrendingUp, CheckCircle, Star, Play, Sparkles, Zap, Shield, Globe, Home as HomeIcon, Lightbulb, Palette, Rocket, Search, Code, Megaphone, ShoppingCart } from 'lucide-react';

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

const Home: React.FC = () => {
  // Value pillars (non-numeric) to replace stats
  const stats = [
    {
      title: 'جودة مضمونة',
      description: 'معايير تطوير عالية، كود نظيف، واختبارات تضمن الاستقرار.',
      icon: Award,
      color: 'from-blue-600 to-blue-700',
    },
    {
      title: 'أمان متقدّم',
      description: 'بروتوكولات حماية قوية وتطبيق أفضل ممارسات الأمن.',
      icon: Shield,
      color: 'from-green-600 to-green-700',
    },
    {
      title: 'دعم مستمر',
      description: 'مرافقة بعد الإطلاق وتحديثات وتحسينات مستمرة.',
      icon: CheckCircle,
      color: 'from-purple-600 to-purple-700',
    },
    {
      title: 'تجربة مستخدم رائعة',
      description: 'تصميم يركّز على التحويل وسهولة الاستخدام والأداء.',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  const features = [
    {
      title: 'جودة برمجية مضمونة',
      description: 'معايير كود نظيف، اختبارات شاملة، وأفضل الممارسات لضمان أداء واعتمادية عالية للمواقع والأنظمة',
      icon: Award,
      color: 'from-blue-600 to-blue-700',
      delay: '0ms'
    },
    {
      title: 'فريق تقني خبير',
      description: 'مطوّرون ومهندسون ومستشارون بخبرة عالية في تطوير المواقع والأنظمة والسحابة والواجهات',
      icon: Users,
      color: 'from-green-600 to-green-700',
      delay: '100ms'
    },
    {
      title: 'تسليم سريع ومرن',
      description: 'منهجيات Agile وسير عمل CI/CD لضمان إطلاقات أسرع وتحديثات مستمرة بدون انقطاع',
      icon: CheckCircle,
      color: 'from-purple-600 to-purple-700',
      delay: '200ms'
    },
    {
      title: 'دعم وتسويق ونمو',
      description: 'دعم فني مستمر، تحسين محركات البحث SEO، وتسويق رقمي يعزّز الوصول ويضاعف النتائج',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      delay: '300ms'
    },
  ];

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Building': Building2,
      'Building2': Building2,
      'Home': HomeIcon,
      'Users': Users,
      'Zap': Zap,
      'Award': Award,
      'Shield': Shield,
      'Globe': Globe
    };
    return iconMap[iconName] || Building2;
  };

  // Function to get color based on category or default
  const getServiceColor = (category: string, index: number) => {
    const colors = [
      'from-blue-600 to-blue-700',
      'from-green-600 to-green-700', 
      'from-purple-600 to-purple-700'
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        
        // Filter active services and sort by display_order, then take first 3
        const activeServices = data
          .filter((service: Service) => service.is_active)
          .sort((a: Service, b: Service) => a.display_order - b.display_order)
          .slice(0, 3)
          .map((service: Service, index: number) => ({
            title: service.title,
            description: service.short_description || service.description,
            icon: getIconComponent(service.icon),
            image: service.image,
            color: getServiceColor(service.category, index)
          }));
        
        setServices(activeServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to default services if API fails
        setServices([
          {
            title: 'البناء التجاري',
            description: 'مباني مكاتب حديثة ومراكز تسوق ومجمعات تجارية متطورة',
            icon: Building2,
            image: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=600',
            color: 'from-blue-600 to-blue-700'
          },
          {
            title: 'المشاريع السكنية',
            description: 'فلل فاخرة ومجمعات سكنية ومجتمعات مسورة عصرية',
            icon: Users,
            image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
            color: 'from-green-600 to-green-700'
          },
          {
            title: 'البناء الصناعي',
            description: 'مرافق صناعية متطورة ومستودعات ومراكز لوجستية',
            icon: Zap,
            image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600',
            color: 'from-purple-600 to-purple-700'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const achievements = [
    {
      title: 'متماشون مع رؤية 2030',
      description: 'مساهم رسمي في تحقيق أهداف رؤية المملكة 2030',
      icon: Globe,
      value: '$2.5B+',
      metric: 'قيمة المشاريع'
    },
    {
      title: 'الاستدامة البيئية',
      description: 'مشاريع معتمدة بشهادات البناء الأخضر',
      icon: Sparkles,
      value: '12',
      metric: 'شهادات خضراء'
    },
    {
      title: 'الأمان والجودة',
      description: 'معايير السلامة والجودة الدولية',
      icon: Shield,
      value: '100%',
      metric: 'معدل الأمان'
    }
  ];

  const workProcess = [
    {
      step: '01',
      title: 'الاستشارة والتخطيط',
      description: 'نبدأ بفهم احتياجاتك وأهدافك لوضع استراتيجية مناسبة.',
      icon: Lightbulb,
      color: 'text-yellow-400',
    },
    {
      step: '02',
      title: 'التصميم والتطوير',
      description: 'نصمم ونطور موقعك باستخدام أحدث التقنيات والمعايير.',
      icon: Palette,
      color: 'text-blue-400',
    },
    {
      step: '03',
      title: 'الاختبار والمراجعة',
      description: 'نختبر الموقع بدقة ونراجعه معك لضمان الجودة.',
      icon: Search,
      color: 'text-green-400',
    },
    {
      step: '04',
      title: 'الإطلاق والدعم',
      description: 'نطلق موقعك ونقدم الدعم المستمر لضمان نجاحه.',
      icon: Rocket,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="pt-20 overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          ></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-500/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-purple-500/10 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Company Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-fade-in">
              <Sparkles className="w-5 h-5 text-yellow-400 mr-2 rtl:ml-2 rtl:mr-0" />
              <span className="text-white font-medium">
                نواكب رؤية 2030
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-slide-up">
              <span className="block">نصنع المستقبل الرقمي بأيدٍ عربية</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed animate-slide-up delay-200">
              إبداع ديزاين - منصة متكاملة للحلول البرمجية وتطوير المواقع، نحول أفكارك إلى تطبيقات ومواقع استثنائية تقود نجاحك الرقمي
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up delay-400">
              <Link
                to="/contact"
                className="group relative px-10 py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-2 hover:scale-105 flex items-center space-x-3 rtl:space-x-reverse text-lg"
              >
                <span>ابدأ الآن</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/projects"
                className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center space-x-3 rtl:space-x-reverse text-lg"
              >
                <Play className="w-6 h-6" />
                <span>اطلع على المشاريع</span>
              </Link>
            </div>

            {/* Value Pillars (non-numeric) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto animate-slide-up delay-600">
              {stats.map((item, index) => (
                <div key={index} className="text-center group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-xl font-bold text-white mb-2">{item.title}</div>
                  <div className="text-blue-100 text-sm leading-relaxed">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6">
              لماذا نحن
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              لماذا تختار إبداع ديزاين؟
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              نجمع بين عقود من الخبرة والتكنولوجيا المتطورة لتقديم حلول إنشائية استثنائية تتماشى مع رؤية المملكة الطموحة 2030
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: feature.delay }}
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* Services Preview Section */}
   <section className="py-32 bg-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            خدماتنا الرقمية
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            تجارب مستخدم مبهرة، أداء عالٍ، وتسويق ذكي—كل ما يلزم لنجاح مشروعك على الويب في مكان واحد.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Web Design */}
            <div className="group relative p-8 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/10 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">تصميم المواقع</h3>
              <p className="text-gray-300 mb-6">تصاميم عصرية متجاوبة تُبرز هوية علامتك وتمنح زوّارك تجربة استخدام مميزة.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">مناسب للشركات وروّاد الأعمال</span>
                <Link to="/services" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold">
                  تعرف أكثر
                  <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                </Link>
              </div>
              <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Digital Marketing */}
            <div className="group relative p-8 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/10 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-rose-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">التسويق الرقمي</h3>
              <p className="text-gray-300 mb-6">حملات إعلانية، إدارة منصات التواصل، وتحسين الظهور في محركات البحث لزيادة العملاء.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">نتائج قابلة للقياس وتحسين مستمر</span>
                <Link to="/services" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold">
                  تعرف أكثر
                  <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                </Link>
              </div>
              <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-rose-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* E-commerce Store Management */}
            <div className="group relative p-8 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/10 transition-all duration-300 shadow-xl overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">إدارة المتاجر الإلكترونية</h3>
              <p className="text-gray-300 mb-6">إطلاق وإدارة متاجر احترافية مع تحسين المنتجات والمدفوعات والشحن وتجربة الشراء.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">تجهيز كامل وتشغيل مستمر</span>
                <Link to="/services" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold">
                  تعرف أكثر
                  <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                </Link>
              </div>
              <div className="absolute -right-16 -bottom-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          
        </div>
      </section>



 
      {/* How We Work Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">كيف نعمل</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">عملية واضحة ومنظمة لضمان تحقيق أفضل النتائج</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
            <div className="grid md:grid-cols-4 gap-12">
              {workProcess.map((item, index) => (
                <div key={index} className="text-center relative bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-white dark:bg-gray-900 border-4 border-gray-200 dark:border-gray-700`}>
                    {React.createElement(item.icon, { className: `w-10 h-10 ${item.color}` })}
                  </div>
                  <span className="absolute -top-4 -right-4 bg-blue-600 text-white font-bold text-lg w-12 h-12 flex items-center justify-center rounded-full border-4 border-white dark:border-gray-900">{item.step}</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 

      {/* Enhanced Call to Action */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Star className="w-5 h-5 text-yellow-400 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="text-white font-medium">
              انضم إلى 20+ عميل راضٍ
            </span>
          </div>
 
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            مستعد لبناء رؤيتك؟
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            انضم إلى مئات العملاء الراضين الذين يثقون بإبداع ديزاين لاحتياجاتهم الرقمية. دعنا نحول مشروعك إلى واقع بخبرتنا والتزامنا بالتميز.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="group relative px-12 py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-2 hover:scale-105 text-lg"
            >
              <span>سجل كعميل</span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/projects"
              className="px-12 py-6 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50 text-lg"
            >
              اطلع على أعمالنا
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">ISO 9001</div>
              <div className="text-blue-200 text-sm">
                شهادة الجودة
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">LEED</div>
              <div className="text-blue-200 text-sm">
                البناء الأخضر
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-blue-200 text-sm">
                الدعم المستمر
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">2030</div>
              <div className="text-blue-200 text-sm">
                شريك الرؤية
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;