"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/data/site";

// Mỗi slide: ảnh người mẫu đã tách nền + bảng màu + chữ lớn + câu viết tay riêng
const slides = [
  {
    cut: "/hero/so-mi-ke-01-cut.webp",
    bg: "#241a17",
    glow: "#7a4a3a",
    accent: "#e9c6ab",
    word: "JOLIE",
    script: ["Giữ lại", "vẻ đẹp", "của riêng bạn."],
  },
  {
    cut: "/hero/vest-den-02-cut-v2.webp",
    bg: "#171b26",
    glow: "#3d4a6b",
    accent: "#c9d5ea",
    word: "STYLE",
    script: ["Cá tính", "theo cách", "của bạn."],
  },
  {
    cut: "/hero/denim-trang-01-cut.webp",
    bg: "#1f241d",
    glow: "#4f5d42",
    accent: "#dfe3c8",
    word: "FRESH",
    script: ["Trẻ trung", "tự nhiên", "như chính bạn."],
  },
  {
    cut: "/hero/trang-hoa-ly-04-cut.webp",
    bg: "#2a1519",
    glow: "#6e3540",
    accent: "#f0cccc",
    word: "BEAUTY",
    script: ["Rạng rỡ", "trong từng", "khoảnh khắc."],
  },
];
const DURATION = 6500;

// Hero kiểu poster: chữ khổng lồ phía sau, người mẫu tách nền đè lên,
// chữ viết tay bên trái, thông tin + nút bên phải; tự đổi slide
export default function HeroDepth() {
  const [i, setI] = useState(0);
  const model = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const s = slides[i];

  useEffect(() => {
    const id = setTimeout(() => setI((v) => (v + 1) % slides.length), DURATION);
    return () => clearTimeout(id);
  }, [i]);

  useEffect(() => {
    const m = { x: 0, y: 0, cx: 0, cy: 0 };
    const onMove = (e: PointerEvent) => {
      m.x = e.clientX / innerWidth - 0.5;
      m.y = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (scrollY > innerHeight) return;
      m.cx += (m.x - m.cx) * 0.06;
      m.cy += (m.y - m.cy) * 0.06;
      const sc = scrollY / innerHeight;
      model.current!.style.translate = `${m.cx * 16}px ${sc * -30}px`;
      word.current!.style.translate = `${m.cx * -28}px ${m.cy * -10 + sc * 140}px`;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden pt-16 transition-colors duration-1000 md:h-svh md:min-h-[680px]"
      style={{ background: s.bg, color: s.accent }}
    >
      {/* Chữ khổng lồ — cỡ chữ theo số ký tự và chiều cao màn hình để không đè lên phần thông tin */}
      <div ref={word} className="absolute inset-x-0 top-[13%] z-0 flex justify-center md:top-[15%]">
        <span
          key={s.word}
          className="word-in font-display leading-[0.8] tracking-[-0.01em] select-none"
          style={{ fontSize: `min(${190 / s.word.length}vw, ${230 / s.word.length}vh)` }}
          aria-hidden
        >
          {s.word}
        </span>
      </div>

      {/* Quầng sáng sau người mẫu */}
      <div
        className="absolute top-[30%] left-1/2 z-0 size-[70vw] -translate-x-1/2 rounded-full opacity-40 blur-[90px] transition-colors duration-1000 md:size-[38vw]"
        style={{ background: s.glow }}
      />

      {/* Người mẫu tách nền */}
      <div className="relative z-10 mx-auto mt-[14vw] h-[78vw] w-[78vw] md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:h-[84%] md:w-[38vw] md:-translate-x-1/2">
        <div ref={model} className="absolute inset-0">
          <div key={s.cut} className="hero-in absolute inset-0">
            <Image
              src={s.cut}
              alt="Chân dung nghệ thuật tại Jolie Studio"
              fill
              priority={i === 0}
              sizes="(min-width:768px) 38vw, 78vw"
              className="object-cover object-top"
            />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-1/4 transition-colors duration-1000 md:hidden"
            style={{ background: `linear-gradient(to top, ${s.bg}, transparent)` }}
          />
        </div>
      </div>

      {/* Chữ viết tay bên trái */}
      <div className="absolute top-[calc(4rem+56vw)] left-0 z-20 px-5 md:top-auto md:bottom-[14%] md:left-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] md:px-0 md:pt-0">
        <p key={s.word} className="word-in -rotate-6 font-script text-3xl leading-[0.95] font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-7xl md:drop-shadow-none">
          {s.script[0]}
          <br />
          {s.script[1]}
          <br />
          <span className="pl-10">{s.script[2]}</span>
        </p>
        <svg viewBox="0 0 220 20" className="mt-2 ml-6 w-28 -rotate-6 md:mt-3 md:ml-8 md:w-48" aria-hidden>
          <path d="M2 14 C 60 2, 140 2, 218 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Thông tin bên phải */}
      <div className="relative z-20 px-5 pt-6 pb-16 md:absolute md:right-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] md:bottom-[10%] md:w-72 md:px-0 md:pt-0 md:pb-0">
        <p className="flex items-center gap-3 font-display text-2xl tracking-[0.12em] uppercase">
          Jolie Studio <span className="text-base">✦</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          Chân dung, concept thời trang và ảnh nghệ thuật trắng đen — ánh sáng tinh tế, bố cục thoáng, đúng chất riêng của bạn.
        </p>
        <p className="mt-4 text-[11px] tracking-[0.3em] uppercase">{contact.city}</p>
        <div className="mt-6 flex gap-3 text-[11px] tracking-[0.2em] uppercase">
          <a
            href="#dat-lich"
            className="px-5 py-3 transition-[opacity,background-color] duration-1000 hover:opacity-80"
            style={{ background: s.accent, color: s.bg }}
          >
            Đặt lịch
          </a>
          <a href="#bo-suu-tap" className="border border-current px-5 py-3 transition-colors hover:bg-white/5">
            Bộ sưu tập
          </a>
        </div>
      </div>

      {/* Chỉ số slide */}
      <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 md:flex">
        {slides.map((sl, k) => (
          <button
            key={sl.word}
            onClick={() => setI(k)}
            aria-label={`Slide ${k + 1}`}
            className="relative h-0.5 w-10 overflow-hidden bg-current/25"
          >
            {k === i && <span key={i} className="slide-progress absolute inset-0 origin-left bg-current" style={{ animationDuration: `${DURATION}ms` }} />}
          </button>
        ))}
      </div>
    </section>
  );
}
