---
![Thriftique Logo](thriftique/static/logo/thriftique.png?raw=true)  
---
### Abstract
> The name of the app is `Thriftique`. It is a multi-vendor e-commerce platform for restaurants, and
> the idea supports multiple business selling there goods much like of a marketplace of restaurants.
> It also supports account creation for customers or orderers using the web based e-commerce platform.
> Overall, it consists of 3 main actors; `admin`, `vendors`, and `customers`.

---
### 🕹️ Tech Stack
| **Tech/Tool** | ***Layer*** | ***Purpose/Reason*** |
|:----------- |:-----------:|:-----------|
| **Python + Django** | Backend/Framework| Main web framework |
| **Postgresql** | Database (ORM) | Often used aside from the default db sqlite in django |
| **Django Templates, HTML, CSS** | Templating / Frontend | To render UI for (Homepage, resto listings, menus, account or order page, etc.) |
| **Django's auth system** | User Auth / Permission / Protected Views | Role base access controlled views / pages |
| **Python classes / methods, views, payment API integration** | order / e-commerce flows | FOr placing orders, processing carts, statuses, payment |
| **GitHub** | Version Control | For code management |
| **VSCode** | Development | Local development |

---
### 👍 Features
✅ 1. User Registration - Allows new users to create an account.  
✅ 2. Login Funtionality - Enable users to access the system securely using authentication tokens or sessions.  
✅ 3. Email Verification - Implement an email confirmation process to verify user accounts before granting access to certain features.  

---
### 📚 Set Up

```
EL106_MidTerm_PIT/              ← Main project folder (root Git repo)
├── .git/                       ← Git version control folder
├── .venv/                      ← Python virtual environment
├── .gitignore                  ← Global ignore file for backend + frontend
│
├── backend/                    ← Django REST Framework backend
│   ├── manage.py
│   ├── core/                   ← Django project folder (settings, urls, wsgi)
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── api/                    ← Django app for user authentication
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests.py
│   │
│   └── db.sqlite3              ← Local database (auto-created)
│
└── frontend/                   ← React app (frontend UI)
|   ├── package.json
|   ├── public/
|   └── src/
|
└── static_github
    ├── images                  ← thumbnails, etc.
    ├── videos                  ← demo videos

```



---
### 🎥 Video Url for the App Demonstration
> Hover and Click the thumbnail 👇👇👇 to get redirected to my youtube channel... 
[![Watch the video](static_github/images/thumbnail.png?raw=true)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

---
<p align="center">Thank You ❤️</p>
