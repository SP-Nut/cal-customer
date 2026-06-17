import { Mail, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/config/contact";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/materials/logo.webp" alt="SP Kansard" className="h-9 w-auto sm:h-11" />
          <div className="min-w-0 hidden sm:block">
            <p className="truncate text-sm font-bold text-slate-900">SP Kansard</p>
            <p className="text-xs text-slate-500">ประสบการณ์กว่า 35 ปี</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${contact.phone}`}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-700 sm:flex"
            aria-label={`โทร ${contact.phone}`}
          >
            <Phone className="h-4 w-4" />
            {contact.phone}
          </a>
          <a
            href={contact.lineUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#06C755] px-3 text-sm font-semibold text-white transition hover:bg-[#05a847]"
            aria-label="ติดต่อทาง LINE"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">LINE</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-brand-700 md:inline-flex"
            aria-label="ส่งอีเมล SP Kansard"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
