"use client";

import { Settings } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-asme-blue/20 blur-2xl" />
        <Settings
          className="relative h-16 w-16 animate-spin-slow text-asme-cyan"
          strokeWidth={1}
        />
      </div>
      <p className="mt-6 text-sm font-medium text-muted-foreground">
        Loading ASME VIT Chennai...
      </p>
    </div>
  );
}
