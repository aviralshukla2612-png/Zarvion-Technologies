# Routing

## Route Table

| Path | Component | Notes |
|---|---|---|
| `/` | `Home` | Assembles all section components |
| `/roles/:slug` | `RoleDetails` | Dynamic role detail page |
| `/about` | `About` | Same component as home section |
| `/demand` | `DemandedRoles` | Same component as home section |
| `/service` | `Services` | Same component as home section |
| `/services/:slug` | `ServiceDetails` | Dynamic service detail page |
| `/get-started` | `GetStarted` | Candidate onboarding form |
| `/contact` | `Contact` | Same component as home section |
| `*` | `NotFound` | 404 fallback |

All routes are nested under `MainLayout` (Navbar + Footer always visible).

---

## Router Setup

```jsx
// App.jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="roles/:slug" element={<RoleDetails />} />
      ...
    </Route>
  </Routes>
</BrowserRouter>
```

---

## Navigation Patterns

### Navbar links
- Home: `<Link to="/">` (React Router)
- About, Services, Demand, Contact: `<a href="/about">` etc. — **hard navigation** (not React Router `<Link>`)
- Get Started: `useNavigate('/get-started')` via `handleGetStarted`

### In-component navigation
- `Services.jsx`: `useNavigate(\`/services/${slug}\`)` on "Learn More" click
- `DemandedRoles.jsx`: `useNavigate(\`/roles/${slug}\`)` on card click
- `ServiceDetails.jsx`: `useNavigate('/get-started')` on CTA click

### Scroll-to-section
- Hero buttons: `<a href="#demanded">` and `<a href="#services">` — anchor hash scroll
- GetStarted hero: `<a href="#form">` — anchor hash scroll

---

## Known Routing Issues

See `KnownIssues.md` for:
- Navbar using `<a href>` instead of `<Link>` for section routes (causes full page reload)
- Section components used as both home sections AND standalone page routes (no scroll-to-top on route change for section components)
