"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "zoom" | "flip";

// Hiện dần khi cuộn tới. Dùng threshold 0 + rootMargin để phần tử cao (lưới ảnh, bàn tạp chí)
// vẫn kích hoạt được trên màn hình nhỏ; trình duyệt không có IntersectionObserver thì hiện ngay.
export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
