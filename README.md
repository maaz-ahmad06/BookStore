# 📚 BookHaven — Professional E-Commerce Book Store Platform

> **BookHaven** is a modern, 100% responsive e-commerce bookstore website built with HTML5, CSS3, and Vanilla JavaScript. Features glassmorphism UI, light/dark mode persistence, an interactive slide-out shopping cart, real-time book search, touch carousel sliders, form validation, and zero horizontal scroll. Ready for GitHub Pages & Vercel deployment.

---

### ✨ Project Overview & Highlights

Designed to deliver an engaging digital shopping experience, BookHaven offers a complete multi-section web application comprising a dynamic landing page, dedicated book catalog with live search, company story page, and interactive contact suite. The interface is powered by a custom design system built with CSS variables (`#6C4AB6`, `#8E6CEF`, `#FFD54F`), micro-interactions, scroll-reveal animations (`IntersectionObserver`), and high-resolution literature web photography.

#### 🛠️ Key Technical Features:
- **🌓 Persistent Theme Switcher**: Instant Light/Dark mode toggle backed by browser `localStorage` and smooth CSS custom property transitions.
- **🛒 Dynamic Slide-Out Shopping Cart**: Feature-rich cart drawer supporting real-time item addition, quantity adjustments, item deletion, subtotal calculations, badge indicators, and simulated checkout flow.
- **🔍 Real-Time Search Overlay**: Full-screen live search modal for instantaneous filtering across book titles, authors, and categories.
- **🎠 Touch & Drag Carousel Slider**: Custom Vanilla JS slider powering testimonial cards with auto-play timers, touch swipe gestures, and pagination dots.
- **❓ Interactive FAQ Accordion**: Accessible expandable/collapsible accordion items with CSS rotation indicators.
- **📝 Form Validation & Toast System**: Robust client-side validation for contact and newsletter forms paired with animated float-in Toast notifications.
- **📱 100% Responsive Engineering**: Custom flexbox & grid architecture with strict viewport clipping (`overflow-x: hidden`) ensuring zero side-scroll on screens from 320px up to 4K displays.
- **🚀 Production & Deployment Ready**: Fully optimized with SEO meta tags, Open Graph cards, semantic HTML5 markup, and pre-configured Vercel (`vercel.json`) and GitHub Pages deployment settings.

---

## 🌟 Key Features

* **🎨 Modern UI/UX & Design System**:
  * Glassmorphism navigation bar with blur effect.
  * Curated color tokens (`#6C4AB6`, `#8E6CEF`, `#FFD54F`).
  * Dark & Light Theme toggle with `localStorage` persistence.
  * Smooth micro-interactions, card tilt effects, and keyframe animations.
* **📱 100% Fully Responsive Layout**:
  * Seamless display across Desktop (1440px+), Laptops (1024px), Tablets (768px), and Mobile devices (375px+).
* **🛒 Interactive Shopping Cart Drawer**:
  * Slide-out cart panel from right.
  * Add books, change item quantity, delete items, dynamic subtotal calculation, and badge updates.
* **🔍 Search Overlay Modal**:
  * Real-time live fuzzy search by book title, author, or category.
* **🎠 Touch & Drag Image Slider**:
  * Custom Vanilla JS carousel for testimonials and featured showcases with pagination dots.
* **❓ FAQ Accordion**:
  * Smooth height expanding/collapsing accordion items.
* **📝 Interactive Form Validation & Toast Notifications**:
  * Real-time field validation for contact and newsletter forms with floating toast notifications.
* **🚀 SEO Optimized**:
  * Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  * Open Graph meta tags, meta titles, meta descriptions, and SVG favicon.

---

## 📂 Project Directory Structure

```text
BookStore/
│
├── index.html              # Main Landing Page (Hero, Categories, Books, Best Sellers, Team, FAQ, etc.)
├── about.html              # Dedicated About Us Page (Company history, Mission, Vision, Team)
├── books.html              # Dedicated Books Catalog Page with live search and category filter
├── contact.html            # Dedicated Contact Page with Interactive Form & Google Map
│
├── css/
│   ├── style.css           # Core Design Tokens, Typography, Layout, Components & Themes
│   ├── animations.css      # Keyframe Animations, Preloader, Glassmorphism, & Scroll Reveal
│   └── responsive.css      # Responsive Grid/Flexbox Media Queries for All Screen Sizes
│
├── js/
│   ├── script.js           # Core App logic: Sticky nav, Cart drawer, Accordion, Search modal, Preloader
│   ├── slider.js           # Custom Touch/Drag enabled Carousel for Testimonials & Showcases
│   ├── darkmode.js         # Light/Dark Theme Switcher with LocalStorage state persistence
│   └── validation.js       # Live Form Validation (Contact/Newsletter) & Toast Notifications
│
├── images/                 # Generated Vector Book Covers, Hero Graphics & Team Member Avatars
│   ├── books/              # SVG Book covers (book1.svg to book12.svg)
│   └── team/               # Team member profile pictures (member1.svg to member4.svg)
│
├── favicon/                # SVG Favicon icon
│   └── favicon.svg
│
├── vercel.json             # Vercel Deployment & Headers Configuration
└── README.md               # Complete Project Documentation & Deployment Guide
```

---

## 🚀 How to Run Locally

Since this project uses pure static web technologies (HTML, CSS, JavaScript), no node package installation or build steps are required.

1. **Option 1: Direct File Opening**
   - Double click `index.html` to open directly in any modern web browser.

2. **Option 2: Live Server (VS Code / Local Server)**
   - Open the project folder in VS Code.
   - Right-click `index.html` and choose **"Open with Live Server"**.

---

## 📦 Deployment Guides

### Deploying to GitHub & GitHub Pages

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Professional Book Store Website"
   ```

2. **Push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/BookStore.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub -> **Settings** -> **Pages**.
   - Under **Source**, choose `main` branch and `/ (root)` folder.
   - Click **Save**. Your site will be live at `https://YOUR_USERNAME.github.io/BookStore/`.

---

### Deploying to Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   vercel
   ```
2. Or via Vercel Web Dashboard:
   - Push code to GitHub.
   - Log into [Vercel](https://vercel.com).
   - Click **"Add New Project"** -> Import your GitHub repository.
   - Framework Preset: Select **"Other"** (Static HTML).
   - Click **"Deploy"**. Your site will be live within seconds!

---

## 📄 License & Attribution

Designed and developed for Computer Science academic showcase and production readiness. Free to customize and extend!
