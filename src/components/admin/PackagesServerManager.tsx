import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle, Plus, X, Edit2, Trash2, Loader2 } from 'lucide-react';

export interface PackageServerItem {
  id?: number;
  title: string;
  description: string;
  price: number | null;
  delivery_time: string | null;
  features: string[];
  category: string | null;
  is_active: boolean;
  display_order: number | null;
}

const emptyItem: PackageServerItem = {
  title: '',
  description: '',
  price: null,
  delivery_time: null,
  features: [],
  category: null,
  is_active: true,
  display_order: null,
};

const PackagesServerManager: React.FC = () => {
  const [items, setItems] = useState<PackageServerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PackageServerItem>(emptyItem);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(p =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
  }, [items, search]);

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/packages-server');
      if (!res.ok) throw new Error('فشل في جلب البيانات');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطأ غير معروف');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyItem);
    setShowModal(true);
  };

  const openEdit = (pkg: PackageServerItem) => {
    setEditingId(pkg.id ?? null);
    setForm({
      title: pkg.title || '',
      description: pkg.description || '',
      price: pkg.price ?? null,
      delivery_time: pkg.delivery_time ?? null,
      features: Array.isArray(pkg.features) ? pkg.features : [],
      category: pkg.category ?? null,
      is_active: !!pkg.is_active,
      display_order: pkg.display_order ?? null,
    });
    setShowModal(true);
  };

  const remove = async (id?: number) => {
    if (!id) return;
    if (!confirm('هل تريد حذف هذا السجل؟')) return;
    const res = await fetch(`/api/packages-server/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('فشل الحذف');
      return;
    }
    await load();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/packages-server/${editingId}` : '/api/packages-server';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('فشل الحفظ');
      setShowModal(false);
      setForm(emptyItem);
      setEditingId(null);
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'فشل الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const updateFeature = (idx: number, val: string) => {
    const next = [...form.features];
    next[idx] = val;
    setForm({ ...form, features: next });
  };
  const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
  const removeFeature = (idx: number) => setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">إدارة الباقات (packages_server)</h1>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" /> إضافة سجل
        </button>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالعنوان أو الفئة"
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
        />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin"/> جار التحميل...</div>
      ) : error ? (
        <div className="text-red-600">خطأ: {error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-right">#</th>
                <th className="px-4 py-3 text-right">العنوان</th>
                <th className="px-4 py-3 text-right">الوصف</th>
                <th className="px-4 py-3 text-right">السعر</th>
                <th className="px-4 py-3 text-right">مدة التسليم</th>
                <th className="px-4 py-3 text-right">الفئة</th>
                <th className="px-4 py-3 text-right">مفعل</th>
                <th className="px-4 py-3 text-right">الترتيب</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">{p.description}</td>
                  <td className="px-4 py-3">{p.price ?? '—'}</td>
                  <td className="px-4 py-3">{p.delivery_time ?? '—'}</td>
                  <td className="px-4 py-3">{p.category ?? '—'}</td>
                  <td className="px-4 py-3">{p.is_active ? <span className="inline-flex items-center text-green-600"><CheckCircle className="w-4 h-4 mr-1"/>نعم</span> : 'لا'}</td>
                  <td className="px-4 py-3">{p.display_order ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => openEdit(p)} className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 mr-2">
                      <Edit2 className="w-4 h-4"/> تعديل
                    </button>
                    <button onClick={() => remove(p.id)} className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 className="w-4 h-4"/> حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6" dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{editingId ? 'تعديل سجل' : 'إضافة سجل'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">العنوان</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800" />
                </div>
                <div>
                  <label className="block text-sm mb-1">الفئة</label>
                  <input value={form.category ?? ''} onChange={e => setForm({ ...form, category: e.target.value || null })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800" />
                </div>
                <div>
                  <label className="block text-sm mb-1">السعر (بالريال)</label>
                  <input type="number" step="0.01" value={form.price ?? ''} onChange={e => setForm({ ...form, price: e.target.value === '' ? null : Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800" />
                </div>
                <div>
                  <label className="block text-sm mb-1">مدة التسليم</label>
                  <input value={form.delivery_time ?? ''} onChange={e => setForm({ ...form, delivery_time: e.target.value || null })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800" />
                </div>
                <div>
                  <label className="block text-sm mb-1">الترتيب (للإبراز)</label>
                  <input type="number" value={form.display_order ?? ''} onChange={e => setForm({ ...form, display_order: e.target.value === '' ? null : Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800" />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input id="is_active_ps" type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
                  <label htmlFor="is_active_ps">مفعل</label>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">الوصف</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm">المميزات</label>
                  <button type="button" onClick={addFeature} className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Plus className="w-4 h-4"/> إضافة ميزة
                  </button>
                </div>
                <div className="space-y-2">
                  {form.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input value={f} onChange={e => updateFeature(i, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-800" />
                      <button type="button" onClick={() => removeFeature(i)} className="p-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border">إلغاء</button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin"/>}
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesServerManager;
