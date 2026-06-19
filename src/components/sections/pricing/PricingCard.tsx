import { memo } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { FONTS, COLORS, BORDERS, ANIMATIONS, COMPONENTS } from "@/styles/theme";

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

interface PricingCardProps {
  plan: Plan;
  badge?: string;
  onCta?: () => void;
  delay?: number;
}

export const PricingCard = memo(function PricingCard({
  plan,
  badge,
  onCta,
  delay = 0,
}: PricingCardProps) {
  const { name, price, period, description, features, cta, highlighted } = plan;

  return (
    <motion.div
      {...ANIMATIONS.cardIn}
      transition={{ ...ANIMATIONS.cardIn.transition, delay }}
      className="flex h-full"
    >
      <div
        className={[
          `relative flex w-full flex-col gap-6 ${BORDERS.rounded2xl} border p-5 sm:p-7 transition-all duration-300`,
          highlighted
            ? "border-foreground bg-foreground text-background shadow-2xl shadow-foreground/20 scale-[1.02]"
            : "border-border/50 bg-card/40 hover:bg-card/70 hover:border-border",
        ].join(" ")}
      >
        {/* Popular badge */}
        {badge && (
          <div className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2">
            <span
              className={[
                `inline-flex items-center ${BORDERS.roundedFull} px-3 py-1 ${FONTS.labelXs}`,
                highlighted
                  ? "bg-background text-foreground"
                  : "bg-foreground text-background",
              ].join(" ")}
            >
              ✦ {badge}
            </span>
          </div>
        )}

        {/* Plan name + price */}
        <div>
          <p
            className={[
              FONTS.labelSm,
              highlighted ? "text-background/60" : COLORS.textMuted,
            ].join(" ")}
          >
            {name}
          </p>

          <div className="mt-3 flex items-end gap-1.5">
            <span className={FONTS.displayMd}>{price}</span>
            <span
              className={[
                `mb-1 ${FONTS.bodySm}`,
                highlighted ? "text-background/60" : COLORS.textMuted,
              ].join(" ")}
            >
              {period}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className={highlighted ? "h-px bg-background/20" : "h-px bg-border/60"}
        />

        {/* Description */}
        <p
          className={[
            FONTS.bodySm,
            highlighted ? "text-background/80" : COLORS.textMuted,
          ].join(" ")}
        >
          {description}
        </p>

        {/* Features */}
        <ul className="flex flex-1 flex-col gap-3">
          {features.map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <Check
                className={[
                  "mt-0.5 size-3.5 shrink-0",
                  highlighted ? "text-background/70" : COLORS.textMuted,
                ].join(" ")}
              />
              <span
                className={[
                  FONTS.bodyXs,
                  highlighted ? "text-background/90" : "",
                ].join(" ")}
              >
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={onCta}
          className={[
            `mt-2 inline-flex h-11 w-full items-center justify-center ${BORDERS.roundedFull} ${FONTS.buttonSm} transition-all duration-200`,
            highlighted
              ? "bg-background text-foreground hover:bg-background/90"
              : "border border-foreground bg-transparent hover:bg-foreground hover:text-background",
          ].join(" ")}
        >
          {cta}
        </button>
      </div>
    </motion.div>
  );
});
