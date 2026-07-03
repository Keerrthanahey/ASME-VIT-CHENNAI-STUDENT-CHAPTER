"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-asme-blue/20 via-transparent to-asme-cyan/10" aria-hidden="true" />
      <div className="absolute inset-0 blueprint-grid opacity-30" aria-hidden="true" />
      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mx-auto max-w-4xl rounded-3xl p-8 text-center md:p-12"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-asme-cyan/30 bg-asme-cyan/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-asme-cyan" />
            <span className="text-sm font-medium text-asme-cyan">Join 450+ Members</span>
          </div>
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Ready to Shape the{" "}
            <span className="gradient-text">Future of Engineering?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Become part of ASME VIT Chennai and gain access to workshops, industry
            connections, competitions, and a community of passionate engineers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button variant="glow" size="xl" className="group">
                Join ASME Today
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
