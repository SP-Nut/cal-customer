import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';

const notoSansThai = Noto_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ระบบคำนวณราคากันสาด',
  description: 'ระบบคำนวณราคากันสาดออนไลน์',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className={`${notoSansThai.className} antialiased`}>{children}</body>
    </html>
  );
}
