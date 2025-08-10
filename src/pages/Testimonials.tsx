import React, { useState, useEffect } from 'react';
import { Star, Quote, ThumbsUp, MessageCircle, Calendar, Building, User } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  rating: number;
  category: string;
  project: string;
  date: string;
  testimonial: string;
  projectValue: string;
  duration: string;
}

const Testimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews');
      if (!response.ok) {
        throw new Error('فشل في تحميل الشهادات');
      }
      const data = await response.json();
      
      // Transform API data to match component structure
      const transformedData = data.map((item: any) => ({
        id: item.id,
        name: item.clientName,
        position: item.clientPosition,
        company: item.company,
        image: item.clientImage, // Fixed: use clientImage from API response
        rating: item.rating || 5,
        category: 'general', // Default category
        project: item.projectName,
        date: item.date,
        testimonial: item.testimonialText,
        projectValue: item.projectValue,
        duration: item.projectDuration
      }));
      
      setTestimonials(transformedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      console.error('Error fetching testimonials:', err);
      // Don't use fallback data - leave testimonials empty
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const categories = [
    { key: 'all', label: 'جميع المشاريع', count: testimonials.length },
    { key: 'commercial', label: 'تجاري', count: testimonials.filter(t => t.category === 'commercial').length },
    { key: 'residential', label: 'سكني', count: testimonials.filter(t => t.category === 'residential').length },
    { key: 'industrial', label: 'صناعي', count: testimonials.filter(t => t.category === 'industrial').length }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">جاري تحميل الشهادات...</p>
        </div>
      </div>
    );
  }

  // Show error state if API failed and no data available
  if (error && testimonials.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-6">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            لا توجد بيانات
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <button
            onClick={fetchTestimonials}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

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
            <Quote className="h-20 w-20 mx-auto mb-6 opacity-90 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            شهادات عملائنا
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            اكتشف ما يقوله عملاؤنا عن تجربتهم مع إبداع ديزاين
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">99%</div>
              <div className="text-gray-600 dark:text-gray-400">معدل رضا العملاء</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5.0</div>
              <div className="text-gray-600 dark:text-gray-400">التقييم المتوسط</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">30+</div>
              <div className="text-gray-600 dark:text-gray-400">العملاء السعداء</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">85%</div>
              <div className="text-gray-600 dark:text-gray-400">العملاء المتكررون</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full flex items-center justify-center ${testimonial.image ? 'hidden' : ''}`}>
                        <span className="text-white text-xl font-bold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {testimonial.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                        {testimonial.position}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.company}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {testimonial.projectValue}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">قيمة المشروع</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {testimonial.duration}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">المدة</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200 dark:text-blue-800 opacity-50" />
                    <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed pl-6 italic">
                      "{testimonial.testimonial}"
                    </blockquote>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {testimonial.project}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(testimonial.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Comments Section */}
      {/* <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              آراء العملاء الأخيرة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              تعليقات فورية من عملائنا الكرام
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 rtl:space-x-reverse p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      خالد الحربي
                    </h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      منذ يومين
                    </span>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {renderStars(5)}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    "انتهيت للتو من الجولة النهائية في مقرنا الجديد. الاهتمام بالتفاصيل وجودة الصنعة استثنائية. شكراً لفريق أوج!"
                  </p>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <button className="flex items-center space-x-1 rtl:space-x-reverse hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      <ThumbsUp className="w-4 h-4" />
                      <span>12</span>
                    </button>
                    <button className="flex items-center space-x-1 rtl:space-x-reverse hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      <MessageCircle className="w-4 h-4" />
                      <span>رد</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 rtl:space-x-reverse p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      ليلى القحطاني
                    </h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      منذ أسبوع
                    </span>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {renderStars(5)}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    "مهارات إدارة المشاريع لدى الفريق متميزة. تم الوفاء بكل معلم في الموعد المحدد، والتواصل كان ممتازاً طوال العملية بأكملها."
                  </p>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <button className="flex items-center space-x-1 rtl:space-x-reverse hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      <ThumbsUp className="w-4 h-4" />
                      <span>8</span>
                    </button>
                    <button className="flex items-center space-x-1 rtl:space-x-reverse hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      <MessageCircle className="w-4 h-4" />
                      <span>رد</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            انضم إلى عملائنا الراضين
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            اختبر الفرق مع إبداع ديزاين واكتشف لماذا يثق بنا العملاء في جميع أنحاء العالم العربي
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              سجل كعميل
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              احصل على عرض سعر
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;