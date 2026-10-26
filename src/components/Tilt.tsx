"use client";

import { useRef, type ReactNode } from "react";

// Thẻ nghiêng 3D theo vị trí chuột, kèm vệt sáng bóng
export default function Tilt({ children, className = "", max = 12 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateY(${(x - 0.5) * max}deg) rotateX(${(0.5 - y) * max}deg) scale(1.02)`;
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const reset = () => {
    ref.current!.style.transform = "";
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
