# FOSSEE Workshops - UI/UX Enhancement

A mobile-first redesign of the FOSSEE Workshops Django web app, rebuilt as a modern React + Tailwind CSS frontend.

---

## Setup Instructions
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Design Principles

- **Mobile-first**: Every page was built for small screens first, then scaled up. As it was mentioned the website is primarily accessed on phones.
- **Visual hierarchy**: Clear headings, muted secondary text, and consistent spacing guide the eye naturally.
- **FOSSEE brand colors**: Used the official orange `#e85d04` from fossee.in for buttons, active states, and accents.
- **Minimal clutter**: Replaced Bootstrap's heavy table-heavy layouts with clean cards, clean tables, and whitespace.
- **Accessible**: Semantic HTML, proper labels on inputs, aria-label on icon buttons.

---

## Responsiveness

- Tailwind's responsive prefixes (`md:`, `sm:`) used throughout, navbar collapses to hamburger on mobile, grids stack to single column.
- Tested on iPhone 12 Pro (390px) using Chrome DevTools.
- `overflow-x-auto` on all tables so they scroll horizontally on small screens instead of breaking layout.
- Fixed navbar with `pt-14` on main content so nothing hides behind it on any screen size.

---

## Trade-offs

| Decision | Trade-off |
|---|---|
| Hardcoded placeholder data | Real API integration left for later, kept frontend concerns separate |
| No animations | Kept load times fast, no unnecessary JS |
| Tailwind over CSS modules | Faster to build, classes can get verbose but readable |
| React Router for navigation | Adds a dependency but gives clean client-side routing |
| Custom SVG/Flexbox Charts | Chose to build custom data visualizations instead of importing a library like Chart.js. This saved ~50KB in bundle size, ensuring the site remains lightweight for students on slower 3G/4G networks. |
| Client-Side Pagination | Implemented pagination via state slicing. While server-side is better for massive datasets, client-side pagination keeps the UX "snappy" for the current workshop volume. |

---

## Challenges

**Biggest challenge**: Getting Tailwind v3 working with Vite from scratch. The `content` array in `tailwind.config.js` was empty by default, so no styles were generating. Solved by pointing it to `./src/**/*.{js,jsx}`.

**Second challenge**: Rebuilding the Django template's dynamic data (user auth, workshop lists, comments) as static React state, had to think carefully about component structure so it's easy to wire up to a real API later.

**Approach**: I rebuilt the legacy Django UI into modular React components with a strict mobile-first mindset. Since the web is mostly used on mobile, I prioritized responsive card layouts over heavy tables, using Tailwind to ensure the site is snappy, accessible, and aligned with FOSSEE’s official branding.

---

**The Data-Density Challenge**: The original Django templates used dense tables that are impossible to read on a mobile device.

**My Approach**: I implemented a Conditional Layout Strategy. On desktop, I kept the semantic table for efficiency. On mobile, I refactored the data into a Card-based UI with clear visual anchors (like the colored status badges). This ensures that critical info like "Workshop Date" and "Status" is the first thing a student sees without needing to zoom or scroll horizontally.

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

## Stack

- React 18 + Vite
- Tailwind CSS v3
- React Router v6
