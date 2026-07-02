"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeroSceneInner = dynamic(
  () => import("./hero-scene-inner").then((mod) => mod.HeroSceneInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin-slow rounded-full border-2 border-asme-blue/30 border-t-asme-cyan" />
      </div>
    ),
  }
);

export function HeroScene() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-32 w-32 animate-spin-slow rounded-full border-2 border-asme-blue/30 border-t-asme-cyan" />
        </div>
      }
    >
      <HeroSceneInner />
    </Suspense>
  );
}
