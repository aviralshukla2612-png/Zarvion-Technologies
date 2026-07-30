# Component Relationships

## Dependency Graph

```
main.jsx
  └── ThemeProvider (context/ThemeContext.jsx)
        └── App.jsx
              └── MainLayout
                    ├── Navbar
                    │     └── ThemeToggle ← useTheme() → ThemeContext
                    ├── Home
                    │     ├── Hero          (no deps)
                    │     ├── About         (no deps)
                    │     ├── Services      ← getLenis() → useLenis singleton
                    │     │                 ← useNavigate → RoleDetails
                    │     ├── DemandedRoles ← GSAP + ScrollTrigger
                    │     │                 ← useNavigate → RoleDetails
                    │     │                 ← ROLES from roles.js
                    │     ├── Testimonials  (no deps)
                    │     └── Contact       (no deps)
                    ├── RoleDetails         ← useParams → slug
                    │                       ← local ROLES array (duplicate)
                    ├── ServiceDetails      ← useParams → slug
                    │                       ← getServiceBySlug from data/services.js
                    │                       ← useNavigate → GetStarted
                    ├── GetStarted          (no external deps)
                    ├── About               (same component, standalone route)
                    ├── DemandedRoles       (same component, standalone route)
                    ├── Services            (same component, standalone route)
                    ├── Contact             (same component, standalone route)
                    └── NotFound            (no deps)
                    └── Footer              (no deps)
```

---

## Data Dependencies

```
src/data/services.js
  ├── Services.jsx (DOES NOT import — has own inline SERVICES array)
  └── ServiceDetails.jsx (imports getServiceBySlug)

src/components/DemandedRoles/roles.js
  ├── DemandedRoles.jsx (imports ROLES)
  └── RoleDetails.jsx (DOES NOT import — has own local ROLES array)
```

---

## Shared Utilities

```
src/hooks/useLenis.js
  ├── MainLayout.jsx (calls useLenis() — initializes)
  └── Services.jsx (calls getLenis() — subscribes)

src/hooks/useTheme.js
  └── (available but not used — ThemeToggle uses useContext directly)

src/utils/theme.js
  └── ThemeContext.jsx (imports all theme utilities)

src/context/ThemeContext.jsx
  └── ThemeToggle.jsx (useContext(ThemeContext))
```

---

## CSS Variable Dependencies

Components that use `var(--white)` for headings:
- Hero, About, Services, DemandedRoles, Contact, Footer, Testimonials, RoleDetails, ServiceDetails, GetStarted

Components that use `var(--bg)` for backgrounds:
- Hero (`.hero-left`, `.hero-right`), About, Services

Components that use `var(--blue)` / `var(--blue-2)` / `var(--blue-soft)`:
- Hero (typing cursor, accent line, buttons)
- Navbar (active link underline, nav-btn)
- About (eyebrow, feature icons)
- Services (eyebrow dot, title accent)

---

## Navigation Flow

```
Navbar "Get Started" → /get-started (GetStarted)
Services "Learn More" → /services/:slug (ServiceDetails)
ServiceDetails "Get Started" → /get-started (GetStarted)
DemandedRoles card click → /roles/:slug (RoleDetails)
RoleDetails "Apply Now" → mailto:careers@zarviontechnologies.com
Hero "Get Started" → #demanded (anchor scroll)
Hero "Our Services" → #services (anchor scroll)
Footer links → /about, /service, /demand, /contact
```
