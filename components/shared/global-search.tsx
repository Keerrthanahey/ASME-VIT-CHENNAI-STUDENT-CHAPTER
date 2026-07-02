"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, Wrench, FolderOpen, FileText, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EVENTS, WORKSHOPS, PROJECTS, RESOURCES } from "@/lib/data";
import { NAV_LINKS } from "@/lib/constants";
import type { SearchResult } from "@/types";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TYPE_ICONS = {
  event: Calendar,
  workshop: Wrench,
  project: FolderOpen,
  resource: FileText,
  page: FileText,
};

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    NAV_LINKS.forEach((link) => {
      if (link.label.toLowerCase().includes(q)) {
        searchResults.push({
          id: `page-${link.href}`,
          title: link.label,
          type: "page",
          url: link.href,
          description: `Navigate to ${link.label}`,
        });
      }
    });

    EVENTS.forEach((event) => {
      if (
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: event.id,
          title: event.title,
          type: "event",
          url: `/events/${event.slug}`,
          description: event.shortDescription,
        });
      }
    });

    WORKSHOPS.forEach((workshop) => {
      if (
        workshop.title.toLowerCase().includes(q) ||
        workshop.overview.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: workshop.id,
          title: workshop.title,
          type: "workshop",
          url: `/workshops/${workshop.slug}`,
          description: workshop.overview.slice(0, 100),
        });
      }
    });

    PROJECTS.forEach((project) => {
      if (
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: project.id,
          title: project.title,
          type: "project",
          url: `/projects/${project.slug}`,
          description: project.description.slice(0, 100),
        });
      }
    });

    RESOURCES.forEach((resource) => {
      if (
        resource.title.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q)
      ) {
        searchResults.push({
          id: resource.id,
          title: resource.title,
          type: "resource",
          url: `/resources?search=${encodeURIComponent(resource.title)}`,
          description: resource.description,
        });
      }
    });

    return searchResults.slice(0, 8);
  }, [query]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    router.push(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b border-white/10 p-4">
          <DialogTitle className="sr-only">Global Search</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events, workshops, projects, resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent pl-10 focus-visible:ring-0"
              autoFocus
            />
          </div>
        </DialogHeader>

        <div className="max-h-80 overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No results found for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.map((result) => {
            const Icon = TYPE_ICONS[result.type];
            return (
              <button
                key={result.id}
                onClick={() => handleSelect(result.url)}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-asme-blue/10">
                  <Icon className="h-4 w-4 text-asme-cyan" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {result.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {result.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            );
          })}

          {!query && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Start typing to search across the platform
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
