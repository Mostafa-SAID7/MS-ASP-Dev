import { Github, Linkedin, Mail } from "lucide-react";
import { useT } from "@/i18n/useT";
import { FONTS, COLORS } from "@/styles/theme";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border/40 mt-12">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className={`${FONTS.displayLg} leading-tight whitespace-pre-line`}>
              {t.footer.tagline}
            </p>
            <a
              href="mailto:m.ssaid356@gmail.com"
              className={`mt-6 inline-flex items-center gap-2 ${FONTS.bodySm} ${COLORS.textMuted} transition hover:${COLORS.textBase}`}
            >
              <Mail className="size-4" />
              m.ssaid356@gmail.com
            </a>
          </div>

          <div className="md:col-span-4">
            <p className={`${FONTS.labelXs} ${COLORS.textMuted}`}>
              {t.footer.colophonLabel}
            </p>
            <p className={`mt-4 ${FONTS.bodySm} ${COLORS.textMuted}`}>
              {t.footer.colophon}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:col-span-2 md:items-end">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Mostafa-SAID7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`${COLORS.textMuted} transition hover:${COLORS.textBase}`}
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mostafasamirsaid"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${COLORS.textMuted} transition hover:${COLORS.textBase}`}
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="mailto:m.ssaid356@gmail.com"
                aria-label="Email"
                className={`${COLORS.textMuted} transition hover:${COLORS.textBase}`}
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6 ${FONTS.labelXs} ${COLORS.textMuted}`}>
          <p>{t.footer.rights}</p>
          <p className={FONTS.displayXs}>✦</p>
        </div>
      </div>
    </footer>
  );
}
