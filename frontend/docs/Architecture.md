# Architecture

## Overview

Single-page React application built with Vite. All routing is client-side via React Router DOM v7.
The app has one layout (`MainLayout`) that wraps all pages. Smooth scroll is initialized at the layout level.

---

## Entry Points

```
index.html
  └── src/main.jsx          ← ReactDOM.createRoot, wraps app in ThemeProvider
        └── src/App.jsx     ← BrowserRouter + Routes definition
              └── MainLayout ← Navbar + <Outlet> + Footer, initializes Lenis
```

---

## Rendering Strategy

- `Home.jsx` lazy-loads all its section components via `React.lazy` + `Suspense`.
- `MainLayout` wraps the `<Outlet>` in a `Suspense` with `<Loader />` as fallback.
- All other pages (RoleDetails, ServiceDetails, GetStarted, etc.) are NOT lazy-loaded at the route level — they are imported directly in `App.jsx`.

---

## State Architecture

| State | Location | Mechanism |
|---|---|---|
| Theme (dark/light) | `ThemeContext` | React Context + localStorage |
| Active nav section | `Navbar` | local `useState` + scroll listener |
| Active service card | `Services` | local `useState` + GSAP ScrollTrigger onUpdate |
| Active role card | `DemandedRoles` | `useRef` (animation ref, not React state) |
| Testimonial order | `Testimonials` | local `useState` |
| Form data | `GetStarted`, `Contact` | local `useState` |

No global state manager (Redux, Zustand, Jotai) is used. All state is local or context-based.

---

## Data Flow

```
services.js (data)
  └── Services.jsx (renders cards)
        └── ServiceDetails.jsx (reads via getServiceBySlug(slug))

roles.js (data)
  └── DemandedRoles.jsx (renders cards)
        └── RoleDetails.jsx (reads from local ROLES array — DUPLICATE, see KnownIssues.md)
```

---

## Scroll Architecture

```
Lenis (useLenis.js)
  ├── wired to GSAP ScrollTrigger via lenis.on('scroll', ScrollTrigger.update)
  ├── GSAP ticker drives lenis.raf()
  └── getLenis() exposes the instance to any component

DemandedRoles.jsx
  └── uses GSAP ScrollTrigger directly (pin + scrub horizontal scroll)

Services.jsx
  └── uses GSAP ScrollTrigger directly (pin + scrub vertical stacked cards)
```

---

## Component Communication

- Parent → Child: props
- Child → Parent: callback props (e.g. `onComplete` in Loader)
- Sibling: not needed — sections are independent
- Global: ThemeContext only
