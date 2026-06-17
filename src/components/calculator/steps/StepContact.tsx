import { AlertTriangle, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ContactInfo, QuoteBreakdown, CalculatorInput } from "@/domain/calculator/types";
import { getMaterial, getSizeOption } from "@/data/materials";
import { formatBaht } from "@/lib/format";
import type { SubmitStatus, QuoteResult } from "@/hooks/useQuoteSubmit";

interface StepContactProps {
  contact: ContactInfo;
  input: CalculatorInput;
  breakdown: QuoteBreakdown;
  onContactChange: (update: Partial<ContactInfo>) => void;
  onSubmit: () => void;
  submitStatus: SubmitStatus;
  submitResult: QuoteResult | null;
  submitError: string | null;
  errors: string[];
}

export function StepContact({
  contact,
  input,
  breakdown,
  onContactChange,
  onSubmit,
  submitStatus,
  submitResult,
  submitError,
  errors
}: StepContactProps) {
  const material = getMaterial(input.materialId);
  const size = getSizeOption(input.sizeCode);

  if (submitStatus === "success" && submitResult) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-emerald-50 p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-emerald-900">ส่งสำเร็จแล้ว!</h2>
            <p className="mt-1 text-sm text-emerald-700">
              ทีมงานจะโทรกลับภายใน 2 ชั่วโมง (วันจ-ศ 8:00–18:00)
            </p>
          </div>
        </div>

        <a
          href="https://lin.ee/SJ245co"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          ติดต่อทาง LINE ได้เลย
        </a>

        <p className="text-center text-xs text-slate-500">
          หรือโทร{" "}
          <a href="tel:0849097777" className="font-semibold text-brand-600">
            084-909-7777
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">ข้อมูลติดต่อ</h2>
        <p className="mt-0.5 text-sm text-slate-500">กรอกข้อมูลเพื่อรับใบเสนอราคาอย่างเป็นทางการ</p>
      </div>

      {/* Price summary */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">สรุปราคาประเมิน</p>
        <div className="space-y-1.5">
          {breakdown.materialLine && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 truncate pr-2">{material.name} / {size.humanLabel}</span>
              <span className="font-semibold shrink-0">{formatBaht(breakdown.materialLine.amount)}</span>
            </div>
          )}
          {breakdown.addOnLines.map((line) => (
            <div key={line.id} className="flex justify-between text-sm">
              <span className="text-slate-600 truncate pr-2">{line.label}</span>
              <span className="font-semibold shrink-0">{formatBaht(line.amount)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
          <p className="text-sm text-slate-500">ราคาประเมินรวม</p>
          <p className="text-2xl font-bold text-brand-700">{formatBaht(breakdown.subtotal)}</p>
        </div>
        {breakdown.warnings.length > 0 && (
          <div className="flex gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-none" />
            <p>{breakdown.warnings[0]}</p>
          </div>
        )}
        <p className="text-xs text-slate-400">* ราคาประเมินเบื้องต้น ไม่รวม VAT ขึ้นกับหน้างานจริง</p>
      </div>

      {/* Contact form */}
      <div className="space-y-3">
        <Input
          label="ชื่อ-นามสกุล"
          type="text"
          value={contact.name}
          placeholder="กรุณาระบุชื่อ-นามสกุล"
          required
          autoComplete="name"
          onChange={(e) => onContactChange({ name: e.target.value })}
        />
        <Input
          label="เบอร์โทรศัพท์"
          type="tel"
          value={contact.phone}
          placeholder="เช่น 0891234567"
          required
          autoComplete="tel"
          onChange={(e) => onContactChange({ phone: e.target.value })}
        />
        <Input
          label="Line ID"
          type="text"
          value={contact.lineId}
          placeholder="ไม่บังคับ"
          autoComplete="off"
          onChange={(e) => onContactChange({ lineId: e.target.value })}
        />
        <div className="flex flex-col gap-1">
          <label htmlFor="note-input" className="text-sm font-semibold text-slate-700">
            หมายเหตุ / รายละเอียดเพิ่มเติม
          </label>
          <textarea
            id="note-input"
            value={contact.note}
            placeholder="เช่น ต้องการสีพิเศษ หรือรูปแบบงานเพิ่มเติม"
            rows={3}
            className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400 transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            onChange={(e) => onContactChange({ note: e.target.value })}
          />
        </div>
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700 space-y-1">
          {errors.map((err, i) => (
            <p key={i} className="flex items-start gap-1.5">
              <span className="mt-0.5 shrink-0">•</span>
              {err}
            </p>
          ))}
        </div>
      )}

      {/* Submit error */}
      {submitError && (
        <div className="flex gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" />
          <p>{submitError}</p>
        </div>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={onSubmit}
        loading={submitStatus === "loading"}
        disabled={submitStatus === "loading"}
      >
        <Send className="h-4 w-4" />
        ส่งคำขอใบเสนอราคา {formatBaht(breakdown.subtotal)}
      </Button>

      <p className="text-center text-xs text-slate-400">
        ข้อมูลของคุณจะถูกส่งให้ทีม SP Kansard เท่านั้น ไม่มีการเปิดเผยต่อบุคคลที่สาม
      </p>
    </div>
  );
}
