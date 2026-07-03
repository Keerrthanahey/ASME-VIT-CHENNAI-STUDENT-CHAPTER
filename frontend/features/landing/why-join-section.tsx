"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Cpu,
  Box,
  FlaskConical,
  Factory,
  Network,
  Crown,
  Trophy,
  BadgeCheck,
} from "lucide-react";
import { WHY_JOIN } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";
import { TiltCard } from "@/components/shared/section-header";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Cpu,
  Box,
  FlaskConical,
  Factory,
  Network,
  Crown,
  Trophy,
  BadgeCheck,
};

export function WhyJoinSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20" aria-hidden="true" />
      <div className="container-custom relative">
        <SectionHeader
          badge="Membership"
          title="Why Join ASME"
          subtitle="Unlock opportunities that transform your engineering journey."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_JOIN.map((benefit, index) => {
            const Icon = ICON_MAP[benefit.icon];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <TiltCard>
                  <div className="glass group h-full rounded-2xl p-6 transition-all hover:border-asme-blue/30 hover:shadow-lg hover:shadow-asme-blue/10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-asme-blue/20 to-asme-cyan/10 transition-transform group-hover:scale-110">
                      {Icon && <Icon className="h-6 w-6 text-asme-cyan" />}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
