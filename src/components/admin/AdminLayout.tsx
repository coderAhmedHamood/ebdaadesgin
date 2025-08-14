import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Building,
  MessageSquare,
  HelpCircle,
  Target,
  Globe,
  Bell,
  Search,
  UserCheck,
  Package
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAdmin();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'لوحة المعلومات', href: '/admin', icon: Home },
    { name: 'إدارة المحتوى', href: '/admin/content', icon: FileText },
    { name: 'إدارة المشاريع', href: '/admin/projects', icon: Building },
    { name: 'إدارة الخدمات', href: '/admin/services', icon: Settings },
    { name: 'إدارة الباقات', href: '/admin/packages', icon: Package },
    { name: 'إدارة الفريق', href: '/admin/team', icon: Users },
    { name: 'إدارة الشهادات', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'إدارة الأسئلة الشائعة', href: '/admin/faq', icon: HelpCircle },
    { name: 'إدارة رؤية 2030', href: '/admin/vision2030', icon: Target },
    { name: 'إدارة العملاء', href: '/admin/clients', icon: UserCheck },
    { name: 'طلبات عروض الأسعار', href: '/admin/quote-requests', icon: FileText },
    // { name: 'الإعدادات العامة', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">لوحة تحكم أوج</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">نظام الإدارة</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 space-x-reverse">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">مدير النظام</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={logout}
            className="flex items-center space-x-3 space-x-reverse w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:mr-80">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-20 px-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="w-6 h-6 text-gray-500" />
              </button>
              
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في المحتوى..."
                    className="pr-10 pl-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <Bell className="w-6 h-6 text-gray-500" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">الموقع المباشر</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;