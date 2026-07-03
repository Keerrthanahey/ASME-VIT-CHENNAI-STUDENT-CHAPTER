"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Image,
  FileText,
  BarChart3,
  Megaphone,
  Settings,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/section-header";

const membershipData = [
  { month: "Sep", members: 380 },
  { month: "Oct", members: 395 },
  { month: "Nov", members: 410 },
  { month: "Dec", members: 425 },
  { month: "Jan", members: 440 },
  { month: "Feb", members: 450 },
];

const departmentData = [
  { name: "Mechanical", value: 450, color: "#0066cc" },
  { name: "Auto", value: 45, color: "#00d4ff" },
  { name: "MME", value: 30, color: "#64748b" },
];

const activityData = [
  { month: "Sep", events: 8, workshops: 4 },
  { month: "Oct", events: 6, workshops: 3 },
  { month: "Nov", events: 10, workshops: 5 },
  { month: "Dec", events: 5, workshops: 2 },
  { month: "Jan", events: 7, workshops: 4 },
  { month: "Feb", events: 9, workshops: 6 },
];

const adminModules = [
  { title: "Members", icon: Users, count: 450 },
  { title: "Events", icon: Calendar, count: 85 },
  { title: "Gallery", icon: Image, count: 120 },
  { title: "Resources", icon: FileText, count: 45 },
  { title: "Announcements", icon: Megaphone, count: 12 },
  { title: "Settings", icon: Settings, count: null },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <PageHero
        badge="Admin"
        title="Admin Dashboard"
        subtitle="Manage members, events, content, and analytics."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {adminModules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.button
                  key={mod.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveTab(mod.title.toLowerCase())}
                  className="glass rounded-2xl p-5 text-left transition-all hover:border-asme-blue/30 hover:shadow-lg"
                >
                  <Icon className="mb-3 h-6 w-6 text-asme-cyan" />
                  <p className="font-semibold">{mod.title}</p>
                  {mod.count !== null && (
                    <p className="text-2xl font-bold text-asme-cyan">{mod.count}</p>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <BarChart3 className="h-5 w-5 text-asme-cyan" />
              Analytics Overview
            </h2>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Membership Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={membershipData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                    />
                    <Line type="monotone" dataKey="members" stroke="#00d4ff" strokeWidth={2} dot={{ fill: "#0066cc" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                    />
                    <Bar dataKey="events" fill="#0066cc" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="workshops" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
