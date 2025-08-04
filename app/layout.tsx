import type { Metadata } from 'next';
import { Prompt, Inter } from 'next/font/google';
import './globals.css';

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-prompt',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'SP Kansard Calculator - ระบบคำนวณราคากันสาดและหลังคา',
  description: 'ระบบคำนวณราคากันสาดและหลังคาออนไลน์ที่แม่นยำและใช้งานง่าย สำหรับงานติดตั้งคุณภาพสูง',
  keywords: 'กันสาด, หลังคา, คำนวณราคา, ติดตั้งกันสาด, วัสดุก่อสร้าง',
  authors: [{ name: 'SP Kansard Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`scroll-smooth ${prompt.variable} ${inter.variable}`}>
      <body className="antialiased bg-gray-50 text-gray-900 font-prompt selection:bg-primary-100 selection:text-primary-900">
        {children}
      </body>
    </html>
  );
}
