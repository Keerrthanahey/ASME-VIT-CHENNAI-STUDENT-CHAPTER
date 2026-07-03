"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";

interface GearProps {
  size?: number;
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function AnimatedGear({
  size = 60,
  className = "",
  speed = 20,
  reverse = false,
}: GearProps) {
  return (
    <motion.div
      className={`text-asme-blue/20 ${className}`}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    >
      <Settings size={size} strokeWidth={1} />
    </motion.div>
  );
}

export function FloatingGears() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <AnimatedGear
        size={80}
        className="absolute left-[10%] top-[20%] opacity-30"
        speed={25}
      />
      <AnimatedGear
        size={50}
        className="absolute left-[15%] top-[25%] opacity-20"
        speed={18}
        reverse
      />
      <AnimatedGear
        size={100}
        className="absolute right-[10%] top-[30%] opacity-25"
        speed={30}
        reverse
      />
      <AnimatedGear
        size={40}
        className="absolute right-[18%] top-[35%] opacity-15"
        speed={15}
      />
      <AnimatedGear
        size={70}
        className="absolute bottom-[20%] left-[20%] opacity-20"
        speed={22}
        reverse
      />
      <AnimatedGear
        size={55}
        className="absolute bottom-[30%] right-[25%] opacity-25"
        speed={20}
      />
    </div>
  );
}
