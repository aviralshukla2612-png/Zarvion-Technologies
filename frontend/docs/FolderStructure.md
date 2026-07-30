# Folder Structure

```
frontend/
├── public/                        ← static assets served as-is
├── src/
│   ├── assets/
│   │   ├── fonts/                 ← (empty — fonts loaded via Google Fonts CDN)
│   │   ├── icons/                 ← (empty — icons via react-icons)
│   │   ├── images/
│   │   │   └── logo.jpeg          ← Zarvion logo (used in Navbar + Footer)
│   │   └── videos/                ← (empty — reserved for future use)
│   │
│   ├── components/                ← Reusable UI components (section-level)
│   │   ├── About/
│   │   │   ├── About.jsx          ← About section: SVG network animation, team gallery, logo carousel
│   │   │   └── About.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx        ← Contact section: info + hover-flip form panel
│   │   │   └── Contact.css
│   │   ├── DemandedRoles/
│   │   │   ├── DemandedRoles.jsx  ← GSAP horizontal scroll carousel of role cards
│   │   │   ├── DemandedRoles.css
│   │   │   └── roles.js           ← Role data (7 roles)
│   │   ├── Footer/
│   │   │   ├── Footer.jsx         ← Footer: brand, links, newsletter, rotating cube
│   │   │   └── Footer.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx           ← Hero: typing animation + Three.js Hyperspeed road
│   │   │   └── Hero.css
│   │   ├── Loader/
│   │   │   ├── Loader.jsx         ← Full-screen loading screen with counter + image crossfade
│   │   │   └── Loader.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx         ← Fixed navbar: desktop links + mobile hamburger menu
│   │   │   └── Navbar.css
│   │   ├── RoleCard/
│   │   │   ├── RoleCard.jsx       ← Standalone role card (currently UNUSED — see KnownIssues.md)
│   │   │   └── RoleCard.css
│   │   ├── Services/
│   │   │   ├── Services.jsx       ← Sticky stacking scroll cards for 6 services
│   │   │   └── Services.css
│   │   ├── Testimonials/
│   │   │   ├── Testimonials.jsx   ← Draggable stacked card testimonials
│   │   │   └── Testimonials.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx    ← Sun/Moon icon button
│   │       └── ThemeToggle.css
│   │
│   ├── context/
│   │   └── ThemeContext.jsx       ← ThemeProvider + ThemeContext
│   │
│   ├── data/
│   │   └── services.js            ← Service data (6 services) + getServiceBySlug()
│   │
│   ├── hooks/
│   │   ├── useLenis.js            ← Lenis init + GSAP wiring + getLenis() export
│   │   └── useTheme.js            ← useContext(ThemeContext) with guard
│   │
│   ├── layouts/
│   │   └── MainLayout/
│   │       └── MainLayout.jsx     ← Navbar + Suspense(Outlet) + Footer, calls useLenis()
│   │
│   ├── pages/
│   │   ├── GetStarted/
│   │   │   ├── GetStarted.jsx     ← Full candidate onboarding page with multi-section form
│   │   │   └── GetStarted.css
│   │   ├── Home/
│   │   │   └── Home.jsx           ← Assembles all section components (lazy loaded)
│   │   ├── NotFound/
│   │   │   ├── NotFound.jsx       ← 404 page
│   │   │   └── NotFound.css
│   │   ├── RoleDetails/
│   │   │   ├── RoleDetails.jsx    ← Dynamic role detail page (reads from local ROLES array)
│   │   │   └── RoleDetails.css
│   │   └── ServiceDetails/
│   │       ├── ServiceDetails.jsx ← Dynamic service detail page (reads from data/services.js)
│   │       └── ServiceDetails.css
│   │
│   ├── styles/
│   │   ├── global.css             ← Imports fonts, variables, dark, light; resets; theme transition
│   │   ├── variables.css          ← Shared non-color tokens (typography, radius, easing, timing)
│   │   ├── dark.css               ← [data-theme='dark'] color variables
│   │   └── light.css              ← [data-theme='light'] color variables
│   │
│   ├── utils/
│   │   └── theme.js               ← THEME_KEY, THEMES, getInitialTheme, persistTheme, applyTheme
│   │
│   ├── App.jsx                    ← Router + Routes definition
│   ├── App.css                    ← Legacy Vite scaffold CSS (NOT the design system)
│   ├── index.css                  ← Legacy Vite scaffold CSS (NOT the design system)
│   └── main.jsx                   ← Entry point
│
├── docs/                          ← Project documentation (this folder)
├── index.html                     ← HTML shell (title still says "frontend" — see KnownIssues.md)
├── package.json
├── vite.config.js
└── .oxlintrc.json
```

---

## Naming Conventions

- Components: `PascalCase` folder + file (e.g. `DemandedRoles/DemandedRoles.jsx`)
- CSS: same name as component (e.g. `DemandedRoles.css`)
- Hooks: `camelCase` with `use` prefix (e.g. `useLenis.js`)
- Data files: `camelCase` (e.g. `services.js`, `roles.js`)
- CSS classes: `kebab-case` with component prefix (e.g. `.srv-roll-item`, `.about-hero-grid`)
- CSS variables: `--kebab-case` (e.g. `--blue-glow`, `--font-heading`)
