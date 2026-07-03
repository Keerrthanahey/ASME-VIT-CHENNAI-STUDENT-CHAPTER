"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Code, ExternalLink, Award } from "lucide-react";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECT_CATEGORIES } from "@/lib/data";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section className="relative pt-24">
      <div className="container-custom pb-16">
        <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-asme-cyan">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-sm font-medium text-asme-cyan">
            {PROJECT_CATEGORIES[project.category]}
          </span>
          <h1 className="font-display text-3xl font-bold md:text-4xl">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{project.description}</p>
        </motion.div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {project.images.map((img, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-2xl">
              <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover" sizes="50vw" />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Objectives</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {obj}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.teamMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-asme-blue/20 text-sm font-semibold text-asme-cyan">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Technologies & Software</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-lg bg-asme-blue/10 px-3 py-1 text-xs text-asme-cyan">{tech}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.software.map((sw) => (
                  <span key={sw} className="rounded-lg bg-white/5 px-3 py-1 text-xs text-muted-foreground">{sw}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {project.awards && (
            <Card>
              <CardHeader><CardTitle>Awards</CardTitle></CardHeader>
              <CardContent>
                {project.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-asme-gold" />
                    {award}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary"><Code className="h-4 w-4" /> GitHub</Button>
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="glow"><ExternalLink className="h-4 w-4" /> Live Demo</Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
