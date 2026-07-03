"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link2, Mail, ArrowRight } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/data";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

export function TeamPreviewSection() {
  const leaders = TEAM_MEMBERS.filter((m) =>
    ["chairperson", "vice-chairperson", "secretary", "treasurer"].includes(m.team)
  );

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-20" aria-hidden="true" />
      <div className="container-custom relative">
        <SectionHeader
          badge="Leadership"
          title="Meet Our Core Team"
          subtitle="Dedicated leaders driving engineering excellence at ASME VIT Chennai."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass relative overflow-hidden rounded-2xl p-6 text-center transition-all hover:border-asme-blue/30 hover:shadow-lg hover:shadow-asme-blue/10">
                <div className="relative mx-auto mb-4 h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-asme-blue to-asme-cyan opacity-20 blur-xl transition-opacity group-hover:opacity-40" />
                  <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-asme-blue/30 transition-all group-hover:ring-asme-cyan/50">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-asme-cyan">{member.role}</p>
                <p className="mt-1 text-xs text-muted-foreground">{member.department}</p>
                <div className="mt-4 flex justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground hover:bg-asme-blue/20 hover:text-asme-cyan"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Link2 className="h-4 w-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground hover:bg-asme-blue/20 hover:text-asme-cyan"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/team">
            <Button variant="secondary" size="lg">
              View Full Team
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
