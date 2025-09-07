import React from 'react';
import { Target, Users, Globe, Zap, Shield, Code, Award, Sparkles, Rocket } from 'lucide-react';

const Vision2030: React.FC = () => {
  const visionPillars = [
    {
      title: 'مجتمع رقمي حيوي',
      icon: Users,
      description: 'نبني تجارب رقمية إنسانية تُقرّب الخدمات من الناس عبر مواقع وتطبيقات سهلة وسريعة ومتاحة للجميع.',
      initiatives: [
        'تصميم تجربة مستخدم احترافية (UX/UI)',
        'إتاحة الوصول ودعم ذوي الإعاقة (Accessibility)',
        'دعم اللغات والهوية السعودية',
        'منصات محتوى متجددة وتفاعلية'
      ],
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      title: 'اقتصاد رقمي مزدهر',
      icon: Rocket,
      description: 'نُمكّن الأعمال من النمو عبر حلول برمجية مرنة، متكاملة، وقابلة للتوسع تدعم التجارة الإلكترونية والتحول الرقمي.',
      initiatives: [
        'مواقع ومتاجر إلكترونية عالية الأداء',
        'تكاملات API وأنظمة الدفع',
        'تحسين محركات البحث SEO والأداء (Core Web Vitals)',
        'لوحات تحكم وتحليلات لاتخاذ القرار'
      ],
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: 'منظومات رقمية موثوقة',
      icon: Target,
      description: 'نطوّر وتكامل حلولًا رقمية موثوقة وآمنة للجهات والمؤسسات بمختلف أنواعها، مع مراعاة الجودة والأمن والامتثال.',
      initiatives: [
        'بنى تحتية سحابية آمنة ومراقَبة',
        'هوية رقمية وتوثيق متعدد العوامل',
        'حوكمة بيانات وخصوصية',
        'تكامل الأنظمة وتجارب رقمية إنسانية'
      ],
      color: 'from-purple-600 to-fuchsia-700'
    }
  ];

  const contributions = [
    {
      label: 'تحول رقمي فعّال',
      description: 'من أفكار إلى منتجات رقمية متكاملة تدعم أهداف رؤية المملكة 2030.',
      icon: Sparkles
    },
    {
      label: 'أمن وحماية متقدمة',
      description: 'تطبيق أفضل ممارسات الأمن السيبراني والتشفير وحماية البيانات.',
      icon: Shield
    },
    {
      label: 'أداء وتجربة مميزة',
      description: 'سرعة، استجابة، وتجربة استخدام تُرضي الجمهور وتدعم الوصول.',
      icon: Rocket
    },
    {
      label: 'تمكين المحتوى المحلي',
      description: 'منصات عربية الهوية تدعم القيم والثقافة وتُبرز قصص النجاح.',
      icon: Globe
    }
  ];

  const sustainabilityFeatures = [
    {
      title: 'استضافة خضراء',
      description: 'اختيار مزوّدي استضافة يراعون الطاقة المتجددة وتقليل الانبعاثات.',
      icon: Award
    },
    {
      title: 'تحسين الأداء',
      description: 'تقنيات ضغط الصور، التحميل الكسول، وتقليل الأكواد لخفض الاستهلاك.',
      icon: Zap
    },
    {
      title: 'هندسة برمجيات رشاقة',
      description: 'أطر حديثة وكود نظيف يقللان الموارد ويحسّنان قابلية الصيانة.',
      icon: Code
    },
    {
      title: 'أمان وخصوصية',
      description: 'تشفير واتصالات آمنة وممارسات خصوصية مسؤولة للمستخدمين.',
      icon: Shield
    }
  ];

  const upcomingProjects = [
    {
      name: 'مبادرات التحول الرقمي',
      description: 'منصات رقمية متكاملة تدعم الخدمات الحكومية والخاصة وفق معايير تجربة المستخدم.',
      image: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'المحتوى العربي والهوية',
      description: 'مواقع عربية الهوية تدعم الثقافة المحلية وتقدم محتوى ثريًا وسهل الوصول.',
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'التكامل والتشغيل البيني',
      description: 'حلول تكامل API وأنظمة دفع وتحقق وهوية رقمية لتعزيز التجربة والاعتمادية.',
      image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-28 text-white">
        {/* Aurora / gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-indigo-900 to-purple-900" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Saudi_Vision_2030_logo.svg/1200px-Saudi_Vision_2030_logo.svg.png"
            alt="Saudi Vision 2030"
            className="h-16 md:h-20 mx-auto mb-6 opacity-90"
          />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-100 text-sm mb-5 backdrop-blur">
            <Sparkles className="w-4 h-4" /> نبتكر للمستقبل | Vision 2030
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
            رؤية 2030 الرقمية — من الطموح إلى أثر مُلهِم
          </h1>
          <p className="text-lg md:text-2xl text-emerald-100/90 max-w-4xl mx-auto mb-10 leading-relaxed">
            نبني تجارب ويب سريعة، آمنة، وبإنسانية عالية؛ تشعل الفضول، وتطلق نموًا رقميًا مزدهرًا.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pillars"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-emerald-100 transition-colors duration-300 shadow-lg"
            >
              استكشف الركائز
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/20 transition-colors duration-300 border border-white/20"
            >
              ابدأ مشروعك الآن
            </a>
          </div>

          {/* Impact ribbon */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <div className="text-sm text-emerald-200">سرعة وأداء</div>
              <div className="text-white/90 text-base">Core Web Vitals ممتازة</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <div className="text-sm text-emerald-200">أمان وخصوصية</div>
              <div className="text-white/90 text-base">تشفير وممارسات موثوقة</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <div className="text-sm text-emerald-200">تجربة إنسانية</div>
              <div className="text-white/90 text-base">وصول شامل وUX متقن</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <div className="text-sm text-emerald-200">موثوقية وتوسع</div>
              <div className="text-white/90 text-base">قابلية نمو وتشغيل آمن</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition strip */}
      <section className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 border border-emerald-100/60 dark:border-gray-700">
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold mb-1">لماذا نحن؟</div>
              <div className="text-gray-700 dark:text-gray-200">نحوّل الرؤية إلى منتجات رقمية مؤثرة تتحدث بلغة المستخدم.</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 border border-blue-100/60 dark:border-gray-700">
              <div className="text-blue-600 dark:text-blue-400 font-semibold mb-1">تميّز تنافسي</div>
              <div className="text-gray-700 dark:text-gray-200">تصميم مُلهِم + أداء متفوق + أمن متقدم + دعم مستمر.</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 border border-purple-100/60 dark:border-gray-700">
              <div className="text-purple-600 dark:text-purple-400 font-semibold mb-1">جاهزية سريعة</div>
              <div className="text-gray-700 dark:text-gray-200">رحلة واضحة من الفكرة للإطلاق بخطوات بسيطة.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Pillars */}
      <section id="pillars" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              ركائز التحول الرقمي لرؤية 2030
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              حلول رقمية عملية تُترجم الرؤية إلى تجارب وخدمات ويب تقدّم قيمة حقيقية للمجتمع والاقتصاد والحكومة.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {visionPillars.map((pillar, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-gray-100/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className={`h-1.5 bg-gradient-to-r ${pillar.color}`}></div>
                
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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

      {/* Client Journey Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">رحلة النجاح بخمس خطوات</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">مسار واضح يُطمئن العميل ويُشوقه للانطلاق بثقة نحو منتج رقمي مزدهر.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { title: 'اكتشاف الأهداف', desc: 'جلسة فهم للأهداف والجمهور والمقياس المطلوب.' },
              { title: 'تصميم مُلهِم', desc: 'UX/UI بعناية وملاءمة الهوية السعودية.' },
              { title: 'تطوير آمن', desc: 'بنى حديثة، تكاملات ذكية، واختبارات دقيقة.' },
              { title: 'إطلاق متدرج', desc: 'قياس التجربة والتحسين وصولًا للتمايز.' },
              { title: 'دعم ونمو', desc: 'تحسين مستمر، أمن محدث، وتوسع مرن.' },
            ].map((step, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="absolute -top-3 -start-3 w-8 h-8 rounded-xl bg-emerald-600 text-white text-sm font-bold flex items-center justify-center shadow">{i+1}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{step.title}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise / Impact (as elegant badges) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              وعودنا لعملاء رؤية 2030
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              أثر حقيقي يُقاس بالتجربة والموثوقية والجمال — لا بالأرقام فقط.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {contributions.map((contribution, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white/80 dark:bg-white/5 backdrop-blur rounded-3xl border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow">
                  <contribution.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                  {contribution.label}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {contribution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Tech Practices + Pledge */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Pledge card */}
          <div className="mb-16 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">ميثاق المسؤولية التقنية</div>
                <div className="text-emerald-100">أداء متفوق، أمن راسخ، خصوصية محترمة، واستدامة عملية في كل مشروع.</div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white">
                <Shield className="w-5 h-5" /> التزام مستمر
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              الممارسات التقنية المسؤولة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              مجموعة ممارسات عملية نطبقها في كل مشروع لضمان الأداء، الأمان، الجودة، وكفاءة الموارد — بانسجام مع توجهات الرؤية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white/80 dark:bg-white/5 backdrop-blur rounded-2xl border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            ابدأ اليوم رحلتك الرقمية
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            مع "إبداع ديزين" ستحصل على منتج ويب مُلهِم الأداء، جميل التجربة، وآمن البنية—متوافق مع مستهدفات رؤية 2030.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              ابدأ نقاش مشروعك الرقمي
            </a>
            <a
              href="/register"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              كن شريكًا
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
              "نُشعل خيال المستخدم ونُترجم طموح الرؤية إلى أثر—منتجات رقمية تُرى وتُحَب وتستمر."
            </blockquote>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                فريق "إبداع ديزين"
              </div>
              <div className="text-green-600 dark:text-green-400 font-medium">نُسهم في رؤية 2030</div>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/966562428504"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        {/* WhatsApp Icon (SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.24c-.3-.15-1.77-.87-2.05-.97-.28-.1-.49-.15-.7.15-.2.3-.8.97-.98 1.17-.18.2-.36.22-.66.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.33.45-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.7-1.68-.96-2.3-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.52.07-.8.37-.28.3-1.06 1.03-1.06 2.52 0 1.5 1.09 2.95 1.24 3.15.15.2 2.15 3.28 5.2 4.6.73.32 1.3.5 1.74.64.73.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z"/>
          <path d="M26.6 5.4C23.9 2.7 20.2 1.2 16.3 1.2 8.8 1.2 2.7 7.3 2.7 14.8c0 2.3.6 4.5 1.8 6.5L2 30.8l9.7-2.5c1.9 1 4.1 1.5 6.3 1.5 7.5 0 13.6-6.1 13.6-13.6 0-3.9-1.5-7.6-4.3-10.3zM16 27.8c-2 0-4-.5-5.8-1.5l-.4-.2-5.8 1.5 1.6-5.6-.2-.4c-1.1-1.8-1.6-3.8-1.6-5.9C3.8 8.5 9.3 3 16 3c3.3 0 6.4 1.3 8.8 3.6 2.3 2.3 3.6 5.5 3.6 8.8 0 6.8-5.5 12.4-12.4 12.4z"/>
        </svg>
      </a>
    </div>
  );
};

export default Vision2030;