# Spare Chair

> **Fictional concept project.** Spare Chair is an invented product made for a web design portfolio (project 04 of 5). There is no company, no customers, no real clinics and no service behind this site. Every name, number, testimonial-style note and price is illustrative and labelled as such on the page. Nothing you type into the form is sent or stored.

## Project

A marketing site for a fictional waitlist-backfill tool for small dental and physiotherapy clinics. When a patient cancels, Spare Chair offers the slot to the people on the clinic's waitlist who fit it, in order, and the first yes takes the seat.

## Challenge

Most "no-show" tools are reminder tools, and the category's pages look like every other SaaS page: a dashboard screenshot, three icon cards, a metric strip. The brief was to make a software product understandable in one glance without any of that, and to let a front-desk worker, not an executive, see exactly what the product does and does not do.

## Design Direction

The diary is a box-office seating plan, and a cancellation is a seat returned to sale.

- Drenched forest-green field, warm paper ticket stock, near-black green ink, and one coral signal used only for seats that are open, offered or newly refilled. Buttons and UI accents stay cream.
- Seats are small back-rounded buttons with initials. Free is a dashed outline, booked is solid cream, open is coral.
- Sections are cut from each other with perforated edges, like a ticket strip. There are no cards, shadows or hairline tables.
- Type is Bricolage Grotesque Variable for display and interface and Source Serif 4 Variable for reading text. No monospace, no uppercase labels.

## UX Approach

- The hero is the product: a live diary of four rooms across a working day. Cancel any booked seat and watch the waitlist get worked in order.
- The offer rules are written as plain sentences (length, time of day, order, first yes, leftovers, consent) and the page says what it does not do.
- The gap-cost calculator exposes every assumption as a slider and says so when the plan would not pay for itself.
- Pricing is by rooms, not by patients. The comparison table is honest about what reminder tools do well.
- A fixed bottom "ticket bar" replaces a top nav. The time axis marks the returned seat's window. It marks the section in view and always carries the trial stub.

## Technology

- Astro 7 (static output) and TypeScript in strict mode. No UI framework and no animation library.
- Self-hosted variable fonts through Fontsource.
- Plain CSS with custom properties. Three surface themes (`t-field`, `t-cream`, `t-ink`) set the colour tokens each section reads.
- Small typed scripts: the seating-plan simulation, the calculator and pricing toggle, the signup form, and dock scroll-spy. The demo's clinic data and plans are typed data files.
- `npm run build` runs `astro check` and `astro build`.

```
npm install
npm run dev
npm run build
```

## Key Features

- Live seat-plan demo with an offer cycle: it skips patients who do not fit, treats "no reply" as no reply, fills the seat in place on the first yes, and cycles again on any leftover time. Reset at any point.
- Gap-cost calculator with five sliders and a plain-language result.
- Monthly/yearly pricing switch.
- Comparison table with shape-and-text states, never colour alone.
- FAQ using native `details`.
- Signup form with validation, loading and success states (demo only).

## Responsive Design

On wide screens the plan reads left to right: one row per room, time across the top. Below about 46rem it turns sideways, so time runs down the page and each room is a column. Section layouts collapse to a single column, the rate ticket stacks, and the dock drops its secondary links and keeps the trial stub. Checked at 1440px and 390px with no horizontal page scroll.

## Status

Complete as a concept and built to be reviewed.

Verified: `astro check` and `astro build` pass with no errors or warnings; a scripted browser run exercised the demo fill, cancel and reset, the calculator, the pricing switch and signup validation at desktop and phone width with no console errors. The Impeccable design detector reports no findings.

Not done: no automated test suite, no cross-browser pass beyond Chromium, no screen-reader pass with real assistive technology, no real backend. The "integrations" named on the page are invented statuses, not working connectors.

## Accessibility

- Targeting WCAG 2.2 AA. Body and UI text meet 4.5:1 on their surfaces. Coral is used as a fill with dark ink text, never as small text on paper.
- Seat and queue states are never colour-only: open seats say "Open", refilled seats carry a "New" flag, free seats are dashed.
- Every control is keyboard reachable with a visible focus ring. The demo status line announces changes. Open seats keep focus by using `aria-disabled` rather than `disabled`.
- Skip link, a real `switch` role for the billing toggle, labelled sliders with live outputs, `aria-invalid` and text errors on the form, and `aria-current` on the dock.
- `prefers-reduced-motion` removes the pulse ring, transitions and the demo's pacing.
