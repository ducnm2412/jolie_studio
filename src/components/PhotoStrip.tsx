import Image from "next/image";
import { photos } from "@/data/photos";

const pool = photos.filter((p) => p.concept !== "lookbook");
const rowA = pool.filter((_, i) => i % 2 === 0).slice(0, 16);
const rowB = pool.filter((_, i) => i % 2 === 1).slice(0, 16);

function Row({ list, reverse }: { list: typeof pool; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className={`marquee flex w-max gap-3 ${reverse ? "[animation-direction:reverse]" : ""}`} style={{ animationDuration: "70s" }}>
        {[...list, ...list].map((p, i) => (
          <div key={i} className="relative h-56 w-40 shrink-0 overflow-hidden md:h-80 md:w-56">
            <Image src={p.src} alt="" fill sizes="224px" className="object-cover grayscale-[30%] transition duration-500 hover:scale-105 hover:grayscale-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Hai hàng ảnh chạy ngược chiều nhau
export default function PhotoStrip() {
  return (
    <section className="space-y-3 py-6" aria-label="Ảnh tại studio">
      <Row list={rowA} />
      <Row list={rowB} reverse />
    </section>
  );
}
