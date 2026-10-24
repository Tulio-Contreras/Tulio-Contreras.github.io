---
name: Tulio Contreras — Software Lab
description: A readable portfolio whose software demonstrations expose actions, rules, and state.
colors:
  paper: "#eeeee7"
  ink: "#172922"
  muted: "#536158"
  line: "#c7ccc1"
  screen: "#10241e"
  screen-raised: "#1a3329"
  screen-line: "#385548"
  screen-text: "#e3eadb"
  screen-muted: "#a6bba6"
  lime: "#c3f564"
  error: "#ffb3a0"
  rust: "#b94b31"
  ink-hover: "#304837"
  sage: "#d9e2ce"
  sage-line: "#bdcbb1"
  field: "#0a1c16"
  frame: "#d1d6c8"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(38px, 3.6vw, 54px)"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  case-display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 4.5vw, 66px)"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(34px, 4vw, 56px)"
    fontWeight: 750
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "21px"
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  reading:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.95
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 700
  readout:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "clamp(21px, 2.3vw, 35px)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  trace:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
rounded:
  tight: "3px"
  field: "4px"
  control: "5px"
  screen: "6px"
  section: "8px"
  instrument: "13px"
spacing:
  micro: "6px"
  compact: "8px"
  control: "12px"
  small: "20px"
  medium: "25px"
  large: "30px"
  gutter: "44px"
  section: "60px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "15px 19px"
  button-ink-hover:
    backgroundColor: "{colors.ink-hover}"
  button-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.screen}"
    rounded: "{rounded.tight}"
    padding: "13px 15px"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0 0 3px"
  search-field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.screen-text}"
    rounded: "{rounded.field}"
    padding: "13px"
    width: "100%"
  role-select:
    backgroundColor: "{colors.screen-raised}"
    textColor: "{colors.screen-text}"
    rounded: "{rounded.tight}"
    padding: "8px 25px 8px 9px"
  technology-tag:
    textColor: "{colors.muted}"
    rounded: "{rounded.tight}"
    padding: "3px 7px"
  task-card:
    backgroundColor: "{colors.screen-raised}"
    textColor: "{colors.screen-text}"
    rounded: "{rounded.tight}"
    padding: "9px 7px"
  channel-selected:
    backgroundColor: "{colors.screen}"
    textColor: "{colors.screen-text}"
    padding: "10px 10px 12px"
  mobile-navigation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "18px"
    width: "260px"
  action-trace:
    textColor: "{colors.screen-muted}"
    typography: "{typography.trace}"
---

# Design System: Tulio Contreras — Software Lab

## Overview

**Creative North Star: "The Software Test Bench"**

The site presents software as something a visitor can operate and inspect. Clear paper supports professional reading; a framed green interface contains local demonstrations, state, and results. The bench metaphor comes from the settled direction contract. Descriptions such as calm, precise, and practical are inferred from the finished artifact, rather than a new brand interview.

The implementation pairs spacious editorial sections with a deliberately denser software panel. Its material character comes from tonal surfaces, small radii, fine dividers, readable data, and restrained depth. The recurring signature is an action followed by validation, state, and an inspectable response. It represents discrete local software phases; it does not imply electrical measurements or remote latency.

**Key Characteristics:**
- Paper for reading; green screen for operating and inspecting.
- Manrope for identity and prose; monospace for amounts, traces, and code.
- Lima signals actions, selected states, and successful results with text alongside color.
- Reusable controls expose real local behavior and keep their scope visible.
- Source evidence and the demonstration remain clearly distinguished.

Recorded from `src/styles/global.css`, the final Astro components and routes, and `src/scripts/lab-controller.ts`, with the final desktop/mobile captures as supporting evidence. Later declarations in the stylesheet take precedence. The source signature in `.impeccable/design.json` identifies this snapshot; specimen snippets are previews of existing patterns, not a replacement component runtime.

## Colors

The palette is a green and warm-paper system with a high-contrast lime signal. The contract's coral control idea did not become the shipped control palette.

### Primary
- **Lime signal** (`lime`): local submit action, selected channel indicator, successful feedback, trace, favorites state, and small contact actions. Selection uses the same accent with dark text.
- **Green ink** (`ink`, `ink-hover`): reading text, the main page actions, navigation overlay, and contact surface. The hover tone is shared by page buttons and the header action.

### Secondary
- **Rust punctuation** (`rust`): the wordmark dot and about-heading punctuation. It is a small identity accent; operation success remains lime.
- **Error salmon** (`error`): rejected operations and error traces, paired with an explicit message and status.

### Neutral
- **Warm paper** (`paper`), **muted green** (`muted`), and **paper divider** (`line`): the reading canvas, secondary copy, and section/row boundaries.
- **Screen green** (`screen`), **raised screen** (`screen-raised`), **screen divider** (`screen-line`), **screen text** (`screen-text`), and **screen secondary text** (`screen-muted`): the operating surface, task cards/selects, boundaries, primary text, and contextual text.
- **Field well** (`field`): amount and search input backgrounds.
- **Sage surface** (`sage`, `sage-line`): the about panel and case data-flow steps.
- **Instrument frame** (`frame`): the common shell surrounding each laboratory.

### Named Rules

**The Signal With Meaning Rule.** Lime highlights a usable action or a state the interface can explain. Feedback also names its result in words.

**The Reading and Operating Rule.** Keep professional reading on the paper palette and interactive evidence on the screen palette. The dark contact panel is an established reading-surface exception.

## Typography

**Display Font:** self-hosted Manrope, with sans-serif fallback.
**Body Font:** the same Manrope family; the variable font supplies weights from 200 to 800.
**Label/Mono Font:** the system monospace stack recorded in `readout` and `trace`, used for functional data rather than display identity.

**Character:** compact, strongly weighted headings anchor a softer, open reading rhythm. The scale is role-based rather than a strict mathematical ratio. Normal prose uses sentence case. Uppercase is localized to existing lab metadata and trace status.

### Hierarchy
- **Display:** the home name and Full-Stack role form one uniform heading using `display`. At widths up to (800px), the final rule sets it to (39px), including phone sizes. There is no separate home eyebrow or enlarged role span.
- **Case display:** project name and argument share one `case-display` heading, with a final width cap of (24ch). At phone sizes it becomes (33px). The projects index separately uses `clamp(38px, 5vw, 70px)` and (44px) on phones.
- **Headline:** section headings use `headline`; their phone expressions range from (30px) in contact to (37px) in about. The project-section opening is (36px) on phones.
- **Title:** project arguments use `title`, becoming (19px) on phones. The visible project names use (34px), then (30px) at the intermediate desktop breakpoint, (27px) in the tablet range, and (29px) on phones.
- **Body:** `body` is the document baseline. Actual editorial paragraphs use contextual sizes, commonly (12–14px), with longer case reading using `reading`. Default paragraphs cap at (70ch); narrower introductions and arguments have their own measured limits.
- **Label:** `label` describes main navigation/action emphasis. Smaller lab labels are contextual rather than a universal label size. Final feedback is (12px) desktop and (11px) phone; response summaries are (12px)/(11px).
- **Readout:** `readout` uses tabular numerals and nonwrapping amounts. At widths up to (800px), balances are (35px); the final phone override is `clamp(18px, 5.5vw, 24px)`. Keep currency and amount visible together.
- **Trace:** `trace` is (10px) desktop and (9px) phone. Response code is (11px) with wrapped lines; error and success remain identifiable from accompanying text.

### Named Rules

**The Equal Identity Rule.** Name and professional role share the home heading's size, weight, and rhythm.

**The Data Fits Rule.** Monetary readouts keep tabular figures and their complete currency/value string; the observed tracking floor is (-0.03em).

## Layout

The outer container caps at (1680px) with centered margins and side gutters of (44px), then (28px) at widths up to (1100px), and (20px) at widths up to (560px). The header is (112px) tall, reducing to (96px) and then (85px). Reused gaps and padding appear in the spacing tokens; this is a practical rhythm, not a universal base-unit grid.

The wide home composition uses a (0.72fr/1.28fr) grid with a (44px) gap; at the intermediate desktop range it becomes (0.75fr/1.25fr), with a (25px) gap. Above (1500px), it gains a (65px) gap and larger vertical breathing room. Below (800px), the lab follows the introduction; the introduction itself temporarily uses two columns. Below (560px), the introduction becomes a simple reading sequence.

Project lists are ruled rows with a narrow route marker, project identity, and argument. On phones, identity and argument stack beside the route marker. Case demo and article sections use a smaller explanation column beside a larger working/reading column. Demo sections stack below (800px), and case article sections stack below (560px). Case article content caps at (1000px).

The lab preserves its working structure across sizes: two balance columns, full-width controls, results, and a trace below. Its shell padding reduces from (12px) to (8px) on phones; display padding adapts from (25px) to (20px 15px 0). The task board uses four columns on wide screens, two between (801px) and (1100px), four again when the full-width tablet lab allows it, and two on phones. Book results remain a two-column shelf.

Touch-specific rules establish at least (44px) height for the amount action, resets, book/favorite actions, task actions, role select, and result disclosure. Channel tabs use (50px) minimum height on phones. These describe the implemented controls, not a claim that every small link shares this size.

## Elevation & Depth

Depth is concentrated in the operating artifact and the open mobile menu. Most editorial sections and project rows use flat tonal surfaces and rules. The lab is framed and slightly lifted, with a recessed display; repeated task cards remain flat inside it. Book-cover miniatures have a small illustrative shadow rather than card elevation.

### Shadow Vocabulary
- **Instrument:** `0 18px 35px -17px #14281f42`; phone version `0 14px 28px -17px #14281f50`.
- **Screen recess:** `inset 0 2px 6px #0003`.
- **Menu overlay:** `0 14px 30px #17292226`.
- **Book miniature:** `2px 3px 5px #0003`.

### Named Rules

**The Artifact Depth Rule.** Use the existing depth vocabulary for the lab, its display, the mobile overlay, and book miniatures; ordinary content rows stay separated by rules and spacing.

## Shapes

Controls have modest, practical corners. Tight radii belong to tags, task cards, selects, and lab actions; fields and primary page actions are slightly softer. Large reading panels share the section radius. The laboratory uses the instrument radius outside, a screen radius inside, and joined tab corners. On phones the outer shell becomes (10px). One-pixel strokes, tiny round status dots, and small square data-flow markers recur.

SVG arrows provide the shared link/action cue. CSS line geometry draws the mobile menu and lab emblem. There is no hardware screw in the final shell. Book covers are CSS miniatures, not screenshots of the original apps; their isolated Georgia letterforms do not establish a display font for the site.

## Components

### Buttons

Direct, labeled actions with small corners and a clear tonal role. Page actions use `button-ink`; the header shares its colors with slightly smaller padding. `button-lime` operates the transfer and the empty-library recovery. The transfer action becomes taller on phones. Text links use a thin bottom rule and an adjacent inline SVG arrow; project and contact contexts have smaller type. Resets are transparent underlined actions, turning lime on hover. Generic disabled buttons use a wait cursor and (0.6) opacity; no separate loading animation is established.

Hover moves linked/action SVGs by (2px, -2px) over (0.25s), using the recorded easing. Ink buttons change to their hover tone; the transfer action lightens to `#d5ff88`. Global keyboard focus uses a (3px) rust-colored outline `#c04a2f`, offset by (5px). Inside the lab, focus is lime with a (3px) offset. Do not replace these outlines with color changes alone.

### Chips

Technology tags are small, passive, bordered labels using `technology-tag`; phone padding becomes (3px 6px). Case data-flow steps use sage-filled, bordered labels. Neither pattern implies filtering or clicking. The favorites filter is a real pressed-state button: a screen border at rest, lime border/text when selected, and a visible count.

### Cards / Containers

The recurring task card uses `task-card` with a screen divider, short heading, and a separated action. At phone sizes its padding becomes (9px), heading (10px), and action (10px) with the touch height described above. About and contact are larger section containers with shared corners, contrasting tonal fills, and responsive padding. Project evidence is presented in ruled rows rather than lifted cards.

### Inputs / Fields

Search uses `search-field`, a muted placeholder, explicit label, screen border, and lime caret/focus. Phone search type/padding are (11px). The amount field shares the well color inside a composite row with currency prefix and submit action; its value is monospace. Invalid amounts get an error-colored underline and a written explanation, with `aria-invalid` cleared on new input. Role selection uses `role-select`, the raised screen surface, and native options. Labels remain outside their field values.

### Navigation

Wide navigation is compact text with underlined hover and a separate contact action. At widths up to (800px), it becomes a native `details` menu; the separate contact action remains until (560px). The menu overlay uses `mobile-navigation`, its established shadow, and full rows divided by fine rules. Choosing a link closes it. Escape closes it and returns focus to the summary. The skip link becomes visible on focus.

### Software Laboratory

The same framed laboratory appears on the home page and each case. Home offers three labeled tabs: operations, library, and teams. Selected tabs merge into the screen and expose a lime dot; inactive tabs use the muted frame palette and change background on hover. Roving tab focus supports Left/Right, Home, and End. Each tab is linked to its panel through ARIA. Case pages use the matching single demo without the channel selector.

Balances, amount validation, and session history show a simulated transfer. Library search and favorites use sample books; favorites persist in browser storage, with a written session-only fallback if storage fails. Task actions validate the selected role, update the lane, and announce the result; a successful move returns focus to the role selector. Resets restore demo state. Announcements use polite live regions. The frame and copy identify these as new local portfolio demonstrations, while case links lead to original project source.

### Action Trace and Response

An action changes the phase indicators, stepped SVG line, status text, and inspectable local JSON result. The line reveals from left to right over (0.8s) using `cubic-bezier(0.16, 1, 0.3, 1)`; there is no autonomous decorative signal loop. Error results change the line/status color and phase state as well as the message. The native result disclosure scrolls long code within a (230px) maximum height. Channel changes return the trace to its ready state.

For `prefers-reduced-motion: reduce`, all animation and transitions stop, and scrolling becomes immediate. Data and written results still update. Without JavaScript, the static professional/project content remains readable and a notice explains that operating the lab requires JavaScript.

## Do's and Don'ts

### Do:
- **Do** preserve the equal home identity typography and complete monetary readouts.
- **Do** pair result colors with written messages and keep the keyboard focus outline visible.
- **Do** reuse the paper/screen distinction, restrained corners, and fine dividers.
- **Do** retain phone control heights, natural reading order, reduced-motion support, and static project explanations.
- **Do** identify local sample-data demonstrations separately from the original project evidence.

### Don't:
- **Don't** introduce a separate home eyebrow or hardware screw into the documented identity and laboratory.
- **Don't** interpret the action trace as a real network request, latency measurement, or electrical signal.
- **Don't** treat passive technology labels as interactive controls or book-cover initials as the site display font.
- **Don't** promote the unused coral custom property or superseded role-span CSS into the active system.

**Not canonized:** isolated lab metadata below comfortable reading size, uppercase lab captions that behave like eyebrows, and any overly tight miniature text remain craft limitations of the build. They are contextual evidence, not a typography scale or a house style to copy. The unused coral variable, obsolete home-role selectors, and removed screw are also excluded from normative tokens/patterns. The finish verdict covers the three scored fixes; it is not a full-surface accessibility certification.
