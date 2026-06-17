"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { TopBar } from "@/components/layout/TopBar";
import { PreviewPanel } from "./PreviewPanel";
import { StepCategory } from "./steps/StepCategory";
import { StepMaterial } from "./steps/StepMaterial";
import { StepStructure } from "./steps/StepStructure";
import { StepDimensions } from "./steps/StepDimensions";
import { StepAddOns } from "./steps/StepAddOns";
import { StepContact } from "./steps/StepContact";
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
  "บริการเสริม",
  "ติดต่อ"
];

export function CalculatorWizard() {
  const calc = useCalculator();
  const quoteSubmit = useQuoteSubmit();
  const stepSectionRefs = useRef<Record<number, HTMLElement | null>>({});

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

  function handleSubmit() {
    const validation = validateStep(6, calc.input, calc.contact);
    if (!validation.valid) return;
    quoteSubmit.submit(calc.input, calc.breakdown, calc.contact);
  }

  function handleNext() {
    if (isLastStep) {
      handleSubmit();
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
              {isLastStep ? "ส่งคำขอ" : "ถัดไป →"}
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
            {calc.step >= 6 &&
              renderFlowSection(
                6,
                <StepContact
                  contact={calc.contact}
                  input={calc.input}
                  breakdown={calc.breakdown}
                  onContactChange={calc.patchContact}
                  onSubmit={handleSubmit}
                  submitStatus={quoteSubmit.status}
                  submitResult={quoteSubmit.result}
                  submitError={quoteSubmit.errorMessage}
                  errors={quoteSubmit.status !== "success" ? contactValidation.errors : []}
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
                  onClick={handleSubmit}
                  loading={quoteSubmit.status === "loading"}
                  disabled={!contactValidation.valid || quoteSubmit.status === "loading"}
                  className="min-w-[200px]"
                >
                  ส่งคำขอใบเสนอราคา
                </Button>
              )
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
