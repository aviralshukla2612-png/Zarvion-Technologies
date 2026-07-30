# Decision Log

> Records of architectural and design decisions, with reasoning.

---

## 2025 — Initial Build

### D-001: Dark mode as default
**Decision:** Dark mode is the default theme. `getInitialTheme()` returns `'dark'` if no stored preference exists.
**Reason:** Brand identity. The Hyperspeed 3D road, the SVG network animation, and the overall cinematic aesthetic are designed for dark backgrounds. Light mode is a secondary option.

---

### D-002: Plain CSS over Tailwind
**Decision:** All styling uses plain CSS in co-located `.css` files.
**Reason:** The design requires precise, custom animations and complex CSS (sticky stacking, orbit rings, gradient borders, clip-path reveals). Tailwind's utility classes would produce unreadable markup and fight against the custom animation CSS. Plain CSS gives full control.

---

### D-003: Lenis initialized once in MainLayout
**Decision:** `useLenis()` is called in `MainLayout`, not in individual components.
**Reason:** Lenis must be a singleton. Multiple instances would conflict. Initializing at the layout level ensures it's available for the entire app lifetime and is destroyed only when the layout unmounts.

---

### D-004: `getLenis()` for component scroll subscriptions
**Decision:** Components that need to react to scroll (e.g. Services) use `getLenis()` to subscribe, rather than `window.addEventListener('scroll')`.
**Reason:** Lenis intercepts native scroll events. Components subscribing to `window.scroll` would receive the native (non-smoothed) scroll position, causing desync with the visual scroll position. Subscribing to Lenis gives the smoothed position.

---

### D-005: GSAP context in DemandedRoles
**Decision:** `useLayoutEffect` + `gsap.context()` for the horizontal scroll animation.
**Reason:** `useLayoutEffect` runs synchronously after DOM mutations, preventing a flash of unstyled content before GSAP sets initial card states. `gsap.context()` provides automatic cleanup of all GSAP animations and ScrollTriggers created within it.

---

### D-006: Services uses CSS sticky, not GSAP
**Decision:** The sticky stacking scroll effect in Services uses CSS `position: sticky` with scroll-driven class changes, not GSAP ScrollTrigger.
**Reason:** CSS sticky is simpler, more performant, and doesn't require GSAP cleanup. The visual transitions are pure CSS. GSAP would add complexity without benefit here.

---

### D-007: `--white` / `--black` variable remapping for light mode
**Decision:** In light mode, `--white` is remapped to `#0a0a0a` and `--black` to `#ffffff`.
**Reason:** All components use `var(--white)` for primary text and `var(--black)` for button text on white backgrounds. Remapping the variable values means zero component changes are needed for light mode support. The variable names are semantically misleading in light mode, but the trade-off is worth it.

---

### D-008: Three.js used directly instead of @react-three/fiber
**Decision:** Hero uses raw Three.js + postprocessing, not @react-three/fiber.
**Reason:** The Hyperspeed component is a self-contained, imperative Three.js application with its own render loop, event handling, and disposal logic. Wrapping it in R3F would add abstraction overhead without benefit. The component was likely ported from a standalone Three.js demo.

---

### D-009: Custom typewriter instead of react-type-animation
**Decision:** Hero uses a custom `setTimeout`-based typewriter.
**Reason:** The custom implementation provides exact control over timing, cursor behavior, and the two-line structure (static line 1 + animated line 2). `react-type-animation` doesn't support this pattern natively.

---

### D-010: Only front card renders content in Testimonials
**Decision:** Only the front (pos-0) testimonial card renders its content. Background cards are empty.
**Reason:** `backdrop-filter: blur` is inconsistent on mobile browsers (especially with data-saver mode). Without blur, the background cards' text would show through and overlap with the front card. Rendering only the front card's content eliminates this issue entirely.

---

### D-011: `!important` in Services.css
**Decision:** `.is-active` and `.is-passed` rules in Services.css use `!important`.
**Reason:** The project has two conflicting CSS systems (`index.css` legacy + the design system). Global rules were silently overriding the scroll-driven active state. `!important` ensures the scroll-driven state always wins regardless of source order or specificity conflicts.

---

### D-012: Services animation migrated from CSS sticky to GSAP ScrollTrigger pin+scrub
**Decision:** The Services stacked card animation was rebuilt using GSAP ScrollTrigger (pin + scrub), replacing the previous CSS `position: sticky` approach.
**Reason:** CSS `position: sticky` cannot produce a "card slides up from below and covers the previous card" effect. Sticky elements stick at a fixed viewport offset within their natural scroll container — they do not animate their position relative to each other. The desired effect requires explicit scroll-driven `translateY` per card, which requires GSAP ScrollTrigger with `pin: true` and `scrub`. This is the same pattern already used by `DemandedRoles.jsx`. The Lenis → ScrollTrigger wiring in `useLenis.js` handles smooth scroll integration automatically — no additional Lenis subscription is needed in the component.
