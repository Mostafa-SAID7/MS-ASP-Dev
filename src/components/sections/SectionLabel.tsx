import { motion } from "framer-motion";
import { FONTS, COLORS } from "@/styles/theme";

export function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 grid gap-4 md:grid-cols-12 md:items-end">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className={`${FONTS.labelSm} ${COLORS.textMuted} md:col-span-3`}
      >
        — {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`${FONTS.displayLg} md:col-span-9`}
      >
        {title}
      </motion.h2>
    </div>
  );
}