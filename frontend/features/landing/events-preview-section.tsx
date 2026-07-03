"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { EVENTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

export function EventsPreviewSection() {
  const featuredEvents = EVENTS.filter((e) => e.featured).slice(0, 3);

  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <SectionHeader
          badge="Events"
          title="Upcoming Events"
          subtitle="Don't miss our flagship technical events, workshops, and competitions."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xl transition-all hover:border-asme-blue/30 hover:shadow-xl hover:shadow-asme-blue/10"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.banner}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-asme-blue/90 px-3 py-1 text-xs font-semibold text-white capitalize">
                  {event.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-asme-cyan">
                  {event.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {event.shortDescription}
                </p>
                <div className="mb-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-asme-cyan" />
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-asme-cyan" />
                    {event.venue}
                  </span>
                  {event.maxRegistrations && (
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-asme-cyan" />
                      {event.registeredCount}/{event.maxRegistrations}
                    </span>
                  )}
                </div>
                <Link href={`/events/${event.slug}`}>
                  <Button variant="outline" size="sm" className="group/btn w-full">
                    View Details
                    <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/events">
            <Button variant="glow" size="lg">
              View All Events
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
