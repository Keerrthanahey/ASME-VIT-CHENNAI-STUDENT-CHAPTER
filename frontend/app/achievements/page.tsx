"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  BookOpen,
  Briefcase,
  GraduationCap,
  Award,
  Star,
} from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { ACHIEVEMENTS, ACHIEVEMENT_TYPES } from "@/lib/data";
import type { AchievementType } from "@/types";

const TYPE_ICONS: Record<AchievementType, React.ComponentType<{ className?: string }>> = {
  competition: Trophy,
  publication: BookOpen,
  patent: Star,
  internship: Briefcase,
  placement: GraduationCap,
  scholarship: Award,
  "national-award": Award,
  "international-award": Star,
};

export default function AchievementsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const filtered =
    typeFilter === "all"
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.type === typeFilter);

  return (
    <>
      <PageHero
        badge="Achievements"
        title="Our Achievements"
        subtitle="Celebrating excellence in competitions, research, placements, and awards."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setTypeFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                typeFilter === "all" ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              All
            </button>
            {Object.entries(ACHIEVEMENT_TYPES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTypeFilter(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  typeFilter === key ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((achievement, index) => {
              const Icon = TYPE_ICONS[achievement.type];
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass group rounded-2xl p-6 transition-all hover:border-asme-blue/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-asme-blue/10">
                      {Icon && <Icon className="h-6 w-6 text-asme-cyan" />}
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-asme-cyan">
                          {ACHIEVEMENT_TYPES[achievement.type]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {achievement.year}
                        </span>
                      </div>
                      <h3 className="font-semibold group-hover:text-asme-cyan">
                        {achievement.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      {achievement.organization && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {achievement.organization}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {achievement.members.map((member) => (
                          <span
                            key={member}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
