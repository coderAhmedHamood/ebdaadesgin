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
  companyName: 'شركة أوج الدولية للمقاولات',
  tagline: 'التميز في البناء',
  
  // Homepage
  heroTitle: 'نبني المملكة العربية السعودية الغد',
  heroSubtitle: 'شركة أوج الدولية للمقاولات - شريكك الموثوق في التميز الإنشائي، متماشياً مع رؤية 2030',
  getStarted: 'ابدأ الآن',
  viewProjects: 'اطلع على المشاريع',
  viewOurWork: 'اطلع على أعمالنا',
  
  // About Page
  aboutTitle: 'عملاق البناء في المملكة العربية السعودية',
  aboutText: 'رائدة في صناعة البناء والتشييد لأكثر من عقدين، شركة أوج الدولية ليست مجرد شركة مقاولات - بل هي قوة حقيقية في تشكيل مستقبل المملكة العمراني. نحن نبني أكثر من مجرد مباني - نحن نبني أحلام وطموحات أمة بأكملها.',
  ourMission: 'مهمتنا',
  ourVision: 'رؤيتنا',
  coreValues: 'قيمنا الأساسية',
  ourJourney: 'رحلتنا',
  excellence: 'التميز',
  excellenceDesc: 'نسعى لتحقيق أعلى معايير الجودة في كل مشروع نقوم به',
  integrity: 'النزاهة',
  integrityDesc: 'نتعامل بصدق وشفافية مع جميع عملائنا وشركائنا',
  innovation: 'الابتكار',
  innovationDesc: 'نتبنى أحدث التقنيات والحلول المبتكرة في مجال البناء',
  collaboration: 'التعاون',
  collaborationDesc: 'نؤمن بقوة العمل الجماعي وبناء شراكات قوية',
  reliability: 'الموثوقية',
  reliabilityDesc: 'نلتزم بمواعيدنا ونحافظ على وعودنا مع عملائنا',
  sustainability: 'الاستدامة',
  sustainabilityDesc: 'نطبق ممارسات البناء المستدامة لحماية البيئة',
  companyFounded: 'تأسيس الشركة',
  firstMajorProject: 'أول مشروع كبير',
  regionalExpansion: 'التوسع الإقليمي',
  innovationLeadership: 'ريادة الابتكار',
  vision2030Partner: 'شريك رؤية 2030',
  industryLeader: 'رائد الصناعة',
  expertEmployees: 'الموظفون الخبراء',
  yearsOfExcellence: 'سنوات التميز',
  readyToBuild: 'هل أنت مستعد للبناء؟',
  experienceTheDifference: 'اختبر الفرق مع شركة أوج الدولية للمقاولات',
  getInTouch: 'تواصل معنا',
  
  // About Page - Static Text Translations
  aboutHeroDescription: 'بناء مستقبل المملكة العربية السعودية من خلال حلول البناء المبتكرة والالتزام الثابت بالتميز منذ عام 2000.',
  missionDescription: 'تقديم خدمات البناء الاستثنائية التي تتجاوز توقعات العملاء مع المساهمة في رؤية المملكة العربية السعودية 2030. نحن ملتزمون ببناء بنية تحتية مستدامة ومبتكرة وعالمية المستوى تدعم نمو المملكة وازدهارها.',
  visionDescription: 'أن نكون شركة البناء الأكثر ثقة وابتكاراً في المملكة العربية السعودية، معترف بها لتميزنا في تسليم المشاريع والممارسات المستدامة والتأثير الإيجابي على المجتمعات. نتصور مستقبلاً حيث تكون مبانينا معالم للتقدم والتنمية.',
  coreValuesDescription: 'هذه المبادئ الأساسية توجه كل قرار نتخذه وكل مشروع نقوم به.',
  journeyDescription: 'من البدايات المتواضعة إلى الريادة في الصناعة - اكتشف المعالم التي شكلت شركة أوج الدولية.',
  awjByNumbers: 'شركة أوج الدولية بالأرقام',
  achievementsDescription: 'إنجازاتنا تتحدث عن نفسها - شاهد على التزامنا بالتميز ورضا العملاء.',
  
  // Timeline descriptions in Arabic
  timelineFoundedDesc: 'تأسست شركة أوج الدولية برؤية لتحويل المشهد الإنشائي في المملكة العربية السعودية.',
  timelineFirstProjectDesc: 'أكملنا أول مشروع تجاري بارز لنا، مما رسخ سمعتنا للتميز.',
  timelineExpansionDesc: 'وسعنا عملياتنا عبر مدن متعددة في المملكة العربية السعودية، لخدمة أسواق متنوعة.',
  timelineInnovationDesc: 'اعتمدنا تقنيات البناء المتقدمة وممارسات البناء المستدامة.',
  timelineVision2030Desc: 'أصبحنا شريكاً رسمياً في مبادرة التحول رؤية المملكة العربية السعودية 2030.',
  timelineLeaderDesc: 'تم الاعتراف بنا كواحدة من أفضل شركات البناء في المملكة مع أكثر من 200 مشروع مكتمل.',
  
  // Services
  servicesTitle: 'حلول إنشائية عملاقة لعصر جديد',
  servicesSubtitle: 'مجموعة شاملة ومتطورة من الخدمات الإنشائية المتخصصة التي تغطي كافة احتياجات البناء والتشييد في المملكة. من التصميم والتخطيط إلى التنفيذ والتسليم - نحن شريكك الموثوق في بناء مستقبل المملكة.',
  commercialConstruction: 'البناء التجاري',
  residentialProjects: 'المشاريع السكنية',
  industrialConstruction: 'البناء الصناعي',
  
  // Projects
  projectsTitle: 'مشاريعنا',
  projectsSubtitle: 'عرض التميز عبر مشاريع البناء المتنوعة',
  ourProjects: 'إنجازات تاريخية تشكل مستقبل المملكة',
  projectsPageSubtitle: 'محفظة استثنائية من المشاريع العملاقة التي تعيد تعريف معايير البناء والتشييد في المملكة العربية السعودية. من ناطحات السحاب التجارية إلى المجمعات السكنية الفاخرة والمرافق الصناعية المتطورة - نحن نبني المستقبل بأيدي سعودية وخبرة عالمية.',
  commercial: 'تجاري',
  residential: 'سكني',
  industrial: 'صناعي',
  completed: 'مكتمل',
  inprogress: 'قيد التنفيذ',
  planning: 'قيد التخطيط',
  projectImpactStatistics: 'أرقام تشهد على عظمة إنجازاتنا',
  projectImpactDesc: 'إحصائيات مذهلة تعكس قوة تأثيرنا في تشكيل المشهد العمراني للمملكة وإسهامنا الفعال في تحقيق رؤية 2030 من خلال مشاريع عملاقة غيرت وجه المدن السعودية',
  totalProjectValue: 'إجمالي قيمة المشاريع',
  jobsCreated: 'فرص عمل موفرة',
  onTimeDelivery: 'التسليم في الموعد',
  citiesServed: 'مدن مخدومة',
  yourProjectCouldBeNext: 'مشروعك العملاق ينتظر لمسة أوج الدولية',
  joinOurPortfolio: 'كن جزءاً من تاريخ البناء في المملكة. انضم إلى نخبة العملاء الذين اختاروا أوج الدولية لتحويل أحلامهم إلى معالم خالدة تفخر بها الأجيال القادمة',
  startYourProject: 'ابدأ مشروعك',
  registerAsClient: 'سجل كعميل',
  
  // Contact
  contactTitle: 'ابدأ رحلة بناء مشروعك العملاق',
  contactSubtitle: 'تواصل مع فريق النخبة من المهندسين والمتخصصين لتحويل رؤيتك إلى معلم حضاري يفخر به المستقبل. نحن هنا لنقودك في رحلة استثنائية من التخطيط إلى التنفيذ.',
  getInTouchTitle: 'شريكك في بناء المستقبل',
  getInTouchDesc: 'مع أكثر من 200 مشروع ناجح وخبرة تزيد عن عقدين، نحن مستعدون لتحويل أحلامك إلى واقع ملموس. تواصل معنا اليوم وابدأ رحلة بناء مشروعك العملاق.',
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
  awjHeadquarters: 'مقر شركة أوج الدولية',
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