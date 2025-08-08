import React, { useState } from 'react';
import { 
  Save, 
  Eye, 
  Globe, 
  Edit3, 
  Image, 
  Type, 
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  FileText,
  Home,
  Users,
  Building,
  MessageSquare,
  HelpCircle,
  Target,
  Award,
  Star,
  Plus,
  Trash2,
  X
} from 'lucide-react';

interface ContentSection {
  id: string;
  name: string;
  type: 'text' | 'image' | 'rich-text' | 'list' | 'testimonial' | 'faq' | 'achievement';
  content: string;
  image?: string;
  items?: any[];
}

const ContentManager: React.FC = () => {
  const [activeSection, setActiveSection] = useState('homepage');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [content, setContent] = useState<Record<string, ContentSection[]>>({
    homepage: [
      {
        id: 'hero-title',
        name: 'العنوان الرئيسي',
        type: 'text',
        content: 'نبني المملكة العربية السعودية الغد'
      },
      {
        id: 'hero-subtitle',
        name: 'العنوان الفرعي',
        type: 'rich-text',
        content: 'شركة أوج الدولية للمقاولات - شريكك الموثوق في التميز الإنشائي، متماشياً مع رؤية 2030'
      },
      {
        id: 'hero-image',
        name: 'صورة خلفية الصفحة الرئيسية',
        type: 'image',
        content: '',
        image: 'https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg'
      },
      {
        id: 'company-badge',
        name: 'شارة الشركة',
        type: 'text',
        content: 'شريك رؤية 2030 الرسمي'
      },
      {
        id: 'why-choose-title',
        name: 'عنوان لماذا تختارنا',
        type: 'text',
        content: 'لماذا تختار شركة أوج الدولية؟'
      },
      {
        id: 'why-choose-desc',
        name: 'وصف لماذا تختارنا',
        type: 'rich-text',
        content: 'نجمع بين عقود من الخبرة والتكنولوجيا المتطورة لتقديم حلول إنشائية استثنائية تتماشى مع رؤية المملكة الطموحة 2030'
      },
      {
        id: 'services-title',
        name: 'عنوان الخدمات',
        type: 'text',
        content: 'خدماتنا'
      },
      {
        id: 'services-subtitle',
        name: 'وصف الخدمات',
        type: 'text',
        content: 'حلول إنشائية شاملة للمملكة العربية السعودية الحديثة'
      },
      {
        id: 'achievements-title',
        name: 'عنوان الإنجازات',
        type: 'text',
        content: 'إنجازاتنا المتميزة'
      },
      {
        id: 'achievements-desc',
        name: 'وصف الإنجازات',
        type: 'text',
        content: 'نفخر بمساهماتنا في بناء مستقبل المملكة العربية السعودية'
      },
      {
        id: 'cta-title',
        name: 'عنوان الدعوة للعمل',
        type: 'text',
        content: 'مستعد لبناء رؤيتك؟'
      },
      {
        id: 'cta-desc',
        name: 'وصف الدعوة للعمل',
        type: 'rich-text',
        content: 'انضم إلى مئات العملاء الراضين الذين يثقون بشركة أوج الدولية لاحتياجاتهم الإنشائية. دعنا نحول مشروعك إلى واقع بخبرتنا والتزامنا بالتميز.'
      }
    ],
    about: [
      {
        id: 'about-title',
        name: 'عنوان صفحة من نحن',
        type: 'text',
        content: 'حول شركة أوج الدولية'
      },
      {
        id: 'about-desc',
        name: 'وصف الشركة',
        type: 'rich-text',
        content: 'بناء مستقبل المملكة العربية السعودية من خلال حلول البناء المبتكرة والالتزام الثابت بالتميز منذ عام 2000.'
      },
      {
        id: 'mission-title',
        name: 'عنوان المهمة',
        type: 'text',
        content: 'مهمتنا'
      },
      {
        id: 'mission-text',
        name: 'نص المهمة',
        type: 'rich-text',
        content: 'تقديم خدمات إنشائية استثنائية تتجاوز توقعات العملاء مع المساهمة في رؤية المملكة العربية السعودية 2030. نحن ملتزمون ببناء بنية تحتية مستدامة ومبتكرة وعالمية المستوى تدعم نمو المملكة وازدهارها.'
      },
      {
        id: 'vision-title',
        name: 'عنوان الرؤية',
        type: 'text',
        content: 'رؤيتنا'
      },
      {
        id: 'vision-text',
        name: 'نص الرؤية',
        type: 'rich-text',
        content: 'أن نكون الشركة الإنشائية الأكثر ثقة وابتكاراً في المملكة العربية السعودية، معترف بها لتميزنا في تسليم المشاريع والممارسات المستدامة والتأثير الإيجابي على المجتمعات. نتصور مستقبلاً حيث تخدم إنشاءاتنا كمعالم للتقدم والتنمية.'
      }
    ],
    services: [
      {
        id: 'services-title',
        name: 'عنوان صفحة الخدمات',
        type: 'text',
        content: 'خدماتنا'
      },
      {
        id: 'services-subtitle',
        name: 'العنوان الفرعي للخدمات',
        type: 'text',
        content: 'حلول إنشائية شاملة مصممة خصيصاً لاحتياجات المملكة العربية السعودية الحديثة'
      },
      {
        id: 'commercial-title',
        name: 'عنوان البناء التجاري',
        type: 'text',
        content: 'البناء التجاري'
      },
      {
        id: 'commercial-desc',
        name: 'وصف البناء التجاري',
        type: 'rich-text',
        content: 'مباني مكاتب حديثة ومساحات تجارية ومجمعات تجارية مصممة لمستقبل الأعمال في المملكة العربية السعودية.'
      },
      {
        id: 'residential-title',
        name: 'عنوان المشاريع السكنية',
        type: 'text',
        content: 'المشاريع السكنية'
      },
      {
        id: 'residential-desc',
        name: 'وصف المشاريع السكنية',
        type: 'rich-text',
        content: 'فلل فاخرة ومجمعات سكنية ومجتمعات مسورة تجمع بين الراحة والأناقة والاستدامة.'
      },
      {
        id: 'industrial-title',
        name: 'عنوان البناء الصناعي',
        type: 'text',
        content: 'البناء الصناعي'
      },
      {
        id: 'industrial-desc',
        name: 'وصف البناء الصناعي',
        type: 'rich-text',
        content: 'مرافق صناعية متطورة ومستودعات ومراكز لوجستية تدعم النمو الاقتصادي للمملكة.'
      }
    ],
    projects: [
      {
        id: 'projects-title',
        name: 'عنوان صفحة المشاريع',
        type: 'text',
        content: 'مشاريعنا'
      },
      {
        id: 'projects-subtitle',
        name: 'العنوان الفرعي للمشاريع',
        type: 'text',
        content: 'عرض التميز عبر مشاريع البناء المتنوعة في جميع أنحاء المملكة العربية السعودية'
      },
      {
        id: 'project-stats-title',
        name: 'عنوان إحصائيات المشاريع',
        type: 'text',
        content: 'إحصائيات تأثير المشاريع'
      },
      {
        id: 'project-stats-desc',
        name: 'وصف إحصائيات المشاريع',
        type: 'text',
        content: 'أرقام تعكس التزامنا بالتميز والتأثير الإيجابي على المجتمع والاقتصاد'
      }
    ],
    contact: [
      {
        id: 'contact-title',
        name: 'عنوان صفحة الاتصال',
        type: 'text',
        content: 'اتصل بنا'
      },
      {
        id: 'contact-subtitle',
        name: 'العنوان الفرعي للاتصال',
        type: 'text',
        content: 'تواصل مع فريق الخبراء لدينا لمناقشة مشروعك القادم'
      },
      {
        id: 'get-in-touch-title',
        name: 'عنوان تواصل معنا',
        type: 'text',
        content: 'تواصل معنا'
      },
      {
        id: 'get-in-touch-desc',
        name: 'وصف تواصل معنا',
        type: 'rich-text',
        content: 'نحن هنا لمساعدتك في تحويل رؤيتك إلى واقع. تواصل معنا اليوم لمناقشة مشروعك.'
      }
    ],
    testimonials: [
      {
        id: 'testimonials-title',
        name: 'عنوان صفحة الشهادات',
        type: 'text',
        content: 'شهادات عملائنا'
      },
      {
        id: 'testimonials-subtitle',
        name: 'العنوان الفرعي للشهادات',
        type: 'text',
        content: 'اكتشف ما يقوله عملاؤنا عن تجربتهم مع شركة أوج الدولية'
      },
      {
        id: 'client-satisfaction-rate',
        name: 'معدل رضا العملاء',
        type: 'text',
        content: 'معدل رضا العملاء'
      },
      {
        id: 'average-rating',
        name: 'التقييم المتوسط',
        type: 'text',
        content: 'التقييم المتوسط'
      },
      {
        id: 'happy-clients',
        name: 'العملاء السعداء',
        type: 'text',
        content: 'العملاء السعداء'
      },
      {
        id: 'repeat-clients',
        name: 'العملاء المتكررون',
        type: 'text',
        content: 'العملاء المتكررون'
      },
      {
        id: 'testimonials-list',
        name: 'قائمة الشهادات',
        type: 'list',
        content: '',
        items: [
          {
            id: 1,
            name: 'د. عبدالله المحمود',
            position: 'الرئيس التنفيذي، مجموعة التطوير الملكي',
            company: 'مجموعة التطوير الملكي',
            rating: 5,
            testimonial: 'تجاوزت شركة أوج الدولية توقعاتنا في كل جانب من جوانب مشروع برج الرياض التجاري. اهتمامهم بالتفاصيل والتسليم في الوقت المحدد والجودة الاستثنائية جعلتهم شريكنا المفضل في البناء.',
            project: 'برج الرياض التجاري',
            projectValue: '85 مليون دولار'
          }
        ]
      }
    ],
    faq: [
      {
        id: 'faq-title',
        name: 'عنوان صفحة الأسئلة الشائعة',
        type: 'text',
        content: 'الأسئلة الشائعة'
      },
      {
        id: 'faq-subtitle',
        name: 'العنوان الفرعي للأسئلة الشائعة',
        type: 'text',
        content: 'اعثر على إجابات للأسئلة الشائعة حول خدماتنا ومشاريعنا'
      },
      {
        id: 'search-placeholder',
        name: 'نص البحث في الأسئلة',
        type: 'text',
        content: 'ابحث في الأسئلة الشائعة...'
      },
      {
        id: 'faq-list',
        name: 'قائمة الأسئلة الشائعة',
        type: 'list',
        content: '',
        items: [
          {
            id: 1,
            category: 'general',
            question: 'ما هي أنواع مشاريع البناء التي تتعامل معها شركة أوج الدولية؟',
            answer: 'تتخصص شركة أوج الدولية في مجموعة واسعة من مشاريع البناء بما في ذلك المباني التجارية والتطويرات السكنية والمرافق الصناعية ومشاريع البنية التحتية وأعمال التجديد.'
          },
          {
            id: 2,
            category: 'general',
            question: 'منذ متى تعمل شركة أوج الدولية في السوق؟',
            answer: 'تخدم شركة أوج الدولية العملاء في المملكة العربية السعودية لأكثر من 24 عاماً منذ تأسيسها في عام 2000.'
          }
        ]
      }
    ],
    vision2030: [
      {
        id: 'vision2030-title',
        name: 'عنوان صفحة رؤية 2030',
        type: 'text',
        content: 'بناء رؤية 2030'
      },
      {
        id: 'vision2030-subtitle',
        name: 'العنوان الفرعي لرؤية 2030',
        type: 'text',
        content: 'مساهم فخور في تحقيق أهداف رؤية المملكة العربية السعودية الطموحة 2030'
      },
      {
        id: 'three-pillars-title',
        name: 'عنوان الركائز الثلاث',
        type: 'text',
        content: 'دعم الركائز الثلاث لرؤية 2030'
      },
      {
        id: 'three-pillars-desc',
        name: 'وصف الركائز الثلاث',
        type: 'text',
        content: 'مساهمة مباشرة في تحقيق أهداف التحول الوطني من خلال مشاريعنا المتنوعة'
      },
      {
        id: 'vibrant-society-title',
        name: 'عنوان المجتمع الحيوي',
        type: 'text',
        content: 'مجتمع حيوي'
      },
      {
        id: 'vibrant-society-desc',
        name: 'وصف المجتمع الحيوي',
        type: 'rich-text',
        content: 'بناء مجتمعات نابضة بالحياة من خلال التطويرات السكنية والمرافق الثقافية والترفيهية التي تعزز جودة الحياة.'
      },
      {
        id: 'thriving-economy-title',
        name: 'عنوان الاقتصاد المزدهر',
        type: 'text',
        content: 'اقتصاد مزدهر'
      },
      {
        id: 'thriving-economy-desc',
        name: 'وصف الاقتصاد المزدهر',
        type: 'rich-text',
        content: 'دعم النمو الاقتصادي من خلال المرافق الصناعية ومراكز التكنولوجيا ومشاريع السياحة والبنية التحتية اللوجستية.'
      },
      {
        id: 'ambitious-nation-title',
        name: 'عنوان الوطن الطموح',
        type: 'text',
        content: 'وطن طموح'
      },
      {
        id: 'ambitious-nation-desc',
        name: 'وصف الوطن الطموح',
        type: 'rich-text',
        content: 'المساهمة في المشاريع الضخمة والمباني الحكومية ومرافق التعليم والرعاية الصحية لبناء مستقبل مستدام.'
      }
    ],
    leadership: [
      {
        id: 'leadership-title',
        name: 'عنوان صفحة القيادة',
        type: 'text',
        content: 'فريق القيادة'
      },
      {
        id: 'leadership-subtitle',
        name: 'العنوان الفرعي للقيادة',
        type: 'text',
        content: 'قادة ذوو رؤية يقودون التميز في صناعة البناء والتشييد'
      },
      {
        id: 'messages-from-leaders-title',
        name: 'عنوان رسائل القادة',
        type: 'text',
        content: 'رسائل من قادتنا'
      },
      {
        id: 'discover-vision-desc',
        name: 'وصف اكتشف الرؤية',
        type: 'text',
        content: 'اكتشف الرؤية والقيم التي تقود شركة أوج الدولية نحو التميز'
      }
    ]
  });

  const sections = [
    { id: 'homepage', name: 'الصفحة الرئيسية', icon: Home },
    { id: 'about', name: 'من نحن', icon: Users },
    { id: 'services', name: 'الخدمات', icon: Building },
    { id: 'projects', name: 'المشاريع', icon: Image },
    { id: 'testimonials', name: 'الشهادات', icon: MessageSquare },
    { id: 'faq', name: 'الأسئلة الشائعة', icon: HelpCircle },
    { id: 'vision2030', name: 'رؤية 2030', icon: Target },
    { id: 'leadership', name: 'القيادة', icon: Award },
    { id: 'contact', name: 'اتصل بنا', icon: Globe }
  ];

  const handleContentChange = (sectionId: string, contentId: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map(item =>
        item.id === contentId
          ? { ...item, content: value }
          : item
      )
    }));
    setUnsavedChanges(true);
  };

  const handleListItemChange = (sectionId: string, contentId: string, itemIndex: number, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map(item =>
        item.id === contentId
          ? {
              ...item,
              items: item.items?.map((listItem, index) =>
                index === itemIndex
                  ? { ...listItem, [field]: value }
                  : listItem
              )
            }
          : item
      )
    }));
    setUnsavedChanges(true);
  };

  const addListItem = (sectionId: string, contentId: string) => {
    const newItem = sectionId === 'testimonials' 
      ? {
          id: Date.now(),
          name: '',
          position: '',
          company: '',
          rating: 5,
          testimonial: '',
          project: '',
          projectValue: ''
        }
      : {
          id: Date.now(),
          category: 'general',
          question: '',
          answer: ''
        };

    setContent(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map(item =>
        item.id === contentId
          ? {
              ...item,
              items: [...(item.items || []), newItem]
            }
          : item
      )
    }));
    setUnsavedChanges(true);
  };

  const removeListItem = (sectionId: string, contentId: string, itemIndex: number) => {
    setContent(prev => ({
      ...prev,
      [sectionId]: prev[sectionId].map(item =>
        item.id === contentId
          ? {
              ...item,
              items: item.items?.filter((_, index) => index !== itemIndex)
            }
          : item
      )
    }));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      console.log('حفظ المحتوى:', content);
      setUnsavedChanges(false);
      alert('تم حفظ المحتوى بنجاح!');
    } catch (error) {
      console.error('خطأ في حفظ المحتوى:', error);
      alert('خطأ في حفظ المحتوى. يرجى المحاولة مرة أخرى.');
    }
  };

  const getPreviewIcon = () => {
    switch (previewMode) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
  };

  const PreviewIcon = getPreviewIcon();

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة المحتوى</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة شاملة لجميع محتويات الموقع الإلكتروني
          </p>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          {unsavedChanges && (
            <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
              تغييرات غير محفوظة
            </span>
          )}
          
          <button
            onClick={handleSave}
            disabled={!unsavedChanges}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            <span>حفظ التغييرات</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">أقسام الموقع</h3>
            
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-3 space-x-reverse w-full px-4 py-3 rounded-xl text-right transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{section.name}</span>
                </button>
              ))}
            </div>

            {/* Preview Mode */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">وضع المعاينة</h4>
              <div className="flex space-x-2 space-x-reverse">
                {['desktop', 'tablet', 'mobile'].map((mode) => {
                  const Icon = mode === 'desktop' ? Monitor : mode === 'tablet' ? Tablet : Smartphone;
                  return (
                    <button
                      key={mode}
                      onClick={() => setPreviewMode(mode as any)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        previewMode === mode
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                محتوى {sections.find(s => s.id === activeSection)?.name}
              </h3>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <PreviewIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500 capitalize">
                  {previewMode === 'desktop' ? 'سطح المكتب' : previewMode === 'tablet' ? 'الجهاز اللوحي' : 'الهاتف المحمول'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {content[activeSection]?.map((item) => (
                <div key={item.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {item.type === 'text' ? 'نص' : 
                       item.type === 'rich-text' ? 'نص منسق' : 
                       item.type === 'image' ? 'صورة' :
                       item.type === 'list' ? 'قائمة' : 'أخرى'}
                    </span>
                  </div>

                  {item.type === 'image' ? (
                    <div className="space-y-4">
                      {item.image && (
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                          <Image className="w-4 h-4" />
                          <span>رفع صورة</span>
                        </button>
                        <input
                          type="url"
                          placeholder="أو أدخل رابط الصورة"
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                        />
                      </div>
                    </div>
                  ) : item.type === 'list' ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.items?.length || 0} عنصر
                        </span>
                        <button
                          onClick={() => addListItem(activeSection, item.id)}
                          className="flex items-center space-x-2 space-x-reverse px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>إضافة عنصر</span>
                        </button>
                      </div>
                      
                      {item.items?.map((listItem, index) => (
                        <div key={listItem.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              العنصر {index + 1}
                            </span>
                            <button
                              onClick={() => removeListItem(activeSection, item.id, index)}
                              className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {activeSection === 'testimonials' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="اسم العميل"
                                value={listItem.name || ''}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'name', e.target.value)}
                                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                              />
                              <input
                                type="text"
                                placeholder="المنصب"
                                value={listItem.position || ''}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'position', e.target.value)}
                                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                              />
                              <input
                                type="text"
                                placeholder="اسم الشركة"
                                value={listItem.company || ''}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'company', e.target.value)}
                                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                              />
                              <input
                                type="text"
                                placeholder="اسم المشروع"
                                value={listItem.project || ''}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'project', e.target.value)}
                                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                              />
                              <textarea
                                placeholder="نص الشهادة"
                                value={listItem.testimonial || ''}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'testimonial', e.target.value)}
                                rows={3}
                                className="md:col-span-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm resize-none"
                              />
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <select
                                value={listItem.category || 'general'}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'category', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
                              >
                                <option value="general">عام</option>
                                <option value="services">الخدمات</option>
                                <option value="projects">المشاريع</option>
                                <option value="pricing">التسعير</option>
                                <option value="timeline">الجدول الزمني</option>
                                <option value="quality">الجودة</option>
                              </select>
                              <input
                                type="text"
                                placeholder="السؤال"
                                value={listItem.question || ''}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'question', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                              />
                              <textarea
                                placeholder="الإجابة"
                                value={listItem.answer || ''}
                                onChange={(e) => handleListItemChange(activeSection, item.id, index, 'answer', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm resize-none"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : item.type === 'rich-text' ? (
                    <textarea
                      value={item.content}
                      onChange={(e) => handleContentChange(activeSection, item.id, e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none text-right"
                      placeholder={`أدخل ${item.name.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => handleContentChange(activeSection, item.id, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder={`أدخل ${item.name.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Preview Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-4 space-x-reverse">
                <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  <Eye className="w-4 h-4" />
                  <span>معاينة التغييرات</span>
                </button>
                <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Globe className="w-4 h-4" />
                  <span>نشر على الموقع</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;