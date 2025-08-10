import sqlite3
import json

# فتح أو إنشاء قاعدة البيانات
conn = sqlite3.connect('../projects.db')
cursor = conn.cursor()

# إنشاء جدول الفريق
cursor.execute('''
CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    department TEXT,
    bio TEXT,
    email TEXT,
    phone TEXT,
    linkedin TEXT,
    image TEXT,
    experience TEXT,
    specialty TEXT,
    achievements TEXT,  -- JSON string
    skills TEXT,        -- JSON string
    isActive INTEGER,
    "order" INTEGER,
    joinDate TEXT
)
''')

# البيانات (منسقة ومطابقة لما أرسلته حرفياً)
team_members = [
    {
      'id': '1',
      'name': 'سارة الخطيب',
      'position': 'مديرة التصميم',
      'department': 'التصميم',
      'bio': 'متخصصة في تصميم الواجهات وتجربة المستخدم، تجمع بين الإبداع والوظائف العملية.',
      'email': '',
      'phone': '',
      'linkedin': '',
      'image': 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=400',
      'experience': '10 سنوات',
      'specialty': 'تصميم واجهات وتجربة مستخدم',
      'achievements': [
          'تصميم أكثر من 120 واجهة مواقع احترافية',
          'تنفيذ مشاريع لعلامات تجارية كبرى'
      ],
      'skills': ['تصميم واجهات', 'UX/UI', 'التصميم المتجاوب'],
      'isActive': True,
      'order': 1,
      'joinDate': '2015-04-12'
    },
    {
      'id': '2',
      'name': 'عمر الحربي',
      'position': 'مدير تطوير المواقع',
      'department': 'التطوير',
      'bio': 'خبير في برمجة وتطوير المواقع باستخدام أحدث التقنيات مع تركيز على الأداء والأمان.',
      'email': '',
      'phone': '',
      'linkedin': '',
      'image': 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      'experience': '12 سنة',
      'specialty': 'تطوير مواقع آمنة وسريعة',
      'achievements': [
          'تطوير أنظمة متكاملة للمتاجر الإلكترونية',
          'تحقيق سرعة تحميل أقل من ثانية في مشاريع متعددة'
      ],
      'skills': ['Python', 'JavaScript', 'أمن المعلومات', 'تحسين الأداء'],
      'isActive': True,
      'order': 2,
      'joinDate': '2013-09-01'
    },
    {
      'id': '3',
      'name': 'ليلى العبدالله',
      'position': 'مديرة التسويق الرقمي وإدارة المتاجر',
      'department': 'التسويق والتشغيل',
      'bio': 'تضع استراتيجيات تسويق مبتكرة وتدير المتاجر الإلكترونية لضمان نمو المبيعات.',
      'email': '',
      'phone': '',
      'linkedin': '',
      'image': 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      'experience': '8 سنوات',
      'specialty': 'التسويق الرقمي وإدارة المتاجر',
      'achievements': [
          'زيادة المبيعات بنسبة 150% خلال عام واحد',
          'إدارة حملات إعلانية ناجحة لعدة قطاعات'
      ],
      'skills': ['التسويق الرقمي', 'إدارة الحملات الإعلانية', 'تحليل البيانات'],
      'isActive': True,
      'order': 3,
      'joinDate': '2017-06-18'
    }
]


# إدخال البيانات إلى الجدول
for member in team_members:
    cursor.execute('''
    INSERT OR REPLACE INTO team_members (
        id, name, position, department, bio, email, phone, linkedin,
        image, experience, specialty, achievements, skills,
        isActive, "order", joinDate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        member['id'],
        member['name'],
        member['position'],
        member['department'],
        member['bio'],
        member['email'],
        member['phone'],
        member['linkedin'],
        member['image'],
        member['experience'],
        member['specialty'],
        json.dumps(member['achievements'], ensure_ascii=False),
        json.dumps(member['skills'], ensure_ascii=False),
        int(member['isActive']),
        member['order'],
        member['joinDate']
    ))

conn.commit()
conn.close()

print("✅ تم إنشاء جدول الفريق وإدخال البيانات بنجاح.")
