"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-asme-blue to-asme-cyan"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const announcements = [
    "🚀 Aerospace Summit 2026 — Registration Now Open!",
    "💼 Boeing Internship Opportunities Available",
    "🏆 HPVC Team Selection Results Announced",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[45] bg-gradient-to-r from-asme-blue to-asme-cyan py-2 text-center text-sm font-medium text-white">
      <motion.p
        key={current}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {announcements[current]}
      </motion.p>
    </div>
  );
}
