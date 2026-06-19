/**
 * Centralized theme styles — single source of truth for all components.
 * Paper & Ink design system: headings → font-title (Geo),
 * body text → font-accent (Homenaje), labels → font-accent.
 */

export const SPACING = {
  section:     "px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-20",
  cardPadding: "p-4 sm:p-5 md:p-7",
  gap:         "gap-6",
  largeGap:    "gap-8",
  smallGap:    "gap-3",
} as const;

export const BORDERS = {
  roundedSm:   "rounded-sm",
  roundedMd:   "rounded-md",
  roundedLg:   "rounded-lg",
  roundedXl:   "rounded-xl",
  rounded2xl:  "rounded-2xl",
  roundedFull: "rounded-full",
  borderBase:  "border border-border",
  borderTransparent: "border border-border/40",
} as const;

export const FONTS = {
  // HEADINGS — Geo (font-title)
  displayHero: "font-title text-[clamp(3.5rem,8vw,7rem)] leading-[0.88] tracking-tight",
  displayXl:   "font-title text-6xl md:text-7xl leading-tight tracking-tight",
  displayLg:   "font-title text-4xl md:text-5xl leading-tight tracking-tight",
  displayMd:   "font-title text-3xl md:text-4xl leading-tight tracking-tight",
  displaySm:   "font-title text-2xl md:text-3xl leading-snug tracking-tight",
  displayXs:   "font-title text-xl md:text-2xl leading-snug tracking-tight",

  // BODY TEXT — Homenaje (font-accent)
  // leading-relaxed is included — do NOT add it again in JSX
  bodyXl: "font-accent text-xl md:text-2xl leading-relaxed tracking-[-0.01em]",
  bodyLg: "font-accent text-lg md:text-xl leading-relaxed tracking-[-0.005em]",
  bodyMd: "font-accent text-base md:text-lg leading-relaxed",
  bodySm: "font-accent text-sm md:text-base leading-relaxed",
  bodyXs: "font-accent text-xs md:text-sm",

  // LABELS & CAPTIONS — Homenaje (font-accent)
  // tracking-[0.2em] is included — do NOT add tracking again in JSX
  labelLg: "font-accent text-sm md:text-base uppercase tracking-[0.2em] font-semibold",
  labelMd: "font-accent text-sm uppercase tracking-[0.18em] font-medium",
  labelSm: "font-accent text-xs md:text-sm uppercase tracking-[0.2em] font-medium",
  labelXs: "font-accent text-xs uppercase tracking-[0.2em]",
  caption:  "font-accent text-xs md:text-sm text-muted-foreground",

  // INPUT / FORM
  inputLg: "font-accent text-lg",
  inputMd: "font-accent text-base",

  // BUTTON TEXT
  buttonSm: "font-accent text-xs md:text-sm font-semibold uppercase tracking-[0.18em]",
  buttonMd: "font-accent text-sm font-semibold",
} as const;

export const COLORS = {
  // Text
  textBase:   "text-foreground",
  textMuted:  "text-muted-foreground",
  textSubtle: "text-foreground/75",
  textXsLabel: "text-xs uppercase tracking-[0.2em]",
  textSmLabel: "text-sm uppercase tracking-[0.18em]",

  // Backgrounds
  bgCard:       "bg-card/50",
  bgCardLight:  "bg-card/20",
  bgCardHover:  "hover:bg-card/40",
  bgMobileMenu: "bg-background/95",

  // Hover state (buttons, badges)
  hoverState: "hover:bg-foreground hover:text-background hover:border-foreground hover:shadow-lg hover:shadow-foreground/20",
} as const;

/** Ease curves */
export const EASE = {
  out:   [0.16, 1, 0.3, 1]  as [number,number,number,number],
  inOut: [0.76, 0, 0.24, 1] as [number,number,number,number],
  spring:{ type: "spring" as const, stiffness: 260, damping: 28 },
} as const;

export const ANIMATIONS = {
  /** Standard card entrance — used on repeating list items */
  cardIn: {
    initial:    { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:   { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: EASE.out },
  },
  /** Slower fade for section intros and prose blocks */
  fadeIn: {
    initial:    { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport:   { once: true, margin: "-80px" },
    transition: { duration: 0.65, ease: EASE.out },
  },
  /** Scale up for badges / chips */
  scaleIn: {
    initial:    { opacity: 0, scale: 0.88 },
    whileInView: { opacity: 1, scale: 1 },
    viewport:   { once: true, margin: "-40px" },
    transition: { duration: 0.35, ease: EASE.out },
  },
  /** Slide in from the left */
  slideLeft: {
    initial:    { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport:   { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: EASE.out },
  },
  /** Slide in from the right */
  slideRight: {
    initial:    { opacity: 0, x: 24 },
    whileInView: { opacity: 1, x: 0 },
    viewport:   { once: true, margin: "-60px" },
    transition: { duration: 0.55, ease: EASE.out },
  },
} as const;

export const GRIDS = {
  sectionLayout: "grid gap-12 md:grid-cols-12",
  mainContent:   "grid gap-6 md:grid-cols-12",
  cardGrid1Col:  "grid gap-4 md:grid-cols-12",
  cardGrid3Col:  "grid gap-px overflow-hidden md:grid-cols-3",
} as const;

export const COMPONENTS = {
  // Badge / pill (skills, tech chips) — pill-shaped to match buttons & filter pills
  badge: `inline-flex ${BORDERS.roundedFull} ${BORDERS.borderTransparent} ${COLORS.bgCard} px-4 py-2 ${FONTS.buttonSm} ${COLORS.textBase} transition ${COLORS.hoverState}`,

  // Stats value badge (About section)
  statBadge: `inline-flex items-center justify-center min-w-20 px-4 py-2 ${BORDERS.roundedFull} bg-muted/40 border border-border/60 hover:border-foreground/30 transition-colors`,

  // Filter pill — base + active + inactive variants
  filterPill:         `inline-flex ${BORDERS.roundedFull} border ${FONTS.labelXs} transition`,
  filterPillActive:   "border-foreground bg-foreground text-background px-4 py-2",
  filterPillInactive: `border-border text-muted-foreground hover:text-foreground hover:border-foreground px-4 py-2`,

  // Table header cell
  tableHeader: `px-4 py-3 text-start ${FONTS.labelXs} ${COLORS.textMuted}`,

  // Card
  card: `${BORDERS.roundedXl} border border-border/40 bg-card/30 p-6 md:p-8 transition hover:border-border/80 hover:bg-card/30`,

  // Buttons
  buttonPrimary:   `inline-flex h-12 items-center gap-2 ${BORDERS.roundedFull} bg-foreground px-6 ${FONTS.buttonSm} text-background transition hover:bg-foreground/90`,
  buttonSecondary: `inline-flex h-12 items-center gap-2 ${BORDERS.roundedFull} border border-border px-6 ${FONTS.buttonSm} transition hover:bg-foreground hover:text-background`,

  // Toggle button (icon-only circular button used in Header)
  toggleButton: `inline-flex size-10 items-center justify-center ${BORDERS.roundedFull} border border-border/60 bg-background/40 backdrop-blur transition hover:bg-foreground hover:text-background`,

  // Form
  formLabel: `${FONTS.labelXs} ${COLORS.textMuted}`,
  formInput: `w-full ${BORDERS.roundedLg} border border-border bg-background/80 px-4 py-3 ${FONTS.inputLg} outline-none transition focus:border-foreground focus:bg-background`,
  formError: `mt-1 block ${FONTS.bodyXs} text-destructive`,

  // Tag chip (inside project cards / table)
  tagChip: `inline-flex ${BORDERS.roundedFull} border border-border/40 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider`,
  tagChipSm: `inline-flex ${BORDERS.roundedMd} border border-border/40 bg-card/30 px-1.5 py-px text-[9px] font-medium text-muted-foreground uppercase`,

  // Category pill (inside project cards / table)
  categoryPill: `inline-flex ${BORDERS.roundedFull} border border-border/50 bg-background/60 px-2.5 py-0.5 ${FONTS.labelXs} ${COLORS.textMuted}`,
  categoryPillLg: `inline-flex ${BORDERS.roundedFull} border border-border/60 bg-card/40 px-2.5 py-1 ${FONTS.labelXs}`,
} as const;

/** Utility: merge class strings, filtering falsy values. */
export const cn = (...classes: (string | undefined | false)[]): string =>
  classes.filter(Boolean).join(" ");
