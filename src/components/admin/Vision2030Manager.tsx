import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Target, 
  Users, 
  TrendingUp, 
  Globe,
  Search,
  Filter,
  Eye,
  Award,
  Building
} from 'lucide-react';

interface VisionContent {
  id: string;
  type: 'pillar' | 'contribution' | 'sustainability' | 'project' | 'text';
  title: string;
  description: string;
  content?: string;
  icon?: string;
  image?: string;
  value?: string;
  metric?: string;
  percentage?: number;
  category?: 'vibrant-society' | 'thriving-economy' | 'ambitious-nation';
  initiatives?: string[];
  isActive: boolean;
  order: number;
}

const Vision2030Manager: React.FC = () => {
  const [visionContent, setVisionContent] = useState<VisionContent[]>([
    {
      id: '1',
      type: 'pillar',
      title: 'مجتمع حيوي',
      description: 'بناء مجتمعات نابضة بالحياة من خلال التطويرات السكنية والمرافق الثقافية والترفيهية التي تعزز جودة الحياة.',
      icon: 'Users',
      category: 'vibrant-society',
      initiatives: [
        'التطويرات المتمحورة حول المجتمع',
        'المرافق الثقافية والترفيهية',
        'حلول الإسكان الميسر',
        'بنية المدن الذكية التحتية'
      ],
      isActive: true,
      order: 1
    },
    {
      id: '2',
      type: 'pillar',
      title: 'اقتصاد مزدهر',
      description: 'دعم النمو الاقتصادي من خلال المرافق الصناعية ومراكز التكنولوجيا ومشاريع السياحة والبنية التحتية اللوجستية.',
      icon: 'TrendingUp',
      category: 'thriving-economy',
      initiatives: [
        'المرافق الصناعية والتصنيعية',
        'مراكز التكنولوجيا والابتكار',
        'مشاريع السياحة والترفيه',
        'بنية اللوجستيات والنقل التحتية'
      ],
      isActive: true,
      order: 2
    },
    {
      id: '3',
      type: 'pillar',
      title: 'وطن طموح',
      description: 'المساهمة في المشاريع الضخمة والمباني الحكومية ومرافق التعليم والرعاية الصحية لبناء مستقبل مستدام.',
      icon: 'Target',
      category: 'ambitious-nation',
      initiatives: [
        'دعم نيوم والمشاريع الضخمة',
        'المباني الحكومية والمؤسسية',
        'مرافق التعليم والرعاية الصحية',
        'مشاريع التنمية المستدامة'
      ],
      isActive: true,
      order: 3
    },
    {
      id: '4',
      type: 'contribution',
      title: 'المساهمة الاقتصادية',
      description: 'إجمالي قيمة المشاريع المساهمة في الاقتصاد الوطني',
      value: '$2.5B+',
      metric: 'المساهمة الاقتصادية',
      icon: 'Building',
      isActive: true,
      order: 4
    },
    {
      id: '5',
      type: 'contribution',
      title: 'فرص العمل المُنشأة',
      description: 'فرص العمل المباشرة وغير المباشرة المُنشأة',
      value: '15,000+',
      metric: 'فرص العمل المُنشأة',
      icon: 'Users',
      isActive: true,
      order: 5
    },
    {
      id: '6',
      type: 'sustainability',
      title: 'ممارسات البناء الأخضر',
      description: 'تطبيق أحدث تقنيات البناء المستدام والصديق للبيئة',
      percentage: 90,
      icon: 'Globe',
      isActive: true,
      order: 6
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingContent, setEditingContent] = useState<VisionContent | null>(null);
  const [newContent, setNewContent] = useState<Partial<VisionContent>>({
    type: 'text',
    title: '',
    description: '',
    content: '',
    icon: 'Target',
    image: '',
    value: '',
    metric: '',
    percentage: 0,
    category: 'vibrant-society',
    initiatives: [''],
    isActive: true,
    order: visionContent.length + 1
  });

  const contentTypes = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'pillar', label: 'ركائز الرؤية' },
    { value: 'contribution', label: 'المساهمات' },
    { value: 'sustainability', label: 'الاستدامة' },
    { value: 'project', label: 'المشاريع' },
    { value: 'text', label: 'النصوص' }
  ];

  const iconOptions = [
    { value: 'Target', label: 'هدف', icon: Target },
    { value: 'Users', label: 'مستخدمون', icon: Users },
    { value: 'TrendingUp', label: 'نمو', icon: TrendingUp },
    { value: 'Globe', label: 'عالمي', icon: Globe },
    { value: 'Building', label: 'مبنى', icon: Building },
    { value: 'Award', label: 'جائزة', icon: Award }
  ];

  const categories = [
    { value: 'vibrant-society', label: 'مجتمع حيوي' },
    { value: 'thriving-economy', label: 'اقتصاد مزدهر' },
    { value: 'ambitious-nation', label: 'وطن طموح' }
  ];

  const filteredContent = visionContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || content.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleSaveContent = () => {
    if (editingContent) {
      setVisionContent(visionContent.map(c => c.id === editingContent.id ? editingContent : c));
      setEditingContent(null);
    } else {
      const id = Date.now().toString();
      setVisionContent([...visionContent, { ...newContent, id } as VisionContent]);
      setNewContent({
        type: 'text',
        title: '',
        description: '',
        content: '',
        icon: 'Target',
        image: '',
        value: '',
        metric: '',
        percentage: 0,
        category: 'vibrant-society',
        initiatives: [''],
        isActive: true,
        order: visionContent.length + 1
      });
      setShowAddModal(false);
    }
  };

  const handleDeleteContent = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
      setVisionContent(visionContent.filter(c => c.id !== id));
    }
  };

  const addInitiative = (isEditing: boolean = false) => {
    if (isEditing && editingContent) {
      setEditingContent({
        ...editingContent,
        initiatives: [...(editingContent.initiatives || []), '']
      });
    } else {
      setNewContent({
        ...newContent,
        initiatives: [...(newContent.initiatives || []), '']
      });
    }
  };

  const removeInitiative = (index: number, isEditing: boolean = false) => {
    if (isEditing && editingContent) {
      setEditingContent({
        ...editingContent,
        initiatives: editingContent.initiatives?.filter((_, i) => i !== index)
      });
    } else {
      setNewContent({
        ...newContent,
        initiatives: newContent.initiatives?.filter((_, i) => i !== index)
      });
    }
  };

  const updateInitiative = (index: number, value: string, isEditing: boolean = false) => {
    if (isEditing && editingContent) {
      const updated = [...(editingContent.initiatives || [])];
      updated[index] = value;
      setEditingContent({
        ...editingContent,
        initiatives: updated
      });
    } else {
      const updated = [...(newContent.initiatives || [])];
      updated[index] = value;
      setNewContent({
        ...newContent,
        initiatives: updated
      });
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      pillar: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      contribution: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      sustainability: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      project: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      text: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };
    return colors[type as keyof typeof colors];
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      pillar: 'ركيزة',
      contribution: 'مساهمة',
      sustainability: 'استدامة',
      project: 'مشروع',
      text: 'نص'
    };
    return labels[type as keyof typeof labels];
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة رؤية 2030</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة شاملة لمحتوى صفحة رؤية المملكة 2030
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة محتوى جديد</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {contentTypes.slice(1).map((type, index) => (
          <div key={type.value} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {visionContent.filter(c => c.type === type.value).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{type.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في محتوى رؤية 2030..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            {contentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContent.map((content) => (
          <div
            key={content.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center">
                    {iconOptions.find(opt => opt.value === content.icon)?.icon && 
                      React.createElement(iconOptions.find(opt => opt.value === content.icon)!.icon, {
                        className: "w-6 h-6 text-white"
                      })
                    }
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(content.type)}`}>
                      {getTypeLabel(content.type)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => setEditingContent(content)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteContent(content.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {content.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
                {content.description}
              </p>

              {content.type === 'contribution' && content.value && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {content.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {content.metric}
                    </div>
                  </div>
                </div>
              )}

              {content.type === 'sustainability' && content.percentage !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">معدل التطبيق</span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {content.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-600 to-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${content.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {content.type === 'pillar' && content.initiatives && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">المبادرات:</h4>
                  {content.initiatives.slice(0, 2).map((initiative, index) => (
                    <div key={index} className="flex items-start space-x-2 space-x-reverse">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{initiative}</span>
                    </div>
                  ))}
                  {content.initiatives.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{content.initiatives.length - 2} مبادرة أخرى
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  content.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {content.isActive ? 'نشط' : 'غير نشط'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  الترتيب: {content.order}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Content Modal */}
      {(showAddModal || editingContent) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingContent ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingContent(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">المعلومات الأساسية</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={editingContent ? editingContent.title : newContent.title}
                    onChange={(e) => {
                      if (editingContent) {
                        setEditingContent({ ...editingContent, title: e.target.value });
                      } else {
                        setNewContent({ ...newContent, title: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                    placeholder="أدخل العنوان"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={editingContent ? editingContent.description : newContent.description}
                    onChange={(e) => {
                      if (editingContent) {
                        setEditingContent({ ...editingContent, description: e.target.value });
                      } else {
                        setNewContent({ ...newContent, description: e.target.value });
                      }
                    }}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right resize-none"
                    placeholder="أدخل الوصف"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      النوع
                    </label>
                    <select
                      value={editingContent ? editingContent.type : newContent.type}
                      onChange={(e) => {
                        if (editingContent) {
                          setEditingContent({ ...editingContent, type: e.target.value as any });
                        } else {
                          setNewContent({ ...newContent, type: e.target.value as any });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      {contentTypes.slice(1).map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الأيقونة
                    </label>
                    <select
                      value={editingContent ? editingContent.icon : newContent.icon}
                      onChange={(e) => {
                        if (editingContent) {
                          setEditingContent({ ...editingContent, icon: e.target.value });
                        } else {
                          setNewContent({ ...newContent, icon: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Conditional Fields */}
                {(editingContent?.type === 'contribution' || newContent.type === 'contribution') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        القيمة
                      </label>
                      <input
                        type="text"
                        value={editingContent ? editingContent.value : newContent.value}
                        onChange={(e) => {
                          if (editingContent) {
                            setEditingContent({ ...editingContent, value: e.target.value });
                          } else {
                            setNewContent({ ...newContent, value: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                        placeholder="مثال: $2.5B+"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        المقياس
                      </label>
                      <input
                        type="text"
                        value={editingContent ? editingContent.metric : newContent.metric}
                        onChange={(e) => {
                          if (editingContent) {
                            setEditingContent({ ...editingContent, metric: e.target.value });
                          } else {
                            setNewContent({ ...newContent, metric: e.target.value });
                          }
                        }}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                        placeholder="مثال: المساهمة الاقتصادية"
                      />
                    </div>
                  </div>
                )}

                {(editingContent?.type === 'sustainability' || newContent.type === 'sustainability') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      النسبة المئوية
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingContent ? editingContent.percentage : newContent.percentage}
                      onChange={(e) => {
                        if (editingContent) {
                          setEditingContent({ ...editingContent, percentage: parseInt(e.target.value) });
                        } else {
                          setNewContent({ ...newContent, percentage: parseInt(e.target.value) });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="0-100"
                    />
                  </div>
                )}
              </div>

              {/* Additional Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">تفاصيل إضافية</h3>
                
                {(editingContent?.type === 'pillar' || newContent.type === 'pillar') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        الفئة
                      </label>
                      <select
                        value={editingContent ? editingContent.category : newContent.category}
                        onChange={(e) => {
                          if (editingContent) {
                            setEditingContent({ ...editingContent, category: e.target.value as any });
                          } else {
                            setNewContent({ ...newContent, category: e.target.value as any });
                          }
                        }}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          المبادرات
                        </label>
                        <button
                          onClick={() => addInitiative(!!editingContent)}
                          className="flex items-center space-x-1 space-x-reverse px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                        >
                          <Plus className="w-3 h-3" />
                          <span>إضافة</span>
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(editingContent ? editingContent.initiatives : newContent.initiatives || []).map((initiative, index) => (
                          <div key={index} className="flex items-center space-x-2 space-x-reverse">
                            <input
                              type="text"
                              value={initiative}
                              onChange={(e) => updateInitiative(index, e.target.value, !!editingContent)}
                              className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                              placeholder="أدخل المبادرة"
                            />
                            <button
                              onClick={() => removeInitiative(index, !!editingContent)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    value={editingContent ? editingContent.image : newContent.image}
                    onChange={(e) => {
                      if (editingContent) {
                        setEditingContent({ ...editingContent, image: e.target.value });
                      } else {
                        setNewContent({ ...newContent, image: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المحتوى الإضافي
                  </label>
                  <textarea
                    value={editingContent ? editingContent.content : newContent.content}
                    onChange={(e) => {
                      if (editingContent) {
                        setEditingContent({ ...editingContent, content: e.target.value });
                      } else {
                        setNewContent({ ...newContent, content: e.target.value });
                      }
                    }}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right resize-none"
                    placeholder="محتوى إضافي (اختياري)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={editingContent ? editingContent.isActive : newContent.isActive}
                        onChange={(e) => {
                          if (editingContent) {
                            setEditingContent({ ...editingContent, isActive: e.target.checked });
                          } else {
                            setNewContent({ ...newContent, isActive: e.target.checked });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">محتوى نشط</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ترتيب العرض
                    </label>
                    <input
                      type="number"
                      value={editingContent ? editingContent.order : newContent.order}
                      onChange={(e) => {
                        if (editingContent) {
                          setEditingContent({ ...editingContent, order: parseInt(e.target.value) });
                        } else {
                          setNewContent({ ...newContent, order: parseInt(e.target.value) });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 space-x-reverse mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingContent(null);
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveContent}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                <span>{editingContent ? 'حفظ التغييرات' : 'إضافة المحتوى'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vision2030Manager;