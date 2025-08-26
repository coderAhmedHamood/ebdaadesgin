import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Shield, Building } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminLogin: React.FC = () => {
  const { login, loading } = useAdmin();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(formData.email, formData.password);
    if (!success) {
      setError('بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Building className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">لوحة تحكم إبداع ديزاين</h1>
          <p className="text-blue-200">دخول آمن لإدارة المحتوى</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-8 h-8 text-blue-400 ml-3" />
            <h2 className="text-2xl font-semibold text-white">تسجيل دخول المدير</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-12 pl-4 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-blue-300 text-right"
                  placeholder="admin@ebdaadesign.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pr-12 pl-12 py-4 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-blue-300 text-right"
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ml-3"></div>
                  جاري تسجيل الدخول...
                </div>
              ) : (
                'دخول لوحة التحكم'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
            <h3 className="text-sm font-semibold text-blue-200 mb-2">بيانات التجربة:</h3>
            <p className="text-xs text-blue-300">البريد الإلكتروني: admin@ebdaadesign.com</p>
            <p className="text-xs text-blue-300">كلمة المرور: admin123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-300 text-sm">
            © 2024 إبداع ديزاين
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;