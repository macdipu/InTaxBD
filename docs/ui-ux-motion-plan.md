# InTaxBD — Full-page UI/UX and motion plan (AY 2026-27)

Scope: the single landing page (`presentation/pages/Home.tsx`) and every section in it.
Goal: keep the current clean, logo-derived identity, and give it a motion language that
is specific to *filing a tax return*, so the animation explains the service instead of decorating it.

---

## 1. Brief, restated

| | |
|---|---|
| **Subject** | Income tax return preparation and filing in Bangladesh, for AY 2026-27 (income year 1 July 2025 to 30 June 2026). |
| **Audience** | Salaried people, freelancers, NRBs and small-business owners. Mostly on phones, often arriving from Facebook or WhatsApp. Many are nervous about the NBR and deadlines. |
| **Primary job** | Get the visitor to send a WhatsApp message with their income band already filled in. |
| **Secondary jobs** | Show the fee before they ask. Show that the process is short. Help them gather documents. Build trust in the CA-qualified lead. |

## 2. Concept: "the return gets filed while you scroll"

The page is one return moving through its life: **blank form → figures filled → confirmed → submitted → acknowledged**.
Every animation is one of a small set of verbs taken from that world:

| Verb | What it looks like | Where it's used |
|---|---|---|
| **Fill** | Text types or rolls into a field like ink on a form | Hero slip, fee numbers, stats |
| **Rule** | A ledger line or dotted leader draws left to right | Section dividers, pricing leaders, service rows |
| **Tick** | The logo's check mark draws itself with a stroke | Checklists, process steps, list bullets |
| **Stamp** | A round seal drops with a slight overshoot and an ink spread | Hero "acknowledged", process step 5, documents complete, form sent |
| **Advance** | A progress rail fills green | Nav scroll bar, process rail, documents meter |

Because the verbs repeat, the amount of motion can be high without the page feeling random.
Rule of thumb: **scroll-triggered motion plays once; user-triggered motion plays every time.**

## 3. Design tokens

### Color (keep — they come from the logo)

| Token | Hex | Role |
|---|---|---|
| `paper` | `#F3F5F8` | Page background (cool, not cream) |
| `surface` | `#FFFFFF` | Alternate section background, form slip |
| `ink` | `#0E1B33` | Text, rules, hard shadow |
| `brand` | `#15409A` | Primary buttons, fee figures, links |
| `leaf` | `#7CB82F` | Check marks, progress fills, stamp, slider thumb |
| `night` | `#0A1630` | Contact/footer band |

New, motion-only:

| Token | Value | Role |
|---|---|---|
| `stamp-ink` | `#3F6B0C` at 85% | Stamp seal fill (leaf-deep, reads as rubber-stamp ink) |
| `highlight` | `#7CB82F` at 18% | Selected pricing row bar, form field fill flash |

### Type (keep, tighten the scale)

- **Bricolage Grotesque** 500–800, display only. Use its optical size axis: `opsz 96` at 56px+, `opsz 24` under 32px.
- **Public Sans** 400–700, text and all numbers, with `tnum` so rolling digits don't jitter.
- Add **Noto Sans Bengali** 500 (subset) only for the `৳` sign, so fees can read `৳3,000` instead of `3,000 Tk` where space is tight. Keep "Tk" in the table for scanning.
- Scale (1.25 ratio, 17px base): 14 / 17 / 21 / 27 / 34 / 42 / 56 / 76.

### Motion tokens (add to `index.html` as CSS variables)

```css
:root {
  --dur-xs: 120ms;   /* hover colour, press */
  --dur-sm: 220ms;   /* toggles, accordion icon */
  --dur-md: 380ms;   /* reveals, row highlight */
  --dur-lg: 640ms;   /* rules drawing, hero lines */
  --dur-xl: 1100ms;  /* stamp sequence, count-ups */
  --ease-out: cubic-bezier(.22, 1, .36, 1);       /* default for anything entering */
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);    /* things that move across */
  --ease-stamp: cubic-bezier(.34, 1.56, .64, 1);  /* overshoot, only for stamps and the slider thumb */
  --stagger: 60ms;
}
```

Only `transform`, `opacity`, `clip-path`, `stroke-dashoffset` and `background-size` are animated. Nothing animates `width`, `height`, `top` or `box-shadow`.

### Layout

12-column grid, `max-w-6xl`, left-aligned throughout (as now). Sections alternate `paper` / `surface`
backgrounds so a section change is visible without extra dividers. Contact stays on `night`.

---

## 4. Section-by-section plan

### 4.0 Global chrome

**Navbar**
- On load: logo fades in at 0ms, links stagger in at `--stagger` from 120ms.
- After 24px of scroll: bar shrinks from 80px to 64px tall, gains a `surface/90` backdrop blur and a 1px `rule` bottom border (`--dur-md`).
- **Filing progress bar**: a 2px `leaf` line pinned under the navbar, `scaleX` bound to page scroll progress. It is the "Advance" verb at page level.
- **Active link**: one shared underline element that slides between links (Motion `layoutId="nav-underline"`), instead of each link toggling its own.
- Mobile menu: sheet drops from the top with `clip-path: inset(0 0 100% 0) → inset(0)`, links stagger 40ms each, burger morphs to ✕ (two bars rotate, middle bar fades).

**Sticky mobile action bar** (Call / WhatsApp)
- Hidden while the hero fee card is on screen (it already has a WhatsApp button). Slides up `translateY(100%) → 0` once the hero leaves the viewport, slides down again over the contact section where the form takes over.
- WhatsApp button gets a single soft pulse ring 8s after it first appears, once per visit.

**Section reveal (shared, but not the generic fade-up)**
- Section headings reveal per line with a mask: each line sits in `overflow:hidden` and its text rises from `translateY(105%)`. 640ms, `--ease-out`, lines staggered 80ms.
- Intro paragraph fades in 120ms after the last heading line.
- Triggered once at 20% visibility with one shared `IntersectionObserver`.

### 4.1 Hero — the signature moment

Wireframe (desktop):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [● AY 2026-27 · income year chip]                                         │
│                                              ┌──── return slip ───────┐   │
│ File your income tax                         │ Return of income  AY 26-27│ │
│ return in 48 hours.                          │ Income band  [▬▬▬▬▬▬▬]   │ │
│                                              │ ─────●─────────────────  │ │
│ For individuals, freelancers, NRBs ...       │ Advisory fee   ৳3,000    │ │
│                                              │                 (STAMP)  │ │
│ [See all fees] [How filing works]            │ [ Start on WhatsApp ]    │ │
│                                              └──────────────────────────┘ │
│ ───────────────────────────────────────────────────────────────────────── │
│ ✓ Compliance 100%   ✓ Clients 500+   ✓ Team Expert   ✓ Processing 48h     │
└──────────────────────────────────────────────────────────────────────────┘
```

The fee finder becomes a **return slip**: a paper form with a hard ink shadow (keep the current `6px 6px 0` shadow, it already looks like a printed card) and a faint ruled-form texture. This is where all the boldness is spent.

**Load sequence (one orchestrated timeline, ~1.6s total):**

| t (ms) | What happens |
|---|---|
| 0 | Year chip fades in; its green dot does one "live" ping. |
| 80–560 | Headline lines mask-reveal (two or three lines, 80ms apart). Visible text is never fully transparent for long, so LCP is not delayed. |
| 300 | Paragraph and buttons fade in. |
| 360 | Slip slides in from `translateY(24px) rotate(1.5deg)` to rest at `rotate(0)`, like a sheet being placed on a desk. |
| 700 | Slip's ruled lines draw left to right (Rule). |
| 900 | Income band field "types" the default tier label, 18ms per character (Fill). |
| 1100 | Fee rolls up from `৳0` to `৳3,000` as an odometer (Fill). |
| 1450 | A small round **"Ready to file"** stamp lands at the slip's corner: `scale 1.6 → 1`, `rotate -14deg`, opacity 0 → 0.85, `--ease-stamp`, with a 1-frame 2px slip shake. |

**Interaction on the slider (every time):**
- Thumb is the leaf circle with a white check glyph inside; while dragging it scales to 1.15.
- Tick marks to the left of the thumb turn `ink`, each with a 20ms stagger as you pass them.
- Band label cross-fades (old slides up and out, new slides up and in, 220ms).
- Fee digits roll per digit (odometer), only the digits that changed move. 380ms.
- The stamp lifts (`scale 1.08`, opacity 0.4) while dragging and re-stamps on release.
- The WhatsApp button text stays "Start on WhatsApp"; its pre-filled message updates (already implemented).

**Proof strip:**
- Numbers count up once on view (`500+` from 0, `100%` from 0, `48h` from 0) over 1100ms with `--ease-out`. "Expert" is a word, so it types in instead.
- Check icons draw (Tick), 60ms apart.
- Copy fix: label and value are reversed today ("Compliance / 100%"). Show value large, label small: **48h** / "Return prepared after documents arrive".

**Mobile:** headline first, then the slip directly under it (no side-by-side). The stamp sequence still plays; the slip does not rotate.

### 4.2 Services — "Who we file for"

```
Who we file for              ─────────────────────────────────────────────
Pick the line that ...       Individual tax return   ✓ Salaried employees
                                                      ✓ Professionals
"Income tax lawyers and                               ✓ NRBs
 qualified accountants"      ─────────────────────────────────────────────
                             Business tax services   ✓ Proprietorship ...
[Get a free consultation]    ─────────────────────────────────────────────
                             Specialised services    ✓ Freelancer income ...
```

- Each row's top `ink` rule draws left to right (`scaleX 0 → 1`, origin left, 640ms) as the row enters, then its title rises in, then its checks draw (Tick) with `--stagger`.
- Hover/focus on a row (desktop): the title shifts 6px right and the rule under it thickens from 1px to 3px in `brand` (a pseudo-element `scaleY`). One response, no card lift.
- Clicking a row's title scrolls to Pricing and sets the slider to a sensible starting band (Individual → tier 2, Business → tier 4). The pricing highlight then animates to that row (see 4.3), so the click visibly "goes somewhere".
- The leaf-bordered quote: the 3px left border grows top to bottom (`scaleY`) when it enters.

### 4.3 Pricing — the ledger

```
One fee, set by your income         Total income or assets        Advisory fee
                                    ──────────────────────────────────────────
No hidden costs ...                 Below 3,50,000 Tk ........... 1,500 Tk
                                  ▌ Up to 10 lacs Tk ............ 3,000 Tk  ◀ sliding highlight
│ All fees exclude VAT ...          10–25 lacs Tk ............... 5,000 Tk
                                    ...
                                    ┌ Your fee: ৳3,000  [Send this on WhatsApp] ┐
```

- On enter: the header rule draws, then rows appear top to bottom (40ms stagger), each row's **dotted leader draws** from the label toward the price (animate `background-size` of a dotted gradient from 0 to 100%), then the price fades in at the end of its leader. Reads like someone writing the ledger.
- **Selected row**: one `highlight` bar element that slides between rows (Motion `layoutId="tier-bar"`, 380ms `--ease-in-out`) plus a 3px `leaf` bar on the left edge. Replaces today's per-row background swap.
- Selected price odometer-rolls (same component as the hero).
- Hero slider and table stay in sync (already shared state). If the table is on screen while the slider changes, the bar slides; otherwise it's simply in place when you arrive.
- Rows are real buttons for keyboard users (arrow keys move the selection, `aria-pressed`), not clickable `<tr>`s.
- **New:** a "Your fee" summary line under the table with a WhatsApp button carrying the selected band. On mobile it sticks to the bottom of the section while the table is in view.

### 4.4 Process — the filing rail (scroll-linked)

```
Six steps from first          (1)─ Initial contact
message to filed return        │   Phone, WhatsApp or the form
                               █
You're needed at the start     (2)─ Document submission
and at confirmation.           █   ...
                               ░
[Book a free consultation]    (3)  Review and calculation
   (sticky)                    ░
                              (5)  Return submission  [SUBMITTED stamp]
                              (6)  Post-filing support
```

This is the one place where numbered markers are correct: the content really is a sequence.

- The vertical rail behind the numbers is a `leaf` fill whose `scaleY` is **bound to scroll position** through the list (Motion `useScroll` + `useTransform`, or a CSS `animation-timeline: view()` with a JS fallback).
- When the fill passes a step: its number circle fills `ink`, the number cross-fades into a check (Tick), and the step title goes from `muted` to `ink`.
- At step 4 ("Client confirmation") a small "You approve" chip pops in beside it, to show where the client is involved.
- At step 5 ("Return submission") a "Submitted to NBR" stamp lands next to the title (Stamp).
- At step 6 the rail ends in a small leaf dot that does one ping.
- Left column stays sticky (already done); its button gets a gentle arrow-free nudge: a 2px underline that draws once the rail reaches step 6.
- Scrolling back up reverses the rail and un-ticks steps (scroll-linked, so this is natural). Stamps stay once landed.
- Copy: turn the descriptions into short sentences ("Send us your papers on WhatsApp or email" instead of "WhatsApp / Email").

### 4.5 Documents — the interactive checklist

```
Documents to gather                          ┌─────────────────────┐
Tick each one as you find it ...             │ 7 of 16 ready  ▓▓▓░░ │
                                             │ [Print or save PDF]  │
                                             └─────────────────────┘
For all clients        Employees            Business owners
☑ Bank statements      ☐ Salary certificate ☐ Income & expense ...
☑ Investment docs
```

- Custom checkbox (still a real `<input type=checkbox>` underneath): on check, the box fills `leaf-deep` (scale 0.85 → 1, `--ease-stamp`) and the check mark draws (Tick, 220ms). On uncheck, it reverses.
- The strike-through draws left to right across the label (a pseudo-element `scaleX`) instead of appearing instantly; text fades to `muted` at the same time.
- **Progress meter**: "7 of 16 ready" — the number rolls, and a segmented bar (one segment per document) fills one segment at a time.
- Each category heading gets a small "done" tick that draws when all its items are ticked.
- **All 16 ticked**: an "All set" stamp lands on the meter and a WhatsApp button slides in beneath: "Send my documents on WhatsApp". This is the payoff for using the tool.
- Persist ticks in `localStorage` (wrapped in try/catch) so a visitor who comes back after hunting for papers keeps their progress.
- "Print or save as PDF": on hover the printer icon's paper slides down 3px. Print layout stays as is (`PrintChecklist`).

### 4.6 FAQ — accordion

- Height animates with the `grid-template-rows: 0fr → 1fr` technique (no measuring), 380ms `--ease-out`; answer text fades in 80ms after the row starts opening.
- Plus icon rotates 45° into a ✕ (220ms). Only one open at a time; the closing one and the opening one animate together.
- Opened question's text turns `brand`, and a 3px leaf bar grows on its left edge.
- Deep links: `#faq-late-filing` opens that question and scrolls to it.
- Copy: rewrite headings as real questions ("What happens if I file late?" instead of "Late filing consequences"), and add the AY 2026-27 deadline question once the NBR date is confirmed.

### 4.7 About — the person behind it

- Photo reveals with `clip-path: inset(100% 0 0 0) → inset(0)` (rises up like a print coming out), 900ms, then a 1.04 → 1 scale settle.
- Name and role fade in after; qualifications appear one by one (`--stagger`).
- Service list rules draw (Rule) as in Services.
- "What we stand for" values: each word slides up out of a mask in turn, then stays. No cycling text.

### 4.8 Contact and footer (night band)

- Section enters with the night background wiping up from the bottom (`clip-path`) as you reach it, so the switch to dark feels intentional rather than abrupt. Plays once.
- Contact links: icon nudges 2px on hover, the leaf colour already used for hover stays.
- **Form:**
  - Field focus: a 2px leaf underline draws from left to right across the field.
  - Invalid submit: the first invalid field gets one short horizontal shake (3 × 3px, 240ms total) and a specific message below it ("Enter a phone number so we can call you back"). Focus moves to it.
  - Submit: button text changes to "Opening WhatsApp…" with a small spinner, then a "Sent to WhatsApp" stamp lands beside the button. The button label and the confirmation use the same verb.
- Footer: static.

---

## 5. Accessibility and reduced motion

`prefers-reduced-motion: reduce` gets a complete, still page — not a broken one:

| Animation | Reduced-motion behaviour |
|---|---|
| Heading mask reveals, row/rule draws, photo reveal, night wipe | Shown in final state immediately |
| Odometer, count-ups, typing | Final value shown instantly; `aria-live` still announces fee changes |
| Stamps | Appear with a 120ms opacity fade, no scale or rotate |
| Process rail | Fills to each step on a plain opacity change; no scroll binding |
| Sliding highlights (nav, pricing) | Jump instantly |
| Checkbox tick and strike | Instant |
| Pulse rings, pings | Off |

Also:
- All animated text is in the DOM from the start (no text injected only by animation), so screen readers and search engines read it.
- Visible focus rings stay (`:focus-visible` already defined); the pricing rows and FAQ are keyboard-operable.
- Nothing flashes more than 3 times per second; no auto-playing loops except the one-off pings.
- Touch targets ≥ 44px; the slider thumb is 28px visible with a 44px hit area.

## 6. Performance budget

- One shared `IntersectionObserver` for all "play once" reveals (`useReveal` hook), disconnected per element after it fires.
- Scroll-linked effects (nav progress, process rail) use Motion's `useScroll` (runs off `requestAnimationFrame`, transforms only) or native `animation-timeline: scroll()/view()` where supported.
- `will-change` only while an animation is running.
- Headline reveal must finish within 600ms of first paint; Lighthouse LCP target < 2.0s on mobile, CLS 0 (every animated element reserves its final size).
- Library: add **`motion`** (the successor to framer-motion, `motion/react`) for `layoutId`, `AnimatePresence` and `useScroll` only. Everything else is CSS keyframes + the hook. Expected cost ~30–35 KB gzipped; if that is too much, the two `layoutId` effects can be done with FLIP by hand and Motion dropped.
- Separate but related: Tailwind is loaded from the CDN at runtime. Moving it to the Vite build would speed up first paint more than any animation work costs.

## 7. Build plan

New files:

```
presentation/
  motion/
    tokens.css            durations, easings, keyframes (rise, draw, stamp, ping, shake)
    useReveal.ts          shared IntersectionObserver, returns ref + "inView" once
    useReducedMotion.ts   wraps matchMedia, used by JS-driven animations
  components/ui/
    MaskHeading.tsx       per-line mask reveal (used by SectionHeading)
    Odometer.tsx          per-digit rolling number, tnum, aria-live aware
    CountUp.tsx           for proof strip
    DrawRule.tsx          ledger line / dotted leader that draws in
    Tick.tsx              SVG check that draws via stroke-dashoffset
    Stamp.tsx             round seal: text prop, lands with overshoot
    TypeIn.tsx            short typed text for the slip field
```

Order of work (each step is shippable on its own):

1. **Foundation** — tokens, `useReveal`, `useReducedMotion`, `MaskHeading` in `SectionHeading`. Every section benefits at once.
2. **Hero slip** — `Odometer`, `TypeIn`, `Stamp`, load timeline, slider interactions, proof strip count-ups.
3. **Pricing ledger** — dotted-leader draw, sliding highlight bar, keyboard rows, "Your fee" line.
4. **Process rail** — scroll-linked fill, step ticks, step 4 chip, step 5 stamp.
5. **Documents** — custom checkbox, strike draw, segmented meter, completion stamp, localStorage.
6. **Navbar and mobile bar** — progress bar, sliding underline, shrink, sheet menu, show/hide logic.
7. **Services, FAQ, About, Contact** — row rules, accordion, photo reveal, night wipe, form states.
8. **Pass** — reduced-motion audit, keyboard walk-through, Lighthouse on a throttled mobile profile, screenshot review at 375 / 768 / 1280px.

## 8. What is deliberately *not* in this plan

- No parallax backgrounds, floating blobs, gradient meshes or cursor followers: none of them say anything about filing a return.
- No fade-up on every paragraph: headings mask-reveal, and content comes with its section's own verb (rule, tick, fill).
- No card-lift hovers on services or FAQ rows.
- No looping marquee of service names.
- No confetti on the checklist; the stamp is the reward, and it matches the rest of the page.
