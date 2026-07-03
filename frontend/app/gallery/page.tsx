"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { GALLERY, GALLERY_CATEGORIES } from "@/lib/data";
import type { GalleryItem } from "@/types";

export default function GalleryPage() {
  const [category, setCategory] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered =
    category === "all"
      ? GALLERY
      : GALLERY.filter((item) => item.category === category);

  return (
    <>
      <PageHero
        badge="Gallery"
        title="Photo Gallery"
        subtitle="Capturing moments from events, workshops, and achievements."
      />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                category === "all" ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              All
            </button>
            {Object.entries(GALLERY_CATEGORIES).map(([key, label]) => (
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

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setLightbox(item)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-h-[85vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.imageUrl}
                alt={lightbox.title}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto rounded-2xl object-contain"
              />
              <p className="mt-4 text-center text-white">{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
