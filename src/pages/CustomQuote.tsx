import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CustomQuote: React.FC = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPackageTitle, setSelectedPackageTitle] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const toggleService = (key: string) => {
    setServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!name.trim()) e.name = t('formRequired');
    if (!phone.trim()) e.phone = t('formRequired');
    if (!email.trim()) e.email = t('formRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await fetch('/api/project-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company_name: company,
          requested_services: services,
          phone,
          email,
          message: description,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الإرسال. حاول مرة أخرى.');
    }
  };

  // Prefill from query params/localStorage if provided
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const title = sp.get('selected_package_title');
      const prefill = sp.get('prefill_desc');
      if (title) setSelectedPackageTitle(title);
      if (prefill) setDescription(prefill);
      else if (title && !prefill) setDescription(`أرغب في الحصول على باقة ${title}`);
    } catch {}
  }, []);

  const serviceOptions = [
    { key: 'serviceWebsite', label: t('serviceWebsite') },
    { key: 'serviceEcommerce', label: t('serviceEcommerce') },
    { key: 'serviceSocial', label: t('serviceSocial') },
    { key: 'serviceBranding', label: t('serviceBranding') },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {t('customQuotePageTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('customQuotePageDesc')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-10">
          {selectedPackageTitle && (
            <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100">
              <div className="font-bold">الباقة المختارة:</div>
              <div>{selectedPackageTitle}</div>
            </div>
          )}
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-2xl font-bold text-green-600 mb-3">{t('success')}</div>
              <p className="text-gray-700 dark:text-gray-300 mb-8">{t('formSubmitted')}</p>
              <a
                href="/services"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {t('backToServices')}
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('yourName')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('companyNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('requiredServices')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((opt) => (
                    <label key={opt.key} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={services.includes(opt.key)}
                        onChange={() => toggleService(opt.key)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                      />
                      <span className="text-gray-800 dark:text-gray-200">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  وصف الطلب
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="اكتب تفاصيل إضافية لطلبك"
                />
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('contactInfoSection')}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {t('submitRequest')}
                </button>
                <a href="/services" className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  {t('backToServices')}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomQuote;
