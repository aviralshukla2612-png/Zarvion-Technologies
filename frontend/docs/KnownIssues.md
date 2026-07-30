# Known Issues

> These are documented observations. Do NOT fix unless explicitly requested.
> Fixing any of these without understanding the full impact could introduce regressions.

---

## 1. Duplicate ROLES Data

**Severity:** Medium
**Files affected:**
- `src/components/DemandedRoles/roles.js` — source of truth for the carousel
- `src/pages/RoleDetails/RoleDetails.jsx` — has its own local `ROLES` array

**Problem:** The `RoleDetails` page defines its own copy of the roles array with additional fields (`salary`, `demand`, `experience`). If a role is added/edited in `roles.js`, `RoleDetails.jsx` must be updated manually.

**Correct fix:** Move the extended role data into `roles.js` and import it in `RoleDetails.jsx`.

---

## 2. Navbar Uses `<a href>` Instead of `<Link>`

**Severity:** Medium
**File:** `src/components/Navbar/Navbar.jsx`

**Problem:** The desktop and mobile nav links for About, Services, Demand, and Contact use `<a href="/about">` etc. This causes a full page reload instead of a client-side navigation. Lenis scroll position is lost, GSAP ScrollTrigger state is reset, and the loading experience is broken.

**Correct fix:** Replace `<a href>` with `<Link to>` from react-router-dom for all internal routes.

---

## 3. `index.css` Conflicts with Design System

**Severity:** Low (currently not causing visible issues)
**File:** `src/index.css`

**Problem:** `index.css` is a legacy Vite scaffold file that defines its own `:root` block with variables like `--bg`, `--border`, `--text`, `--accent`. These conflict with the project's design system variables in `variables.css`, `dark.css`, and `light.css`. The project's variables win because `global.css` is imported after `index.css` in the cascade, but this is fragile.

**Correct fix:** Delete `index.css` and `App.css` entirely (they are Vite scaffold files with no project-relevant content).

---

## 4. `RoleCard` Component Is Unused

**Severity:** Low
**File:** `src/components/RoleCard/RoleCard.jsx`

**Problem:** `RoleCard` is a standalone component that was presumably created to be used by `DemandedRoles`. However, `DemandedRoles` renders its cards inline. `RoleCard` is never imported anywhere.

**Correct fix:** Either use `RoleCard` inside `DemandedRoles`, or delete it.

---

## 5. Navbar Background Ignores Theme

**Severity:** Low
**File:** `src/components/Navbar/Navbar.css`

**Problem:** The navbar uses `background: #000000 !important` and text uses `color: #ffffff !important`. These are hardcoded and do not respond to the light/dark theme toggle. In light mode, the navbar remains black.

**Note:** This may be intentional (brand decision — always-dark navbar). Confirm before fixing.

---

## 6. `index.html` Title Is "frontend"

**Severity:** Low
**File:** `index.html`

**Problem:** `<title>frontend</title>` — this is the Vite scaffold default. Should be "Zarvion Technologies".

**Correct fix:** Change to `<title>Zarvion Technologies — Premium Recruitment Agency</title>`.

---

## 7. Unused Installed Packages

**Severity:** Low (bundle size impact)
**File:** `package.json`

The following packages are installed but not used in any component:
- `framer-motion` — installed, zero usage found
- `aos` — installed, zero usage found
- `react-type-animation` — installed, Hero uses a custom typewriter instead
- `lottie-react` — installed, zero usage found
- `react-countup` — installed, GetStarted and ServiceDetails use custom counter logic instead
- `react-fast-marquee` — installed, About uses a custom CSS carousel instead
- `@react-three/fiber` and `@react-three/drei` — installed, Hero uses raw Three.js instead

**Correct fix:** Remove unused packages to reduce bundle size. Confirm each before removing.

---

## 8. No `scroll-to-top` on Route Change

**Severity:** Medium
**Files affected:** All pages

**Problem:** When navigating between routes (e.g. from Home to RoleDetails), the scroll position is not reset to the top. React Router v7 does not do this automatically.

**Correct fix:** Add a `ScrollRestoration` component from react-router-dom, or a `useEffect` in `MainLayout` that calls `window.scrollTo(0, 0)` on route change. `RoleDetails` does this manually with `window.scrollTo(0, 0)` in its own `useEffect`, but other pages do not.

---

## 9. ServiceDetails Stats Counter Runs on Every Intersection

**Severity:** Low
**File:** `src/pages/ServiceDetails/ServiceDetails.jsx`

**Problem:** The stats counter animation uses `IntersectionObserver` but does not disconnect after the first trigger. If the user scrolls away and back, the counter restarts from 0.

---

## 10. Contact Form Has No Backend

**Severity:** Info
**Files:** `src/components/Contact/Contact.jsx`, `src/pages/GetStarted/GetStarted.jsx`, `src/components/Footer/Footer.jsx`

All forms call `e.preventDefault()` only. No data is sent anywhere. This is expected for the current stage but must be addressed before production.

---

## 11. `About.jsx` Uses Hardcoded Dark Colors in SVG

**Severity:** Low
**File:** `src/components/About/About.jsx`

The SVG network animation uses hardcoded dark colors (`#04060c`, `#0f1a30`, `#5f80b8`, etc.). In light mode, the SVG panel background is set via CSS (`radial-gradient` in `.about-hero-visual`), but the SVG elements themselves remain dark-themed. This is acceptable if the panel always has a dark background, but it means the SVG does not adapt to theme.

---

## 12. `Services.jsx` Has Inline Service Data

**Severity:** Low
**File:** `src/components/Services/Services.jsx`

The `SERVICES` array is defined inline in the component file. The service slugs and data in this array must stay in sync with `src/data/services.js`. Currently they are manually kept in sync.

**Correct fix:** Import from `data/services.js` and map to the format needed by the component.
