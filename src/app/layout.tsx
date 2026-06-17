import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-prompt",
  display: "swap"
});

export const metadata: Metadata = {
  title: "SP Kansard | คำนวณราคากันสาดออนไลน์",
  description:
    "คำนวณราคาหลังคากันสาดเบื้องต้นได้ทันที เลือกวัสดุ ขนาด บริการเสริม และส่งคำขอใบเสนอราคาให้ทีม SP Kansard ประสบการณ์กว่า 35 ปี",
  openGraph: {
    title: "SP Kansard | คำนวณราคากันสาดออนไลน์",
    description: "คำนวณราคาหลังคากันสาดเบื้องต้น เลือกวัสดุ ขนาด บริการเสริม ส่งคำขอใบเสนอราคาได้ทันที",
    url: "https://spkansard.com",
    siteName: "SP Kansard",
    locale: "th_TH",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#243F7A"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

