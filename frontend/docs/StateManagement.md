# State Management

## Philosophy

No global state manager. All state is either:
1. Local component state (`useState`)
2. Refs for animation values (`useRef`) — never triggers re-renders
3. React Context for truly global state (theme only)

---

## ThemeContext

**File:** `src/context/ThemeContext.jsx`
**Hook:** `src/hooks/useTheme.js`

```
ThemeProvider (wraps entire app in main.jsx)
  ├── state: theme ('dark' | 'light')
  ├── ref: hasExplicitChoice (tracks if user has manually chosen)
  ├── setTheme(next) — validates, persists, sets state
  ├── toggleTheme() — flips between dark/light, persists
  └── isDark — boolean derived from theme
```

**Persistence:** `localStorage` key `'zarvion-theme'`.
**Default:** Dark mode (falls back to dark if no stored preference).
**System preference:** `getSystemTheme()` exists but `getInitialTheme()` does NOT use it — it defaults to dark. This is intentional (brand decision).

**Consumers:**
- `ThemeToggle.jsx` — reads `theme`, calls `toggleTheme`
- `applyTheme()` in `utils/theme.js` — sets `data-theme` on `<html>`

---

## Local State Summary

| Component | State | Purpose |
|---|---|---|
| Navbar | `filled` | Background fill on scroll |
| Navbar | `activeSection` | Highlight active nav link |
| Navbar | `menuOpen` | Mobile menu open/close |
| Services | `activeIndex` | Which service card is active |
| DemandedRoles | `isMobile` | Toggle between desktop/mobile layout |
| DemandedRoles | `activeIndex` | Display only (animation uses ref) |
| Testimonials | `order` | Card rotation order |
| Testimonials | `dragX` | Drag offset for front card |
| Testimonials | `dragging` | Drag state flag |
| Contact | `isVisible` | IntersectionObserver trigger |
| ServiceDetails | `openFaq` | Which FAQ item is expanded |
| GetStarted | `formData` | All form field values |
| GetStarted | `errors` | Validation errors |
| GetStarted | `isSubmitted` | Show success screen |
| GetStarted | `isSubmitting` | Disable submit button |
| GetStarted | `activeFaq` | Which FAQ item is expanded |
| GetStarted | `mousePos` | Mouse position for parallax |
| GetStarted | `counters` | Animated counter values |
| Loader | `percent` | Loading counter 0→100 |
| Loader | `imgIndex` | Current image in crossfade |

---

## Animation Refs (not React state)

| Component | Ref | Purpose |
|---|---|---|
| DemandedRoles | `ctxRef` | GSAP context for cleanup |
| DemandedRoles | `activeIndexRef` | Current active card (avoids re-render) |
| DemandedRoles | `isMobileRef` | Current mobile state (avoids stale closure) |
| DemandedRoles | `quickSettersRef` | GSAP quickSetters array |
| DemandedRoles | `trackRef`, `viewportRef`, `stageRef`, `cardRefs` | DOM refs for GSAP |
| Hero | `typedHeadRef`, `cursorRef` | DOM refs for typing animation |
| Hero | `hyperspeed`, `appRef` | Three.js container + app instance |
| About | `visualRef` | SVG container DOM ref |
| Contact | `sectionRef` | IntersectionObserver target |
| GetStarted | `statsRef` | IntersectionObserver target for counters |
| Loader | `rafRef` | requestAnimationFrame ID |
| Testimonials | `startX`, `draggingRef` | Drag tracking (avoids stale closure) |
