import { motion } from "framer-motion";
import { FONTS, COLORS, EASE, BORDERS } from "@/styles/theme";

const chipContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 1.1 } },
};

const chipItem = {
  hidden: { opacity: 0, scale: 0.82, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE.out },
  },
};

interface HeroStackProps {
  techs: string[];
}

export function HeroStack({ techs }: HeroStackProps) {
  return (
    <motion.div
      variants={chipContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-2"
    >
      {techs.map((tech) => (
        <motion.span
          key={tech}
          variants={chipItem}
          className={`inline-flex items-center ${BORDERS.roundedFull} border border-border/60 bg-card/40 px-3 py-1 ${FONTS.labelXs} ${COLORS.textMuted} backdrop-blur-sm`}
        >
          {tech}
        </motion.span>
      ))}
    </motion.div>
  );
}
