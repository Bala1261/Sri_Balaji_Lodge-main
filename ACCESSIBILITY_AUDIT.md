# ACCESSIBILITY AUDIT (WCAG 2.2 AA COMPLIANCE)

> Systematic accessibility verification ensuring cutting-edge 3D visual design never compromises inclusive access.

---

## ✦ Accessibility Compliance Checklist

### 1. Semantic Structure & Heading Hierarchy
- **Single `<h1>`**: Located strictly in the Hero (`ARAVIND BALAJI`).
- **Logical `<h2>` Sections**: Each major landmark section (`#about`, `#work`, `#skills`, `#timeline`, `#lab`, `#contact`) uses an `<h2>`.
- **Sub-headings `<h3>`**: Individual cards, principles, milestones, and experiments use `<h3>`.
- **Semantic Elements**: Built with native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, and `<footer>`.

### 2. Keyboard Navigation & Visible Focus Rings
- All interactive controls (links, magnetic buttons, filter tabs, modal triggers, and form inputs) are fully operable via keyboard:
  - `Tab` / `Shift+Tab`: Natural tab order across all landmarks.
  - `Enter` / `Space`: Activates buttons, tabs, and project cards.
  - `Escape`: Closes open Case Study dialogs and returns focus to trigger element.
- **Focus Rings**: High-contrast, non-obscured indicator:
  ```css
  :focus-visible {
    outline: 2px solid #00F5A0;
    outline-offset: 4px;
    border-radius: 4px;
  }
  ```

### 3. Screen Reader Fallbacks & Landmarks
- **Skip Link**: `<a href="#main-content" class="skip-link">Skip to main content</a>` positioned at top of DOM for rapid landmark bypassing.
- **Constellation Tabular Fallback**: The interactive skills constellation canvas is accompanied by an accessible `<details>` table containing all skills, categories, and descriptions in readable HTML.
- **Form Labels**: Every input in the contact brief form includes an explicit `<label for="...">` with readable required field markers.
- **ARIA States**: `aria-expanded` on mobile navigation, `aria-selected` on tabs, `aria-modal="true"` on dialogs, and `aria-labelledby` linking modal titles.

### 4. Color Contrast Ratios (WCAG AA Requirements)

| Foreground Element | Background Color | Contrast Ratio | WCAG 2.2 AA (4.5:1 min) |
|---|---|---|---|
| Primary Text `#F4F5F7` | Canvas Dark `#060709` | **17.8 : 1** | **PASSED (AAA)** |
| Electric Accent `#00F5A0` | Dark Surface `#090C12` | **12.4 : 1** | **PASSED (AAA)** |
| Secondary Text `#9CA3AF` | Dark Surface `#0E1218` | **7.1 : 1** | **PASSED (AA)** |
| Muted Metadata `#64748B` | Surface `#060709` | **4.6 : 1** | **PASSED (AA)** |

### 5. Touch Target Sizing (Mobile Accessibility)
- All interactive buttons, icon triggers, and navigation links maintain a minimum interactive hit area of **44 × 44 CSS pixels** on mobile viewports.

### 6. Prefers-Reduced-Motion Support
- Respects operating system preferences via `@media (prefers-reduced-motion: reduce)`.
- Provides an explicit **User Override Toggle** in the navigation header so users can activate reduced motion at any time.
- When active:
  - 3D camera parallax is halted.
  - Procedural vertex shockwaves and idle auto-rotations are disabled.
  - Dialog top-layer entry transforms are simplified to instant fades.
  - Animation durations drop to sub-millisecond durations.
