"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HeroSceneInner = dynamic(
  () => import("./hero-scene-inner").then((mod) => mod.HeroSceneInner),
  {
    ssr: false,
    loading: () => null,
  }
);

function EngineeringLoader() {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="relative h-28 w-28">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-[spin_6s_linear_infinite]"
        >
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * 360;
            const major = i % 6 === 0;

            return (
              <line
                key={i}
                x1="50"
                y1={major ? "6" : "10"}
                x2="50"
                y2="14"
                stroke="#0B4DA6"
                strokeOpacity={major ? 0.9 : 0.35}
                strokeWidth={major ? 1.6 : 1}
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </svg>

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-[spin_1.5s_linear_infinite_reverse]"
        >
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke="#22E0FF"
            strokeWidth="2"
            strokeDasharray="65 150"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_6px_rgba(34,224,255,0.55)] animate-pulse" />
        </div>

        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.25em] text-slate-400">
          Initializing
        </span>
      </div>
    </motion.div>
  );
}

function SceneReady({
  onReady,
}: {
  onReady: () => void;
}) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}

export function HeroScene() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence>
        {!loaded && <EngineeringLoader key="loader" />}
      </AnimatePresence>

      <Suspense fallback={null}>
        <SceneReady onReady={() => setLoaded(true)} />

        <motion.div
          className="h-full w-full"
          initial={{
            opacity: 0,
            scale: 0.95,
            rotateX: 6,
          }}
          animate={{
            opacity: loaded ? 1 : 0,
            scale: loaded ? 1 : 0.95,
            rotateX: loaded ? 0 : 6,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            perspective: 1200,
          }}
        >
          <HeroSceneInner />
        </motion.div>
      </Suspense>
    </div>
  );
}

export default HeroScene;