"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Download,
  Share2,
  Bookmark,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import type { Event } from "@/types";
import { formatDate, formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENT_CATEGORIES } from "@/lib/data";

interface EventDetailProps {
  event: Event;
}

export function EventDetail({ event }: EventDetailProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: event.shortDescription,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.date.replace(/-/g, "")}T${event.time.replace(":", "")}00/${event.date.replace(/-/g, "")}T${(event.endTime || event.time).replace(":", "")}00&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location.address)}`;

  return (
    <>
      <section className="relative pt-24">
        <div className="relative h-[40vh] min-h-[300px] overflow-hidden md:h-[50vh]">
          <Image
            src={event.banner}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container-custom relative -mt-32 pb-16">
          <Link
            href="/events"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-asme-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-asme-blue/20 px-3 py-1 text-xs font-semibold capitalize text-asme-cyan">
                {event.status}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-muted-foreground">
                {EVENT_CATEGORIES[event.category]}
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              {event.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {event.shortDescription}
            </p>
          </motion.div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              {event.agenda.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Agenda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.agenda.map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-4 border-l-2 border-asme-blue/30 pl-4"
                        >
                          <span className="shrink-0 text-sm font-mono text-asme-cyan">
                            {item.time}
                          </span>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            {item.description && (
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {event.speakers.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Speakers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {event.speakers.map((speaker) => (
                        <div key={speaker.id} className="flex gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <Image
                              src={speaker.photo}
                              alt={speaker.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{speaker.name}</p>
                            <p className="text-sm text-asme-cyan">{speaker.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {speaker.company}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {event.gallery.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {event.gallery.map((img, i) => (
                        <div key={i} className="relative aspect-video overflow-hidden rounded-xl">
                          <Image
                            src={img}
                            alt={`${event.title} gallery ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <Card className="sticky top-24">
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-asme-cyan" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-asme-cyan" />
                      <span>
                        {formatTime(event.time)}
                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-asme-cyan" />
                      <span>{event.venue}</span>
                    </div>
                    {event.maxRegistrations && (
                      <div className="flex items-center gap-3">
                        <Users className="h-4 w-4 text-asme-cyan" />
                        <span>
                          {event.registeredCount}/{event.maxRegistrations} registered
                        </span>
                      </div>
                    )}
                  </div>

                  {event.status === "upcoming" && (
                    <Button
                      variant="glow"
                      className="w-full"
                      onClick={() => setRegistered(true)}
                      disabled={registered}
                    >
                      {registered ? "Registered ✓" : "Register Now"}
                    </Button>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setBookmarked(!bookmarked)}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${bookmarked ? "fill-asme-cyan text-asme-cyan" : ""}`}
                      />
                      Save
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>

                  <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </a>

                  {event.brochureUrl && (
                    <a href={event.brochureUrl} download>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4" />
                        Download Brochure
                      </Button>
                    </a>
                  )}

                  <a
                    href={`https://maps.google.com/?q=${event.location.lat},${event.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4" />
                      View on Maps
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
