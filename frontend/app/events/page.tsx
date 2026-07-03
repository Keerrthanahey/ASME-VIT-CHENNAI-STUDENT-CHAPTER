"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { EVENTS, EVENT_CATEGORIES } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { EventStatus } from "@/types";

export default function EventsPage() {
  const [statusFilter, setStatusFilter] = useState<EventStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredEvents = EVENTS.filter((event) => {
    const statusMatch = statusFilter === "all" || event.status === statusFilter;
    const categoryMatch =
      categoryFilter === "all" || event.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  return (
    <>
      <PageHero
        badge="Events"
        title="Events & Activities"
        subtitle="Technical talks, workshops, industrial visits, and competitions."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-8 flex flex-wrap gap-3">
            {(["all", "upcoming", "past"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all ${
                  statusFilter === status
                    ? "bg-asme-blue text-white"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {status === "all" ? "All Events" : status}
              </button>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                categoryFilter === "all"
                  ? "bg-asme-cyan/20 text-asme-cyan"
                  : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              All Categories
            </button>
            {Object.entries(EVENT_CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategoryFilter(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  categoryFilter === key
                    ? "bg-asme-cyan/20 text-asme-cyan"
                    : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No events found matching your filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-card/50 backdrop-blur-xl transition-all hover:border-asme-blue/30 hover:shadow-xl"
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
                    <span className="absolute left-4 top-4 rounded-full bg-asme-blue/90 px-3 py-1 text-xs font-semibold capitalize text-white">
                      {event.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-asme-cyan">
                      {EVENT_CATEGORIES[event.category]}
                    </span>
                    <h3 className="mt-1 mb-2 text-lg font-semibold group-hover:text-asme-cyan">
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
                    </div>
                    <Link href={`/events/${event.slug}`}>
                      <Button variant="outline" size="sm" className="w-full group/btn">
                        View Details
                        <ArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
