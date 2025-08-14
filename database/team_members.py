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
        "id": "1",
        "name": "عبدالله أبوالغيث",
        "position": "مدير تسويق رقمي",
        "department": "التسويق وإدارة المتاجر الإلكترونية",
        "bio": "محترف تسويق رقمي بخبرة تزيد عن 6 سنوات في إدارة الحملات الممولة وبناء استراتيجيات النمو وتحسين الأداء عبر مختلف المنصات الرقمية. يتميز برؤية استراتيجية وقدرة على قيادة فرق العمل لتحقيق نتائج ملموسة وزيادة الحصة السوقية.",
        "email": "",
        "phone": "",
        "linkedin": "",
        "image": "/uploads/1.jpg",
        "experience": "6 سنوات",
        "specialty": "إدارة الحملات الإعلانية والتحول الرقمي للعلامات التجارية",
        "skills": [
        "تصميم وتنفيذ استراتيجيات تسويق رقمي متكاملة على جميع المنصات",
        "تحليل بيانات الحملات وتحويلها إلى خطط تحسين فعّالة",
        "إدارة منصات الإعلانات وفِرق العمل بكفاءة عالية"
        ],
        "achievements": [
        "إطلاق حملات رقمية ناجحة على جميع المنصات رفعت معدلات التفاعل بشكل ملحوظ",
        "بناء وإدارة متاجر إلكترونية حققت نموًا مستدامًا",
        "زيادة الحضور الرقمي والعملاء لعلامات تجارية متنوعة"
        ],
        "isActive": True,
        "order": 1,
        "joinDate": "2023-01-01"
    },
 {
  "id": "2",
  "name": "أحمد العُمري",
  "position": "قائد فرق تطوير النظم والتطبيقات",
  "department": "تطوير المواقع والأنظمة المتكاملة",
  "bio": "مطور أنظمة ومواقع بخبرة متميزة في قيادة فرق العمل وتطوير الحلول التقنية المخصصة وأتمتة العمليات الإدارية لتحقيق كفاءة عالية. يتميز بقدرته على تصميم وبناء أنظمة متكاملة على جميع المنصات، وتقديم حلول تقنية مبتكرة تلبي احتياجات السوق بمرونة واحترافية.",
  "email": "ahmedhamoodaliqayed@gmail.com",
  "phone": "+966562428504",
  "linkedin": "",
  "github": "https://github.com/coderAhmedHamood",
  "image": "/uploads/3.jpeg",
  "experience": "5 سنوات",
  "specialty": "تطوير الأنظمة المتكاملة وأتمتة العمليات على جميع المنصات",
  "achievements": [
    "قيادة وتنفيذ مشاريع برمجية متكاملة لأنظمة ERP وحلول مخصصة للشركات",
    "تطوير مواقع وتطبيقات مبتكرة ساهمت في تحسين العمليات وزيادة الكفاءة",
    "ربط أنظمة وخدمات متعددة عبر API لتحقيق تكامل تام بين المنصات"
  ],
  "skills": [
    "تصميم وتطوير الأنظمة المتكاملة على جميع المنصات",
    "إدارة فرق العمل والمشاريع التقنية",
    "تحليل المتطلبات وتحويلها إلى حلول قابلة للتنفيذ"
  ],
  "isActive": True,
  "order": 2,
  "joinDate": "2021-01-01"
},
 {
  "id": "3",
  "name": "محمد الغلاني",
  "position": "مهندس اتصالات وبرمجيات",
  "department": "تطوير نظم ERP وحلول التجارة الإلكترونية",
  "bio": "مطور برمجيات وخبير في تطوير أنظمة ERP وحلول التجارة الإلكترونية. يمتلك خبرة واسعة في إدارة وتطوير المواقع باستخدام تقنيات متعددة مثل Odoo (بايثون/إكس إم إل)، لارافيل، بي إتش بي، فلاتر، نود.جي إس وقواعد بيانات MySQL. متخصص في تطوير ودمج الأنظمة مع منصات الطرف الثالث مثل بوابات الدفع ومزودي الشحن لتحسين تجربة المستخدم من خلال واجهات تفاعلية وسير عمل آلي. يتميز بتحويل الأفكار إلى حلول برمجية فعالة مع التركيز على الأداء، الأمان، وسهولة الاستخدام، مع تبني أحدث التقنيات لرفع كفاءة العمليات وزيادة الإنتاجية.",
  "email": "aseelalgahlani982@gmail.com",
  "phone": "+967715811982",
  "linkedin": "https://www.linkedin.com/in/aseel-al-gahlani",
  "github": "https://github.com/Aseel-Al-Gahlani",
  "image": "/uploads/5.jpeg",
  "experience": "3 سنوات",
  "specialty": "تطوير أنظمة ERP مخصصة، حلول التجارة الإلكترونية، ودمج الأنظمة مع منصات الطرف الثالث",
  "achievements": [
    "إدارة وتطوير موقع Rafal Online Store مع تحسين تجربة العملاء وربط النظام بمنصات دفع وشحن متعددة",
    "تطوير وتخصيص وحدات Odoo ERP حسب متطلبات العمل مع إنشاء واجهات مستخدم محسنة وأتمتة العمليات",
    "إنشاء نظام حجز خدمات SaaS متكامل مع إشعارات في الوقت الحقيقي ودعم وسائل دفع متقدمة"
  ],
  "skills": [
    "برمجة Odoo (بايثون، إكس إم إل، جافاسكريبت، QWeb)",
    "تطوير واجهات المستخدم باستخدام React، Vue، Laravel، Flutter",
    "تصميم قواعد البيانات PostgreSQL و MySQL",
    "إنشاء API RESTful وWebhooks لدمج الأنظمة",
    "التعامل مع خدمات السحابة مثل AWS وDocker",
    "تطوير تطبيقات الهاتف والنظم المتكاملة"
  ],
  "isActive": True,
  "order": 3,
  "joinDate": "2022-02-01"
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
