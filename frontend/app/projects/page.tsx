"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data";

export default function ProjectsPage() {
  const [category, setCategory] = useState<string>("all");
  const filtered =
    category === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        badge="Projects"
        title="Project Showcase"
        subtitle="Innovative mechanical engineering projects by our talented students."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                category === "all" ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              All Projects
            </button>
            {Object.entries(PROJECT_CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  category === key ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xl transition-all hover:border-asme-blue/30 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {project.awards && project.awards.length > 0 && (
                    <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-asme-gold/90 px-3 py-1 text-xs font-semibold text-black">
                      <Award className="h-3 w-3" />
                      Award Winner
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-asme-cyan">
                    {PROJECT_CATEGORIES[project.category]}
                  </span>
                  <h3 className="mt-1 mb-2 text-lg font-semibold group-hover:text-asme-cyan">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href={`/projects/${project.slug}`}>
                    <Button variant="outline" size="sm" className="group/btn w-full">
                      View Project
                      <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
