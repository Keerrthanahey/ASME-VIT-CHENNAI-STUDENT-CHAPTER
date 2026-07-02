"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Link2, Mail } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { TEAM_MEMBERS, TEAM_GROUPS } from "@/lib/data";

export default function TeamPage() {
  const groupedMembers = Object.entries(TEAM_GROUPS).map(([key, label]) => ({
    key,
    label,
    members: TEAM_MEMBERS.filter((m) => m.team === key).sort(
      (a, b) => a.order - b.order
    ),
  }));

  return (
    <>
      <PageHero
        badge="Our Team"
        title="Core Team"
        subtitle="Meet the dedicated leaders and teams driving ASME VIT Chennai forward."
      />

      <section className="section-padding pt-0">
        <div className="container-custom space-y-16">
          {groupedMembers.map(
            (group, groupIndex) =>
              group.members.length > 0 && (
                <div key={group.key}>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 text-2xl font-bold text-foreground"
                  >
                    {group.label}
                  </motion.h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.members.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group"
                      >
                        <div className="glass overflow-hidden rounded-2xl transition-all hover:border-asme-blue/30 hover:shadow-lg hover:shadow-asme-blue/10">
                          <div className="relative h-56 overflow-hidden">
                            <Image
                              src={member.photo}
                              alt={member.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                          </div>
                          <div className="p-5">
                            <h3 className="font-semibold text-foreground">
                              {member.name}
                            </h3>
                            <p className="text-sm text-asme-cyan">{member.role}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {member.department}
                            </p>
                            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                              {member.bio}
                            </p>
                            <div className="mt-4 flex gap-2">
                              {member.linkedin && (
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:bg-asme-blue/20 hover:text-asme-cyan"
                                  aria-label={`${member.name} LinkedIn`}
                                >
                                  <Link2 className="h-4 w-4" />
                                </a>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted-foreground transition-colors hover:bg-asme-blue/20 hover:text-asme-cyan"
                                  aria-label={`Email ${member.name}`}
                                >
                                  <Mail className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </section>
    </>
  );
}
