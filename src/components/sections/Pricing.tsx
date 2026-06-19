import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useT } from "@/i18n/useT";
import { SectionLabel } from "./SectionLabel";
import { PricingCard } from "./pricing/PricingCard";
import { SPACING, COMPONENTS } from "@/styles/theme";

export function Pricing() {
  const t = useT();
  const p = t.pricing;

  // Homepage shows only the first 3 plans
  const heroPlans = p.plans.slice(0, 3);

  function handleCta(planId: string) {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  }

  return (
    <section id="pricing" className={`mx-auto max-w-7xl ${SPACING.section}`}>
      <SectionLabel eyebrow={p.eyebrow} title={p.title} />

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {heroPlans.map((plan, i) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            badge={plan.highlighted ? p.popular : undefined}
            onCta={() => handleCta(plan.id)}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* View all plans */}
      <div className="mt-10 flex justify-center">
        <Link to="/pricing" className={COMPONENTS.buttonSecondary}>
          <ArrowRight className="size-4" />
          {p.viewAll}
        </Link>
      </div>
    </section>
  );
}
