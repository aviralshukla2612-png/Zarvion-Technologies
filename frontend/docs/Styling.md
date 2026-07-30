# Styling

## Architecture

Plain CSS — no Tailwind, no CSS-in-JS, no SCSS. Each component has a co-located `.css` file.

---

## CSS Loading Order

```
src/main.jsx
  └── import './styles/global.css'
        ├── @import './variables.css'   ← shared non-color tokens
        ├── @import './dark.css'        ← [data-theme='dark'] color variables
        └── @import './light.css'       ← [data-theme='light'] color variables

Each component:
  └── import './ComponentName.css'
```

`index.css` and `App.css` are legacy Vite scaffold files. They define a second `:root` block with conflicting variable names (`--bg`, `--border`, etc.). This is a known issue — see KnownIssues.md.

---

## Design Tokens

### Typography
```css
--font-display: "Sora", "Space Grotesk", sans-serif   /* hero headings */
--font-heading: "Space Grotesk", "Sora", sans-serif   /* section headings */
--font-body:    "Inter", system-ui, sans-serif         /* body text */
--font-base:    16px
```

Fonts loaded via Google Fonts CDN in `global.css`.

### Radius
```css
--radius-lg: 22px
--radius-sm: 12px
```

### Easing
```css
--ease-out: cubic-bezier(.16,1,.3,1)
```

### Theme Transition
```css
--theme-dur:  300ms
--theme-ease: ease
```

---

## Color System

All colors are CSS custom properties. Dark mode is the default.

### Dark Mode (`[data-theme='dark']`)
```css
--bg:           #010610    /* page background */
--bg-raised:    #0A0F24    /* card backgrounds */
--border:       rgba(255,255,255,0.08)
--dim:          #888       /* muted text */
--white:        #fff       /* primary text/headings */
--black:        #000       /* inverted (button text on white bg) */
--blue:         #3a9fff
--blue-glow:    rgba(58,159,255,0.7)
--blue-1:       #1e6fe0
--blue-2:       #3b9dff
--blue-soft:    #5AA8FF
--ice:          #eaf2ff
--text-light:   #B6C2D9
--icon-color:   #ffffff
--glass-bg:     rgba(255,255,255,0.04)
--glass-border: rgba(255,255,255,0.08)
--shadow-color: rgba(0,0,0,0.6)
--shadow-elevated: 0 20px 60px rgba(0,0,0,0.55)
--shadow-soft:  0 8px 24px rgba(0,0,0,0.4)
--nav-bg:       rgba(7,12,24,.75)
--nav-bg-filled: rgba(1,6,16,0.88)
--nav-border:   rgba(255,255,255,.08)
--nav-text:     #dbe8ff
--nav-text-active: #3d8dff
--nav-brand-text: #fff
```

### Light Mode (`[data-theme='light']`)
- `--white` remapped to `#0a0a0a` (near-black) — component text stays readable without touching component files.
- `--black` remapped to `#ffffff` — button text on white backgrounds stays correct.
- `--bg` → `#eef0f4`, `--bg-raised` → `#f8f9fa`.
- All blue/accent values are **identical** to dark mode (brand consistency).

---

## Theming Strategy

The `data-theme` attribute is set on `<html>` by `applyTheme()` in `src/utils/theme.js`.
Components reference `var(--white)`, `var(--bg)`, etc. — they never hardcode colors.
The `--white` / `--black` variable remapping trick means zero component changes are needed for light mode.

**Exception:** Navbar and mobile menu use hardcoded `#000000` background and `#ffffff` text via `!important`. These do not respond to theme. See KnownIssues.md.

---

## Responsive Strategy

- Breakpoints used: `980px`, `860px`, `640px`, `600px`, `900px`, `1100px` (varies per component).
- No shared breakpoint constants — each component defines its own.
- Mobile-first is NOT consistently applied — some components use desktop-first with `max-width` overrides.
- `clamp()` used for fluid font sizes in Hero and Services headings.

---

## CSS Specificity Notes

`Services.css` uses `!important` extensively on `.is-active` and `.is-passed` rules. This was intentional to prevent global CSS overrides from silently breaking the scroll-driven active state. The comment in the file explains the reasoning.

---

## Component CSS Prefixes

| Component | CSS prefix |
|---|---|
| Services | `.srv-` |
| About | `.about-` |
| DemandedRoles | `.roles-`, `.pin-`, `.card-` |
| Contact | `.contact-` |
| Testimonials | `.testimonials-`, `.stack-` |
| Footer | `.footer-` |
| Loader | `.loader-` |
| Navbar | `.navbar`, `.nav-`, `.hamburger`, `.mobile-menu` |
| Hero | `#hero`, `.hero-`, `.h-`, `.btn-` |
| GetStarted | `.getstarted-` |
| ServiceDetails | `.service-`, `.overview-`, `.stats-`, `.benefits-`, `.features-`, `.process-`, `.faq-`, `.cta-` |
| RoleDetails | `.detail-` |
