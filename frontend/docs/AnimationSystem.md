# Animation System

## Libraries in Use

| Library | Version | Purpose |
|---|---|---|
| GSAP | 3.15 | ScrollTrigger, quickSetters, timelines |
| Lenis | 1.3 | Smooth scroll driver |
| Framer Motion | 12 | Installed but NOT currently used in any component |
| Three.js | 0.185 | Hero Hyperspeed WebGL road scene |
| postprocessing | 6.39 | Bloom effect on the Three.js scene |
| AOS | 2.3 | Installed but NOT currently used |
| react-type-animation | 3.2 | Installed but NOT currently used (custom typing in Hero) |

---

## Lenis Smooth Scroll

**File:** `src/hooks/useLenis.js`

- Initialized **once** in `MainLayout` via `useLenis()`.
- A module-level singleton `lenisInstance` is stored and exposed via `getLenis()`.
- Lenis is wired to GSAP ScrollTrigger: `lenis.on('scroll', ScrollTrigger.update)`.
- GSAP ticker drives Lenis: `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- `gsap.ticker.lagSmoothing(0)` prevents GSAP from compensating for tab-switch lag.
- On cleanup: ticker callback removed, lenis destroyed, singleton nulled.

**Usage in components:**
```js
import { getLenis } from '../../hooks/useLenis';
const lenis = getLenis();
if (lenis) lenis.on('scroll', handler);
```

---

## GSAP ScrollTrigger — DemandedRoles

**File:** `src/components/DemandedRoles/DemandedRoles.jsx`

- Uses `useLayoutEffect` to set up the animation (avoids flash of unstyled content).
- Creates a GSAP context (`gsap.context()`) scoped to `sectionRef` for clean cleanup.
- **Pin + scrub horizontal scroll:** The `.pin-track` element is pinned while the `.card-stage` slides horizontally.
- `end: \`+=${totalWidth}\`` — scroll distance equals total card width × count.
- `scrub: true` — animation progress tied directly to scroll position.
- `onUpdate` callback uses `tl.progress()` (not raw scroll progress) to keep scale/opacity in sync with the smoothed horizontal position.
- **quickSetters** used for scale, opacity, zIndex — avoids GSAP tween overhead on every scroll tick.
- Hover effects: `gsap.to(card, { scale: 1.03 })` only on `.active` cards.
- Mobile: animation disabled, cards stack vertically.
- Cleanup: `ctx.revert()` + manual hover listener removal.

---

## Services Stacked Card Animation

**File:** `src/components/Services/Services.jsx`

- GSAP ScrollTrigger pin+scrub — same pattern as DemandedRoles.
- `.srv-roll` (the pin track) is pinned by GSAP. `pinSpacing: true` reserves the scroll budget.
- Each card is `position: absolute; height: 100vh` inside `.srv-stack`.
- Card 0 starts at `y: 0`. Cards 1–N start at `y: cardH` (below viewport).
- On scroll, card i slides from `y: cardH → 0` while all previous cards compress upward to show only a `STRIP_HEIGHT` (64px) strip.
- Strip stacking formula: `targetY = -(cardH - STRIP_HEIGHT) - (i - 1 - j) * STRIP_HEIGHT`.
- `scrub: 0.6` — slight smoothing for premium feel without lag.
- `onUpdate` callback derives `activeIndex` from `self.progress` and toggles `.is-active` / `.is-passed` CSS classes.
- All visual transitions (color, icon glow, orbit rings, particles) remain pure CSS triggered by class changes.
- Mobile (≤768px): GSAP disabled, cards render in normal vertical flow via `position: static`.
- Cleanup: `gsap.context().revert()` on unmount or mobile breakpoint change.
- No Lenis subscription needed — Lenis already feeds `ScrollTrigger.update` via `useLenis.js`.

---

## Hero — Three.js Hyperspeed

**File:** `src/components/Hero/Hero.jsx`

- Self-contained `Hyperspeed` component with the entire Three.js app inside a `useEffect`.
- Uses `postprocessing` `EffectComposer` + `BloomEffect` for the neon glow.
- Custom GLSL shaders for road markings, car lights, and side sticks.
- 6 distortion presets (turbulent, mountain, xy, LongRace, deep, deepStill).
- Currently uses `hyperspeedPresets.one` (turbulent distortion).
- Mouse/touch hold → speed up (FOV change + speed multiplier).
- Full `dispose()` method cleans up renderer, composer, geometries, materials, event listeners.
- `appRef` stores the instance; cleanup runs on unmount.

---

## Hero — Typing Animation

**File:** `src/components/Hero/Hero.jsx`

- Custom `setTimeout`-based typewriter (NOT react-type-animation).
- Types line 1 once, then loops through `phrases` array with type/delete cycle.
- Cursor element (`<span ref={cursorRef}>`) is appended via DOM manipulation.
- Cleanup: `clearTimeout(timeoutId)` on unmount.

---

## About — SVG Network Animation

**File:** `src/components/About/About.jsx`

- Pure SVG built imperatively via `document.createElementNS` inside `useEffect`.
- Animated with SVG `<animate>` and `<animateMotion>` elements (no JS RAF loop).
- Includes: dot clusters, hub halos, arc paths with traveling dots, city skyline, building lights, floating figures.
- Cleanup: `container.innerHTML = ''` on re-render (handles React StrictMode double-invoke).

---

## About — Team Gallery + Logo Carousel

**File:** `src/components/About/About.css`

- Pure CSS `animation: teamScrollUp / teamScrollDown` — infinite linear scroll.
- Columns alternate direction (even = up, odd = down).
- Logo carousel: `animation: scrollLogos 28s linear infinite`.
- Both pause on hover via `animation-play-state: paused`.
- Both respect `prefers-reduced-motion`.

---

## Contact — Hover-Flip Panel

**File:** `src/components/Contact/Contact.jsx` + `Contact.css`

- CSS-only flip: `.cta-front` and `.cta-back` faces, cross-fade on `:hover` / `:focus-within`.
- Rotating gradient border via CSS `@keyframes` on a pseudo-element.
- Intersection Observer triggers `.is-visible` class for staggered reveal of info items.

---

## Loader

**File:** `src/components/Loader/Loader.jsx`

- `requestAnimationFrame` loop counts 0→100 with cubic ease-out.
- `setInterval` cycles through 4 images every 950ms.
- `onComplete` callback fires after 300ms delay once counter reaches 100.

---

## CSS Transitions — Theme Switch

**File:** `src/styles/global.css`

- `html.theme-transition *` applies 300ms transitions to color-related properties only.
- Class added/removed by `applyTheme()` in `src/utils/theme.js`.
- Deliberately excludes `transform`, `opacity`, `width`, `height` to avoid interfering with GSAP/Lenis.

---

## Animation Patterns Summary

| Pattern | Where | Mechanism |
|---|---|---|
| Smooth scroll | Global | Lenis |
| Horizontal pin+scrub | DemandedRoles | GSAP ScrollTrigger |
| Stacked card animation | Services | GSAP ScrollTrigger pin+scrub |
| WebGL road | Hero | Three.js + postprocessing |
| Typewriter | Hero | Custom setTimeout loop |
| SVG network | About | SVG animate elements |
| Infinite scroll columns | About team | CSS keyframes |
| Infinite logo carousel | About | CSS keyframes |
| Stacked card drag | Testimonials | pointer events + state |
| Hover flip panel | Contact | CSS transitions |
| Scroll reveal | Contact, ServiceDetails, GetStarted | IntersectionObserver |
| Counter animation | ServiceDetails, GetStarted | setInterval |
| Theme transition | Global | CSS transition class |
