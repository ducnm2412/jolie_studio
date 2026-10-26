"use client";

import { useEffect, useRef } from "react";

// Thanh tiến trình cuộn + ảnh trôi nhẹ theo cuộn ([data-parallax="tốc độ"]).
// Chỉ tính toán khi có sự kiện cuộn (không chạy vòng lặp liên tục) để nhẹ máy;
// parallax chỉ bật trên màn hình rộng có chuột và khi không bật chế độ giảm chuyển động.
export default function PageFx() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parallaxOn =
      matchMedia("(min-width: 768px) and (pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current!.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (!parallaxOn) return;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const off = (r.top + r.height / 2 - innerHeight / 2) * Number(el.dataset.parallax || 0.1);
        el.style.transform = `translate3d(0, ${off}px, 0) scale(1.12)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={bar}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#c9b79c] via-ink to-[#c9b79c]"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
