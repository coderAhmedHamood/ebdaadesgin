import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Award, TrendingUp, CheckCircle, Star, Play, Sparkles, Zap, Shield, Globe, Home as HomeIcon } from 'lucide-react';

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
  const stats = [
    { 
      number: '200+', 
      label: 'المشاريع المنجزة', 
      icon: Building2,
      color: 'from-blue-600 to-blue-700'
    },
    { 
      number: '150+', 
      label: 'العملاء السعداء', 
      icon: Users,
      color: 'from-green-600 to-green-700'
    },
    { 
      number: '24+', 
      label: 'سنوات الخبرة', 
      icon: Award,
      color: 'from-purple-600 to-purple-700'
    },
    { 
      number: '95%', 
      label: 'معدل النجاح', 
      icon: TrendingUp,
      color: 'from-yellow-500 to-yellow-600'
    },
  ];

  const features = [
    {
      title: 'الجودة المتميزة',
      description: 'نلتزم بأعلى معايير الجودة في جميع مشاريعنا مع استخدام أفضل المواد والتقنيات الحديثة',
      icon: Award,
      color: 'from-blue-600 to-blue-700',
      delay: '0ms'
    },
    {
      title: 'فريق الخبراء',
      description: 'فريق من المهندسين والمتخصصين ذوي الخبرة الواسعة في مجال البناء والتشييد',
      icon: Users,
      color: 'from-green-600 to-green-700',
      delay: '100ms'
    },
    {
      title: 'التسليم في الوقت المحدد',
      description: 'نضمن تسليم جميع مشاريعنا في المواعيد المحددة مع الحفاظ على أعلى مستويات الجودة',
      icon: CheckCircle,
      color: 'from-purple-600 to-purple-700',
      delay: '200ms'
    },
    {
      title: 'رضا العملاء',
      description: 'نسعى دائماً لتحقيق أعلى مستويات رضا العملاء من خلال الخدمة المتميزة والجودة العالية',
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
      title: 'شريك رؤية 2030',
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
                شريك رؤية 2030 الرسمي
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-slide-up">
              <span className="block">نبني المملكة العربية السعودية الغد</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-12 max-w-5xl mx-auto leading-relaxed animate-slide-up delay-200">
              شركة أوج الدولية للمقاولات - شريكك الموثوق في التميز الإنشائي، متماشياً مع رؤية 2030
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up delay-600">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
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
              لماذا تختار شركة أوج الدولية؟
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
              خدماتنا
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              حلول إنشائية شاملة للمملكة العربية السعودية الحديثة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className={`absolute top-6 left-6 w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <Link
                    to="/services"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all duration-300"
                  >
                    <span>اعرف المزيد</span>
                    <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-32 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              إنجازاتنا المتميزة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
              نفخر بمساهماتنا في بناء مستقبل المملكة العربية السعودية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                    {achievement.metric}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
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
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Star className="w-5 h-5 text-yellow-400 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="text-white font-medium">
              انضم إلى 150+ عميل راضٍ
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            مستعد لبناء رؤيتك؟
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            انضم إلى مئات العملاء الراضين الذين يثقون بشركة أوج الدولية لاحتياجاتهم الإنشائية. دعنا نحول مشروعك إلى واقع بخبرتنا والتزامنا بالتميز.
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