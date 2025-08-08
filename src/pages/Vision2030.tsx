import React from 'react';
import { Target, Users, Globe, Zap, Building, Leaf, Award, TrendingUp } from 'lucide-react';

const Vision2030: React.FC = () => {
  const visionPillars = [
    {
      title: 'مجتمع حيوي',
      icon: Users,
      description: 'بناء مجتمعات نابضة بالحياة من خلال التطويرات السكنية والمرافق الثقافية والترفيهية التي تعزز جودة الحياة.',
      initiatives: [
        'التطويرات المتمحورة حول المجتمع',
        'المرافق الثقافية والترفيهية',
        'حلول الإسكان الميسر',
        'بنية المدن الذكية التحتية'
      ],
      color: 'from-green-600 to-green-700'
    },
    {
      title: 'اقتصاد مزدهر',
      icon: TrendingUp,
      description: 'دعم النمو الاقتصادي من خلال المرافق الصناعية ومراكز التكنولوجيا ومشاريع السياحة والبنية التحتية اللوجستية.',
      initiatives: [
        'المرافق الصناعية والتصنيعية',
        'مراكز التكنولوجيا والابتكار',
        'مشاريع السياحة والترفيه',
        'بنية اللوجستيات والنقل التحتية'
      ],
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'وطن طموح',
      icon: Target,
      description: 'المساهمة في المشاريع الضخمة والمباني الحكومية ومرافق التعليم والرعاية الصحية لبناء مستقبل مستدام.',
      initiatives: [
        'دعم نيوم والمشاريع الضخمة',
        'المباني الحكومية والمؤسسية',
        'مرافق التعليم والرعاية الصحية',
        'مشاريع التنمية المستدامة'
      ],
      color: 'from-purple-600 to-purple-700'
    }
  ];

  const contributions = [
    {
      metric: '$2.5B+',
      label: 'المساهمة الاقتصادية',
      description: 'إجمالي قيمة المشاريع المساهمة في الاقتصاد الوطني',
      icon: Building
    },
    {
      metric: '15,000+',
      label: 'فرص العمل المُنشأة',
      description: 'فرص العمل المباشرة وغير المباشرة المُنشأة',
      icon: Users
    },
    {
      metric: '85%',
      label: 'المحتوى المحلي',
      description: 'نسبة المحتوى المحلي في مشاريعنا',
      icon: Globe
    },
    {
      metric: '12',
      label: 'شهادات الاستدامة',
      description: 'شهادات البناء الأخضر والاستدامة البيئية',
      icon: Leaf
    }
  ];

  const sustainabilityFeatures = [
    {
      title: 'ممارسات البناء الأخضر',
      description: 'تطبيق أحدث تقنيات البناء المستدام والصديق للبيئة',
      icon: Leaf,
      percentage: 90
    },
    {
      title: 'كفاءة الطاقة',
      description: 'استخدام أنظمة الطاقة المتجددة وتقنيات توفير الطاقة',
      icon: Zap,
      percentage: 85
    },
    {
      title: 'المحافظة على المياه',
      description: 'تطبيق أنظمة إعادة تدوير المياه وتقنيات الحفظ',
      icon: Globe,
      percentage: 80
    },
    {
      title: 'تقليل النفايات',
      description: 'برامج إعادة التدوير وإدارة النفايات المستدامة',
      icon: Award,
      percentage: 75
    }
  ];

  const upcomingProjects = [
    {
      name: 'البنية التحتية الداعمة لنيوم',
      description: 'مشاريع البنية التحتية والمرافق الداعمة لمدينة نيوم المستقبلية',
      timeline: '2024-2027',
      investment: '$500M+',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'مرافق البحر الأحمر السياحية',
      description: 'تطوير المرافق السياحية والفندقية في مشروع البحر الأحمر',
      timeline: '2024-2026',
      investment: '$300M+',
      image: 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'مدينة القدية الترفيهية',
      description: 'بناء المرافق الترفيهية والرياضية في مدينة القدية',
      timeline: '2025-2028',
      investment: '$450M+',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

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
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Saudi_Vision_2030_logo.svg/1200px-Saudi_Vision_2030_logo.svg.png"
              alt="Saudi Vision 2030"
              className="h-20 mx-auto mb-6 opacity-90"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            بناء رؤية 2030
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            مساهم فخور في تحقيق أهداف رؤية المملكة العربية السعودية الطموحة 2030
          </p>
        </div>
      </section>

      {/* Vision Pillars */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              دعم الركائز الثلاث لرؤية 2030
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              مساهمة مباشرة في تحقيق أهداف التحول الوطني من خلال مشاريعنا المتنوعة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {visionPillars.map((pillar, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${pillar.color}`}></div>
                
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {pillar.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      المبادرات الرئيسية:
                    </h4>
                    {pillar.initiatives.map((initiative, initIndex) => (
                      <div key={initIndex} className="flex items-start space-x-3 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{initiative}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Contribution */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              مساهمتنا في رؤية 2030
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              تأثير قابل للقياس في تحقيق أهداف التحول الوطني
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {contributions.map((contribution, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <contribution.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {contribution.metric}
                </div>
                <div className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                  {contribution.label}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {contribution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                الاستدامة والمسؤولية البيئية
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                التزامنا بتطبيق أعلى معايير الاستدامة البيئية في جميع مشاريعنا لضمان مستقبل أفضل للأجيال القادمة
              </p>
              
              <div className="space-y-6">
                {sustainabilityFeatures.map((feature, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                    <div className="ml-13">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">معدل التطبيق</span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">{feature.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${feature.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl opacity-50"></div>
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                <img
                  src="https://images.pexels.com/photos/9875456/pexels-photo-9875456.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sustainable Construction"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    شهادات البناء الأخضر
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    مشاريع معتمدة من LEED للبناء المستدام
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Vision 2030 Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              المشاريع القادمة لرؤية 2030
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              مشاريع مثيرة قادمة تساهم في تحقيق أهداف رؤية المملكة 2030
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingProjects.map((project, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-white font-semibold">{project.timeline}</div>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-gray-900">{project.investment}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            شاركنا في بناء رؤية 2030
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            انضم إلى شركة أوج الدولية في المساهمة في تحقيق أهداف رؤية المملكة الطموحة
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              ناقش مشروع رؤية 2030
            </a>
            <a
              href="/register"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              كن شريكاً
            </a>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 text-green-200 dark:text-green-800 opacity-50">
              <Target className="w-full h-full" />
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 leading-relaxed italic mb-8">
              "التزامنا بتحقيق رؤية المملكة 2030 من خلال مشاريع نوعية تساهم في بناء مستقبل مزدهر ومستدام"
            </blockquote>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                فريق قيادة شركة أوج الدولية
              </div>
              <div className="text-green-600 dark:text-green-400 font-medium">شركاء رؤية 2030</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision2030;