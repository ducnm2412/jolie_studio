import Image from "next/image";

// Polaroid có ảnh thật + băng dính giấy
function Polaroid({ src, caption, className = "" }: { src: string; caption: string; className?: string }) {
  return (
    <div className={`sticker absolute bg-white p-2 pb-8 shadow-[0_10px_25px_rgba(20,19,18,0.18)] ${className}`}>
      <span className="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-4deg] bg-[#e7d3b8]/80" />
      <div className="relative size-20 overflow-hidden md:size-28">
        <Image src={src} alt="" fill sizes="112px" className="object-cover" />
      </div>
      <p className="absolute inset-x-0 bottom-1.5 text-center font-script text-lg text-ink/80">{caption}</p>
    </div>
  );
}

// Dải phim với lỗ răng cưa và 3 khung ảnh nhỏ
function FilmStrip({ srcs, className = "" }: { srcs: string[]; className?: string }) {
  const holes = (
    <div className="flex justify-between px-1">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="h-1.5 w-2.5 rounded-[1px] bg-paper/80" />
      ))}
    </div>
  );
  return (
    <div className={`sticker absolute bg-[#1d1a18] py-1.5 shadow-[0_10px_25px_rgba(20,19,18,0.25)] ${className}`}>
      {holes}
      <div className="my-1.5 flex gap-1.5 px-1.5">
        {srcs.map((s) => (
          <div key={s} className="relative h-16 w-12 overflow-hidden md:h-20 md:w-14">
            <Image src={s} alt="" fill sizes="56px" className="object-cover sepia-[.25]" />
          </div>
        ))}
      </div>
      {holes}
      <p className="mt-0.5 px-2 text-[8px] tracking-[0.3em] text-[#e9b04a]">JOLIE 400 · 24</p>
    </div>
  );
}

// Máy ảnh cổ vẽ bằng SVG
function Camera({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 86" className={`sticker absolute drop-shadow-[0_8px_14px_rgba(20,19,18,0.25)] ${className}`}>
      <rect x="14" y="6" width="26" height="12" rx="3" fill="#2a2522" />
      <rect x="84" y="9" width="16" height="9" rx="2" fill="#c9b79c" />
      <rect x="4" y="16" width="112" height="64" rx="10" fill="#2a2522" />
      <rect x="4" y="30" width="112" height="36" fill="#a8896a" />
      <circle cx="60" cy="48" r="26" fill="#1a1716" />
      <circle cx="60" cy="48" r="20" fill="#3b3330" stroke="#c9b79c" strokeWidth="2" />
      <circle cx="60" cy="48" r="12" fill="#22303f" />
      <circle cx="55" cy="43" r="4" fill="#ffffff" opacity="0.55" />
      <circle cx="100" cy="24" r="4" fill="#d24b3e" />
      <text x="16" y="76" fill="#c9b79c" fontSize="7" letterSpacing="2">JOLIE</text>
    </svg>
  );
}

// Khung ngắm có REC nhấp nháy và thông số phơi sáng
function Viewfinder({ className = "" }: { className?: string }) {
  const c = "absolute size-4 border-ink";
  return (
    <div className={`sticker absolute h-20 w-32 md:h-24 md:w-40 ${className}`}>
      <span className={`${c} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${c} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${c} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${c} right-0 bottom-0 border-r-2 border-b-2`} />
      <span className="absolute top-1/2 left-1/2 size-5 -translate-1/2">
        <span className="absolute top-1/2 left-0 h-px w-full bg-ink/60" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-ink/60" />
      </span>
      <p className="absolute top-2 left-3 flex items-center gap-1 text-[9px] font-semibold tracking-widest text-ink">
        <span className="blink size-1.5 rounded-full bg-[#d24b3e]" /> REC
      </p>
      <p className="absolute right-3 bottom-2 text-[8px] tracking-widest text-ink/70">1/125 · f2.8 · ISO 100</p>
    </div>
  );
}

// Khẩu độ ống kính xoay chậm
function Aperture({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={`spin-slow absolute ${className}`}>
      <circle r="48" fill="#2a2522" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d="M0 -44 L30 -12 L8 6 Z" fill="#c9b79c" opacity={0.55 + (i % 2) * 0.25} transform={`rotate(${i * 60})`} />
      ))}
      <circle r="10" fill="#1a1716" />
    </svg>
  );
}

// Dải sticker chủ đề studio ảnh, đặt trên phần nối cong
export default function Stickers() {
  return (
    <>
      <Polaroid src="/so-mi-ke/so-mi-ke-04.webp" caption="Jolie ♡" className="top-6 left-[3%] -rotate-[8deg] md:top-6 md:left-[8%]" />
      <Camera className="top-16 left-[24%] hidden w-28 -rotate-6 md:block [animation-delay:-1s]" />
      <FilmStrip
        srcs={["/hoa-vang/hoa-vang-03.webp", "/mu-hong/mu-hong-02.webp", "/vest-den/vest-den-01.webp"]}
        className="top-8 left-[40%] hidden rotate-[4deg] md:block [animation-delay:-2s]"
      />
      <Viewfinder className="top-10 right-[25%] hidden -rotate-3 md:block [animation-delay:-1.5s]" />
      <Polaroid src="/ao-dai-tra/ao-dai-tra-03.webp" caption="say cheese!" className="top-8 right-[3%] rotate-[7deg] md:right-[8%] [animation-delay:-2.5s]" />
      <Aperture className="top-28 left-[34%] hidden size-12 md:block" />
    </>
  );
}
