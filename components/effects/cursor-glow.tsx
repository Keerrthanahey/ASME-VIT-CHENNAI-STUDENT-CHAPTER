"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, {
    stiffness: 500,
    damping: 35,
    mass: 0.25,
  });

  const springY = useSpring(y, {
    stiffness: 500,
    damping: 35,
    mass: 0.25,
  });

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const touch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (reducedMotion || touch) return;

    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      if (!visible) setVisible(true);
    };

    const enterWindow = () => setVisible(true);

    const leaveWindow = () => setVisible(false);

    const enterInteractive = () => setHovering(true);

    const leaveInteractive = () => setHovering(false);

    const selectors = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "label",
      "[role='button']",
      "[tabindex]",
      ".cursor-hover",
    ];

    const elements = document.querySelectorAll(selectors.join(","));

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enterInteractive);
      el.addEventListener("mouseleave", leaveInteractive);
    });

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", enterWindow);
    window.addEventListener("mouseleave", leaveWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor");

      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", enterWindow);
      window.removeEventListener("mouseleave", leaveWindow);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enterInteractive);
        el.removeEventListener("mouseleave", leaveInteractive);
      });
    };
  }, [visible, x, y]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Glow Ring */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999]"
            style={{
              x: springX,
              y: springY,
            }}
            animate={{
              width: hovering ? 60 : 34,
              height: hovering ? 60 : 34,
              scale: hovering ? 1.2 : 1,
              opacity: 1,
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 22,
            }}
          >
            <div
              className="
                h-full
                w-full
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-400/70
                bg-cyan-400/5
                backdrop-blur-xl
                shadow-[0_0_40px_rgba(34,211,238,0.45)]
              "
            />
          </motion.div>

          {/* Pointer */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[10000]"
            style={{
              x,
              y,
            }}
          >
            <div
              className="
                h-3
                w-3
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-cyan-400
                shadow-[0_0_20px_rgba(34,211,238,1)]
              "
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}