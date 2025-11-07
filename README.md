# Bitly Clone (Django + React)

این پروژه یک کلون ساده اما حرفه‌ای از سرویس کوتاه‌کننده لینک Bitly است که با Django در سمت بک‌اند و React + TailwindCSS در سمت فرانت‌اند ساخته شده است.

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
cd backend
python -m venv venv
source venv/bin/activate     # ویندوز: venv\Scripts\activate

## 2. نصب پکیج‌ها
pip install -r requirements.txt

## 3. اعمال مایگریشن‌ها
python manage.py migrate

## 4. اجرای سرور
python manage.py runserver

بک‌اند از این آدرس در دسترس است:
http://localhost:8000

------------------------------------------------------------

# راه‌اندازی فرانت‌اند (React + Vite)

## 1. نصب پکیج‌ها
cd frontend
npm install

## 2. اجرای پروژه
npm run dev

فرانت‌اند از این آدرس در دسترس است:
http://localhost:3000

------------------------------------------------------------

# API Endpoints

### ایجاد لینک کوتاه
POST /api/shorten/
body:
{
  "original_url": "https://example.com"
}

### لیست همه لینک‌ها
GET /api/links/

### ریدایرکت لینک
GET /<slug>/

### آنالیتیکس لینک
GET /api/analytics/<slug>/

------------------------------------------------------------

# امکانات پروژه

✅ کوتاه‌کردن لینک  
✅ لاگ‌گیری از IP، User Agent، Referrer  
✅ نمایش تعداد کلیک‌ها  
✅ مودال نمایش جزییات کلیک‌ها  
✅ لیست کامل لینک‌ها در فرانت  
✅ Styles with TailwindCSS