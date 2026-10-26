"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { photos } from "@/data/photos";
import { concepts } from "@/data/site";

const ALL = "all";
const PAGE = 20;

export default function Gallery() {
  const [filter, setFilter] = useState(ALL);
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  const list =
    filter === ALL ? photos : photos.filter((p) => p.concept === filter);
  const shown = list.slice(0, limit);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i! + 1) % list.length);
      if (e.key === "ArrowLeft")
        setOpen((i) => (i! - 1 + list.length) % list.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, list.length]);

  const select = (key: string) => {
    setFilter(key);
    setLimit(PAGE);
  };

  return (
    <>
      <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mb-10 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
        {[[ALL, "Tất cả"], ...Object.entries(concepts)].map(([key, label]) => (
          <button
            key={key}
            onClick={() => select(key)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === key
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 hover:border-ink/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {shown.map((p, i) => (
          <Reveal key={p.src} variant="zoom" delay={(i % 4) * 80}>
            <Tilt max={10}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-beige"
                aria-label={`Xem ảnh ${concepts[p.concept]}`}
              >
                <Image
                  src={p.src}
                  alt={`Concept ${concepts[p.concept]} — Jolie Studio`}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            </Tilt>
          </Reveal>
        ))}
      </div>

      {limit < list.length && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setLimit((l) => l + PAGE)}
            className="border-b border-ink pb-1 text-sm tracking-[0.2em] uppercase hover:text-stone"
          >
            Xem thêm
          </button>
        </div>
      )}

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <Image
            src={list[open].src}
            alt={`Concept ${concepts[list[open].concept]}`}
            width={list[open].width}
            height={list[open].height}
            sizes="100vw"
            className="max-h-[90vh] w-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-6 text-3xl text-paper"
            aria-label="Đóng"
          >
            ×
          </button>
          <button
            className="absolute left-2 p-4 text-4xl text-paper/70 hover:text-paper md:left-6"
            aria-label="Ảnh trước"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open - 1 + list.length) % list.length);
            }}
          >
            ‹
          </button>
          <button
            className="absolute right-2 p-4 text-4xl text-paper/70 hover:text-paper md:right-6"
            aria-label="Ảnh sau"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % list.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
