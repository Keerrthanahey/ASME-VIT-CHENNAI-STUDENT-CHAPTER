"use client";

import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Wrench,
  Mic,
  Factory,
  Trophy,
  GraduationCap,
  Award,
} from "lucide-react";
import { STATISTICS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { SectionHeader } from "@/components/shared/section-header";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Wrench,
  Mic,
  Factory,
  Trophy,
  GraduationCap,
  Award,
};

export function StatisticsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-dense opacity-20" aria-hidden="true" />
      <div className="container-custom relative">
        <SectionHeader
          badge="Our Impact"
          title="Numbers That Define Excellence"
          subtitle="Over a decade of engineering excellence, innovation, and student empowerment."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {STATISTICS.map((stat, index) => {
            const Icon = ICON_MAP[stat.icon];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-asme-blue/30 hover:shadow-lg hover:shadow-asme-blue/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-asme-blue/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  {Icon && (
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-asme-blue/10">
                      <Icon className="h-5 w-5 text-asme-cyan" />
                    </div>
                  )}
                  <p className="text-3xl font-bold text-foreground md:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
