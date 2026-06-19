import { Suspense, lazy, Component, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useHydratePreferences } from "../store/preferences";
import { AppLoader } from "@/components/ui/AppLoader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FONTS, COLORS, COMPONENTS, EASE } from "@/styles/theme";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

class ThreeErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const InkParticles = lazy(() => import("@/components/three/InkParticles"));

function FixedBackground() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-30">
      <ThreeErrorBoundary>
        <Suspense fallback={null}>
          <InkParticles />
        </Suspense>
      </ThreeErrorBoundary>
    </div>
  );
}

/* ─────────────────────────────────────────
   404 — Paper & Ink animated not-found
───────────────────────────────────────── */
const digitVariants = {
  hidden: { y: "105%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.7, ease: EASE.out },
  }),
};

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      {/* Decorative blurred glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-foreground/[0.03] blur-3xl" />
      </div>

      {/* Animated star */}
      <motion.p
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className={`${FONTS.displayXl} leading-none select-none`}
        aria-hidden
      >
        ✦
      </motion.p>

      {/* 404 — each digit slides up from behind its overflow clip */}
      <div className="mt-8 flex items-end gap-1 overflow-hidden" aria-label="404">
        {"404".split("").map((char, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              custom={i}
              variants={digitVariants}
              initial="hidden"
              animate="visible"
              className={`block ${FONTS.displayHero} leading-none`}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Animated rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.55, duration: 0.6, ease: EASE.out }}
        className="mt-6 h-px w-24 origin-center bg-border"
      />

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5, ease: EASE.out }}
        className={`mt-6 max-w-xs ${FONTS.bodySm} ${COLORS.textMuted}`}
      >
        This page doesn't exist or may have been moved.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.4, ease: EASE.out }}
        className="mt-8"
      >
        <Link to="/" className={COMPONENTS.buttonPrimary}>
          Go home ✦
        </Link>
      </motion.div>

      {/* Eyebrow label at bottom */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        className={`absolute bottom-8 ${FONTS.labelXs} ${COLORS.textMuted}`}
      >
        MOSTAFA SAMIR · PORTFOLIO
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Error Boundary — animated, branded
───────────────────────────────────────── */
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      {/* Pulse ring */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE.out }}
        className="relative flex size-16 items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-foreground/30"
        />
        <span className={`${FONTS.displayMd} leading-none select-none`} aria-hidden>
          ✦
        </span>
      </motion.div>

      {/* Title */}
      <div className="mt-8 overflow-hidden">
        <motion.h1
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.65, ease: EASE.out }}
          className={`${FONTS.displayMd}`}
        >
          Something went wrong
        </motion.h1>
      </div>

      {/* Rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.45, duration: 0.55, ease: EASE.out }}
        className="mt-5 h-px w-24 origin-center bg-border"
      />

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.45 }}
        className={`mt-5 max-w-xs ${FONTS.bodySm} ${COLORS.textMuted}`}
      >
        An unexpected error occurred. You can try again or go back home.
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className={COMPONENTS.buttonPrimary}
        >
          Try again
        </button>
        <a href="/" className={COMPONENTS.buttonSecondary}>
          Go home
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className={`absolute bottom-8 ${FONTS.labelXs} ${COLORS.textMuted}`}
      >
        MOSTAFA SAMIR · PORTFOLIO
      </motion.p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Root route + page transitions
───────────────────────────────────────── */
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  component: RootComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouter().state.location.pathname;
  useHydratePreferences();

  return (
    <QueryClientProvider client={queryClient}>
      <FixedBackground />
      <AppLoader />
      <ScrollProgress />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: EASE.inOut }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
