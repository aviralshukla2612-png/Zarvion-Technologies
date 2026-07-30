# Future Improvements

> Prioritized list of improvements. Do NOT implement without explicit instruction.

---

## High Priority

### 1. Connect Forms to Backend
All forms (Contact, GetStarted, Footer newsletter) currently only call `e.preventDefault()`.
Need: API endpoint or email service (e.g. Resend, EmailJS, Formspree).

### 2. Fix Navbar `<a href>` → `<Link to>`
Replace hard-navigation links with React Router `<Link>` to preserve Lenis state and avoid full page reloads.
See: KnownIssues.md #2.

### 3. Merge Duplicate ROLES Data
Consolidate `roles.js` and the local array in `RoleDetails.jsx` into a single source of truth.
See: KnownIssues.md #1.

### 4. Add ScrollRestoration
Add `window.scrollTo(0, 0)` on route change in `MainLayout` (or use React Router's `ScrollRestoration`).
See: KnownIssues.md #8.

### 5. Fix `index.html` Title
Change `<title>frontend</title>` to `<title>Zarvion Technologies — Premium Recruitment Agency</title>`.
Add meta description, og:image, og:title for SEO.

---

## Medium Priority

### 6. Remove Unused Packages
Remove: `framer-motion`, `aos`, `react-type-animation`, `lottie-react`, `react-countup`, `react-fast-marquee`, `@react-three/fiber`, `@react-three/drei`.
Reduces bundle size significantly.

### 7. Merge Services Data Sources
`Services.jsx` has its own inline `SERVICES` array. It should import from `data/services.js` to eliminate the sync risk.

### 8. Delete `index.css` and `App.css`
These are Vite scaffold files that conflict with the design system. Safe to delete once confirmed.

### 9. Add Page Transitions
Route changes currently have no transition animation. A fade or slide transition between pages would match the premium feel.
Suggested: Framer Motion `AnimatePresence` (already installed).

### 10. Navbar Theme Awareness
The navbar currently uses hardcoded black background. It should use `var(--nav-bg)` and `var(--nav-bg-filled)` which are already defined in `dark.css` and `light.css`.

---

## Low Priority

### 11. Real Logo Assets
Replace `logo.jpeg` with an SVG logo for crisp rendering at all sizes.

### 12. Real Team Photos
`About.jsx` uses Unsplash placeholder images for team members. Replace with real photos.

### 13. Real Loader Images
`Loader.jsx` uses `loremflickr.com` placeholder images. Replace with branded imagery.

### 14. Add `<meta>` Tags
Each page should set its own `document.title` and meta description. Currently only `RoleDetails` does this.

### 15. Consistent Breakpoints
Define shared breakpoint constants to replace the per-component ad-hoc breakpoints.

### 16. Keyboard Navigation for DemandedRoles
The horizontal scroll carousel has no keyboard navigation (left/right arrow keys).

### 17. Reduce Motion for Three.js
The Hyperspeed component does not check `prefers-reduced-motion`. It should pause or simplify when the user has reduced motion enabled.

### 18. Error Boundaries
No error boundaries exist. A Three.js WebGL failure would crash the entire page.

### 19. Image Optimization
All images are external URLs (Unsplash). For production, images should be self-hosted and served via a CDN with proper sizing.
