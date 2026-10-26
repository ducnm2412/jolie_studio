"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import { photos } from "@/data/photos";

// Mỗi bìa tạp chí là một concept, dùng ảnh gốc độ phân giải cao để hiển thị nét nhất
const covers = [
  {
    concept: "so-mi-trang",
    cover: "/so-mi-trang/so-mi-trang-03.webp",
    title: "JOLIE",
    dark: true,
    pos: "left-[6%] top-[8%] -rotate-[9deg]",
    z: "z-10",
  },
  {
    concept: "lua-hoa-ly-nen-nau",
    cover: "/lua-hoa-ly-nen-nau/lua-hoa-ly-nen-nau-06.webp",
    title: "MUSE",
    dark: false,
    pos: "right-[7%] top-[5%] rotate-[5deg]",
    z: "z-10",
  },
  {
    concept: "hoa-vang",
    cover: "/hoa-vang/hoa-vang-10.webp",
    title: "ÉLAN",
    dark: false,
    pos: "left-[4%] top-[47%] -rotate-[4deg]",
    z: "z-20",
  },
  {
    concept: "mu-hong",
    cover: "/mu-hong/mu-hong-02.webp",
    title: "AURA",
    dark: true,
    pos: "right-[5%] top-[46%] rotate-[3deg]",
    z: "z-20",
  },
  {
    concept: "so-mi-ke",
    cover: "/so-mi-ke/so-mi-ke-04.webp",
    title: "BELLE",
    dark: true,
    pos: "left-[34%] top-[22%] -rotate-[2deg]",
    z: "z-30",
  },
];
const setOf = (i: number) =>
  photos.filter((p) => p.concept === covers[i].concept);

function Cover({
  i,
  onOpen,
  className = "",
}: {
  i: number;
  onOpen: () => void;
  className?: string;
}) {
  const c = covers[i];
  const set = setOf(i);
  return (
    <button
      onClick={onOpen}
      className={`group block w-64 bg-white p-3 text-left shadow-[0_18px_40px_rgba(20,19,18,0.18)] transition-[rotate,translate,box-shadow] duration-500 hover:z-40 hover:-translate-y-3 hover:rotate-0 hover:shadow-[0_30px_60px_rgba(20,19,18,0.25)] md:w-72 lg:w-80 ${className}`}
      aria-label={`Xem bộ ảnh ${c.title}`}
    >
      {/* Tên tạp chí nằm trên dải giấy trắng riêng để luôn đọc rõ */}
      <div className="flex items-end justify-between border-b border-ink/80 pb-1">
        <p className="font-serif text-5xl leading-[0.85] font-semibold tracking-[0.06em] text-ink lg:text-6xl">
          {c.title}
        </p>
        <p className="pb-1 text-right text-[8px] leading-tight tracking-[0.2em] text-ink/70 uppercase">
          No.{String(i + 1).padStart(2, "0")}
          <br />
          Lookbook
        </p>
      </div>
      <div className="relative mt-2 aspect-[3/4] overflow-hidden">
        <Image
          src={c.cover}
          alt=""
          fill
          sizes="(min-width:1024px) 640px, 520px"
          quality={90}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 flex justify-between text-[9px] tracking-[0.2em] text-ink/60 uppercase">
        <span>#JolieStudio</span>
        <span>{set.length} ảnh</span>
      </div>
    </button>
  );
}

// Lookbook kiểu tạp chí: các bìa xếp chồng trên mặt bàn tròn, bấm để xem trọn bộ
export default function Lookbook3D() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="bg-beige">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs tracking-[0.35em] text-stone uppercase">
              Lookbook
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">
              Trọn bộ <em>một buổi chụp</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Mỗi bộ ảnh là một trang bìa — bấm vào để xem trọn những khung hình
            từ cùng một buổi chụp.
          </p>
        </Reveal>

        {/* Desktop: mặt bàn tròn với các bìa tạp chí xếp chồng */}
        <Reveal className="relative hidden h-[880px] lg:block">
          <div className="absolute top-1/2 left-1/2 size-[860px] -translate-1/2 rounded-full bg-white shadow-[inset_0_-20px_60px_rgba(20,19,18,0.06),0_30px_80px_rgba(20,19,18,0.08)]" />
          {covers.map((c, i) => (
            <div
              key={c.title}
              className={`absolute ${c.pos} ${c.z} hover:z-40`}
            >
              <Tilt max={16}>
                <Cover i={i} onOpen={() => setOpen(i)} />
              </Tilt>
            </div>
          ))}
        </Reveal>

        {/* Mobile / tablet: cuộn ngang các bìa */}
        <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pt-4 pb-8 lg:hidden">
          {covers.map((c, i) => (
            <div
              key={c.title}
              className={`shrink-0 snap-center ${i % 2 ? "rotate-2" : "-rotate-2"}`}
            >
              <Cover i={i} onOpen={() => setOpen(i)} />
            </div>
          ))}
        </div>
      </div>

      {/* Xem trọn bộ ảnh */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 p-5 md:p-12"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="mx-auto max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between text-paper">
              <p className="font-serif text-3xl">{covers[open].title}</p>
              <button
                onClick={() => setOpen(null)}
                className="text-3xl"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {setOf(open).map((p) => (
                <div
                  key={p.src}
                  className="relative aspect-[3/4] overflow-hidden bg-paper/10"
                >
                  <Image
                    src={p.src}
                    alt="Lookbook Jolie Studio"
                    fill
                    sizes="(min-width:768px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
