---
name: Spare Chair
description: A fictional waitlist tool that refills cancelled appointment slots, drawn as a perforated ticket book and a seating plan.
colors:
  field: "#12372a"
  field-deep: "#0c2a1f"
  cream: "#f4eee1"
  cream-deep: "#e3d3a8"
  ink: "#0b1f17"
  seat-coral: "#f2704d"
  refilled-blush: "#fbd9cb"
  cream-hover: "#fbf3dc"
  paper-white: "#ffffff"
  text-on-field: "#d3e3d8"
  text-on-cream: "#3f544a"
  text-on-ink: "#b4c9bb"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.75rem, 6.2vw, 5.6rem)"
    fontWeight: 750
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.028em"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Source Serif 4 Variable', Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Bricolage Grotesque Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.15
rounded:
  stub: "2px"
  seat: "10px 10px 3px 3px"
  cell: "8px 8px 3px 3px"
  ticket: "14px 14px 4px 4px"
  tag: "4px"
  pill: "99px"
spacing:
  pad: "clamp(1rem, 4vw, 3rem)"
  sheet-y: "clamp(4rem, 9vw, 7rem)"
  gap-md: "1rem"
  gap-lg: "clamp(2rem, 5vw, 4.5rem)"
  dock: "4.25rem"
components:
  button-stub:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.stub}"
    padding: "1.05rem 1.9rem"
  button-stub-hover:
    backgroundColor: "{colors.paper-white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "6px 6px 2px 2px"
    padding: "0.55rem 1rem"
  seat-booked:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.seat}"
    height: "3.5rem"
  seat-open:
    backgroundColor: "{colors.seat-coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.seat}"
    height: "3.5rem"
  seat-refilled:
    backgroundColor: "{colors.refilled-blush}"
    textColor: "{colors.ink}"
    rounded: "{rounded.seat}"
    height: "3.5rem"
  input-field:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.seat}"
    padding: "0.85rem 1rem"
  rate-ticket:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    rounded: "{rounded.ticket}"
  dock:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    height: "{spacing.dock}"
---

# Design System: Spare Chair

## Overview

**Creative North Star: "The Ticket Book"**

Every surface is a sheet of paper-like stock in one of three flat colours (forest field, cream, ink), torn from the previous sheet along a perforated edge. The one recurring object is the seat: an arched-top tab (large radius on top, tight radius below) that appears as the demo's diary slot, the legend key, the slider thumb, the list bullet, the FAQ chevron and the comparison glyph. Buttons are ticket stubs with bitten sides. Rules between rows are dotted, like tear lines. Nothing is shadowed; depth is one sheet sitting over another.

The voice is plain and dry, and the interface is dense with small facts (times, initials, lengths) set in a geometric-grotesque display face over a warm serif reading face. coral is scarce on purpose: it is the colour of a seat that is available right now, so its appearance is itself information.

**Key Characteristics:**
- Three section themes swapped by a class, each setting its own background, text, rule and focus colours.
- Arched "seat" silhouette reused for every small control and marker.
- Perforation (half-circle bites, dotted rules) as the structural joint between sections and rows.
- Flat, no shadows; state is shown by fill change and a 2px lift.
- Mobile rotates the seating plan: time runs down, rooms become columns.

## Colors

A cream-and-ink ticket palette on a saturated forest green field, with one hot coral reserved for seat availability.

### Primary
- **Forest Field** (frontmatter `field`): hero, comparison and signup sections. Deep variant is defined for hover/pressed depth on forest; the FAQ chevron hover uses Forest Field on cream.
- **Seat Coral** (`seat-coral`): open seat, the pulse ring around an open seat, the time-axis beat marker under the returned window, the "Open"/"offered" waitlist status chip, the "new" flag, and the focus ring on field/ink surfaces.
- **Refilled Blush** (`refilled-blush`): a seat that has been refilled (and its legend key).

### Neutral
- **Cream** (`cream`): the stock. Section background, booked seats, buttons and slider fills, form fields, scrollbar thumb.
- **Ink** (`ink`): dark section background, text on cream, dock, pricing ticket, toggle and chevron on cream.
- **Text tints** (`text-on-field`, `text-on-cream`, `text-on-ink`): secondary text, one per theme. Cream Deep and Paper White are hover/loading states only.

### Named Rules
**The Open Seat Rule.** coral means a seat is open, offered or refilled, plus its pulse ring, the time-axis beat marker, and the focus ring on dark surfaces. Buttons, links, headings and decorative accents are cream or ink, never coral.
**The Sheet Theme Rule.** A section picks one of the three themes (`t-field`, `t-cream`, `t-ink`) and everything inside reads its variables. Do not hard-code colours inside a section. Adjacent sections use different themes.
**The Cream Focus Rule.** Focus ring is 3px solid, offset 3px: coral on field and ink, ink on cream.

## Typography

**Display Font:** Bricolage Grotesque Variable (Helvetica Neue, Arial)
**Body Font:** Source Serif 4 Variable (Georgia)

**Character:** A slightly quirky grotesque with tight tracking for headings and every UI label; a book serif for reading. The UI speaks in the grotesque, the prose in the serif.

### Hierarchy
- **Display** (750, clamp 2.75-5.6rem, 0.98): the single hero headline, tracking -0.035em.
- **Headline** (700, clamp 2-3.5rem, 1.04): section titles, -0.028em.
- **Title** (700, 1.25rem, 1.2): card titles, rule terms, buttons (1.0625rem), summary rows (1.1875rem, 650).
- **Body** (400, 1.0625rem, 1.55): prose; secondary lines 0.9375rem; line length capped 46-62ch.
- **Label** (600, 0.75-0.875rem): legend, queue status, tags, tick marks, always tabular numerals for times and amounts.

### Named Rules
**The Two Voices Rule.** Interface text (labels, buttons, numbers, names, dt) is the grotesque; running prose and table cells are the serif.
**The Tabular Rule.** Any time, length or price uses `font-variant-numeric: tabular-nums`.

## Layout

Content sits in a 76rem wrap (hero 82rem) with fluid side padding (`clamp(1rem, 4vw, 3rem)`). The dominant composition is an asymmetric two-column split (5fr lead, 7fr content) with the lead sticky on desktop; it collapses to one column at 62rem. Sections are `sheet`s with `clamp(4rem, 9vw, 7rem)` vertical padding. Row lists use 1.25rem vertical padding under dotted rules. The seating plan is a 12-slot (half-hour) grid per room; below 46rem it rotates so time runs down. A fixed bottom dock (4.25rem, 3.75rem on mobile) carries section links and the trial stub; optional links drop on mobile.

## Elevation & Depth

No shadows anywhere. Depth is tonal and edge-based: each sheet has a perforated top edge (half-circle bites showing the previous section's colour), and the pricing ticket is an ink slab on cream. Interactive lift is a 2px `translateY` on seats and a 1px press on stubs.

### Named Rules
**The Flat Sheet Rule.** Separate layers with colour change, a perforation or a dotted rule, never with a shadow.

## Shapes

Small controls share the arched-seat silhouette: large top radii, tight bottom radii (seat `10px 10px 3px 3px`, cell `8px 8px 3px 3px`, ghost `6px 6px 2px 2px`, ticket `14px 14px 4px 4px`). Stubs are near-square (2px) with semicircular bites masked from both sides (7px). Tags use 4px, pills (`Concept`, `fictional`) use 99px. Rules are 1.5-3px dotted; dashed borders mean an empty (free) seat.

## Components

### Buttons
- **Stub:** cream fill, ink text, display 700, 1.05rem x 1.9rem, bitten sides. Hover goes white; active presses 1px; loading tints to pale green. Dock variant is smaller.
- **Ghost:** transparent, 1.5px themed line border, arched top corners; hover lifts border to full foreground.
- **Text link ("plain"):** display 600, underlined, wavy underline on hover.

### Seat (signature)
Booked: cream with initials and length. Open: coral, non-interactive, with a looping pulse ring (disabled under reduced motion). Refilled: blush with a coral "new" flag. Free: dashed outline cell. Legend uses the same four shapes; meaning is also carried by text and dashed/solid, not colour alone.

### Inputs / Fields
Cream fill, ink text, 2px transparent border, seat radii. Invalid: coral border and pale-coral fill plus a "Check:" text prefix. Range sliders use a cream fill track and a seat-shaped thumb. The billing switch is a pill with an ink border and seat-shaped knob.

### Pricing ticket
One ink slab with three columns separated by 3px dotted vertical rules (horizontal when stacked); list bullets are tiny cream seat shapes.

### Navigation (dock)
Fixed ink bar, dotted top border, display 600 links, current section marked by a 4px cream bar on the top edge, trial stub pinned right.

### Rows (rules, connectors, FAQ, queue, log)
Dotted-rule-separated rows; term column 8rem. FAQ summary chevron is an inverted seat shape that flips when open.

## Do's and Don'ts

### Do:
- **Do** reserve seat coral for open, offered and refilled seats, the pulse ring, the time-axis beat marker and the focus ring on dark surfaces.
- **Do** build buttons and UI accents from cream and ink.
- **Do** reuse the arched seat silhouette for any new small control or marker.
- **Do** join sections with a perforated edge and rows with dotted rules.
- **Do** pair every colour state with text or shape (dashed, flag, "Check:" prefix).

### Don't:
- **Don't** use coral for buttons, links, headings or decoration.
- **Don't** add shadows; use colour and edge instead.
- **Don't** hard-code colours inside a section; use the theme variables.
- **Don't** set prose in the grotesque or UI labels in the serif.
- **Don't** present any figure, name or quote as real; all content is labelled illustrative or fictional.
