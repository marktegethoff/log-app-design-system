# Log• Design System — Claude Code Guide

## Project Overview

This is a **static documentation site** for the Log• design system — a journaling/recording app with an AI archiving component. The site serves designers, engineers, and reviewers with comprehensive specs, mockups, and prototypes.

**Core metaphor:** "The tape is the tape. The card catalog is in the margins."

## Tech Stack

- **Site:** Vanilla HTML5, CSS3, JavaScript (no frameworks, no build step)
- **Mobile target:** Swift / SwiftUI (iOS)
- **Backend:** Supabase, offline-first sync
- **Hosting:** GitHub Pages (auto-deploys from `main`)

## Running Locally

```bash
python -m http.server 8000
# Visit http://localhost:8000
```

No build step, no npm, no dependencies. It's a static site.

## Repository Structure

```
index.html                        # Main landing page / navigation hub
brand-system.html                 # Brand philosophy, color, typography
component-state-matrix.html       # 11 components × 7 states
motion-system.html                # Animations, easing curves, durations
layout-system.html                # 8pt grid, device layouts, z-index scale
engineer-quick-start.html         # Engineer onboarding (~15 min read)
swiftui-implementation-guide.html # ViewModifier patterns, best practices

assets/styles.css                 # CSS design tokens (1,055 lines) — source of truth
assets/scripts.js                 # Theme toggle, nav injection, iframe sync

design-tokens-swift.swift         # Swift token library for iOS implementation

flows/                            # User journey documentation (compose, correction, search)
prototypes/                       # 10 interactive behavior demos
mockups/                          # 27 surface mockups + 8 component sheets
  timeline/, entry/, search/,
  archivist/, idle-trace/, settings/, components/

.github/workflows/static.yml      # GitHub Pages CI/CD
```

## Key Design Tokens (CSS)

Defined in `assets/styles.css` as CSS custom properties:

- **Paper tones:** `--paper-00` through `--paper-95` (12-step scale)
- **Signal colors:** 5 intent types — thought, action, decision, reference, unknown
- **Typography:** Space Mono (mechanism) + IBM Plex Sans (tape)
- **Spacing:** 8pt grid (`--space-1` = 8px, etc.)
- **Motion:** mechanical easing `cubic-bezier(0.2, 0.8, 0.3, 1.0)`

**Accessibility constraint:** Never use `paper-40` text on dark backgrounds (fails WCAG AA).

## Components (11 total)

Commit Button, Timeline Entry, Intent Dot, Search Input, Card, Annotation Block, Batch Container, Hamburger Menu, Nav Active State, Paywall Notice, Secondary Button.

Full state specs in `component-state-matrix.html` (default, active, focus, dark, error, disabled, loading).

## Navigation & Scripts

`assets/scripts.js` handles:
- Theme toggle with `localStorage` persistence
- Dynamic nav injection across all pages (uses relative paths)
- Cross-iframe theme sync via `postMessage`
- Copy-to-clipboard for code blocks

When adding a new page, follow the existing nav injection pattern — do not hardcode nav HTML.

## Deployment

Push to `main` → GitHub Pages auto-deploys. No manual steps needed.

Branch for current work: `claude/review-claude-md-YE6ys`

## Design Principles

- **Permanence over potential** — entries are immutable once committed
- **Stillness over performance** — no gratuitous animation
- Commit cycle: 750ms total (150ms shutter + 350ms inscription + 250ms reset)
- WCAG AA compliance required throughout
