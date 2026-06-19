import { motion } from "framer-motion";
import { FONTS, COLORS, EASE } from "@/styles/theme";

interface HeroHeaderProps {
  eyebrow: string;
  availableText: string;
}

export function HeroHeader({ eyebrow, availableText }: HeroHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: EASE.out }}
      className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 mb-6 md:mb-0"
    >
      <p className={`${FONTS.labelXs} ${COLORS.textMuted} min-w-0 truncate`}>
        — {eyebrow}
      </p>

      {/* Available badge */}
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 backdrop-blur-sm">
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-green-400" />
        </span>
        <span className={`${FONTS.labelXs} whitespace-nowrap text-green-600 dark:text-green-400`}>
          {availableText}
        </span>
      </div>
    </motion.div>
  );
}
