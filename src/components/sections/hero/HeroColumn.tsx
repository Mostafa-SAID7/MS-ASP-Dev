import { motion } from "framer-motion";
import { EASE, BORDERS } from "@/styles/theme";
import type { ReactNode } from "react";

interface HeroColumnProps {
  children: ReactNode;
  side?: "left" | "right";
  delay?: number;
  colSpan?: number;
  card?: boolean;
}

export function HeroColumn({
  children,
  side = "left",
  delay = 0.2,
  colSpan = 5,
  card = false,
}: HeroColumnProps) {
  const colClass = `md:col-span-${colSpan}`;
  const cardClass = card
    ? `lg:px-10 lg:py-8 lg:${BORDERS.rounded2xl} lg:border lg:border-border/20`
    : "";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: side === "left" ? -24 : 24,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay, ease: EASE.out }}
      className={`flex flex-col ${side === "left" ? "gap-8 justify-center" : "gap-4"} ${colClass} ${cardClass}`}
    >
      {children}
    </motion.div>
  );
}
