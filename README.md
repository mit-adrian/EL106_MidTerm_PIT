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
### Project Set Up and Starting

- **Step 1**: Create Root Folder, open a cmd/bash. (Usually in the ~Desktop)
    ```
    mkdir <ProjectName>
    ```
    
- **Step 2**: Access the created Root Folder.
    ```
    cd <ProjectName>
    ```
    
- **Step 3**: Inside the Root Folder, open a cmd/bash then create a `virtual environment`. ***Note: (important)***
    ```
    python3 -m venv .venv
    ```
    ... `.venv` ← is the name of the virtual environment ***BUT you can named it base on you as developer***.
  
- **Step 4**: Now that you have `.venv` ← virtual environment inside the Project Root Folder, from here on, ***you need to work only--inside the virtual environment*** nothing more. Let's enable the .venv inside your cmd/bash.
    ***For macOS/Linux***
    ```
    source .venv/bin/activate
    ```
    ***For windows OS***
    ```
    .venv/Scripts/activate 
    ```
- **Step 5**: `(.venv) ~Desktop/<ProjectName> %` ← Seeing this prefix `(.venv)` in your cmd/bash means you are working inside the virtual environment and good to go working inside your project folder. In here, we need to **Install Django and DRF**
    ```
    pip install django djangorestframework
    ```
- **Step 6**: Now, let's set up our folders that we need to use. (`backend`, `frontend`, `.gitignore`, `README`, etc.)
---
### backend
- **Step 7**: Inside `.venv` root folder make a directory folder named `backend`.

    ```
    mkdir backend
    ```

- **Step 8**: Access backend folder.
    ```
    cd backend
    ```
- **Step 9**: Inside the backend folder, create a new `django` project
    ```
    django-admin startproject <django-project-name>
    ```
    ... `<django-project-name>` ← is the name of main/core django ***BUT you can named it base on you as developer***.

    **(NOTE)**  
    ... also, in this backend folder where you create a `django app`, (you can create as much or many as you want, depends on what your project/system needs)
    ```
    python manage.py startapp <appName>
    ```
    ... `<appName>` ← is the name of the app ***BUT you can named it base on you as developer***.
  
    [IMPORTANT]
      - if you add or create some `django apps`.  
      ![INSTALLED_APPS](static_github/images/thumbnail.png?raw=true) 


- **Step 10**: Now,
  
---

### 🗂️ Folder Structure

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
