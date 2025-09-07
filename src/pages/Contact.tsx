import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    otherReason: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build payload to match backend table project_requests
    const payload = {
      name: formData.name,
      company_name: '',
      requested_services: {
        reason: formData.reason,
        otherReason: formData.reason === 'سبب آخر - يرجى ذكره' ? formData.otherReason : '',
        message: formData.message,
      },
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const res = await fetch('/api/project-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: '',
        otherReason: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('حدث خطأ أثناء إرسال النموذج. الرجاء المحاولة لاحقًا.');
    } finally {
      // Hide success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('phone'),
      details: ['+966562428504'],
      action: 'tel:+966562428504'
    }
  ];

  const reasons = [
    'استفسار عن خدمة',
    'مقترح شراكة',
    'مشكلة في الموقع',
    'سبب آخر - يرجى ذكره'
  ];

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
            <Phone className="h-20 w-20 mx-auto mb-6 opacity-90 text-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('contactTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('getInTouchTitle')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {t('getInTouchDesc')}
                </p>
              </div>

              {contactInfo.map((info, index) => (
                <div key={index} className="group">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <div key={idx} className="text-gray-600 dark:text-gray-400 mb-1">
                          {info.action ? (
                            <a
                              href={info.action}
                              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  تواصل معنا
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('thankYou')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('messageSentSuccess')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          الاسم *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-gray-900 dark:text-white"
                            placeholder="اكتب اسمك الكامل"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          البريد الإلكتروني *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-gray-900 dark:text-white"
                            placeholder="example@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          رقم التواصل
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-gray-900 dark:text-white"
                            placeholder="05xxxxxxxx"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          سبب التواصل *
                        </label>
                        <select
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-gray-900 dark:text-white"
                        >
                          <option value="">اختر السبب</option>
                          {reasons.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>


                    </div>

                    {formData.reason === 'سبب آخر - يرجى ذكره' && (
                      <div>
                        <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          يرجى ذكر السبب
                        </label>
                        <input
                          type="text"
                          id="otherReason"
                          name="otherReason"
                          value={formData.otherReason}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-gray-900 dark:text-white"
                          placeholder="اكتب السبب"
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        كيف يمكننا مساعدتك؟ *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 text-gray-900 dark:text-white resize-none"
                        placeholder="اكتب رسالتك هنا"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-3 rtl:space-x-reverse px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Send className="w-5 h-5" />
                      <span>إرسال الرسالة</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Quick Contact */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('needImmediateAssistance')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('urgentInquiries')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:+966562428504"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-semibold rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1"
            >
              {t('callNow')}: +966562428504
            </a>
            <a
              href="mailto:info@awjcontracting.sa"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              {t('emailUs')}
            </a>
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

export default Contact;