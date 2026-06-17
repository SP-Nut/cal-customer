"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, Send, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TopBar } from "@/components/layout/TopBar";
import { PreviewPanel } from "./PreviewPanel";
import { StepCategory } from "./steps/StepCategory";
import { StepMaterial } from "./steps/StepMaterial";
import { StepStructure } from "./steps/StepStructure";
import { StepDimensions } from "./steps/StepDimensions";
import { StepAddOns } from "./steps/StepAddOns";
import { useCalculator } from "@/hooks/useCalculator";
import { useQuoteSubmit } from "@/hooks/useQuoteSubmit";
import { validateStep } from "@/domain/calculator/validation";
import { materials } from "@/data/materials";
import { formatBaht } from "@/lib/format";

const STEP_LABELS = [
  "ประเภท",
  "วัสดุ",
  "โครงสร้าง",
  "พื้นที่",
  "บริการเสริม"
];

export function CalculatorWizard() {
  const calc = useCalculator();
  const quoteSubmit = useQuoteSubmit();
  const stepSectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const [quickContactOpen, setQuickContactOpen] = useState(false);
  const [quickContactAttempted, setQuickContactAttempted] = useState(false);

  const selectedMaterial = materials.find((m) => m.id === calc.input.materialId) ?? materials[0];
  const isLastStep = calc.step === calc.totalSteps;
  const contactValidation = validateStep(6, calc.input, calc.contact);
  const progressPercent =
    calc.totalSteps > 1 ? ((calc.step - 1) / (calc.totalSteps - 1)) * 100 : 100;

  useEffect(() => {
    window.requestAnimationFrame(() => {
      stepSectionRefs.current[calc.step]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }, [calc.step]);

  function openContactPopup() {
    const validation = validateStep(4, calc.input, calc.contact);
    if (!validation.valid) return;
    setQuickContactAttempted(false);
    setQuickContactOpen(true);
  }

  function handleQuickContactSubmit() {
    setQuickContactAttempted(true);
    const validation = validateStep(6, calc.input, calc.contact);
    if (!validation.valid) return;
    quoteSubmit.submit(calc.input, calc.breakdown, calc.contact);
  }

  function handleNext() {
    if (isLastStep) {
      openContactPopup();
    } else {
      calc.nextStep();
    }
  }

  function handleStepSliderChange(value: string) {
    const nextStep = Number(value);
    if (nextStep <= calc.step) {
      calc.goToStep(nextStep);
    }
  }

  function patchAndReveal(update: Partial<typeof calc.input>, nextStep: number) {
    calc.patch(update);
    if (calc.step < nextStep) {
      calc.goToStep(nextStep);
    }
  }

  function renderFlowSection(stepNum: number, children: ReactNode) {
    const current = stepNum === calc.step;

    return (
      <section
        key={stepNum}
        ref={(node) => {
          stepSectionRefs.current[stepNum] = node;
        }}
        className={cn(
          "scroll-mt-24 border-b border-slate-100 p-3 transition-colors last:border-b-0 sm:p-4",
          current ? "bg-white" : "bg-slate-50/40"
        )}
      >
        <div className="mb-2 flex items-center gap-2">
          <span
            className={cn(
              "grid h-6 w-6 flex-none place-items-center rounded-full text-xs font-bold",
              current ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-600"
            )}
          >
            {stepNum}
          </span>
          <p className={cn("text-sm font-bold", current ? "text-brand-700" : "text-slate-500")}>
            {STEP_LABELS[stepNum - 1]}
          </p>
        </div>
        {children}
      </section>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-100">
      <TopBar />

      {/* Mobile: sticky bottom price bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/98 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.10)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500">ราคาประเมิน</p>
            <p className="text-xl font-bold text-brand-700">
              {calc.breakdown.subtotal > 0 ? formatBaht(calc.breakdown.subtotal) : "-"}
            </p>
          </div>
          <div className="flex gap-2">
            {calc.step > 1 && (
              <Button variant="secondary" size="sm" onClick={calc.prevStep}>
                ← ย้อน
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleNext}
              disabled={!calc.stepValidation.valid && !isLastStep}
              loading={quoteSubmit.status === "loading"}
              className="px-5"
            >
              {isLastStep ? "ติดต่อกลับ" : "ถัดไป →"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-3 px-3 py-3 pb-28 sm:gap-4 sm:px-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-6 lg:py-5 lg:pb-5">
        {/* Left: Preview panel (sticky on desktop) */}
        <div className="order-2 lg:sticky lg:top-[72px] lg:order-1 lg:self-start">
          <PreviewPanel
            material={selectedMaterial}
            sizeCode={calc.input.sizeCode}
            breakdown={calc.breakdown}
          />
        </div>

        {/* Right: Wizard */}
        <aside className="order-1 flex flex-col gap-3 lg:order-2">
          {/* Step progress */}
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-card sm:px-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-500">
                  ขั้นตอน {calc.step}/{calc.totalSteps}
                </p>
                <p className="mt-0.5 truncate text-sm font-bold text-brand-700">
                  {STEP_LABELS[calc.step - 1]}
                </p>
              </div>
              <p className="text-xs font-semibold text-brand-600">
                {Math.round((calc.step / calc.totalSteps) * 100)}%
              </p>
            </div>

            <div className="relative px-1 py-2">
              <div className="pointer-events-none absolute inset-x-1 top-1/2 flex -translate-y-1/2 justify-between">
                {STEP_LABELS.map((label, i) => {
                  const stepNum = i + 1;
                  const reached = stepNum <= calc.step;
                  return (
                    <span
                      key={stepNum}
                      aria-hidden="true"
                      className={cn(
                        "h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm",
                        reached ? "bg-brand-600" : "bg-slate-300"
                      )}
                      title={label}
                    />
                  );
                })}
              </div>
              <input
                type="range"
                min={1}
                max={calc.totalSteps}
                step={1}
                value={calc.step}
                onChange={(event) => handleStepSliderChange(event.target.value)}
                aria-label="ย้อนกลับไปขั้นตอนก่อนหน้า"
                aria-valuetext={`${calc.step} ${STEP_LABELS[calc.step - 1]}`}
                className="relative z-10 h-2 w-full cursor-pointer appearance-none rounded-full bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-brand-200 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand-700 [&::-moz-range-thumb]:shadow-md [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand-700 [&::-webkit-slider-thumb]:shadow-md"
                style={{
                  background: `linear-gradient(to right, #24427f 0%, #24427f ${progressPercent}%, #e2e8f0 ${progressPercent}%, #e2e8f0 100%)`
                }}
              />
            </div>

            <div className="mt-1 hidden justify-between gap-2 text-xs text-slate-400 sm:flex">
              {STEP_LABELS.map((label, i) => {
                const stepNum = i + 1;
                const current = stepNum === calc.step;
                return (
                  <button
                    key={stepNum}
                    type="button"
                    aria-current={current ? "step" : undefined}
                    aria-label={`ขั้นตอน ${stepNum}: ${label}`}
                    onClick={() => {
                      if (stepNum <= calc.step) calc.goToStep(stepNum);
                    }}
                    className={cn(
                      "min-w-0 flex-1 truncate text-center transition-colors disabled:cursor-default",
                      stepNum <= calc.step ? "cursor-pointer hover:text-brand-600" : "",
                      current ? "font-bold text-brand-700" : "text-slate-400"
                    )}
                    disabled={stepNum > calc.step}
                    title={label}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-card lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto">
            {calc.step >= 1 &&
              renderFlowSection(
                1,
                <StepCategory
                  value={calc.input}
                  onChange={(update) => patchAndReveal(update, 2)}
                />
              )}
            {calc.step >= 2 &&
              renderFlowSection(
                2,
                <StepMaterial
                  value={calc.input}
                  onChange={(update) => patchAndReveal(update, 3)}
                />
              )}
            {calc.step >= 3 &&
              renderFlowSection(
                3,
                <StepStructure
                  value={calc.input}
                  onChange={(update) => patchAndReveal(update, 4)}
                />
              )}
            {calc.step >= 4 &&
              renderFlowSection(
                4,
                <StepDimensions
                  value={calc.input}
                  onChange={calc.patch}
                  onInstallationSelect={calc.patchAndNext}
                  onQuickSubmit={openContactPopup}
                  quickSubmitStatus={quoteSubmit.status}
                  canQuickSubmit={validateStep(4, calc.input, calc.contact).valid}
                />
              )}
            {calc.step >= 5 &&
              renderFlowSection(
                5,
                <StepAddOns
                  value={calc.input}
                  onToggle={calc.toggleAddOn}
                  onChange={calc.patch}
                />
              )}
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center justify-between gap-3 lg:flex">
            <Button
              variant="secondary"
              onClick={calc.prevStep}
              disabled={calc.step === 1}
              className="min-w-[100px]"
            >
              ← ย้อนกลับ
            </Button>

            {!isLastStep ? (
              <Button
                onClick={calc.nextStep}
                disabled={!calc.stepValidation.valid}
                className="min-w-[140px]"
              >
                ถัดไป →
              </Button>
            ) : (
              quoteSubmit.status !== "success" && (
                <Button
                  onClick={openContactPopup}
                  loading={quoteSubmit.status === "loading"}
                  disabled={!validateStep(4, calc.input, calc.contact).valid || quoteSubmit.status === "loading"}
                  className="min-w-[200px]"
                >
                  <Send className="h-4 w-4" />
                  ขอให้ติดต่อกลับ
                </Button>
              )
            )}
          </div>
        </aside>
      </div>

      {quickContactOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 px-3 py-4 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-contact-title"
            className="w-full max-w-md rounded-xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
              <div>
                <h2 id="quick-contact-title" className="text-lg font-bold text-slate-900">
                  ข้อมูลติดต่อกลับ
                </h2>
                <p className="mt-0.5 text-sm text-slate-500">
                  กรอกชื่อและเบอร์โทรก่อนส่งข้อมูลประเมินราคา
                </p>
              </div>
              <button
                type="button"
                aria-label="ปิดหน้าต่างข้อมูลติดต่อ"
                onClick={() => setQuickContactOpen(false)}
                className="grid h-9 w-9 flex-none place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-4 py-4">
              {quoteSubmit.status === "success" && quoteSubmit.result ? (
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-sm font-bold text-emerald-900">ส่งข้อมูลเรียบร้อยแล้ว</p>
                  <p className="mt-1 text-sm text-emerald-700">
                    ทีมงานจะติดต่อกลับตามข้อมูลที่ให้ไว้
                  </p>
                  <p className="mt-3 text-xs text-slate-500">เลขอ้างอิง</p>
                  <p className="text-lg font-bold text-brand-700">{quoteSubmit.result.referenceId}</p>
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-600">ราคาประเมินรวม</p>
                      <p className="text-xl font-bold text-brand-700">
                        {formatBaht(calc.breakdown.subtotal)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      * ราคาประเมินเบื้องต้น ขึ้นกับหน้างานจริง
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Input
                      label="ชื่อ-นามสกุล"
                      type="text"
                      value={calc.contact.name}
                      placeholder="กรุณาระบุชื่อ-นามสกุล"
                      required
                      autoComplete="name"
                      onChange={(e) => calc.patchContact({ name: e.target.value })}
                    />
                    <Input
                      label="เบอร์โทรศัพท์"
                      type="tel"
                      value={calc.contact.phone}
                      placeholder="เช่น 0891234567"
                      required
                      autoComplete="tel"
                      onChange={(e) => calc.patchContact({ phone: e.target.value })}
                    />
                    <Input
                      label="Line ID"
                      type="text"
                      value={calc.contact.lineId}
                      placeholder="ไม่บังคับ"
                      autoComplete="off"
                      onChange={(e) => calc.patchContact({ lineId: e.target.value })}
                    />
                    <div className="flex flex-col gap-1">
                      <label htmlFor="quick-note-input" className="text-sm font-semibold text-slate-700">
                        หมายเหตุ / รายละเอียดเพิ่มเติม
                      </label>
                      <textarea
                        id="quick-note-input"
                        value={calc.contact.note}
                        placeholder="เช่น ต้องการสีพิเศษ หรือรูปแบบงานเพิ่มเติม"
                        rows={3}
                        className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400 transition-colors focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                        onChange={(e) => calc.patchContact({ note: e.target.value })}
                      />
                    </div>
                  </div>

                  {quickContactAttempted && contactValidation.errors.length > 0 && (
                    <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
                      {contactValidation.errors.map((err, i) => (
                        <p key={i}>{err}</p>
                      ))}
                    </div>
                  )}

                  {quoteSubmit.errorMessage && (
                    <div className="flex gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" />
                      <p>{quoteSubmit.errorMessage}</p>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleQuickContactSubmit}
                    loading={quoteSubmit.status === "loading"}
                    disabled={quoteSubmit.status === "loading"}
                  >
                    <Send className="h-4 w-4" />
                    ส่งข้อมูลให้ติดต่อกลับ
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
