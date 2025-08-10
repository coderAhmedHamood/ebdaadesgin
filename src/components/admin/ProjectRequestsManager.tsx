import React, { useEffect, useState } from 'react';

interface ProjectRequest {
  id: number;
  name: string;
  company_name: string;
  requested_services: string; // stored as JSON or CSV
  phone: string;
  email: string;
}

const ProjectRequestsManager: React.FC = () => {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/project-requests');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setRequests(data);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
    try {
      const res = await fetch(`/api/project-requests/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      alert('تعذر حذف الطلب');
    }
  };

  const serviceLabelMap: Record<string, string> = {
    serviceWebsite: 'تصميم موقع إلكتروني',
    serviceEcommerce: 'تصميم متجر إلكتروني',
    serviceSocial: 'إدارة حسابات التواصل الاجتماعي',
    serviceBranding: 'تصميم الشعار والهوية البصرية',
  };

  const parseServices = (s: string): string[] => {
    if (!s) return [];
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed.map((k) => serviceLabelMap[k] || k);
    } catch (_) {
      // not JSON, maybe CSV
    }
    return s
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
      .map((k) => serviceLabelMap[k] || k);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">طلبات عروض الأسعار</h1>
        <button
          onClick={fetchRequests}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >تحديث</button>
      </div>

      {loading && <div className="text-gray-600 dark:text-gray-300">جاري التحميل...</div>}
      {error && <div className="text-red-600">حدث خطأ: {error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">#</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">الاسم</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">الشركة</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">الخدمات المطلوبة</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">الهاتف</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-200">البريد</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {requests.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/40">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{r.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{r.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{r.company_name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                    <ul className="list-disc pr-5">
                      {parseServices(r.requested_services).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{r.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{r.email}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >حذف</button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">لا توجد طلبات حتى الآن</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectRequestsManager;
