import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/useT";
import { FONTS, COLORS, COMPONENTS, BORDERS } from "@/styles/theme";
import { ThemeToggle, LocaleToggle } from "./Toggles";
import { useActiveSection } from "@/hooks/use-active-section";

const SECTIONS = ["about", "skills", "projects", "pricing", "experience", "education", "contact"] as const;

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-2 z-50 px-3 sm:px-4 md:px-6 transition-all duration-300">
      {/* Pill container */}
      <div
        className={[
          `mx-auto flex max-w-7xl items-center justify-between gap-4 sm:gap-6 ${BORDERS.rounded2xl} px-4 sm:px-5 py-3 transition-all duration-500`,
          scrolled
            ? "border border-border/50 bg-background/85 backdrop-blur-xl shadow-lg shadow-foreground/5"
            : "border border-transparent bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <a
          href="/"
          className={`${FONTS.displayXs} leading-none transition hover:opacity-70`}
          aria-label="Home"
        >
          ✦
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`/#${id}`}
              className={[
                `group relative ${FONTS.labelXs} transition-colors duration-200`,
                active === id
                  ? "text-foreground"
                  : `${COLORS.textMuted} hover:text-foreground`,
              ].join(" ")}
            >
              {t.nav[id]}
              <motion.span
                className="absolute -bottom-1 start-0 h-px bg-foreground"
                initial={false}
                animate={{ width: active === id ? "100%" : "0%" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <a href="/resume.pdf" download className={COMPONENTS.buttonPrimary}>
            <Download className="size-3.5" />
            {t.nav.resume}
          </a>
          <LocaleToggle />
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex size-10 items-center justify-center ${BORDERS.roundedFull} border border-border/60 transition hover:border-foreground/40 md:hidden`}
          aria-label={t.nav.menu}
          aria-expanded={open}
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </motion.div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 top-[72px] z-40 flex flex-col gap-2 ${COLORS.bgMobileMenu} backdrop-blur-md px-4 sm:px-6 py-8 md:hidden border-t border-border/40 overflow-y-auto`}
          >
            <div className="space-y-1">
              {SECTIONS.map((id, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`/#${id}`}
                    onClick={() => setOpen(false)}
                    className={[
                      `block border-b border-border/40 py-4 ${FONTS.displaySm} transition-all hover:ps-2`,
                      active === id ? "text-foreground border-foreground/20" : COLORS.textMuted,
                    ].join(" ")}
                  >
                    <span className={`${FONTS.labelXs} ${COLORS.textMuted} me-3`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t.nav[id]}
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="mt-6 space-y-3"
            >
              <a href="/resume.pdf" download className={`${COMPONENTS.buttonPrimary} flex justify-center`}>
                <Download className="size-3.5" />
                {t.nav.resume}
              </a>
              <div className="flex items-center gap-2 pt-2">
                <LocaleToggle />
                <ThemeToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
