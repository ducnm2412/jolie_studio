import type { Metadata } from "next";
import { Anton, Cormorant_Garamond, Dancing_Script, Manrope } from "next/font/google";
import PageFx from "@/components/PageFx";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans-vn",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif-vn",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const display = Anton({
  variable: "--font-display-vn",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

const script = Dancing_Script({
  variable: "--font-script-vn",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Jolie Studio — Chụp ảnh chân dung & concept tại TP Hồ Chí Minh",
  description:
    "Jolie Studio: chụp ảnh chân dung, concept thời trang, nghệ thuật trắng đen và beauty. Phong cách tối giản, thanh lịch.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable} ${display.variable} ${script.variable} antialiased`}>
      <body>
        <PageFx />
        {children}
      </body>
    </html>
  );
}
