"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Download, FileText } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/lib/data";

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return RESOURCES.filter((resource) => {
      const matchCategory = category === "all" || resource.category === category;
      const matchSearch =
        !search ||
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.description.toLowerCase().includes(search.toLowerCase()) ||
        resource.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  return (
    <>
      <PageHero
        badge="Resources"
        title="Technical Resources"
        subtitle="Notes, tutorials, templates, and study materials for mechanical engineering students."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                category === "all" ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              All
            </button>
            {Object.entries(RESOURCE_CATEGORIES).map(([key, label]) => (
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

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No resources found matching your search.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass group rounded-2xl p-6 transition-all hover:border-asme-blue/30"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-asme-blue/10">
                    <FileText className="h-5 w-5 text-asme-cyan" />
                  </div>
                  <span className="text-xs font-medium text-asme-cyan">
                    {RESOURCE_CATEGORIES[resource.category]}
                  </span>
                  <h3 className="mt-1 mb-2 font-semibold group-hover:text-asme-cyan">
                    {resource.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {resource.downloads.toLocaleString()} downloads
                    </span>
                    <a href={resource.fileUrl} download>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
