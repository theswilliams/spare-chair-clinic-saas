# Portfolio differentiation matrix

Living file for the five-site series. Each project adds a row; later projects must differ from every earlier row on at least layout, type, navigation, interaction, motion and density, not only colour.

| | 01 Grist One | 02 Ninth Coal | 03 Fashion Photographer | 04 | 05 |
|---|---|---|---|---|---|
| Fictional client | Grist, DTC hand coffee grinder | Ninth Coal, late-night wood-fire restaurant | Marlowe Adeyemi-Voss, fashion photographer (fictional) | Spare Chair, clinic no-show recovery SaaS (fictional) | |
| Mode | Persuade | Persuade | Experience | Persuade | |
| World | Engineering inspection drawing; sections change material | The one lit window seen from a dark street, then stepping inside | A shoot-day call sheet with a lighting plot; the paperwork is the interface | The diary as a box-office seating plan; a cancellation is a seat returned to sale | |
| Palette | Signal Orange #FF4D00, graphite #16181A, bare aluminium #CBD0D2/#E8EAEA, ink #111 | Street blue-black #0B1014, char brown #160D09, gilt #DDAE4E, coal red #BF341B, amber #FF9A2E only in flame, bone #F0E4D0 | Cool paper #ECEEEF, ink #0D0E10, one chartreuse highlighter #D4F23A as a fill under black text only | Drenched forest green #12372A, ticket-stock paper #F4EEE1, near-black green ink #0B1F17, one coral signal #F2704D for returned/offered only | |
| Type | Archivo Variable (condensed heavy caps, wdth axis) + Courier Prime for values only | Young Serif (arched display, gilt lettering) + Hanken Grotesk Variable | Schibsted Grotesk only; rank by weight and case, tabular numerals | Bricolage Grotesque Variable (display + UI) + Source Serif 4 Variable (body); no mono | |
| Layout | Full-bleed stacked sheets, 2-col split, title-block, ruled tables, no cards | Arched frames, left vertical rail, dot-leader menu, cream reservation slip; soft-edged, staggered room cards | Image-led: 38/62 ruled split, stepped alternating running-order blocks, bleeding studies; no cards | Drenched colour-field sections cut by perforated edges; live seating-plan grid (rooms x half-hours) as the hero; ticket-stub pricing; no cards | |
| Navigation | Fixed thin top bar + sticky stamped buy dock | Left vertical-text rail on desktop; top bar + bottom dock on mobile | Fixed ruled top bar with a live frame/page counter; full-screen viewer with prev/next and live relight plot | Fixed bottom ticket-bar dock with scroll-spy and a trial stub | |
| Signature interaction | Scroll-driven exploded teardown; click-to-mm grind dial; live configurator | Live dithered fire canvas tied to open/closed hours; reservation slip that fills as you book | Draggable lighting plot that relights the images live (WebGL); fullscreen viewer; call-sheet booking form | Live seat plan: cancel any booking and the waitlist is offered the gap in order, skipping misfits; gap-cost sliders; pricing toggle | |
| Motion | One authored moment (teardown), hero settle on load; reduced-motion = static | Living fire, view-transitions between pages; reduced-motion = static | One authored moment (hero relight settle); reduced-motion = static | One authored moment (open seat pulse ring); demo timing is content; reduced-motion = instant | |
| Density | Medium-high: tables and dimensions, generous sheet padding | Low-medium: dark, quiet, generous space | Medium: image-dominant, sparse captions | Medium-high: a dense diary grid, then spacious prose sections | |
| Imagery | None; authored SVG line drawing | None; inline SVG flat silhouettes + canvas fire | Licensed Unsplash fashion photography as stand-ins, relit live by a CSS light overlay; credited | None; all UI is live DOM | |
| Stack | Vite + vanilla TS | Vite + vanilla TS, multi-page static (4 real pages) | Vite + vanilla TS, multi-page static (8 pages, generated series pages) | Astro + TypeScript, single static page, no UI framework | |
| Repo | grist-hand-grinder | ninth-coal-restaurant | fashion-photographer | backfill-saas | |

## Avoid repeating in later projects

- Saturated single-colour sheets changing per section
- Condensed heavy grotesque + typewriter mono pairing
- Sticky scroll-driven exploded product diagram
- Stamped-square button language and ruled tables
- Arched frames, left vertical rail nav, dot-leader menus and cream slip forms (Project 02)
- Dark warm palette with a living fire canvas as the hero (Project 02)
- Cool-paper call-sheet ground with thin ink rules, registration crosses and a single highlighter fill (Project 03)
- WebGL fabric studies as hero imagery and a draggable light-plot control (Project 03)
- Drenched forest-green field with paper and a single coral signal (Project 04)
- Seat-plan / calendar grid as the hero demo (Project 04)
- Fixed bottom ticket-bar dock and perforated section dividers (Project 04)
- Bricolage Grotesque + Source Serif pairing (Project 04)
