# Bitly Clone (Django + React)

این پروژه یک کلون ساده و حرفه‌ای از سرویس کوتاه‌کننده لینک Bitly است که با Django در بخش بک‌اند و React + TailwindCSS در بخش فرانت‌اند ساخته شده است.

## تکنولوژی‌ها
- Python 3.12
- Django 5
- Django REST Framework
- React (Vite)
- TailwindCSS
- Axios

------------------------------------------------------------

# راه‌اندازی بک‌اند (Django)

## 1. ساخت محیط مجازی
```bash
cd backend
python -m venv venv
source venv/bin/activate     # ویندوز: venv\Scripts\activate
```

## 2. نصب پکیج‌ها
```bash
pip install -r requirements.txt
```

## 3. اعمال مایگریشن‌ها
```bash
python manage.py migrate
```

## 4. اجرای سرور
```bash
python manage.py runserver
```

بک‌اند از این آدرس در دسترس است:
```
http://localhost:8000
```

------------------------------------------------------------

# راه‌اندازی فرانت‌اند (React + Vite)

## 1. نصب پکیج‌ها
```bash
cd frontend
npm install
```

## 2. اجرای پروژه
```bash
npm run dev
```

فرانت‌اند از این آدرس در دسترس است:
```
http://localhost:3000
```

------------------------------------------------------------

# API Endpoints

### ایجاد لینک کوتاه
```http
POST /api/shorten/
Body:
{
  "original_url": "https://example.com"
}
```

### لیست همه لینک‌ها
```http
GET /api/links/
```

### ریدایرکت لینک
```http
GET /\<slug>/
```

### آنالیتیکس لینک
```http
GET /api/analytics/\<slug>/
```

------------------------------------------------------------

# امکانات پروژه

✅ کوتاه‌کردن لینک  
✅ لاگ‌گیری از IP، User Agent، Referrer  
✅ نمایش تعداد کلیک‌ها  
✅ مودال نمایش جزییات کلیک‌ها  
✅ لیست کامل لینک‌ها در فرانت  
✅ استایل‌دهی کامل با TailwindCSS  

