import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingCard } from "@/components/sections/pricing/PricingCard";
import { useT } from "@/i18n/useT";
import { FONTS, COLORS, SPACING, COMPONENTS, EASE, ANIMATIONS } from "@/styles/theme";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Mostafa Samir" },
      {
        name: "description",
        content:
          "Clear, flat-rate pricing for web development services — Landing Pages, Multi-page Sites, Full Stack applications, and ongoing Maintenance.",
      },
    ],
  }),
  component: PricingPage,
});

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-start justify-between gap-4 py-5 text-start ${FONTS.bodySm} transition hover:opacity-70`}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE.out }}
          className={`pb-5 ${FONTS.bodyXs} ${COLORS.textMuted} max-w-2xl`}
        >
          {a}
        </motion.p>
      )}
    </div>
  );
}

function PricingPage() {
  const t = useT();
  const p = t.pricing;

  function handleCta() {
    window.location.href = "/#contact";
  }

  return (
    <>
      <Header />

      <main className={`mx-auto max-w-7xl ${SPACING.section}`}>

        {/* ── Back link ── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE.out }}
          className="mb-10"
        >
          <Link
            to="/"
            className={`inline-flex items-center gap-2 ${FONTS.labelXs} ${COLORS.textMuted} transition hover:text-foreground`}
          >
            <ArrowLeft className="size-3.5" />
            Back home
          </Link>
        </motion.div>

        {/* ── Page hero ── */}
        <div className="mb-14 grid gap-4 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${FONTS.labelSm} ${COLORS.textMuted} md:col-span-3`}
          >
            — {p.eyebrow}
          </motion.p>
          <div className="md:col-span-9">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE.out }}
                className={FONTS.displayLg}
              >
                {p.title}
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className={`mt-4 max-w-2xl ${FONTS.bodySm} ${COLORS.textMuted}`}
            >
              {p.subtitle}
            </motion.p>
          </div>
        </div>

        {/* ── All plans grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.plans.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              badge={plan.highlighted ? p.popular : undefined}
              onCta={handleCta}
              delay={i * 0.07}
            />
          ))}
        </div>

        {/* ── Custom quote strip ── */}
        <motion.div
          {...ANIMATIONS.fadeIn}
          className="mt-14 flex flex-col items-center gap-6 rounded-2xl border border-border/50 bg-card/40 px-8 py-10 text-center md:flex-row md:justify-between md:text-start"
        >
          <div>
            <p className={FONTS.displaySm}>Need something custom?</p>
            <p className={`mt-2 max-w-lg ${FONTS.bodySm} ${COLORS.textMuted}`}>
              Most real-world projects don't fit a fixed box. Describe what you're building
              and I'll send a scoped quote within 24 hours.
            </p>
          </div>
          <a href="/#contact" className={`shrink-0 ${COMPONENTS.buttonPrimary}`}>
            Get a quote ✦
          </a>
        </motion.div>

        {/* ── FAQ ── */}
        <section className="mt-20">
          <motion.h2
            {...ANIMATIONS.fadeIn}
            className={`mb-8 ${FONTS.displaySm}`}
          >
            Common questions
          </motion.h2>
          <div>
            {p.faq.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
