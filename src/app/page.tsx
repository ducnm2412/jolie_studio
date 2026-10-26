import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import Lookbook3D from "@/components/Lookbook3D";
import Header from "@/components/Header";
import HeroDepth from "@/components/HeroDepth";
import PhotoStrip from "@/components/PhotoStrip";
import Stickers from "@/components/Stickers";
import Tilt from "@/components/Tilt";
import Carousel3D from "@/components/three/Carousel3D";
import { contact, packages, services } from "@/data/site";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs tracking-[0.35em] text-stone uppercase">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <HeroDepth />

        {/* Dải chữ chạy */}
        <div className="overflow-hidden border-b border-ink/10 bg-ink py-5 text-paper">
          <div className="marquee flex w-max gap-12 font-serif text-2xl whitespace-nowrap italic md:text-3xl">
            {[0, 1].map((k) =>
              [
                "Chân dung",
                "Concept thời trang",
                "Trắng đen nghệ thuật",
                "Beauty",
                "Concept riêng",
              ].map((t) => (
                <span key={`${k}-${t}`} className="flex items-center gap-12">
                  {t}{" "}
                  <span className="text-base not-italic text-paper/40">✦</span>
                </span>
              )),
            )}
          </div>
        </div>

        {/* Giới thiệu */}
        <section
          id="gioi-thieu"
          className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-10 md:py-36"
        >
          <Reveal variant="left" className="grid grid-cols-2 gap-4">
            <div className="relative mt-16 aspect-[2/3] overflow-hidden">
              <Image
                src="/so-mi-trang/so-mi-trang-01.webp"
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
                data-parallax="0.08"
              />
            </div>
            <div className="relative aspect-[2/3] overflow-hidden">
              <Image
                src="/so-mi-ke/so-mi-ke-05.webp"
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
                data-parallax="0.08"
              />
            </div>
          </Reveal>
          <Reveal variant="right">
            <Eyebrow>Về Jolie Studio</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Ánh sáng, bố cục <br />
              và một chút <em>cảm xúc</em>
            </h2>
            <p className="mt-6 leading-relaxed text-ink/75">
              Jolie Studio theo đuổi phong cách tối giản và thanh lịch: ánh sáng
              được tính toán kỹ, bố cục mang tính nghệ thuật, kết hợp ảnh màu
              tông ấm với ảnh trắng đen. Mỗi buổi chụp là một câu chuyện riêng,
              nơi bạn được là chính mình, thoải mái và tự tin trước ống kính.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[
                ["14+", "Concept"],
                ["2", "Phong cách màu & B/W"],
                ["1:1", "Tư vấn riêng"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-serif text-3xl">{n}</dt>
                  <dd className="mt-1 text-xs text-stone">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <PhotoStrip />

        {/* Dịch vụ */}
        <section
          id="dich-vu"
          className="bg-beige pt-24 pb-10 md:pt-36 md:pb-12"
        >
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal className="mb-14 text-center">
              <Eyebrow>Dịch vụ</Eyebrow>
              <h2 className="font-serif text-4xl md:text-5xl">
                Chúng tôi chụp gì
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {services.map((s, i) => (
                <Reveal
                  key={s.title}
                  variant="flip"
                  delay={i * 90}
                  className={i % 2 ? "lg:mt-12" : ""}
                >
                  <Tilt className="group relative aspect-[3/4] overflow-hidden shadow-xl shadow-ink/10">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(min-width:1024px) 20vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Tilt>
                  <p className="mt-4 text-xs text-stone">0{i + 1}</p>
                  <h3 className="mt-1 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {s.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Vòng concept 3D */}
        <section className="overflow-hidden bg-beige pt-2 pb-4 md:pt-6 md:pb-12">
          <Reveal className="px-5 text-center">
            <Eyebrow>Không gian 3D</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl">
              Xoay để chọn concept
            </h2>
            <p className="mt-3 text-sm text-stone">
              Kéo sang trái / phải để xoay
            </p>
          </Reveal>
          <Carousel3D />
        </section>

        {/* Nối cong + sticker chủ đề studio ảnh */}
        <div
          className="relative h-32 overflow-hidden bg-paper md:h-64"
          aria-hidden
        >
          <div className="absolute bottom-[8%] left-1/2 h-[400%] w-[160%] -translate-x-1/2 rounded-[50%] bg-beige" />
          <Stickers />
        </div>

        {/* Bộ sưu tập */}
        <section
          id="bo-suu-tap"
          className="mx-auto max-w-7xl px-5 pt-6 pb-12 md:px-10 md:pb-16"
        >
          <Reveal className="mb-10 text-center">
            <Eyebrow>Bộ sưu tập</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl">
              Concept tại studio
            </h2>
          </Reveal>
          <Gallery />
        </section>

        <Lookbook3D />

        {/* Gói chụp */}
        <section
          id="bang-gia"
          className="border-t border-ink/10 py-24 md:py-36"
        >
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Reveal className="mb-14 text-center">
              <Eyebrow>Gói chụp</Eyebrow>
              <h2 className="font-serif text-4xl md:text-5xl">
                Chọn gói phù hợp
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((p, i) => (
                <Reveal key={p.name} variant="flip" delay={i * 120}>
                  <Tilt
                    max={8}
                    className={`flex h-full flex-col p-10 ${p.featured ? "bg-ink text-paper" : "border border-ink/15 bg-paper"}`}
                  >
                    <h3 className="font-serif text-3xl">{p.name}</h3>
                    <p
                      className={`mt-2 text-sm tracking-[0.2em] uppercase ${p.featured ? "text-paper/60" : "text-stone"}`}
                    >
                      {p.price}
                    </p>
                    <ul className="mt-8 flex-1 space-y-3 text-sm">
                      {p.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span>—</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#dat-lich"
                      className={`mt-10 border py-3 text-center text-xs tracking-[0.2em] uppercase ${
                        p.featured
                          ? "border-paper hover:bg-paper hover:text-ink"
                          : "border-ink hover:bg-ink hover:text-paper"
                      }`}
                    >
                      Chọn gói này
                    </a>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Dải ảnh parallax */}
        <section
          className="relative flex h-[70vh] items-center justify-center bg-cover bg-fixed bg-center"
          style={{ backgroundImage: "url(/hoa-vang/hoa-vang-04.webp)" }}
        >
          <div className="absolute inset-0 bg-ink/40" />
          <Reveal
            variant="zoom"
            className="relative px-5 text-center text-paper"
          >
            <p className="font-serif text-4xl leading-tight italic md:text-6xl">
              “Mỗi khung hình là
              <br />
              một câu chuyện của riêng bạn”
            </p>
          </Reveal>
        </section>

        {/* Đặt lịch */}
        <section
          id="dat-lich"
          className="relative overflow-hidden bg-ink py-24 text-paper md:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-[1fr_1.4fr] md:px-10">
            <Reveal variant="left">
              <p className="mb-4 text-xs tracking-[0.35em] text-paper/50 uppercase">
                Đặt lịch
              </p>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                Hẹn bạn một buổi chụp <em>thật đẹp</em>
              </h2>
              <p className="mt-6 leading-relaxed text-paper/60">
                Để lại thông tin, studio sẽ liên hệ tư vấn concept và xác nhận
                lịch. Hoặc nhắn trực tiếp qua Zalo/Messenger.
              </p>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <BookingForm />
            </Reveal>
          </div>
        </section>

        {/* Liên hệ */}
        <section id="lien-he" className="border-t border-ink/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.webp"
                alt="Jolie Studio"
                width={36}
                height={36}
                className="rounded-sm"
              />
              <div>
                <p className="font-medium tracking-[0.2em]">JOLIE STUDIO</p>
                <p className="text-xs text-stone">
                  Space – Rental · {contact.city}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <a
                href={contact.phoneHref}
                className="font-medium hover:text-stone"
              >
                ☎ {contact.phone}
              </a>
              <a
                href={contact.maps}
                target="_blank"
                rel="noopener"
                className="hover:text-stone"
              >
                Google Maps ↗
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener"
                className="hover:text-stone"
              >
                Facebook
              </a>
              <a
                href={contact.messenger}
                target="_blank"
                rel="noopener"
                className="hover:text-stone"
              >
                Messenger
              </a>
              <a
                href={contact.zalo}
                target="_blank"
                rel="noopener"
                className="hover:text-stone"
              >
                Zalo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink py-4 text-center text-[11px] tracking-wide text-paper/50">
        © 2026 Jolie Studio
      </footer>

      {/* Nút liên hệ nhanh */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
        <a
          href={contact.zalo}
          target="_blank"
          rel="noopener"
          aria-label="Chat Zalo"
          className="grid size-12 place-items-center rounded-full bg-[#0068ff] text-xs font-semibold text-white shadow-lg transition-transform hover:scale-110"
        >
          Zalo
        </a>
        <a
          href={contact.messenger}
          target="_blank"
          rel="noopener"
          aria-label="Chat Messenger"
          className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#00b2ff] to-[#a033ff] text-white shadow-lg transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.26.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .53-.04c.91.25 1.87.38 2.92.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.93 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
          </svg>
        </a>
      </div>
    </>
  );
}
