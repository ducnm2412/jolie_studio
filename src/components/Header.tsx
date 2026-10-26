"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const nav = [
  ["#gioi-thieu", "Giới thiệu"],
  ["#dich-vu", "Dịch vụ"],
  ["#bo-suu-tap", "Bộ sưu tập"],
  ["#bang-gia", "Gói chụp"],
  ["#lien-he", "Liên hệ"],
];

// Navbar trong suốt nổi trên hero, cuộn xuống thì hiện nền sáng; mobile có menu hamburger
export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = solid && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-500 ${
        light ? "bg-paper/85 text-ink shadow-sm backdrop-blur" : "bg-transparent text-paper"
      }`}
    >
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
        <a href="#" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/brand/logo.webp" alt="Jolie Studio" width={40} height={40} className="rounded-sm" />
          <span className="font-serif text-xl tracking-[0.2em]">JOLIE</span>
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          {nav.map(([href, label]) => (
            <a key={href} href={href} className="opacity-90 transition-opacity hover:opacity-60">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#dat-lich"
            className={`hidden border border-current px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors sm:block ${
              light ? "hover:bg-ink hover:text-paper" : "hover:bg-paper hover:text-ink"
            }`}
          >
            Đặt lịch
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            className="relative size-10 md:hidden"
          >
            <span className={`absolute left-2 h-px w-6 bg-current transition-all duration-300 ${open ? "top-5 rotate-45" : "top-[15px]"}`} />
            <span className={`absolute left-2 h-px w-6 bg-current transition-all duration-300 ${open ? "top-5 -rotate-45" : "top-[25px]"}`} />
          </button>
        </div>
      </div>

      {/* Menu toàn màn hình trên mobile */}
      <div
        className={`fixed inset-0 bg-ink text-paper transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-6 px-8">
          {nav.map(([href, label], i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-serif text-4xl transition-[opacity,translate] duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
            >
              {label}
            </a>
          ))}
          <a
            href="#dat-lich"
            onClick={() => setOpen(false)}
            className="mt-6 self-start bg-paper px-8 py-4 text-xs tracking-[0.25em] text-ink uppercase"
          >
            Đặt lịch chụp
          </a>
        </nav>
      </div>
    </header>
  );
}
