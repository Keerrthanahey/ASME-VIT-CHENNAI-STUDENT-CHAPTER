"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { ParticleCanvas } from "@/components/effects/particle-canvas";
import { FloatingGears } from "@/components/effects/animated-gear";
import { HeroScene } from "@/components/effects/hero-scene";

const titleWords = ["Engineering", "Excellence", "Through", "Innovation"];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 blueprint-grid" aria-hidden="true" />
      <div className="absolute inset-0 mesh-gradient" aria-hidden="true" />
      <div className="noise-overlay absolute inset-0" aria-hidden="true" />
      <ParticleCanvas className="opacity-60" particleCount={60} />
      <FloatingGears />

      <div className="absolute right-0 top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 lg:block xl:h-[600px] xl:w-[600px]">
        <HeroScene />
      </div>

      <div className="container-custom relative z-10 pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-asme-blue/30 bg-asme-blue/10 px-4 py-2"
            >
              <Sparkles className="h-4 w-4 text-asme-cyan" />
              <span className="text-sm font-medium text-asme-cyan">
                ASME VIT Chennai Student Chapter
              </span>
            </motion.div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {titleWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mr-3 inline-block"
                >
                  {i === 0 || i === 3 ? (
                    <span className="gradient-text">{word}</span>
                  ) : (
                    <span className="text-foreground">{word}</span>
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl"
            >
              {SITE_CONFIG.tagline}. Join India&apos;s most active mechanical
              engineering student chapter and unlock your potential.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/login">
                <Button variant="glow" size="lg" className="group">
                  Join ASME
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="secondary" size="lg" className="group">
                  Explore Events
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex items-center gap-8"
            >
              <div>
                <p className="text-2xl font-bold text-foreground">450+</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-foreground">85+</p>
                <p className="text-sm text-muted-foreground">Events Hosted</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-muted-foreground">Years Strong</p>
              </div>
            </motion.div>
          </div>

          <div className="relative hidden h-[400px] lg:block">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-asme-blue/20 to-asme-cyan/10 blur-3xl" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
