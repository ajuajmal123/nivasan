# Nivasan Homes — Premium Web Platform

A state-of-the-art, luxury real estate web platform developed for **Nivasan Homes**, showcase-ready for premium gated community villas and high-end residential apartments in Coimbatore.

Built with a modern stack leveraging **Next.js**, **React 19**, **Tailwind CSS v4**, and smooth physics-based animation controllers, this website delivers a premium digital showcase reflecting the brand's 15-year legacy of trust, architectural excellence, and customer-first design.

---

## 🚀 Key Features

* **Architectural Showcase**: Dynamic project detail pages (`/projects/[id]`) presenting specifications, location advantages, and detailed floor plans.
* **Premium Physics-based Animations**: 
  * Smooth-scrolling scroll physics managed by **Lenis**.
  * Fluid entrance animations, text transformations, and staggered layouts using **Framer Motion** and **GSAP**.
* **Interactive Content Sections**:
  * Staggered Landmark Projects grid with theme-aligned ongoing (Gold) and completed (Green) status tags.
  * Image galleries with interactive media lightboxes.
  * Collapsible, SEO-friendly Accordion FAQs.
  * Context-specific inquiry forms and sticky CTA options.
* **Modern & Harmonious Design System**: Curated color palette featuring HSL tailored colors (Forest Green primary, Metallic Gold accent, Luxury Black backgrounds) with zero default browser styles.
* **Full SEO Integration**: Programmatic head elements, meta descriptions, unique test-ready tags, and structured heading hierarchies on every page.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js 16.2.9 (App Router)](https://nextjs.org/)
* **Library**: [React 19.2.4](https://react.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP (GreenSock)](https://greensock.com/)
* **Scroll Physics**: [@studio-freight/lenis](https://github.com/studio-freight/lenis)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Directory Structure

```text
nivasan/
├── public/                 # Static assets (images, brochures, icons, videos)
├── src/
│   ├── app/                # Next.js App Router (Layouts, pages, route handlers)
│   │   ├── about/          # About Us section
│   │   ├── api/            # Route API endpoints (inquiry submissions)
│   │   ├── blog/           # Blog section
│   │   ├── contact/        # Contact Us page
│   │   ├── gallery/        # Media gallery page
│   │   ├── projects/       # Projects list and dynamic project routes ([id])
│   │   ├── globals.css     # Theme setup, Tailwind import, custom utility classes
│   │   ├── layout.tsx      # Global Root Layout
│   │   └── page.tsx        # Homepage Component
│   ├── components/
│   │   ├── layout/         # Layout modules (Navbar, Footer, Smooth Scroll Provider)
│   │   ├── sections/       # Section-specific components (Hero, FAQ, Timeline, gallery)
│   │   └── ui/             # Reusable UI controls (Logo, Preloader, StickyCTA)
│   └── data/               # Static dataset values (blogs list, timelines)
├── scripts/                # Asset pipeline scripts
├── package.json            # Dependencies and scripts definitions
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js bundler settings
```

---

## 💻 Local Development Setup

### Prerequisites

* Ensure you have [Node.js (LTS version recommended)](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the project root directory:
   ```bash
   cd nivasan
   ```

2. Install the node package dependencies:
   ```bash
   npm install
   ```

3. Spin up the local hot-reloading development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

---

## 📦 Production Build & Deployment

To build the application for hosting on production environments (e.g., Vercel, AWS, Netlify, or self-hosted servers):

1. Generate the optimized production bundle:
   ```bash
   npm run build
   ```

2. Test the production build locally:
   ```bash
   npm run start
   ```

3. Deploying to Vercel:
   ```bash
   npx vercel
   ```
