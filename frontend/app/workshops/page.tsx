"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { WORKSHOPS } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        badge="Workshops"
        title="Hands-on Workshops"
        subtitle="Master CAD, simulation, and manufacturing skills through expert-led workshops."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2">
            {WORKSHOPS.map((workshop, index) => (
              <motion.article
                key={workshop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xl transition-all hover:border-asme-blue/30 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={workshop.banner}
                    alt={workshop.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-asme-cyan">
                    {workshop.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {workshop.overview}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-asme-cyan" />
                      {formatDate(workshop.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-asme-cyan" />
                      {workshop.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-asme-cyan" />
                      {workshop.registeredCount}/{workshop.maxSeats} seats
                    </span>
                  </div>
                  <Link href={`/workshops/${workshop.slug}`}>
                    <Button variant="outline" size="sm" className="group/btn">
                      View Workshop
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
