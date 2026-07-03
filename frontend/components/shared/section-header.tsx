"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.02}
      transitionSpeed={2000}
      gyroscope={false}
      className={cn("transform-gpu", className)}
    >
      {children}
    </Tilt>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        centered && "text-center",
        className
      )}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-asme-blue/30 bg-asme-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-asme-cyan">
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title.split(" ").map((word, i, arr) =>
          i === Math.floor(arr.length / 2) ? (
            <span key={i}>
              <span className="gradient-text">{word}</span>{" "}
            </span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function PageHero({ title, subtitle, badge }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 mesh-gradient" aria-hidden="true" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {badge && (
            <span className="mb-4 inline-block rounded-full border border-asme-blue/30 bg-asme-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-asme-cyan">
              {badge}
            </span>
          )}
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
