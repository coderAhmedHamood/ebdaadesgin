import React, { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  language: 'ar';
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  // Navigation
  home: 'الرئيسية',
  services: 'الخدمات',
  projects: 'المشاريع',
  about: 'من نحن',
  contact: 'اتصل بنا',
  register: 'التسجيل كعميل',
  leadership: 'القيادة',
  testimonials: 'شهادات العملاء',
  faq: 'الأسئلة الشائعة',
  vision2030: 'رؤية 2030',
  
  // Company
  companyName: 'إبداع ديزاين',
  tagline: 'التميز في البناء',
  
  // Homepage
  heroTitle: 'نبني المملكة العربية السعودية الغد',
  heroSubtitle: 'إبداع ديزاين - شريكك الموثوق في التميز الرقمي، نحول رؤيتك إلى واقع رقمي مبهر',
  getStarted: 'ابدأ الآن',
  viewProjects: 'اطلع على المشاريع',
  viewOurWork: 'استكشف أعمالنا',
  
  // About Page
  aboutTitle: 'قصة نجاحنا',
  aboutText: 'رائدة في صناعة التصميم والتطوير الرقمي، إبداع ديزاين ليست مجرد شركة تصميم - بل هي قوة حقيقية في تشكيل مستقبل العالم الرقمي. نحن نبني أكثر من مجرد مواقع - نحن نبني أحلام وطموحات رقمية لا حدود لها.',
  ourMission: 'مهمتنا',
  ourVision: 'رؤيتنا',
  coreValues: 'قيمنا الأساسية',
  ourJourney: 'رحلتنا',
  excellence: 'التميز',
  excellenceDesc: 'نلتزم بتقديم حلول رقمية تتجاوز توقعات عملائنا، مع التركيز على الجودة الفائقة والدقة في كل تفصيل، لنصنع تجارب مستخدم استثنائية.',
  integrity: 'النزاهة',
  integrityDesc: 'نبني علاقاتنا على أساس الثقة والشفافية الكاملة. النزاهة هي بوصلتنا في كل تعاملاتنا، ونضمن لعملائنا الصدق المطلق في جميع مراحل المشروع.',
  innovation: 'الابتكار',
  innovationDesc: 'الابتكار هو قلب إبداع ديزاين. نحن نبحث باستمرار عن أحدث التقنيات والأفكار الإبداعية لتحويلها إلى حلول رقمية فريدة تمنح عملائنا ميزة تنافسية.',
  collaboration: 'التعاون',
  collaborationDesc: 'نؤمن بأن أفضل النتائج تأتي من العمل المشترك. نعمل كفريق واحد مع عملائنا، ونبني شراكات قوية تضمن تحقيق الأهداف المشتركة والنجاح المتبادل.',
  reliability: 'الموثوقية',
  reliabilityDesc: 'الموثوقية هي وعدنا الأساسي. نلتزم بتسليم المشاريع في الوقت المحدد وبأعلى مستويات الأداء، لنكون الشريك الذي يمكن لعملائنا الاعتماد عليه دائمًا.',
  sustainability: 'الاستدامة',
  sustainabilityDesc: 'نصمم حلولاً رقمية مستدامة وقابلة للتطوير، تضمن لعملائنا النمو المستمر والنجاح على المدى الطويل في عالم متغير باستمرار.',
  companyFounded: 'تأسيس الشركة',
  firstMajorProject: 'أول مشروع كبير',
  regionalExpansion: 'التوسع الإقليمي',
  innovationLeadership: 'ريادة الابتكار',
  vision2030Partner: 'شريك رؤية 2030',
  industryLeader: 'رائد الصناعة',
  expertEmployees: 'الموظفون الخبراء',
  yearsOfExcellence: 'سنوات التميز',
  readyToBuild: 'هل أنت مستعد للانضمام إلى قائمة عملائنا الناجحين؟',
  experienceTheDifference: 'تواصل معنا اليوم ودعنا نساعدك في تحويل رؤيتك إلى واقع رقمي مبهر',
  getInTouch: 'ابدأ مشروعك الآن',
  
  // About Page - Static Text Translations
  aboutHeroDescription: 'نحن فريق من المبدعين المتخصصين في تصميم وتطوير المواقع الإلكترونية، نسعى لتحويل رؤى عملائنا إلى واقع رقمي مبهر يحقق أهدافهم ويتجاوز توقعاتهم',
  missionDescription: 'تقديم حلول رقمية استثنائية تتجاوز توقعات العملاء، والمساهمة في التحول الرقمي. نحن ملتزمون ببناء بنية تحتية رقمية مستدامة ومبتكرة تدعم نمو أعمال عملائنا وازدهارها.',
  visionDescription: 'أن نكون الشركة الرائدة والأكثر ثقة وابتكاراً في مجال الحلول الرقمية، معترف بنا لتميزنا في تنفيذ المشاريع، وإبداعنا في التصميم، وتأثيرنا الإيجابي على نجاح عملائنا. نتصور مستقبلاً تكون فيه حلولنا الرقمية معالم للتقدم والابتكار.',
  coreValuesDescription: 'هذه المبادئ الأساسية توجه كل قرار نتخذه وكل مشروع نقوم به.',
  journeyDescription: 'منذ انطلاقتنا في 2020، ونحن في رحلة مستمرة من الابتكار والنمو، نحقق فيها إنجازات استثنائية في العالم الرقمي.',
  awjByNumbers: 'إبداع ديزاين بالأرقام',
  achievementsDescription: 'إنجازاتنا تتحدث عن نفسها - شاهد على التزامنا بالتميز ورضا العملاء.',
  
  // Timeline descriptions in Arabic
  timeline2020Title: 'الانطلاقة الرقمية',
  timeline2020Desc: 'تأسست إبداع ديزاين برؤية واضحة لإحداث ثورة في المشهد الرقمي، وتقديم حلول برمجية مبتكرة.',
  timeline2021Title: 'مشروعنا الأول',
  timeline2021Desc: 'أنجزنا بنجاح أول مشروع كبير لنا، مما بنى سمعتنا القوية في تقديم حلول عالية الجودة وموثوقة.',
  timeline2022Title: 'نمو الفريق',
  timeline2022Desc: 'توسع فريقنا ليضم نخبة من المطورين والمصممين المبدعين، مما زاد من قدرتنا على الابتكار.',
  timeline2023Title: 'إطلاق خدمات جديدة',
  timeline2023Desc: 'أطلقنا مجموعة من الخدمات الجديدة، بما في ذلك تطوير تطبيقات الجوال والذكاء الاصطناعي، لتلبية احتياجات السوق المتغيرة.',
  timeline2024Title: 'شراكات استراتيجية',
  timeline2024Desc: 'عقدنا شراكات استراتيجية مع شركات تقنية رائدة، مما عزز من قدرتنا على تقديم حلول متكاملة لعملائنا.',
  timeline2026Title: 'الريادة في المستقبل',
  timeline2026Desc: 'نتطلع في عام 2026 لنكون الرواد في تقديم الحلول الرقمية المبتكرة في المنطقة، مع التوسع نحو أسواق عالمية جديدة.',
  
  // Services
  servicesTitle: 'خدماتنا المتميزة',
  servicesSubtitle: 'نقدم لك الأفضل - مجموعة شاملة من الخدمات المتخصصة في تصميم وتطوير المواقع الإلكترونية لتلبية جميع احتياجاتك الرقمية بأعلى معايير الجودة والاحترافية',
  commercialConstruction: 'البناء التجاري',
  residentialProjects: 'المشاريع السكنية',
  industrialConstruction: 'البناء الصناعي',
  
  // Projects
  projectsTitle: 'مشاريعنا',
  projectsSubtitle: 'عرض التميز عبر مشاريع البناء المتنوعة',
  ourProjects: 'معرض الإبداعات',
  projectsPageSubtitle: 'اكتشف مجموعة شاملة من تصاميمنا المتميزة التي ساعدت عملاءنا على تحقيق أهدافهم الرقمية وبناء حضور قوي ومؤثر على الإنترنت بأسلوب احترافي ومتميز',
  commercial: 'تجاري',
  residential: 'سكني',
  industrial: 'صناعي',
  completed: 'مكتمل',
  inprogress: 'قيد التنفيذ',
  planning: 'قيد التخطيط',
  projectImpactStatistics: 'أرقام تشهد على عظمة إنجازاتنا',
  projectImpactDesc: 'إحصائيات مذهلة تعكس قوة تأثيرنا في تشكيل المشهد العمراني للمملكة وإسهامنا الفعال في تحقيق رؤية 2030 من خلال مشاريع عملاقة غيرت وجه المدن السعودية',
  totalProjectValue: 'إجمالي قيمة المشاريع',
  customServiceTitle: 'هل تحتاج خدمة مخصصة؟',
  customServiceDesc: 'تواصل معنا لمناقشة متطلباتك الخاصة وسنقوم بإعداد عرض مخصص يناسب احتياجاتك وميزانيتك.',
  getCustomOffer: 'احصل على عرض مخصص',

  // Pricing Packages
  pricingTitle: 'باقاتنا المتكاملة',
  pricingSubtitle: 'اختر الباقة التي تناسب احتياجاتك وميزانيتك',
  choosePackage: 'اختر هذه الباقة',
  mostPopular: 'الأكثر اختياراً',

  // Basic Package
  basicPackageTitle: 'الباقة الأساسية',
  basicPackagePrice: '2,500 ريال',
  basicPackageDesc: 'مثالية للشركات الناشئة والمشاريع الصغيرة',
  basicPackageDelivery: 'مدة التسليم: 2-3 أسابيع',
  basicPackageFeature1: 'تصميم مخصص (5 صفحات)',
  basicPackageFeature2: 'تطوير متجاوب',
  basicPackageFeature3: 'تحسين محركات البحث الأساسي',
  basicPackageFeature4: 'شهادة SSL',
  basicPackageFeature5: 'دعم فني لمدة شهر',
  basicPackageFeature6: 'تدريب على الاستخدام',

  // Advanced Package
  advancedPackageTitle: 'الباقة المتقدمة',
  advancedPackagePrice: '4,500 ريال',
  advancedPackageDesc: 'الأنسب للشركات المتوسطة والمشاريع التجارية',
  advancedPackageDelivery: 'مدة التسليم: 3-4 أسابيع',
  advancedPackageFeature1: 'تصميم مخصص (10 صفحات)',
  advancedPackageFeature2: 'تطوير متقدم مع CMS',
  advancedPackageFeature3: 'تحسين محركات البحث المتقدم',
  advancedPackageFeature4: 'تكامل مع وسائل التواصل',
  advancedPackageFeature5: 'نظام إدارة المحتوى',
  advancedPackageFeature6: 'دعم فني لمدة 3 أشهر',
  advancedPackageFeature7: 'تحليلات وتقارير',
  advancedPackageFeature8: 'نسخ احتياطية أسبوعية',

  // Professional Package
  professionalPackageTitle: 'الباقة الاحترافية',
  professionalPackagePrice: '7,500 ريال',
  professionalPackageDesc: 'للشركات الكبيرة والمشاريع المعقدة',
  professionalPackageDelivery: 'مدة التسليم: 4-6 أسابيع',
  professionalPackageFeature1: 'تصميم مخصص (صفحات غير محدودة)',
  professionalPackageFeature2: 'تطوير متقدم مع ميزات خاصة',
  professionalPackageFeature3: 'تحسين محركات البحث الاحترافي',
  professionalPackageFeature4: 'تكامل مع الأنظمة الخارجية',
  professionalPackageFeature5: 'نظام إدارة متقدم',
  professionalPackageFeature6: 'دعم فني لمدة 6 أشهر',
  professionalPackageFeature7: 'تحليلات متقدمة',
  professionalPackageFeature8: 'نسخ احتياطية يومية',
  professionalPackageFeature9: 'تدريب شامل للفريق',
  professionalPackageFeature10: 'استشارات تسويقية',
  jobsCreated: 'فرص عمل موفرة',
  onTimeDelivery: 'التسليم في الموعد',
  citiesServed: 'مدن مخدومة',
  yourProjectCouldBeNext: 'مشروعك الرقمي ينتظر لمسة إبداع ديزاين',
  joinOurPortfolio: 'كن جزءاً من تاريخ التصميم الرقمي. انضم إلى نخبة العملاء الذين اختاروا إبداع ديزاين لتحويل أحلامهم إلى مواقع رقمية مبهرة تفخر بها الأجيال القادمة',
  startYourProject: 'ابدأ مشروعك',
  registerAsClient: 'سجل كعميل',
  
  // Contact
  contactTitle: 'ابدأ رحلة بناء مشروعك العملاق',
  contactSubtitle: 'تواصل مع فريق النخبة من المهندسين والمتخصصين لتحويل رؤيتك إلى معلم حضاري يفخر به المستقبل. نحن هنا لنقودك في رحلة استثنائية من التخطيط إلى التنفيذ.',
  getInTouchTitle: 'شريكك في بناء المستقبل',
  getInTouchDesc: 'مع أكثر من 20 مشروع ناجح وخبرة تزيد عن 5 عقود نحن مستعدون لتحويل أحلامك إلى واقع ملموس. تواصل معنا اليوم وابدأ رحلة بناء مشروعك العملاق.',
  phone: 'الهاتف',
  email: 'البريد الإلكتروني',
  address: 'العنوان',
  workingHours: 'ساعات العمل',
  startYourProjectToday: 'ابدأ مشروعك العملاق اليوم',
  fullName: 'الاسم الكامل',
  enterFullName: 'أدخل اسمك الكامل',
  emailAddress: 'عنوان البريد الإلكتروني',
  enterEmailAddress: 'أدخل عنوان بريدك الإلكتروني',
  phoneNumber: 'رقم الهاتف',
  enterPhoneNumber: 'أدخل رقم هاتفك',
  serviceNeeded: 'الخدمة المطلوبة',
  selectService: 'اختر الخدمة',
  projectDetails: 'تفاصيل المشروع',
  tellUsAboutProject: 'أخبرنا عن مشروعك ومتطلباتك ان وجد',
  sendMessage: 'إرسال الرسالة',
  thankYou: 'شكراً لك!',
  messageSentSuccess: 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.',
  visitOurOffice: 'زر مكتبنا',
  locatedInRiyadh: 'نحن موجودون في قلب الرياض لخدمتك',
  awjHeadquarters: 'مقر إبداع ديزاين',
  viewOnGoogleMaps: 'عرض على خرائط جوجل',
  needImmediateAssistance: 'تحتاج مساعدة فورية؟',
  urgentInquiries: 'للاستفسارات العاجلة، تواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني',
  callNow: 'اتصل الآن',
  emailUs: 'راسلنا',
  infrastructureDevelopment: 'تطوير البنية التحتية',
  maintenanceSupport: 'دعم الصيانة',
  
  // Leadership Page
  leadershipTeam: 'فريق القيادة',
  visionaryLeaders: 'نخبة من القادة المتميزين الذين يقودون شركة OUJ نحو تحقيق رؤية 2030 من خلال الخبرة والابتكار والتميز في جميع المشاريع',
  messagesFromLeaders: 'رسائل من القيادة',
  discoverVision: 'اكتشف رؤية قادتنا وخبراتهم في بناء مستقبل المملكة العربية السعودية',
  keyAchievements: 'الإنجازات الرئيسية',
  leadershipDrivenValues: 'القيم التي تقودها القيادة',
  leadershipValuesDesc: 'المبادئ الأساسية التي توجه قراراتنا الاستراتيجية وتشكل ثقافة شركتنا',
  visionaryLeadership: 'القيادة الرؤيوية',
  visionaryLeadershipDesc: 'نقود بالرؤية والابتكار لتحقيق أهداف طموحة',
  commitmentToExcellence: 'الالتزام بالتميز',
  commitmentToExcellenceDesc: 'نسعى دائماً لتحقيق أعلى معايير الجودة والأداء',
  collaborativeSpirit: 'روح التعاون',
  collaborativeSpiritDesc: 'نؤمن بقوة العمل الجماعي وبناء شراكات استراتيجية',
  partnerWithProvenLeadership: 'شارك مع قيادة مثبتة',
  experienceLeadershipDifference: 'اختبر الفرق الذي تصنعه القيادة المتميزة في تحقيق النجاح',
  learnMoreAboutUs: 'تعرف علينا أكثر',
  
  // Footer
  quickLinks: 'روابط سريعة',
  contactInfo: 'معلومات الاتصال',
  allRightsReserved: 'جميع الحقوق محفوظة',
  
  // Stats
  projectsCompleted: 'المشاريع المنجزة',
  happyClients: 'العملاء السعداء',
  yearsExperience: 'سنوات الخبرة',
  successRate: 'معدل النجاح',
  
  // Admin Panel
  adminPanel: 'لوحة التحكم',
  dashboard: 'لوحة المعلومات',
  contentManagement: 'إدارة المحتوى',
  projectManagement: 'إدارة المشاريع',
  userManagement: 'إدارة المستخدمين',
  settings: 'الإعدادات',
  logout: 'تسجيل الخروج',
  login: 'تسجيل الدخول',
  
  // Dashboard
  totalProjects: 'إجمالي المشاريع',
  activeClients: 'العملاء النشطون',
  siteVisitors: 'زوار الموقع',
  testimonialsCount: 'الشهادات',
  recentActivity: 'النشاط الأخير',
  upcomingTasks: 'المهام القادمة',
  quickActions: 'إجراءات سريعة',
  
  // Content Management
  editContent: 'تحرير المحتوى',
  saveChanges: 'حفظ التغييرات',
  preview: 'معاينة',
  publish: 'نشر',
  draft: 'مسودة',
  
  // Project Management
  addProject: 'إضافة مشروع',
  editProject: 'تحرير المشروع',
  deleteProject: 'حذف المشروع',
  projectDetailsAdmin: 'تفاصيل المشروع',
  projectName: 'اسم المشروع',
  projectDescription: 'وصف المشروع',
  projectCategory: 'فئة المشروع',
  projectStatus: 'حالة المشروع',
  projectValue: 'قيمة المشروع',
  projectLocation: 'موقع المشروع',
  projectClient: 'عميل المشروع',
  projectDuration: 'مدة المشروع',
  
  // Common
  save: 'حفظ',
  cancel: 'إلغاء',
  edit: 'تعديل',
  delete: 'حذف',
  add: 'إضافة',
  search: 'بحث',
  filter: 'تصفية',
  all: 'الكل',
  loading: 'جاري التحميل...',
  success: 'تم بنجاح',
  error: 'خطأ',
  confirm: 'تأكيد',
  yes: 'نعم',
  no: 'لا',
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const t = (key: string): string => {
    return translations[key as keyof typeof translations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language: 'ar', t }}>
      <div dir="rtl" className="font-arabic">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};