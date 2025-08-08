import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Building, 
  Home, 
  Factory, 
  Wrench, 
  Users, 
  Shield,
  Search,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  category: 'construction' | 'maintenance' | 'consulting';
  isActive: boolean;
  order: number;
}

const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({
    title: '',
    description: '',
    shortDescription: '',
    icon: 'Building',
    image: '',
    features: [''],
    benefits: [''],
    category: 'construction',
    isActive: true,
    order: services.length + 1
  });

  const categories = [
    { value: 'all', label: 'جميع الفئات' },
    { value: 'construction', label: 'البناء والتشييد' },
    { value: 'maintenance', label: 'الصيانة والدعم' },
    { value: 'consulting', label: 'الاستشارات الهندسية' }
  ];

  const iconOptions = [
    { value: 'Building', label: 'مبنى', icon: Building },
    { value: 'Home', label: 'منزل', icon: Home },
    { value: 'Factory', label: 'مصنع', icon: Factory },
    { value: 'Wrench', label: 'أدوات', icon: Wrench },
    { value: 'Users', label: 'فريق', icon: Users },
    { value: 'Shield', label: 'حماية', icon: Shield }
  ];

  // API Functions
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      if (!response.ok) {
        throw new Error('فشل في جلب الخدمات');
      }
      const data = await response.json();
      // Transform database format to component format
      const transformedServices = data.map((service: any) => ({
        id: service.id.toString(),
        title: service.title,
        description: service.description,
        shortDescription: service.short_description,
        icon: service.icon,
        image: service.image,
        features: service.features || [],
        benefits: service.benefits || [],
        category: service.category,
        isActive: service.is_active === 1,
        order: service.display_order
      }));
      setServices(transformedServices);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: Omit<Service, 'id'>) => {
    try {
      // Transform component format to database format (no id needed - auto-generated)
      const dbFormat = {
        title: serviceData.title,
        description: serviceData.description,
        short_description: serviceData.shortDescription,
        icon: serviceData.icon,
        image: serviceData.image,
        features: serviceData.features,
        benefits: serviceData.benefits,
        category: serviceData.category,
        is_active: serviceData.isActive,
        display_order: serviceData.order
      };
      
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbFormat),
      });
      
      if (!response.ok) {
        throw new Error('فشل في إضافة الخدمة');
      }
      
      await fetchServices(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في إضافة الخدمة');
      return false;
    }
  };

  const updateService = async (id: string, serviceData: Partial<Service>) => {
    try {
      // Transform component format to database format
      const dbFormat = {
        title: serviceData.title,
        description: serviceData.description,
        short_description: serviceData.shortDescription,
        icon: serviceData.icon,
        image: serviceData.image,
        features: serviceData.features,
        benefits: serviceData.benefits,
        category: serviceData.category,
        is_active: serviceData.isActive,
        display_order: serviceData.order
      };
      
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbFormat),
      });
      
      if (!response.ok) {
        throw new Error('فشل في تحديث الخدمة');
      }
      
      await fetchServices(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحديث الخدمة');
      return false;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('فشل في حذف الخدمة');
      }
      
      await fetchServices(); // Refresh the list
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في حذف الخدمة');
      return false;
    }
  };

  // Load services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveService = async () => {
    if (editingService) {
      // Update existing service
      const success = await updateService(editingService.id, editingService);
      if (success) {
        setEditingService(null);
        setShowAddModal(false);
      }
    } else {
      // Create new service
      const success = await createService(newService as Omit<Service, 'id'>);
      if (success) {
        setNewService({
          title: '',
          description: '',
          shortDescription: '',
          icon: 'Building',
          image: '',
          features: [''],
          benefits: [''],
          category: 'construction',
          isActive: true,
          order: services.length + 1
        });
        setShowAddModal(false);
      }
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      const success = await deleteService(id);
      if (success) {
        // Service deleted successfully, list will be refreshed automatically
      }
    }
  };

  const addFeatureOrBenefit = (type: 'features' | 'benefits', isEditing: boolean = false) => {
    if (isEditing && editingService) {
      setEditingService({
        ...editingService,
        [type]: [...editingService[type], '']
      });
    } else {
      setNewService({
        ...newService,
        [type]: [...(newService[type] || []), '']
      });
    }
  };

  const removeFeatureOrBenefit = (type: 'features' | 'benefits', index: number, isEditing: boolean = false) => {
    if (isEditing && editingService) {
      setEditingService({
        ...editingService,
        [type]: editingService[type].filter((_, i) => i !== index)
      });
    } else {
      setNewService({
        ...newService,
        [type]: newService[type]?.filter((_, i) => i !== index) || []
      });
    }
  };

  const updateFeatureOrBenefit = (type: 'features' | 'benefits', index: number, value: string, isEditing: boolean = false) => {
    if (isEditing && editingService) {
      const updated = [...editingService[type]];
      updated[index] = value;
      setEditingService({
        ...editingService,
        [type]: updated
      });
    } else {
      const updated = [...(newService[type] || [])];
      updated[index] = value;
      setNewService({
        ...newService,
        [type]: updated
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل الخدمات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mr-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الخدمات</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة شاملة لجميع خدمات الشركة وتفاصيلها
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الخدمات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  {iconOptions.find(opt => opt.value === service.icon)?.icon && 
                    React.createElement(iconOptions.find(opt => opt.value === service.icon)!.icon, {
                      className: "w-6 h-6 text-blue-600"
                    })
                  }
                </div>
              </div>

              <div className="absolute top-4 left-4 flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setEditingService(service)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg hover:bg-red-500/30 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  service.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {service.isActive ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                {service.shortDescription}
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">الميزات:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                        +{service.features.length - 2} المزيد
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      {(showAddModal || editingService) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingService(null);
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
                    اسم الخدمة
                  </label>
                  <input
                    type="text"
                    value={editingService ? editingService.title : newService.title}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, title: e.target.value });
                      } else {
                        setNewService({ ...newService, title: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                    placeholder="أدخل اسم الخدمة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الوصف المختصر
                  </label>
                  <input
                    type="text"
                    value={editingService ? editingService.shortDescription : newService.shortDescription}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, shortDescription: e.target.value });
                      } else {
                        setNewService({ ...newService, shortDescription: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                    placeholder="وصف مختصر للخدمة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الوصف التفصيلي
                  </label>
                  <textarea
                    value={editingService ? editingService.description : newService.description}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, description: e.target.value });
                      } else {
                        setNewService({ ...newService, description: e.target.value });
                      }
                    }}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right resize-none"
                    placeholder="وصف تفصيلي للخدمة"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الفئة
                    </label>
                    <select
                      value={editingService ? editingService.category : newService.category}
                      onChange={(e) => {
                        if (editingService) {
                          setEditingService({ ...editingService, category: e.target.value as any });
                        } else {
                          setNewService({ ...newService, category: e.target.value as any });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      <option value="construction">البناء والتشييد</option>
                      <option value="maintenance">الصيانة والدعم</option>
                      <option value="consulting">الاستشارات الهندسية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الأيقونة
                    </label>
                    <select
                      value={editingService ? editingService.icon : newService.icon}
                      onChange={(e) => {
                        if (editingService) {
                          setEditingService({ ...editingService, icon: e.target.value });
                        } else {
                          setNewService({ ...newService, icon: e.target.value });
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رابط الصورة
                  </label>
                  <input
                    type="url"
                    value={editingService ? editingService.image : newService.image}
                    onChange={(e) => {
                      if (editingService) {
                        setEditingService({ ...editingService, image: e.target.value });
                      } else {
                        setNewService({ ...newService, image: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Features and Benefits */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">الميزات والفوائد</h3>
                
                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      الميزات
                    </label>
                    <button
                      onClick={() => addFeatureOrBenefit('features', !!editingService)}
                      className="flex items-center space-x-1 space-x-reverse px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
                      <Plus className="w-3 h-3" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(editingService ? editingService.features : newService.features || []).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeatureOrBenefit('features', index, e.target.value, !!editingService)}
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                          placeholder="أدخل الميزة"
                        />
                        <button
                          onClick={() => removeFeatureOrBenefit('features', index, !!editingService)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      الفوائد
                    </label>
                    <button
                      onClick={() => addFeatureOrBenefit('benefits', !!editingService)}
                      className="flex items-center space-x-1 space-x-reverse px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    >
                      <Plus className="w-3 h-3" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(editingService ? editingService.benefits : newService.benefits || []).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => updateFeatureOrBenefit('benefits', index, e.target.value, !!editingService)}
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                          placeholder="أدخل الفائدة"
                        />
                        <button
                          onClick={() => removeFeatureOrBenefit('benefits', index, !!editingService)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status and Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={editingService ? editingService.isActive : newService.isActive}
                        onChange={(e) => {
                          if (editingService) {
                            setEditingService({ ...editingService, isActive: e.target.checked });
                          } else {
                            setNewService({ ...newService, isActive: e.target.checked });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">خدمة نشطة</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ترتيب العرض
                    </label>
                    <input
                      type="number"
                      value={editingService ? editingService.order : newService.order}
                      onChange={(e) => {
                        if (editingService) {
                          setEditingService({ ...editingService, order: parseInt(e.target.value) });
                        } else {
                          setNewService({ ...newService, order: parseInt(e.target.value) });
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
                  setEditingService(null);
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveService}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                <span>{editingService ? 'حفظ التغييرات' : 'إضافة الخدمة'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManager;