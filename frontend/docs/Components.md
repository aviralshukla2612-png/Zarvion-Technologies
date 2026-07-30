# Components

## Component Hierarchy

```
App
└── MainLayout
    ├── Navbar
    │   └── ThemeToggle
    ├── <Outlet> (Suspense)
    │   ├── Home
    │   │   ├── Hero          (lazy)
    │   │   ├── About         (lazy)
    │   │   ├── Services      (lazy)
    │   │   ├── DemandedRoles (lazy)
    │   │   ├── Testimonials  (lazy)
    │   │   └── Contact       (lazy)
    │   ├── RoleDetails
    │   ├── About             (standalone page route)
    │   ├── DemandedRoles     (standalone page route)
    │   ├── Services          (standalone page route)
    │   ├── ServiceDetails
    │   ├── GetStarted
    │   ├── Contact           (standalone page route)
    │   └── NotFound
    └── Footer
```

---

## Component Reference

### Navbar
**Path:** `src/components/Navbar/Navbar.jsx`

- Fixed position, full-width, `z-index: 999`.
- Grid layout: `1fr auto 1fr` (brand | links | actions).
- Scroll listener detects active section by checking `getBoundingClientRect` of `#about`, `#services`, `#demanded`, `#contact`.
- `filled` state adds background fill class when `scrollY > 10`.
- Mobile hamburger menu: `max-height` + `opacity` CSS transition.
- Body scroll locked when mobile menu is open.
- Escape key closes mobile menu.
- **Issue:** Desktop nav links use `<a href>` (hard navigation) instead of `<Link to>` for section routes. See KnownIssues.md.

---

### ThemeToggle
**Path:** `src/components/ThemeToggle/ThemeToggle.jsx`

- Reads `theme` and `toggleTheme` from `ThemeContext`.
- Renders Moon icon in dark mode, Sun icon in light mode.
- Used in both Navbar (desktop) and mobile menu footer.

---

### Hero
**Path:** `src/components/Hero/Hero.jsx`

- Split layout: text left (50%) / Three.js canvas right (50%).
- Left: typing animation, CTA buttons.
- Right: `Hyperspeed` component (full Three.js app) + `.veil` gradient overlay.
- `.veil` blends the 3D scene into the background using `color-mix()`.
- Mobile: stacks vertically, right panel becomes 50vh.
- Props: none (self-contained).

---

### About
**Path:** `src/components/About/About.jsx`

- Three sections: hero grid, team gallery, logo carousel.
- Hero grid: text left + SVG network animation right.
- Team gallery: 5 columns of auto-scrolling cards (alternating up/down).
- Logo carousel: infinite horizontal scroll of company names.
- All animations are CSS-only (no GSAP, no Framer Motion).
- Props: none.

---

### Services
**Path:** `src/components/Services/Services.jsx`

- Accepts `variant` prop: `'home'` (default) or `'page'`.
- 6 service cards in sticky stacking layout.
- Each card has: index, title, description, feature list, CTA button, icon with orbit rings + particles.
- Active card determined by scroll position.
- Progress rail (right side) shows current card index.
- CTA navigates to `/services/:slug` via `useNavigate`.
- Lenis scroll subscription with retry mechanism.

---

### DemandedRoles
**Path:** `src/components/DemandedRoles/DemandedRoles.jsx`

- 7 role cards in GSAP horizontal scroll carousel.
- Desktop: pinned section, cards slide horizontally.
- Mobile: vertical stack, no animation.
- Card click navigates to `/roles/:slug`.
- Uses `useLayoutEffect` for animation setup.
- GSAP context for clean cleanup.

---

### RoleCard
**Path:** `src/components/RoleCard/RoleCard.jsx`

- Standalone card component.
- **Currently unused** — DemandedRoles renders cards inline.
- Accepts `role` and `isActive` props.
- See KnownIssues.md.

---

### Testimonials
**Path:** `src/components/Testimonials/Testimonials.jsx`

- 6 testimonials in a draggable stacked card layout.
- Drag left/right (>90px threshold) to navigate.
- Prev/Next buttons also available.
- Only the front card renders content (performance + blur inconsistency fix).
- State: `order` array rotated on navigation.

---

### Contact
**Path:** `src/components/Contact/Contact.jsx`

- Two-column layout: info left, hover-flip panel right.
- Left: phone, email, office address (all as clickable links).
- Right: front face (CTA text) flips to back face (form) on hover/focus.
- IntersectionObserver triggers staggered reveal animation.
- Form submission is `e.preventDefault()` only (no backend).

---

### Loader
**Path:** `src/components/Loader/Loader.jsx`

- Full-screen overlay.
- Counter: 0→100 with cubic ease-out via `requestAnimationFrame`.
- Image crossfade: 4 images cycling every 950ms.
- `onComplete` prop fires after counter reaches 100.
- `duration` prop (default 4800ms).
- Used as `Suspense` fallback in `MainLayout` and `Home`.

---

### Footer
**Path:** `src/components/Footer/Footer.jsx`

- 4-column grid: brand, company links, resources links, newsletter.
- Animated SVG waves at the top.
- Rotating 3D CSS cube in newsletter heading.
- Newsletter form: `e.preventDefault()` only (no backend).
- Social links: all `href="#"` (placeholder).

---

## Pages

### Home
**Path:** `src/pages/Home/Home.jsx`
- Assembles all section components in order.
- All sections lazy-loaded via `React.lazy`.

### RoleDetails
**Path:** `src/pages/RoleDetails/RoleDetails.jsx`
- Reads `slug` from URL params.
- Finds role from a **local** ROLES array (duplicate of `roles.js` — see KnownIssues.md).
- Displays: image, category, title, description, skills, salary, demand, experience, apply CTA.

### ServiceDetails
**Path:** `src/pages/ServiceDetails/ServiceDetails.jsx`
- Reads `slug` from URL params.
- Fetches service via `getServiceBySlug(slug)` from `data/services.js`.
- Sections: hero, overview, stats, benefits, features, process timeline, testimonials, FAQ, CTA.
- IntersectionObserver for scroll reveal.
- Stats counter animation.

### GetStarted
**Path:** `src/pages/GetStarted/GetStarted.jsx`
- Multi-section candidate onboarding page.
- Sections: hero, features, timeline, stats, form, FAQ, CTA.
- Form: 6 sections (personal, education, work, preferences, technical, about).
- Client-side validation for name, email, phone.
- Mouse parallax on hero illustration.
- Counter animation on stats section.

### NotFound
**Path:** `src/pages/NotFound/NotFound.jsx`
- Simple 404 page with link back to home.

### About (page route)
- Same component as `src/components/About/About.jsx` — rendered at `/about`.

### DemandedRoles (page route)
- Same component as `src/components/DemandedRoles/DemandedRoles.jsx` — rendered at `/demand`.

### Services (page route)
- Same component as `src/components/Services/Services.jsx` — rendered at `/service`.

### Contact (page route)
- Same component as `src/components/Contact/Contact.jsx` — rendered at `/contact`.
