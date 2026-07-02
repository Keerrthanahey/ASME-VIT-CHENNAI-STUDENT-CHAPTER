"use client";

import { motion } from "framer-motion";
import {
  PenTool,
  Rocket,
  Factory,
  Bot,
  Flame,
  Layers,
  CircuitBoard,
  Cog,
} from "lucide-react";
import { DOMAINS } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";
import { TiltCard } from "@/components/shared/section-header";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool,
  Rocket,
  Factory,
  Bot,
  Flame,
  Layers,
  CircuitBoard,
  Cog,
};

export function DomainsSection() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 mesh-gradient" aria-hidden="true" />
      <div className="container-custom relative">
        <SectionHeader
          badge="Domains"
          title="Engineering Domains We Explore"
          subtitle="From CAD design to aerospace — dive into every facet of mechanical engineering."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAINS.map((domain, index) => {
            const Icon = ICON_MAP[domain.icon];
            return (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TiltCard>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-white/20">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 transition-opacity group-hover:opacity-10`}
                    />
                    <div className="relative">
                      {Icon && (
                        <Icon className="mb-4 h-8 w-8 text-asme-cyan transition-transform group-hover:scale-110" />
                      )}
                      <h3 className="font-semibold text-foreground">{domain.title}</h3>
                    </div>
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
