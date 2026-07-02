"use client";

import { motion } from "framer-motion";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import { ABOUT_CONTENT } from "@/lib/constants";
import { SectionHeader } from "@/components/shared/section-header";

export function AboutSection() {
  const sections = [
    ABOUT_CONTENT.asmeInternational,
    ABOUT_CONTENT.asmeIndia,
    ABOUT_CONTENT.asmeVit,
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 mesh-gradient opacity-50" aria-hidden="true" />
      <div className="container-custom relative">
        <SectionHeader
          badge="About Us"
          title="Building Engineering Leaders"
          subtitle="From global standards to local impact — discover our mission and vision."
        />

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass group rounded-2xl p-6 transition-all hover:border-asme-blue/30"
            >
              <h3 className="mb-3 text-lg font-semibold text-foreground group-hover:text-asme-cyan">
                {section.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-asme-blue/10">
                <Target className="h-5 w-5 text-asme-cyan" />
              </div>
              <h3 className="text-xl font-semibold">Our Mission</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {ABOUT_CONTENT.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-asme-blue/10">
                <Eye className="h-5 w-5 text-asme-cyan" />
              </div>
              <h3 className="text-xl font-semibold">Our Vision</h3>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {ABOUT_CONTENT.vision}
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-xl font-semibold">Objectives</h3>
            <ul className="space-y-3">
              {ABOUT_CONTENT.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-asme-cyan" />
                  <span className="text-sm text-muted-foreground">{obj}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-xl font-semibold">Core Values</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {ABOUT_CONTENT.coreValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-asme-blue/30"
                >
                  <p className="font-medium text-foreground">{value.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
