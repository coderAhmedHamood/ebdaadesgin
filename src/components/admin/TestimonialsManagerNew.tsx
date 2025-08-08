import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Star,
  Quote,
  Building,
  Search,
  DollarSign,
  Clock,
  Loader2,
  AlertCircle
} from 'lucide-react';

// 1. Interface Definition
interface Testimonial {
  id: string;
  clientName: string;
  clientPosition: string;
  company: string;
  projectName: string;
  projectValue: string;
  projectDuration: string;
  testimonialText: string;
  rating: number;
  date: string;
  clientImage: string;
  projectImage: string;
  isActive: boolean;
  order: number;
}

// Type for new testimonial data, omitting the 'id' which will be generated.
type NewTestimonialData = Omit<Testimonial, 'id'>;



const TestimonialsManagerNew: React.FC = () => {
  // State for testimonials data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<NewTestimonialData>({
    clientName: '', clientPosition: '', company: '', projectName: '',
    projectValue: '', projectDuration: '', testimonialText: '', rating: 5,
    date: new Date().toISOString().split('T')[0], clientImage: '', projectImage: '',
    isActive: true, order: 1,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  // API Functions
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/reviews');
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonialData: NewTestimonialData) => {
    try {
      setError(null);
      // Transform frontend data to backend format
      const backendData = {
        name: testimonialData.clientName,
        position: testimonialData.clientPosition,
        department: testimonialData.company,
        bio: testimonialData.testimonialText,
        email: '', // Default empty
        phone: '', // Default empty
        linkedin: '', // Default empty
        image: testimonialData.clientImage,
        experience: testimonialData.projectValue,
        specialty: testimonialData.projectName,
        achievements: '', // Default empty
        skills: '', // Default empty
        isActive: testimonialData.isActive,
        ordering: testimonialData.order,
        joinDate: testimonialData.date
      };

      const response = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        throw new Error('Failed to create testimonial');
      }

      await fetchTestimonials(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateTestimonial = async (id: string, testimonialData: Testimonial) => {
    try {
      setError(null);
      // Transform frontend data to backend format
      const backendData = {
        name: testimonialData.clientName,
        position: testimonialData.clientPosition,
        department: testimonialData.company,
        bio: testimonialData.testimonialText,
        email: '', // Default empty
        phone: '', // Default empty
        linkedin: '', // Default empty
        image: testimonialData.clientImage,
        experience: testimonialData.projectValue,
        specialty: testimonialData.projectName,
        achievements: '', // Default empty
        skills: '', // Default empty
        isActive: testimonialData.isActive,
        ordering: testimonialData.order,
        joinDate: testimonialData.date
      };

      const response = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        throw new Error('Failed to update testimonial');
      }

      await fetchTestimonials(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`http://localhost:3000/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete testimonial');
      }

      await fetchTestimonials(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // 3. Handlers
  const handleOpenAddModal = () => {
    setNewTestimonial({
        clientName: '', clientPosition: '', company: '', projectName: '',
        projectValue: '', projectDuration: '', testimonialText: '', rating: 5,
        date: new Date().toISOString().split('T')[0], clientImage: '', projectImage: '',
        isActive: true, order: testimonials.length + 1,
    });
    setEditingTestimonial(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingTestimonial(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number | boolean = value;
    if (type === 'checkbox') {
        parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
        parsedValue = value ? parseInt(value, 10) : 0;
    }

    if (editingTestimonial) {
      setEditingTestimonial({ ...editingTestimonial, [name]: parsedValue });
    } else {
      setNewTestimonial({ ...newTestimonial, [name]: parsedValue });
    }
  };

  const handleSaveTestimonial = async () => {
    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, editingTestimonial);
      } else {
        await createTestimonial(newTestimonial);
      }
      handleCloseModal();
    } catch (err) {
      // Error is already handled in the API functions
      console.error('Failed to save testimonial:', err);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
      try {
        await deleteTestimonial(id);
      } catch (err) {
        console.error('Failed to delete testimonial:', err);
      }
    }
  };

  // 4. Rendering Helpers
  const renderStars = (rating: number, interactive = false, onStarClick: ((i: number) => void) | null = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer' : ''}`}
        fill="currentColor"
        onClick={() => interactive && onStarClick && onStarClick(i + 1)}
      />
    ));
  };

  // 5. Filtering Logic
  const filteredTestimonials = testimonials.filter(testimonial => {
    const searchTermLower = searchTerm.toLowerCase();
    const ratingMatch = filterRating === 'all' || testimonial.rating.toString() === filterRating;
    return ratingMatch && (
      testimonial.clientName.toLowerCase().includes(searchTermLower) ||
      testimonial.projectName.toLowerCase().includes(searchTermLower) ||
      testimonial.company.toLowerCase().includes(searchTermLower)
    );
  }).sort((a, b) => a.order - b.order);

  // 6. Modal Content
  let ModalContent = null;
  if (showAddModal) {
    const currentData = editingTestimonial || newTestimonial;
    const modalTitle = editingTestimonial ? 'تعديل شهادة' : 'إضافة شهادة جديدة';

    ModalContent = (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4" dir="rtl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{modalTitle}</h2>
            <button onClick={handleCloseModal} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form fields */}
            <input name="clientName" value={currentData.clientName} onChange={handleInputChange} placeholder="اسم العميل" className="p-2 border rounded" />
            <input name="clientPosition" value={currentData.clientPosition} onChange={handleInputChange} placeholder="منصب العميل" className="p-2 border rounded" />
            <input name="company" value={currentData.company} onChange={handleInputChange} placeholder="الشركة" className="p-2 border rounded" />
            <input name="projectName" value={currentData.projectName} onChange={handleInputChange} placeholder="اسم المشروع" className="p-2 border rounded" />
            <input name="projectValue" value={currentData.projectValue} onChange={handleInputChange} placeholder="قيمة المشروع" className="p-2 border rounded" />
            <input name="projectDuration" value={currentData.projectDuration} onChange={handleInputChange} placeholder="مدة المشروع" className="p-2 border rounded" />
            <input name="date" type="date" value={currentData.date} onChange={handleInputChange} placeholder="التاريخ" className="p-2 border rounded" />
            <input name="order" type="number" value={currentData.order} onChange={handleInputChange} placeholder="الترتيب" className="p-2 border rounded" />
            <input name="clientImage" value={currentData.clientImage} onChange={handleInputChange} placeholder="رابط صورة العميل" className="p-2 border rounded md:col-span-2" />
            <input name="projectImage" value={currentData.projectImage} onChange={handleInputChange} placeholder="رابط صورة المشروع" className="p-2 border rounded md:col-span-2" />
            <textarea name="testimonialText" value={currentData.testimonialText} onChange={handleInputChange} placeholder="نص الشهادة" className="p-2 border rounded md:col-span-2" rows={4}></textarea>
            <div className="flex items-center space-x-2 space-x-reverse">
              <label>التقييم:</label>
              {renderStars(currentData.rating, true, (rating) => handleInputChange({ target: { name: 'rating', value: rating.toString(), type: 'number' } } as any))}
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
                <input type="checkbox" id="isActive" name="isActive" checked={currentData.isActive} onChange={handleInputChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="isActive">نشط</label>
            </div>
          </div>
          <div className="flex justify-end space-x-4 space-x-reverse mt-8">
            <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">إلغاء</button>
            <button onClick={handleSaveTestimonial} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 space-x-reverse">
              <Save className="w-4 h-4" />
              <span>حفظ</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 7. Main Component Render
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الشهادات</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">إدارة شهادات العملاء وتقييماتهم للمشاريع</p>
        </div>
        <button onClick={handleOpenAddModal} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-4 h-4" />
          <span>إضافة شهادة جديدة</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="البحث في الشهادات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pr-10 pl-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right" />
          </div>
          <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white">
            <option value="all">جميع التقييمات</option>
            <option value="5">5 نجوم</option>
            <option value="4">4 نجوم</option>
            <option value="3">3 نجوم</option>
            <option value="2">2 نجوم</option>
            <option value="1">1 نجمة</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600 dark:text-gray-400">جاري تحميل الشهادات...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <div>
              <h3 className="text-red-800 dark:text-red-200 font-medium">حدث خطأ</h3>
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
                <img src={testimonial.projectImage} alt={testimonial.projectName} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute top-4 left-4 flex space-x-2 space-x-reverse">
                <button onClick={() => handleOpenEditModal(testimonial)} className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200">
                  <Edit3 className="w-4 h-4 text-white" />
                </button>
                <button onClick={() => handleDeleteTestimonial(testimonial.id)} className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg hover:bg-red-500/30 transition-colors duration-200">
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${testimonial.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {testimonial.isActive ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              <div className="absolute -bottom-8 right-6">
                <div className="w-16 h-16 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
                  <img src={testimonial.clientImage} alt={testimonial.clientName} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="pt-12 p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 space-x-reverse">
                  {renderStars(testimonial.rating)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(testimonial.date).toLocaleDateString('ar-SA')}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{testimonial.clientName}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-1">{testimonial.clientPosition}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{testimonial.company}</p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{testimonial.projectName}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <DollarSign className="w-3 h-3" />
                    <span>{testimonial.projectValue}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Clock className="w-3 h-3" />
                    <span>{testimonial.projectDuration}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Quote className="absolute top-0 right-0 w-6 h-6 text-blue-200 dark:text-blue-800" />
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pr-8">
                  {testimonial.testimonialText.length > 150 ? `${testimonial.testimonialText.substring(0, 150)}...` : testimonial.testimonialText}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {ModalContent}
    </div>
  );
};

export default TestimonialsManagerNew;
