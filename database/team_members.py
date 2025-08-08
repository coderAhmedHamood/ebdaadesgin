import sqlite3
import json

# فتح أو إنشاء قاعدة البيانات
conn = sqlite3.connect('projects.db')
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
      'name': 'أحمد بن محمد الراشد',
      'position': 'الرئيس التنفيذي',
      'department': 'الإدارة العليا',
      'bio': 'رؤيتنا تتجاوز البناء - نحن نبني الأساس لمستقبل المملكة العربية السعودية المزدهر. كل مشروع نقوم به يعكس التزامنا بالتميز وإيماننا الراسخ برؤية المملكة 2030.',
      'email': 'ahmed.alrashid@awjcontracting.sa',
      'phone': '+966 11 123 4567',
      'linkedin': 'https://linkedin.com/in/ahmed-alrashid',
      'image': 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      'experience': '25 سنة',
      'specialty': 'القيادة الاستراتيجية',
      'achievements': [
          'قاد مشاريع بناء بقيمة تزيد عن 2 مليار دولار',
          'عضو المجلس الاستشاري لرؤية 2030',
          'جائزة التميز الصناعي 2023'
      ],
      'skills': ['القيادة الاستراتيجية', 'إدارة المشاريع الكبرى', 'التخطيط طويل المدى', 'بناء الشراكات'],
      'isActive': True,
      'order': 1,
      'joinDate': '2000-01-15'
    },
    {
      'id': '2',
      'name': 'فاطمة الزهراء',
      'position': 'مديرة العمليات',
      'department': 'العمليات',
      'bio': 'الابتكار والتميز التشغيلي هما حجر الأساس لنجاحنا. نستفيد من التكنولوجيا المتطورة وأفضل الممارسات لتقديم مشاريع تتجاوز التوقعات وتضع معايير جديدة للصناعة.',
      'email': 'fatima.alzahra@awjcontracting.sa',
      'phone': '+966 11 123 4568',
      'linkedin': 'https://linkedin.com/in/fatima-alzahra',
      'image': 'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=400',
      'experience': '20 سنة',
      'specialty': 'إدارة العمليات',
      'achievements': [
          'نفذت إدارة المشاريع المدعومة بالذكاء الاصطناعي',
          'قللت الجداول الزمنية للمشاريع بنسبة 30%',
          'قائدة شهادة ISO 9001:2015'
      ],
      'skills': ['إدارة العمليات', 'تحسين العمليات', 'إدارة الجودة', 'التكنولوجيا المتقدمة'],
      'isActive': True,
      'order': 2,
      'joinDate': '2004-03-20'
    },
    {
      'id': '3',
      'name': 'محمد بن سلمان العتيبي',
      'position': 'مدير التكنولوجيا',
      'department': 'التكنولوجيا',
      'bio': 'التكنولوجيا ليست مجرد أداة - إنها ميزتنا التنافسية. نتبنى التحول الرقمي لتعزيز كفاءة البناء والسلامة والاستدامة، مما يضع شركة أوج الدولية في المقدمة في ابتكار الصناعة.',
      'email': 'mohammed.alotaibi@awjcontracting.sa',
      'phone': '+966 11 123 4569',
      'linkedin': 'https://linkedin.com/in/mohammed-alotaibi',
      'image': 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      'experience': '18 سنة',
      'specialty': 'تكنولوجيا البناء',
      'achievements': [
          'رائد حلول المباني الذكية',
          'خبير تنفيذ BIM',
          'قائد تكنولوجيا البناء الأخضر'
      ],
      'skills': ['BIM', 'المباني الذكية', 'التحول الرقمي', 'الأتمتة'],
      'isActive': True,
      'order': 3,
      'joinDate': '2006-07-10'
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
