"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  Bookmark,
  Download,
  Clock,
  Trophy,
  QrCode,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { EVENTS } from "@/lib/data";
import { MembershipCard } from "@/features/member/membership-card";

export default function DashboardPage() {
  const { member, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-asme-cyan border-t-transparent" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20">
        <p className="text-muted-foreground">Please sign in to access your dashboard.</p>
        <Link href="/login">
          <Button variant="glow">Sign In</Button>
        </Link>
      </div>
    );
  }

  const registeredEvents = EVENTS.filter((e) =>
    member.registeredEvents.includes(e.id)
  );

  const stats = [
    { label: "Volunteer Hours", value: member.volunteerHours, icon: Clock },
    { label: "Attendance", value: `${member.attendance}%`, icon: Calendar },
    { label: "Certificates", value: member.certificates.length, icon: Award },
    { label: "Achievements", value: member.achievements.length, icon: Trophy },
  ];

  return (
    <section className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={member.photo} alt={member.name} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{member.name}</h1>
              <p className="text-sm text-muted-foreground">
                {member.rollNumber} · {member.department} · Year {member.year}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Settings className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="outline" size="sm" onClick={() => signOut()}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-asme-blue/10">
                      <Icon className="h-5 w-5 text-asme-cyan" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-asme-cyan" />
                  Registered Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                {registeredEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No registered events yet.</p>
                ) : (
                  <div className="space-y-3">
                    {registeredEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="flex items-center justify-between rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
                      >
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                        </div>
                        <span className="rounded-full bg-asme-blue/20 px-3 py-1 text-xs text-asme-cyan capitalize">
                          {event.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-asme-cyan" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {member.certificates.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">Issued: {cert.issuedAt}</p>
                      </div>
                      <a href={cert.url} download>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <MembershipCard member={member} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-asme-cyan" />
                  QR Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-2xl bg-white p-2">
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
                    QR Code
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Show this QR code at events for attendance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-asme-cyan" />
                  Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {member.bookmarks.length} saved items
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
