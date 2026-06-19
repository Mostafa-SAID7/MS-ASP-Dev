import { Suspense, lazy, useRef, Component, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FONTS, COLORS, EASE, BORDERS } from "@/styles/theme";
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

const InkParticles = lazy(() => import("../../three/InkParticles"));

interface HeroPhotoProps {
  photoAlt: string;
  hoverTitle: string;
  hoverSubtitle: string;
}

export function HeroPhoto({
  photoAlt,
  hoverTitle,
  hoverSubtitle,
}: HeroPhotoProps) {
  const reduced = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [7, -7]),
    { stiffness: 140, damping: 18 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-7, 7]),
    { stiffness: 140, damping: 18 }
  );

  function handleMouseMove(e: React.MouseEvent) {
    if (reduced) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <>
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Photo with 3-D tilt */}
      <motion.div
        ref={photoRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative aspect-[4/5] w-full overflow-hidden ${BORDERS.rounded2xl} bg-card/40 cursor-default`}
      >
        <img
          src="/MS.jpg"
          alt={photoAlt}
          width={600}
          height={750}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-25 will-change-transform"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 px-8 text-center">
          <p className={`${FONTS.displaySm} ${COLORS.textBase}`}>
            {hoverTitle}
          </p>
          <div className="h-px w-12 bg-foreground/30" />
          <p className={`${FONTS.bodyXs} ${COLORS.textMuted}`}>
            {hoverSubtitle}
          </p>
        </div>
        {/* Subtle grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>
    </>
  );
}
