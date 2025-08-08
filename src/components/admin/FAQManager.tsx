import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  HelpCircle, 
  Search,
  Filter,
  Eye,
  ChevronDown,
  ChevronUp,
  Loader,
  AlertCircle
} from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FAQCategory {
  key: string;
  label: string;
}

const FAQManager: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [newFAQ, setNewFAQ] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    category: ''
  });

  // API Functions
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/faq-categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('خطأ في تحميل الفئات');
      console.error('Error fetching categories:', err);
    }
  };

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs');
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      const data = await response.json();
      setFaqs(data);
    } catch (err) {
      setError('خطأ في تحميل الأسئلة الشائعة');
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const createFAQ = async (faq: Partial<FAQ>) => {
    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq)
      });
      if (!response.ok) throw new Error('Failed to create FAQ');
      const newFaq = await response.json();
      setFaqs([...faqs, newFaq]);
      return newFaq;
    } catch (err) {
      setError('خطأ في إضافة السؤال');
      console.error('Error creating FAQ:', err);
      throw err;
    }
  };

  const updateFAQ = async (id: number, faq: Partial<FAQ>) => {
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq)
      });
      if (!response.ok) throw new Error('Failed to update FAQ');
      const updatedFaq = await response.json();
      setFaqs(faqs.map(f => f.id === id ? updatedFaq : f));
      return updatedFaq;
    } catch (err) {
      setError('خطأ في تحديث السؤال');
      console.error('Error updating FAQ:', err);
      throw err;
    }
  };

  const deleteFAQ = async (id: number) => {
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete FAQ');
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (err) {
      setError('خطأ في حذف السؤال');
      console.error('Error deleting FAQ:', err);
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchCategories(), fetchFAQs()]);
    };
    loadData();
  }, []);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveFAQ = async () => {
    try {
      if (editingFAQ) {
        await updateFAQ(editingFAQ.id, editingFAQ);
        setEditingFAQ(null);
      } else {
        await createFAQ(newFAQ);
        setNewFAQ({ question: '', answer: '', category: '' });
        setShowAddModal(false);
      }
    } catch (err) {
      // Error already handled in API functions
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      await deleteFAQ(id);
    }
  };

  const getCategoryLabel = (categoryKey: string) => {
    const category = categories.find(cat => cat.key === categoryKey);
    return category ? category.label : categoryKey;
  };

  const getCategoryColor = (categoryKey: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    ];
    const index = categories.findIndex(cat => cat.key === categoryKey);
    return colors[index % colors.length] || colors[0];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="mr-2 text-gray-600 dark:text-gray-400">جاري التحميل...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="w-8 h-8 text-red-600" />
        <span className="mr-2 text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الأسئلة الشائعة</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة شاملة للأسئلة الشائعة وإجاباتها
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سؤال جديد</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">إجمالي الأسئلة</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{faqs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">الفئات</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Filter className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">الأسئلة المجابة</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{faqs.filter(f => f.answer.trim() !== '').length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الأسئلة والإجابات..."
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
            <option value="all">جميع الفئات</option>
            {categories.map(category => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(faq.category)}`}>
                      {getCategoryLabel(faq.category)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      نشط
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="text-right w-full"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      {faq.question}
                    </h3>
                  </button>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse mr-4">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => setEditingFAQ(faq)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFAQ(faq.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {expandedFAQ === faq.id && (
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer || 'لم يتم إضافة إجابة بعد'}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit FAQ Modal */}
      {(showAddModal || editingFAQ) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingFAQ ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFAQ(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  السؤال
                </label>
                <input
                  type="text"
                  value={editingFAQ ? editingFAQ.question : newFAQ.question}
                  onChange={(e) => {
                    if (editingFAQ) {
                      setEditingFAQ({ ...editingFAQ, question: e.target.value });
                    } else {
                      setNewFAQ({ ...newFAQ, question: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                  placeholder="أدخل السؤال"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الإجابة
                </label>
                <textarea
                  value={editingFAQ ? editingFAQ.answer : newFAQ.answer}
                  onChange={(e) => {
                    if (editingFAQ) {
                      setEditingFAQ({ ...editingFAQ, answer: e.target.value });
                    } else {
                      setNewFAQ({ ...newFAQ, answer: e.target.value });
                    }
                  }}
                  rows={6}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right resize-none"
                  placeholder="أدخل الإجابة التفصيلية"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الفئة
                </label>
                <select
                  value={editingFAQ ? editingFAQ.category : newFAQ.category}
                  onChange={(e) => {
                    if (editingFAQ) {
                      setEditingFAQ({ ...editingFAQ, category: e.target.value });
                    } else {
                      setNewFAQ({ ...newFAQ, category: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="">اختر فئة</option>
                  {categories.map(category => (
                    <option key={category.key} value={category.key}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 space-x-reverse mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingFAQ(null);
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveFAQ}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                <span>{editingFAQ ? 'حفظ التغييرات' : 'إضافة السؤال'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManager;