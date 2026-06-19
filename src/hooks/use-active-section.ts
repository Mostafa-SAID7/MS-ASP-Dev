import { useEffect, useRef, useState } from "react";

/**
 * Tracks which section is currently in view as the user scrolls.
 * Uses IntersectionObserver — no scroll listener, no layout thrashing.
 *
 * The `ids` array is frozen into a ref so changes to the caller's reference
 * (e.g. a new array literal each render) don't tear down and rebuild all
 * observers unnecessarily.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>("");
  // Freeze ids into a ref so the effect only runs once even if the caller
  // passes a new array literal on every render.
  const idsRef = useRef(ids);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of idsRef.current) {
      const el = document.getElementById(id);
      if (!el) continue;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {
          // Fire when section enters the middle band of the viewport
          rootMargin: "-15% 0px -55% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — idsRef.current is the stable reference

  return active;
}
