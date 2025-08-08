import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, MessageCircle, Phone, Mail } from 'lucide-react';

interface FAQCategory {
  key: string;
  label: string;
}

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQ categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/faq-categories');
      if (!response.ok) {
        throw new Error('فشل في تحميل تصنيفات الأسئلة');
      }
      const data = await response.json();
      setFaqCategories(data);
    } catch (err) {
      console.error('Error fetching FAQ categories:', err);
      // Use fallback categories if API fails
      setFaqCategories([
        { key: 'all', label: 'جميع الأسئلة' },
        { key: 'general', label: 'عام' },
        { key: 'services', label: 'الخدمات' },
        { key: 'projects', label: 'إدارة المشاريع' },
        { key: 'pricing', label: 'التسعير' },
        { key: 'timeline', label: 'الجدول الزمني' },
        { key: 'quality', label: 'معايير الجودة' }
      ]);
    }
  };

  // Fetch FAQs from API
  const fetchFaqs = async (category: string = 'all') => {
    try {
      setLoading(true);
      const url = category === 'all' ? '/api/faqs' : `/api/faqs?category=${category}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('فشل في تحميل الأسئلة');
      }
      const data = await response.json();
      setFaqs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      console.error('Error fetching FAQs:', err);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchCategories();
    fetchFaqs();
  }, []);

  // Refetch FAQs when category changes
  useEffect(() => {
    fetchFaqs(selectedCategory);
  }, [selectedCategory]);

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">جاري تحميل الأسئلة...</p>
        </div>
      </div>
    );
  }

  // Show error state if API failed and no data available
  if (error && faqs.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-6">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            لا توجد أسئلة
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error}
          </p>
          <button
            onClick={() => fetchFaqs(selectedCategory)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
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
            <MessageCircle className="h-20 w-20 mx-auto mb-6 opacity-90 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            الأسئلة الشائعة
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            إجابات شاملة على أكثر الأسئلة شيوعاً حول خدماتنا ومشاريعنا
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ابحث في الأسئلة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pr-10 pl-3 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-80">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              >
                {faqCategories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  لا توجد أسئلة
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  لم يتم العثور على أسئلة تطابق البحث أو التصنيف المحدد
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-8 py-6 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                          openItem === faq.id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {openItem === faq.id && (
                    <div className="px-8 pb-6">
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              هل تحتاج إلى مزيد من المساعدة؟
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              فريقنا موجود لمساعدتك في أي وقت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Live Chat Support */}
            <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                دعم الدردشة المباشرة
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                احصل على إجابات فورية من فريق الدعم لدينا
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300">
                ابدأ المحادثة
              </button>
            </div>

            {/* Phone Support */}
            <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                الدعم الهاتفي
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                تحدث مباشرة مع أحد خبرائنا
              </p>
              <a
                href="tel:+966111234567"
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-300"
              >
                اتصل الآن
              </a>
            </div>

            {/* Email Support */}
            <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                الدعم عبر البريد الإلكتروني
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                أرسل أسئلتك التفصيلية وسنرد عليك قريباً
              </p>
              <a
                href="mailto:info@awjcontracting.sa"
                className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors duration-300"
              >
                أرسل بريد إلكتروني
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            مستعد لمناقشة مشروعك؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            سواء وجدت الإجابات التي تبحث عنها أو تحتاج إلى مزيد من المعلومات، فريقنا هنا لمساعدتك
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              تواصل مع خبرائنا
            </a>
            <a
              href="/register"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              سجل كعميل
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
