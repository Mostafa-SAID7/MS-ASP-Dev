import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { SPACING, FONTS, COLORS, ANIMATIONS, GRIDS, BORDERS, COMPONENTS } from "@/styles/theme";

export function About() {
  const t = useT();
  return (
    <section id="about" className={`mx-auto max-w-7xl ${SPACING.section}`}>
      <SectionLabel eyebrow={t.about.eyebrow} title={t.about.title} />

      <div className={GRIDS.sectionLayout}>
        <div className="md:col-span-3" />
        <div className="space-y-8 md:col-span-6">
          {t.about.body.map((p, i) => (
            <motion.p
              key={i}
              {...ANIMATIONS.fadeIn}
              transition={{ ...ANIMATIONS.fadeIn.transition, delay: i * 0.1 }}
              className={`${FONTS.bodyXl} ${COLORS.textSubtle}`}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>

      <div className={`mt-10 grid grid-cols-1 gap-px overflow-hidden ${BORDERS.rounded2xl} ${BORDERS.borderBase} md:grid-cols-3`}>
        {t.about.stats.map((s) => (
          <div key={s.label} className={`bg-card ${SPACING.cardPadding}`}>
            <div className={COMPONENTS.statBadge}>
              <p className={FONTS.displayXl}>{s.value}</p>
            </div>
            <p className={`mt-3 ${FONTS.labelMd} ${COLORS.textMuted}`}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
