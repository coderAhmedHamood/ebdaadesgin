import React from 'react';
import { 
  Users, 
  Building, 
  MessageSquare, 
  TrendingUp, 
  Eye, 
  Globe,
  Calendar,
  Award,
  BarChart3,
  Activity,
  Mail,
  FileText,
  Shield,
  Target
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      name: 'إجمالي المشاريع',
      value: '247',
      change: '+12%',
      changeType: 'increase',
      icon: Building,
      color: 'blue'
    },
    {
      name: 'العملاء النشطون',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      color: 'green'
    },
    {
      name: 'زوار الموقع',
      value: '12.4K',
      change: '+23%',
      changeType: 'increase',
      icon: Eye,
      color: 'purple'
    },
    {
      name: 'الشهادات',
      value: '89',
      change: '+5%',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'yellow'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'project',
      title: 'تم إضافة مشروع جديد "برج الرياض التجاري"',
      time: 'منذ ساعتين',
      user: 'أحمد الراشد'
    },
    {
      id: 2,
      type: 'testimonial',
      title: 'شهادة عميل جديدة من شركة التطوير الملكي',
      time: 'منذ 4 ساعات',
      user: 'سارة المنصوري'
    },
    {
      id: 3,
      type: 'content',
      title: 'تم تحديث محتوى الصفحة الرئيسية',
      time: 'منذ 6 ساعات',
      user: 'محمد العتيبي'
    },
    {
      id: 4,
      type: 'faq',
      title: 'تم إضافة سؤال جديد حول الجداول الزمنية للمشاريع',
      time: 'منذ يوم واحد',
      user: 'فاطمة الزهراء'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'تحديث إحصائيات الربع الرابع',
      priority: 'high',
      dueDate: 'اليوم'
    },
    {
      id: 2,
      title: 'مراجعة شهادات العملاء الجديدة',
      priority: 'medium',
      dueDate: 'غداً'
    },
    {
      id: 3,
      title: 'نشر تقرير تقدم رؤية 2030',
      priority: 'high',
      dueDate: '15 ديسمبر'
    },
    {
      id: 4,
      title: 'تحديث صور فريق القيادة',
      priority: 'low',
      dueDate: '20 ديسمبر'
    }
  ];

  const quickActions = [
    { name: 'إضافة مشروع جديد', icon: Building, color: 'blue', href: '/admin/projects' },
    { name: 'إضافة شهادة', icon: MessageSquare, color: 'green', href: '/admin/testimonials' },
    { name: 'تحديث المحتوى', icon: Globe, color: 'purple', href: '/admin/content' },
    { name: 'عرض التقارير', icon: BarChart3, color: 'yellow', href: '/admin/analytics' },
    { name: 'إدارة المستخدمين', icon: Shield, color: 'red', href: '/admin/users' },
    { name: 'إدارة الرسائل', icon: Mail, color: 'indigo', href: '/admin/messages' },
    { name: 'إدارة رؤية 2030', icon: Target, color: 'pink', href: '/admin/vision2030' },
    { name: 'إدارة الأسئلة الشائعة', icon: FileText, color: 'orange', href: '/admin/faq' }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
      purple: 'from-purple-600 to-purple-700',
      yellow: 'from-yellow-500 to-yellow-600'
    };
    return colors[color as keyof typeof colors];
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    };
    return colors[priority as keyof typeof colors];
  };

  const getActionColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      green: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300',
      purple: 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      red: 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      pink: 'bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-pink-700 dark:text-pink-300',
      orange: 'bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-300'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">لوحة المعلومات</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          مرحباً بك! إليك ما يحدث مع موقعك الإلكتروني.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">
                    مقارنة بالشهر الماضي
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${getStatColor(stat.color)} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">النشاط الأخير</h2>
            <Activity className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2 space-x-reverse mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      بواسطة {activity.user}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">المهام القادمة</h2>
            <Calendar className="w-5 h-5 text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    الموعد النهائي: {task.dueDate}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority === 'high' ? 'عالي' : task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">الإجراءات السريعة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`flex items-center space-x-3 space-x-reverse p-4 rounded-xl transition-colors duration-200 ${getActionColor(action.color)}`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;