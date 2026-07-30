# Zarvion Technologies — Project Overview

## What Is This?

Zarvion Technologies is a **premium recruitment agency website**. It is NOT a job portal.
It is a luxury service website that connects:

```
Candidates → Recruiters → Companies
```

The experience is designed to feel **cinematic, luxurious, modern, and interactive**.
Every animation, transition, and layout decision is intentional.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router DOM v7 |
| Smooth Scroll | Lenis v1.3 |
| Animation | GSAP 3.15 + ScrollTrigger |
| Motion | Framer Motion 12 |
| 3D / WebGL | Three.js + @react-three/fiber + postprocessing |
| Styling | Plain CSS Modules (no Tailwind, no CSS-in-JS) |
| Theme | CSS custom properties (dark/light via `data-theme`) |
| Icons | react-icons (Feather set) |
| Linting | oxlint |

---

## Running the Project

```bash
cd Zarvion/frontend
npm install
npm run dev       # development server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # oxlint
```

---

## Key Design Decisions

- Dark mode is the **default** theme. Light mode is a secondary option.
- All color values live in `src/styles/dark.css` and `src/styles/light.css` as CSS variables.
- Shared non-color tokens (typography, radius, easing) live in `src/styles/variables.css`.
- `index.css` contains legacy Vite scaffold styles — it is **not** the project's design system.
- Lenis smooth scroll is initialized **once** in `MainLayout` via `useLenis()`.
- GSAP ScrollTrigger is wired to Lenis inside `useLenis.js`.
- The `getLenis()` utility allows any component to subscribe to Lenis scroll events.
