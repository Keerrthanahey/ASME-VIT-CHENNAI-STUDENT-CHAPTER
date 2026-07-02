"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Download, User } from "lucide-react";
import type { Workshop } from "@/types";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkshopDetailProps {
  workshop: Workshop;
}

export function WorkshopDetail({ workshop }: WorkshopDetailProps) {
  return (
    <section className="relative pt-24">
      <div className="relative h-[35vh] min-h-[250px] overflow-hidden">
        <Image
          src={workshop.banner}
          alt={workshop.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container-custom relative -mt-24 pb-16">
        <Link
          href="/workshops"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-asme-cyan"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Workshops
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            {workshop.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {formatDate(workshop.date)} · {workshop.duration} · {workshop.venue}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{workshop.overview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Prerequisites</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {workshop.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-asme-cyan" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Learning Outcomes</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {workshop.learningOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-asme-cyan" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {workshop.gallery.length > 0 && (
              <Card>
                <CardHeader><CardTitle>Photo Gallery</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {workshop.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-video overflow-hidden rounded-xl">
                        <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover" sizes="50vw" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Instructor</CardTitle></CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={workshop.instructor.photo} alt={workshop.instructor.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="font-semibold">{workshop.instructor.name}</p>
                    <p className="text-sm text-asme-cyan">{workshop.instructor.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{workshop.instructor.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {workshop.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-white/5 p-3 text-sm transition-colors hover:bg-white/10"
                  >
                    <Download className="h-4 w-4 text-asme-cyan" />
                    {resource.name}
                  </a>
                ))}
              </CardContent>
            </Card>

            <Button variant="glow" className="w-full">
              <User className="h-4 w-4" />
              Register for Workshop
            </Button>

            {workshop.certificateAvailable && (
              <p className="text-center text-xs text-muted-foreground">
                Certificate provided upon completion
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
