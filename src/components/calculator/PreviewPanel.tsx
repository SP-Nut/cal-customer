"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import { Maximize2, Ruler, ShieldCheck, X } from "lucide-react";
import { getSizeOption } from "@/data/materials";
import type { Material, QuoteBreakdown, SizeCode } from "@/domain/calculator/types";
import { formatBaht } from "@/lib/format";
import { cn } from "@/lib/cn";

interface PreviewPanelProps {
  material: Material;
  sizeCode: SizeCode;
  breakdown: QuoteBreakdown;
}

type PreviewImage = {
  alt: string;
  src: string;
  title: string;
};

export function PreviewPanel({ material, sizeCode, breakdown }: PreviewPanelProps) {
  const size = getSizeOption(sizeCode);
  const [activeImage, setActiveImage] = useState<PreviewImage | null>(null);

  const materialPreview: PreviewImage = { alt: material.name, src: material.image, title: "ภาพวัสดุ" };
  const sizePreview: PreviewImage = { alt: size.humanLabel, src: size.image, title: "แบบโครงสร้าง" };

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-panel">
      <div className="p-3 sm:p-5">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Preview</p>
            <h2 className="text-lg font-bold text-slate-900">วัสดุและแบบที่เลือก</h2>
          </div>
          <p className="hidden text-xs text-slate-400 sm:block">กดรูปเพื่อดูเต็มจอ</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-[minmax(0,1fr)_200px]">
          <ImagePreviewButton
            image={materialPreview}
            className="aspect-[4/3]"
            onOpen={setActiveImage}
          />
          <ImagePreviewButton
            image={sizePreview}
            className="aspect-[4/3]"
            onOpen={setActiveImage}
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50 p-3 sm:grid-cols-4">
        <Stat label="วัสดุ" value={material.shortName} />
        <Stat label="โครง" value={size.label} />
        <Stat
          icon={<Ruler className="h-3.5 w-3.5" />}
          label="พื้นที่"
          value={breakdown.area > 0 ? `${breakdown.area.toFixed(1)} ตร.ม.` : "—"}
        />
        <Stat
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          label="ราคา"
          value={breakdown.subtotal > 0 ? formatBaht(breakdown.subtotal) : "—"}
          strong
        />
      </div>

      {/* Lightbox modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 p-3 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          onClick={() => setActiveImage(null)}
        >
          <div
            className="mx-auto flex h-full max-w-6xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-3 text-white">
              <div className="min-w-0">
                <p className="text-xs text-slate-400">{activeImage.title}</p>
                <h3 className="truncate text-base font-bold">{activeImage.alt}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                aria-label="ปิดรูปเต็มจอ"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid min-h-0 flex-1 place-items-center overflow-hidden rounded-xl bg-white">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={1200}
                height={800}
                className="max-h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({
  icon,
  label,
  strong,
  value
}: {
  icon?: ReactNode;
  label: string;
  strong?: boolean;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-lg bg-white px-2 py-2">
      <div className="flex items-center gap-1 text-xs text-slate-400">
        {icon}
        <span>{label}</span>
      </div>
      <p
        className={cn(
          "mt-0.5 truncate",
          strong ? "text-sm font-bold text-brand-700 sm:text-base" : "text-sm font-semibold text-slate-800"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function ImagePreviewButton({
  className,
  image,
  onOpen
}: {
  className: string;
  image: PreviewImage;
  onOpen: (image: PreviewImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(image)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-left sm:rounded-xl",
        className
      )}
      aria-label={`ดูรูปใหญ่: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-[#1A2F5C]/90 to-transparent p-2 text-white sm:gap-3 sm:p-3">
        <span className="min-w-0">
          <span className="hidden text-xs text-white/70 sm:block">{image.title}</span>
          <span className="block truncate text-xs font-semibold sm:text-sm">{image.alt}</span>
        </span>
        <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-white/20 sm:h-8 sm:w-8 sm:rounded-lg">
          <Maximize2 className="h-3.5 w-3.5" />
        </span>
      </span>
    </button>
  );
}
