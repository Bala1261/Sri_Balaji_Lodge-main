# INTERACTION AUDIT & MATRIX

> Strict evaluation of every interactive surface across device classes, motion preferences, and performance tiers.

---

## ✦ Interaction Matrix

| Section | Trigger | Interaction | Purpose | Desktop Behavior | Mobile Behavior | Reduced-Motion Behavior | Performance Fallback |
|---|---|---|---|---|---|---|---|
| **01 — Preloader** | Page load / timer | 0→100% SVG contour increment & mesh spin | Branded arrival & asset initialization | Smooth progress counter with skip button | Smooth counter, sized for touch targets | Static progress bar; immediate fade | Direct instant bypass if hardware concurrency ≤ 2 |
| **02 — Digital Identity Hero** | Pointer move | Camera parallax & light tracking | Communicate physical depth & lighting response | Perspective tilt up to ±0.8 rad; point light tracks mouse | Parallax disabled; centered ambient view | Camera fixed at origin `(0, 0, 6.2)`; no tilt | DPR throttled to 1.0; shadow maps disabled |
| **02 — Digital Identity Hero** | Drag / Pointer down | Rotates 3D sculpture across pitch & yaw | Allows spatial inspection of 3D geometry | Pointer lock with momentum damping | Single touch swipe rotation | Continuous rotation halted; touch drag rotates incrementally | Lower polygon resolution; wireframe disabled |
| **02 — Digital Identity Hero** | Click / Tap | Radial shockwave vertex deformation | Physical tactile response | Mesh vertices pulse outward with audio tick | Tap triggers vertex ripple | Minimal scale transition | Shader wave calculation bypassed |
| **03 — Custom Cursor** | Pointer move / element hover | Follows cursor with spring interpolation; expands into pill label | Context feedback (`VIEW`, `DRAG`, `EXPLORE`, `OPEN`) | Custom cursor ring & dot | Automatically disabled via `pointer: coarse` detection | Follows cursor without scale/pill morph | Default system cursor |
| **04 — Editorial About** | Scroll & element hover | Hover card lifts with accent border illumination | Emphasizes core architectural axioms | Card elevates -3px with subtle cyan border | Tap activates focus state | Card borders highlight without translation | Zero backdrop filter blur |
| **05 — Selected Works** | Filter pill click | Re-filters gallery by discipline | Rapid scanning of relevant projects | Active pill highlights with mint background & click sound | Touch selects tab instantly | Tab transition without layout animation | Instant filter display |
| **05 — Selected Works** | Card hover | 3D perspective shift & glowing border | Invites exploration into deep case study | Lifts -8px, accent glow, custom cursor mode 'VIEW' | Touch card opens modal immediately | No lift; outline changes on focus | Drop shadows reduced to zero |
| **05 — Selected Works** | Card click | Opens immersive Case Study Modal | Deep technical storytelling & architecture | Top-layer dialog opens with `@starting-style` scale & fade | Fullscreen mobile dialog with touch scrolling | Dialog opens with instant fade (no scale) | Standard HTML dialog layout |
| **06 — Skills Constellation** | Mouse proximity | Spring repulsion & node expansion | Reveals relationship between technical capabilities | Nodes push away from cursor; hover reveals tags & connections | Nodes touchable to focus details | Canvas nodes remain static; hover outlines | Tabular accessible list available |
| **07 — Career Timeline** | Scroll / Hover | Milestone node highlights & card slides | Spatial progression through career milestones | Card slides +6px right; vertical guide line glow | Full-width cards with vertical rail | Cards illuminate without translation | Plain vertical list |
| **08 — Creative Lab** | Tab click | Switches active WebGL experiment | Demonstrates creative coding capability | Renders selected experiment with controls HUD | Switch experiments with horizontal scroll | Experiments render with stationary camera | Eco mode drops particle count from 25K to 8K |
| **08 — Creative Lab** | Pointer drag / click | Modulates shader, particle vortex, or audio frequencies | Hands-on engagement with generative math | Direct real-time deformation and Web Audio modulation | Touch drag controls vertex displacement | Stationary deformation | Simplified basic wireframe |
| **09 — Collaboration Contact** | Button hover / click | Magnetic pull & email copy feedback | Effortless communication | Magnetic button tracks mouse offset; copy email confirms | Standard tap with visual checkmark | Magnetic pull disabled | Instant text copy |
| **09 — Collaboration Contact** | Form submit | Form validation & confetti celebration | Delightful closure to visitor journey | Particle burst & audio chime confirmation | Confetti burst with vibration (if supported) | Confirmation text without particles | Plain text receipt card |
| **10 — Global Audio** | Audio toggle click | Synthesizes spatial feedback | Audio immersion | Toggles Web Audio gain node smoothly | Touch toggle supported | Muted by default | Silent |

---

## ✦ UX Principles Followed

1. **Jakob's Law**: Standard top navigation, familiar case study structure, and ESC key dismissal on modals.
2. **Fitts's Law**: Large touch targets (minimum 44x44px), sticky navigation controls, and full-width magnetic buttons.
3. **Gestalt Continuity & Proximity**: Connected skill edges illustrate real capability overlaps; timeline guide rail unifies career milestones.
4. **Progressive Disclosure**: High-level metrics visible upfront; detailed technical challenges and GLSL pipelines revealed upon opening case studies.
5. **No Interaction Fatigue**: Calm editorial sections (About & Timeline) alternate with high-interaction moments (Hero, Constellation, and Shader Lab) to create visual rhythm.
