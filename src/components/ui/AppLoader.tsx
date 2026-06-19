import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * First-load splash screen shown once per browser session.
 * Mounts before the app content, plays a short branded sequence,
 * then fades out revealing the page.
 */
export function AppLoader() {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem("ms_loaded") !== "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("ms_loaded", "1");
      } catch {
        // ignore
      }
    }, 2000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Star mark — springs in */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              delay: 0.05,
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="font-title text-4xl select-none"
            aria-hidden
          >
            ✦
          </motion.div>

          {/* Name — fades up */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            className="mt-5 font-accent text-xs uppercase tracking-[0.45em] text-muted-foreground select-none"
          >
            Mostafa Samir
          </motion.p>

          {/* Role line — fades in slightly later */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-2 font-accent text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 select-none"
          >
            Full-Stack .NET &amp; Angular Developer
          </motion.p>

          {/* Progress bar — sweeps left to right */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-foreground/80 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 0.15,
              duration: 1.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ width: "100%" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
