# UI Patterns

## Design Language

- **Aesthetic:** Cinematic, dark, premium, tech-forward.
- **Motion language:** Smooth, purposeful, never gratuitous.
- **Typography:** Display headings in Sora/Space Grotesk, body in Inter.
- **Color:** Deep navy/black backgrounds, electric blue accents, white text.
- **Spacing:** Generous padding, breathing room between sections.

---

## Recurring Patterns

### Eyebrow Label
Small uppercase badge above section headings.
```html
<span class="about-eyebrow">ABOUT ZARVION TECHNOLOGIES</span>
```
- Font: Space Grotesk, 11-12px, letter-spacing 0.16em
- Background: `rgba(blue, 0.08)`, border: `rgba(blue, 0.22)`, border-radius: 999px
- Color: `var(--blue-glow)` or `#60A5FA`

---

### Section Heading Pattern
```html
<h2>Premium <span class="accent">Services</span></h2>
```
- Main text: `var(--white)` or `var(--srv-text-main)`
- Accent word: gradient text (`-webkit-background-clip: text`)
- Gradient: `linear-gradient(90deg/125deg, blue-1, blue-2, ice)`

---

### CTA Button — Primary (filled)
```html
<a class="btn-w">Get Started <svg arrow /></a>
```
- Background: `var(--white)` (remapped to near-black in light mode)
- Color: `var(--black)` (remapped to white in light mode)
- Hover: background → `var(--blue)`, color → `var(--white)`, glow shadow
- Border-radius: 100px (pill)

---

### CTA Button — Ghost (outlined)
```html
<a class="btn-g">Our Services</a>
```
- Background: transparent
- Border: `1px solid rgba(255,255,255,.18)`
- Hover: border → `var(--blue)`, color → `var(--blue)`

---

### Glass Card
Used in Services, Contact panel, etc.
- Background: `var(--glass-bg)` = `rgba(255,255,255,0.04)` dark / `rgba(255,255,255,0.7)` light
- Border: `var(--glass-border)`
- `backdrop-filter: blur(10px)` where applicable

---

### Animated Dot / Pulse
Used in eyebrow badges and mini headers.
```css
@keyframes dotPulse {
  0%,100% { opacity:.5; transform:scale(1); }
  50%      { opacity:1;  transform:scale(1.35); }
}
```

---

### Scroll Reveal
Used in Contact, ServiceDetails, GetStarted.
- Class `.animate-on-scroll` added to elements.
- IntersectionObserver adds `.visible` class when element enters viewport.
- CSS: `opacity: 0; transform: translateY(20px)` → `opacity: 1; transform: none` on `.visible`.
- Staggered via `transition-delay` inline styles.

---

### Gradient Text
```css
background: linear-gradient(90deg, var(--blue-2) 0%, var(--ice) 55%, var(--blue-2) 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```
Used in: Hero heading accent line, About h1 accent, Services title accent, etc.

---

### Veil / Gradient Overlay
Used in Hero to blend the 3D scene into the background.
```css
background:
  linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 70%, transparent) 15%, transparent 35%),
  linear-gradient(to bottom, var(--bg) 0%, transparent 30%, transparent 70%, var(--bg) 100%);
```
`color-mix()` is used for smooth blending that adapts to theme.

---

### Mask Fade (Team Gallery)
```css
mask-image: linear-gradient(180deg, transparent 0, #000 64px, #000 calc(100% - 64px), transparent 100%);
```
Fades the top and bottom edges of the scrolling team gallery.

---

### Orbit Rings + Particles (Services Icon)
Active service card shows:
- Halo: radial gradient glow, `haloShimmer` animation
- Orbit ring 1: solid border, `spin 10s linear infinite`
- Orbit ring 2: dashed border, `spin 18s linear infinite reverse`
- 3 particles: `floatY` animation with staggered delays

---

## Spacing Scale (approximate, not tokenized)

| Use | Value |
|---|---|
| Section padding (desktop) | 96px–130px top |
| Section padding (mobile) | 64px top |
| Card padding (desktop) | 56px |
| Card padding (mobile) | 20px–30px |
| Gap between grid items | 20px–56px |
| Navbar height | ~90px (logo 90px tall) |
| Mobile navbar height | ~65px (logo 65px tall) |
