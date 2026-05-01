# FOSSEE Workshops - UI/UX Enhancement

A mobile-first redesign of the FOSSEE Workshops Django web app, rebuilt as a modern React + Tailwind CSS frontend.

---
## Setup Instructions

### 1. Backend Setup (Reference System)

```bash
# Clone the repository
git clone https://github.com/aryankalra404/fossee-task

# Install Python 3.11 (macOS)
brew install python@3.11

# Create and activate virtual environment
python3.11 -m venv .venv
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Database initialization and sync
python manage.py makemigrations
python manage.py migrate

# --run-syncdb solves 'OperationalError' issues with missing CMS tables.
python manage.py migrate --run-syncdb

# Start the Django server
python manage.py runserver
```

### 2. Frontend Setup (React Application)

```bash
# Navigate to the frontend directory
cd fossee-task/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## What design principles guided your improvements?

- **Mobile-first**: Every page was built for small screens first, then scaled up. As it was mentioned the website is primarily accessed on phones.
- **Visual hierarchy**: Clear headings, muted secondary text, and consistent spacing guide the eye naturally.
- **FOSSEE brand colors**: Used the official orange `#e85d04` from fossee.in for buttons, active states, and accents.
- **Minimal clutter**: Replaced Bootstrap's heavy table-heavy layouts with clean cards, clean tables, and whitespace.
- **Accessible**: Semantic HTML, proper labels on inputs, aria-label on icon buttons.

---

## How did you ensure responsiveness across devices?s

- Tailwind's responsive prefixes (`md:`, `sm:`) used throughout, navbar collapses to hamburger on mobile, grids stack to single column.
- Tested on iPhone 12 Pro (390px) using Chrome DevTools.
- `overflow-x-auto` on all tables so they scroll horizontally on small screens instead of breaking layout.
- Fixed navbar with `pt-14` on main content so nothing hides behind it on any screen size.

---

## What trade-offs did you make between the design and performance?

| Decision | Trade-off |
|---|---|
| Hardcoded placeholder data | Real API integration left for later, kept frontend concerns separate |
| No animations | Kept load times fast, no unnecessary JS |
| Tailwind over CSS modules | Faster to build, classes can get verbose but readable |
| React Router for navigation | Adds a dependency but gives clean client-side routing |
| Custom SVG/Flexbox Charts | Chose to build custom data visualizations instead of importing a library like Chart.js. This saved ~50KB in bundle size, ensuring the site remains lightweight for students on slower 3G/4G networks. |
| Client-Side Pagination | Implemented pagination via state slicing. While server-side is better for massive datasets, client-side pagination keeps the UX "snappy" for the current workshop volume. |

---

## What was the most challenging part of the task and how did you approach it?

**1. Tailwind CSS JIT Configuration**

**The Problem:** Initially, Tailwind styles were not generating because the `content` array in `tailwind.config.js` was empty by default.

**The Solution:** Configured the Just-In-Time (JIT) engine to scan the source directory by pointing it to `./src/**/*.{js,jsx,ts,tsx}`, ensuring only used styles were injected into the final bundle.

---

**2. State-Driven Architecture (Django to React)**

**The Problem:** Translating a server-side rendered (Django) workflow — complete with user authentication and workshop lists — into a client-side React environment without a live backend.

**The Solution:** Architected a modular state management system using React Hooks. Data structures were modeled to mirror potential JSON responses, ensuring the frontend is "API-ready" for future integration with the FOSSEE backend.

---

**3. The Data-Density Challenge (Mobile UX)**

**The Problem:** The original legacy interface relied on dense tables that caused horizontal scrolling and poor legibility on mobile devices.

**The Solution:** Implemented a Conditional Layout Strategy:

- **Desktop:** Retained semantic `<table>` elements for high-density data viewing.
- **Mobile:** Developed a custom Card UI that surfaces critical metadata (e.g., Workshop Status, Dates) through visual anchors and color-coded badges, eliminating horizontal overflow and improving accessibility.

---

| Page | Before | After (Desktop & Mobile) |
|---|---|---|
| **Home Page** | ![before](./screenshots/old-homepage.jpeg) | ![desktop](./screenshots/homepage-desktop.png) <br/> ![mobile](./screenshots/homepage-mobile.png) |
| **Workshop Statistics** | ![before](./screenshots/old-workshopstatistics.jpeg) | ![desktop](./screenshots/workshopstatistics-desktop.png) <br/> ![mobile](./screenshots/workshopstatistics-mobile.png) |
| **Navbar** | ![before](./screenshots/old-navbar.png) | ![after](./screenshots/navbar.png) |

> Screenshots are in the `/screenshots` folder.

[Demo Video Link](https://drive.google.com/file/d/1eON_3ezhCRZutN59BEoq_NbliLz19pta/view?usp=sharing)

---

## Accessibility & SEO

**Semantic Structure:**
Used proper `<header>`, `<nav>`, `<main>`, and `<footer>` tags to ensure screen readers can navigate the page structure logically.

**Form Usability:**
Every input is paired with a `<label>` and uses `htmlFor` to ensure large, accessible click targets.

**Color Contrast:**
Verified that the FOSSEE Orange (`#e85d04`) meets contrast requirements against white backgrounds for readability.

---

## Pages Built

- Home (dashboard with stat cards + activity feed)
- Login
- Register
- Workshop Status
- Workshop Types
- Workshop Statistics
- Team Statistics
- Propose Workshop
- Workshop Details
- View Profile

---

## Project Structure

```
fossee-task/
├── README.md
├── LICENSE
├── local_settings.py
├── manage.py
├── requirements.txt
├── cms/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── templates/
│       └── cms_base.html
├── docs/
│   └── Getting_Started.md
├── frontend/           # react frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   ├── Footer.jsx
│       │   └── Navbar.jsx
│       ├── layouts/
│       │   └── MainLayout.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Login.jsx
│           ├── ProposeWorkshop.jsx
│           ├── Register.jsx
│           ├── TeamStatistics.jsx
│           ├── ViewProfile.jsx
│           ├── WorkshopDetails.jsx
│           ├── WorkshopStatistics.jsx
│           ├── WorkshopStatus.jsx
│           └── WorkshopTypes.jsx
├── statistics_app/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── urls.py
│   ├── views.py
│   ├── templates/
│   │   └── statistics_app/
│   │       ├── paginator.html
│   │       ├── profile_stats.html
│   │       ├── team_stats.html
│   │       ├── workshop_public_stats.html
│   │       └── workshop_stats.html
│   └── tests/
│       ├── __init__.py
│       └── test_views.py
├── teams/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── workshop_app/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── reminder_script.py
│   ├── reminder_script.sh
│   ├── send_mails.py
│   ├── urls.py
│   ├── urls_password_reset.py
│   ├── views.py
│   ├── migrations/
│   │   ├── 0001_initial.py
│   │   ├── 0002_auto_20170623_1513.py
│   │   ├── 0003_auto_20170906_1501.py
│   │   ├── 0004_auto_20170914_1528.py
│   │   ├── 0005_auto_20170920_1720.py
│   │   ├── 0006_auto_20180312_1056.py
│   │   ├── 0007_auto_20180510_1635.py
│   │   ├── 0008_auto_20180514_1655.py
│   │   ├── 0009_profilecomments.py
│   │   ├── 0010_auto_20190926_1558.py
│   │   ├── 0011_auto_20200727_2313.py
│   │   ├── 0012_auto_20200727_2315.py
│   │   ├── 0013_workshop_uid.py
│   │   ├── 0014_auto_20200727_2334.py
│   │   ├── 0015_auto_20200727_2334.py
│   │   ├── 0016_auto_20260501_0447.py
│   │   └── __init__.py
│   ├── static/
│   │   └── workshop_app/
│   │       ├── css/
│   │       │   ├── base.css
│   │       │   ├── font-awesome.css
│   │       │   └── jquery-ui.css
│   │       ├── fonts/
│   │       │   ├── glyphicons-halflings-regular.eot
│   │       │   ├── glyphicons-halflings-regular.ttf
│   │       │   └── glyphicons-halflings-regular.woff
│   │       └── js/
│   │           ├── datepicker.js
│   │           └── jquery.formset.js
│   ├── templates/
│   │   ├── registration/
│   │   │   ├── password_change_done.html
│   │   │   ├── password_change_form.html
│   │   │   ├── password_reset_complete.html
│   │   │   ├── password_reset_confirm.html
│   │   │   ├── password_reset_done.html
│   │   │   └── password_reset_form.html
│   │   └── workshop_app/
│   │       ├── activation.html
│   │       ├── add_workshop_type.html
│   │       ├── base.html
│   │       ├── edit_profile.html
│   │       ├── edit_workshop_type.html
│   │       ├── login.html
│   │       ├── logout.html
│   │       ├── propose_workshop.html
│   │       ├── register.html
│   │       ├── view_profile.html
│   │       ├── workshop_details.html
│   │       ├── workshop_status_coordinator.html
│   │       ├── workshop_status_instructor.html
│   │       ├── workshop_type_details.html
│   │       └── workshop_type_list.html
│   ├── templatetags/
│   │   ├── __init__.py
│   │   └── custom_filters.py
│   └── tests/
│       ├── __init__.py
│       ├── test_models.py
│       └── test_views.py
└── workshop_portal/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── views.py
    └── wsgi.py

```

---

## Stack

- React 18 + Vite
- Tailwind CSS v3
- React Router v6
