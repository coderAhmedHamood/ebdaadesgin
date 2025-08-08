import React, { useState, useEffect } from 'react';
import {
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Users, 
  Mail, 
  Phone, 
  Linkedin, 
  Award,
  Search
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  image: string;
  experience: string;
  specialty: string;
  achievements: string[];
  skills: string[];
  isActive: boolean;
  order: number;
  joinDate: string;
}

const TeamManager: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterActive, setFilterActive] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // API Functions
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/team-members');
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTeamMember = async (memberData: Omit<TeamMember, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/api/team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) {
        throw new Error('Failed to create team member');
      }
      const newMember = await response.json();
      setTeamMembers(prev => [...prev, newMember]);
      return newMember;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateTeamMember = async (id: string, memberData: Partial<TeamMember>) => {
    try {
      const response = await fetch(`http://localhost:3000/api/team-members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) {
        throw new Error('Failed to update team member');
      }
      const updatedMember = await response.json();
      setTeamMembers(prev => prev.map(member => 
        member.id === id ? updatedMember : member
      ));
      return updatedMember;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/team-members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete team member');
      }
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    department: 'الإدارة العليا',
    bio: '',
    email: '',
    phone: '',
    linkedin: '',
    image: '',
    experience: '',
    specialty: '',
    achievements: [''],
    skills: [''],
    isActive: true,
    order: teamMembers.length + 1,
    joinDate: new Date().toISOString().split('T')[0]
  });

  const departments = [
    { value: 'all', label: 'جميع الأقسام' },
    { value: 'الإدارة العليا', label: 'الإدارة العليا' },
    { value: 'العمليات', label: 'العمليات' },
    { value: 'التكنولوجيا', label: 'التكنولوجيا' },
    { value: 'المالية', label: 'المالية' },
    { value: 'الموارد البشرية', label: 'الموارد البشرية' },
    { value: 'المشاريع', label: 'المشاريع' },
    { value: 'الهندسة', label: 'الهندسة' },
    { value: 'التطوير', label: 'التطوير' }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesActive = filterActive === 'all' || 
                         (filterActive === 'active' && member.isActive) ||
                         (filterActive === 'inactive' && !member.isActive);
    return matchesSearch && matchesDepartment && matchesActive;
  });

  const handleSaveMember = async () => {
    try {
      if (editingMember) {
        await updateTeamMember(editingMember.id, editingMember);
        setEditingMember(null);
      } else {
        const memberData = {
          ...newMember,
          order: teamMembers.length + 1,
          joinDate: new Date().toISOString().split('T')[0]
        } as Omit<TeamMember, 'id'>;
        
        await createTeamMember(memberData);
        setNewMember({
          name: '',
          position: '',
          department: 'الإدارة العليا',
          bio: '',
          email: '',
          phone: '',
          linkedin: '',
          image: '',
          experience: '',
          specialty: '',
          achievements: [''],
          skills: [''],
          isActive: true,
          order: teamMembers.length + 1,
          joinDate: new Date().toISOString().split('T')[0]
        });
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('حدث خطأ أثناء حفظ البيانات');
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      try {
        await deleteTeamMember(id);
      } catch (error) {
        console.error('Error deleting team member:', error);
        alert('حدث خطأ أثناء حذف العضو');
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateTeamMember(id, { isActive: !currentStatus });
    } catch (error) {
      console.error('Error toggling member status:', error);
      alert('حدث خطأ أثناء تغيير حالة العضو');
    }
  };

  const addListItem = (type: 'achievements' | 'skills', isEditing: boolean = false) => {
    if (isEditing && editingMember) {
      setEditingMember({
        ...editingMember,
        [type]: [...editingMember[type], '']
      });
    } else {
      setNewMember({
        ...newMember,
        [type]: [...(newMember[type] || []), '']
      });
    }
  };

  const removeListItem = (type: 'achievements' | 'skills', index: number, isEditing: boolean = false) => {
    if (isEditing && editingMember) {
      setEditingMember({
        ...editingMember,
        [type]: editingMember[type].filter((_, i) => i !== index)
      });
    } else {
      setNewMember({
        ...newMember,
        [type]: newMember[type]?.filter((_, i) => i !== index) || []
      });
    }
  };

  const updateListItem = (type: 'achievements' | 'skills', index: number, value: string, isEditing: boolean = false) => {
    if (isEditing && editingMember) {
      const updated = [...editingMember[type]];
      updated[index] = value;
      setEditingMember({
        ...editingMember,
        [type]: updated
      });
    } else {
      const updated = [...(newMember[type] || [])];
      updated[index] = value;
      setNewMember({
        ...newMember,
        [type]: updated
      });
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">إدارة الفريق</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            إدارة شاملة لأعضاء فريق الشركة ومعلوماتهم
          </p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عضو جديد</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="mr-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في أعضاء الفريق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
            />
          </div>

          <div className="flex space-x-4 space-x-reverse">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              {departments.map(dept => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
            
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط فقط</option>
              <option value="inactive">غير نشط فقط</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="mr-3 text-gray-600 dark:text-gray-400">جاري تحميل البيانات...</span>
        </div>
      )}

      {/* Team Members Grid */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              
              <div className="absolute -bottom-12 right-6">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute top-4 left-4 flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setEditingMember(member)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg hover:bg-red-500/30 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="absolute top-4 right-4 flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => handleToggleActive(member.id, member.isActive)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    member.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {member.isActive ? 'نشط' : 'غير نشط'}
                </button>
              </div>
            </div>

            <div className="pt-16 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                {member.position}
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {member.department}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{member.experience} خبرة</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{member.specialty}</span>
                </div>
              </div>

              <div className="flex space-x-3 space-x-reverse">
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Add/Edit Member Modal */}
      {(showModal || editingMember) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingMember ? 'تعديل عضو الفريق' : 'إضافة عضو جديد'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingMember(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">المعلومات الشخصية</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={editingMember ? editingMember.name : newMember.name}
                    onChange={(e) => {
                      if (editingMember) {
                        setEditingMember({ ...editingMember, name: e.target.value });
                      } else {
                        setNewMember({ ...newMember, name: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      المنصب
                    </label>
                    <input
                      type="text"
                      value={editingMember ? editingMember.position : newMember.position}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, position: e.target.value });
                        } else {
                          setNewMember({ ...newMember, position: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="المنصب الوظيفي"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      القسم
                    </label>
                    <select
                      value={editingMember ? editingMember.department : newMember.department}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, department: e.target.value });
                        } else {
                          setNewMember({ ...newMember, department: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    >
                      {departments.slice(1).map(dept => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    النبذة الشخصية
                  </label>
                  <textarea
                    value={editingMember ? editingMember.bio : newMember.bio}
                    onChange={(e) => {
                      if (editingMember) {
                        setEditingMember({ ...editingMember, bio: e.target.value });
                      } else {
                        setNewMember({ ...newMember, bio: e.target.value });
                      }
                    }}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right resize-none"
                    placeholder="نبذة شخصية عن العضو"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      سنوات الخبرة
                    </label>
                    <input
                      type="text"
                      value={editingMember ? editingMember.experience : newMember.experience}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, experience: e.target.value });
                        } else {
                          setNewMember({ ...newMember, experience: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="مثال: 15 سنة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      التخصص
                    </label>
                    <input
                      type="text"
                      value={editingMember ? editingMember.specialty : newMember.specialty}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, specialty: e.target.value });
                        } else {
                          setNewMember({ ...newMember, specialty: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="التخصص الرئيسي"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={editingMember ? editingMember.email : newMember.email}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, email: e.target.value });
                        } else {
                          setNewMember({ ...newMember, email: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="البريد الإلكتروني"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={editingMember ? editingMember.phone : newMember.phone}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, phone: e.target.value });
                        } else {
                          setNewMember({ ...newMember, phone: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="رقم الهاتف"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رابط LinkedIn
                    </label>
                    <input
                      type="url"
                      value={editingMember ? editingMember.linkedin : newMember.linkedin}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, linkedin: e.target.value });
                        } else {
                          setNewMember({ ...newMember, linkedin: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      رابط الصورة
                    </label>
                    <input
                      type="url"
                      value={editingMember ? editingMember.image : newMember.image}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, image: e.target.value });
                        } else {
                          setNewMember({ ...newMember, image: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Achievements and Skills */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">الإنجازات والمهارات</h3>
                
                {/* Achievements */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      الإنجازات
                    </label>
                    <button
                      onClick={() => addListItem('achievements', !!editingMember)}
                      className="flex items-center space-x-1 space-x-reverse px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                    >
                      <Plus className="w-3 h-3" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(editingMember ? editingMember.achievements : newMember.achievements || []).map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateListItem('achievements', index, e.target.value, !!editingMember)}
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                          placeholder="أدخل الإنجاز"
                        />
                        <button
                          onClick={() => removeListItem('achievements', index, !!editingMember)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      المهارات
                    </label>
                    <button
                      onClick={() => addListItem('skills', !!editingMember)}
                      className="flex items-center space-x-1 space-x-reverse px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    >
                      <Plus className="w-3 h-3" />
                      <span>إضافة</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(editingMember ? editingMember.skills : newMember.skills || []).map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => updateListItem('skills', index, e.target.value, !!editingMember)}
                          className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-right text-sm"
                          placeholder="أدخل المهارة"
                        />
                        <button
                          onClick={() => removeListItem('skills', index, !!editingMember)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status and Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={editingMember ? editingMember.isActive : newMember.isActive}
                        onChange={(e) => {
                          if (editingMember) {
                            setEditingMember({ ...editingMember, isActive: e.target.checked });
                          } else {
                            setNewMember({ ...newMember, isActive: e.target.checked });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">عضو نشط</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ترتيب العرض
                    </label>
                    <input
                      type="number"
                      value={editingMember ? editingMember.order : newMember.order}
                      onChange={(e) => {
                        if (editingMember) {
                          setEditingMember({ ...editingMember, order: parseInt(e.target.value) });
                        } else {
                          setNewMember({ ...newMember, order: parseInt(e.target.value) });
                        }
                      }}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-right"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    تاريخ الانضمام
                  </label>
                  <input
                    type="date"
                    value={editingMember ? editingMember.joinDate : newMember.joinDate}
                    onChange={(e) => {
                      if (editingMember) {
                        setEditingMember({ ...editingMember, joinDate: e.target.value });
                      } else {
                        setNewMember({ ...newMember, joinDate: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 space-x-reverse mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingMember(null);
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveMember}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                <span>{editingMember ? 'حفظ التغييرات' : 'إضافة العضو'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManager;