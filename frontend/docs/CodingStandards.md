# Coding Standards

## General Rules

- Match the existing code style exactly. New code should look like it has always been in the project.
- No TypeScript — the project is plain JavaScript (JSX).
- No Tailwind — all styling is plain CSS in co-located `.css` files.
- No CSS-in-JS — no styled-components, no emotion.
- No global state manager — use local state or ThemeContext only.

---

## File Naming

| Type | Convention | Example |
|---|---|---|
| Component | `PascalCase` folder + file | `DemandedRoles/DemandedRoles.jsx` |
| Component CSS | Same as component | `DemandedRoles.css` |
| Hook | `camelCase` with `use` prefix | `useLenis.js` |
| Data file | `camelCase` | `services.js`, `roles.js` |
| Utility | `camelCase` | `theme.js` |
| Page | `PascalCase` folder + file | `GetStarted/GetStarted.jsx` |

---

## CSS Class Naming

- `kebab-case` always.
- Prefix with component abbreviation to avoid collisions.
- Examples: `.srv-roll-item`, `.about-hero-grid`, `.contact-cta-panel`.
- CSS variables: `--kebab-case` (e.g. `--blue-glow`, `--font-heading`).

---

## Component Structure

```jsx
// 1. Imports (React first, then libraries, then local)
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ComponentName.css';

// 2. Constants / data (outside component)
const DATA = [...];

// 3. Component function
const ComponentName = ({ prop1, prop2 }) => {
  // 3a. Hooks (state, refs, context)
  // 3b. Effects
  // 3c. Handlers
  // 3d. Return JSX
};

export default ComponentName;
```

---

## Animation Rules

- GSAP animations: always use a `gsap.context()` scoped to a ref, and call `ctx.revert()` on cleanup.
- ScrollTrigger: always call `ScrollTrigger.refresh()` after layout changes.
- Lenis: never create a new Lenis instance in a component — use `getLenis()` to subscribe.
- Three.js: always implement a `dispose()` method and call it on unmount.
- CSS animations: always add `@media (prefers-reduced-motion: reduce)` overrides.
- Never use `setTimeout` for animation timing that depends on layout — use `requestAnimationFrame` or GSAP.

---

## State Rules

- Use `useRef` for values that change during animation but don't need to trigger re-renders.
- Use `useState` only when the UI needs to update in response to the value change.
- Never store DOM nodes in `useState` — use `useRef`.
- Never call `setState` inside a GSAP `onUpdate` callback unless absolutely necessary (use refs instead).

---

## Import Order

1. React and React hooks
2. Third-party libraries (gsap, lenis, three, etc.)
3. React Router hooks/components
4. Local context/hooks
5. Local components
6. Local data/utils
7. CSS (always last)

---

## CSS Variable Usage

- Always use CSS variables for colors — never hardcode hex values in component CSS.
- Exception: Navbar currently hardcodes `#000000` and `#ffffff` — this is a known issue, do not replicate.
- Use `var(--white)` for primary text/headings (remapped in light mode).
- Use `var(--bg)` for backgrounds.
- Use `var(--blue)`, `var(--blue-2)`, `var(--blue-soft)` for brand blue.

---

## Accessibility

- All interactive elements must have `aria-label` if they lack visible text.
- Images must have `alt` attributes.
- Keyboard navigation: `onKeyDown` handlers for `Enter`/`Space` on non-button clickable elements.
- Focus styles: never remove `outline` without providing an alternative.
- Hamburger menu: `aria-expanded`, `aria-controls`, `aria-label`.

---

## Performance

- Lazy-load section components in `Home.jsx` via `React.lazy`.
- Use `loading="lazy"` on images that are below the fold.
- Use `loading="eager"` + `decoding="sync"` on above-the-fold images (role cards).
- Use GSAP `quickSetter` for values that update on every scroll tick.
- Use `{ passive: true }` on scroll/touch event listeners.
- Use `requestAnimationFrame` throttling for scroll handlers that don't use Lenis.
