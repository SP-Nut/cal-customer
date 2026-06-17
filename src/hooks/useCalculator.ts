"use client";

import { useMemo, useState } from "react";
import { calculateQuote } from "@/domain/calculator/pricing";
import { validateStep } from "@/domain/calculator/validation";
import type { CalculatorInput, ContactInfo } from "@/domain/calculator/types";

const TOTAL_STEPS = 6;

const emptyInput: CalculatorInput = {
  category: "translucent",
  materialId: "polycarbonate-10mm",
  sizeCode: "M",
  width: 0,
  length: 0,
  installationType: "with-posts",
  postCount: 2,
  selectedAddOns: {},
  quantities: {}
};

const emptyContact: ContactInfo = {
  name: "",
  phone: "",
  lineId: "",
  note: ""
};

export function useCalculator() {
  const [input, setInput] = useState<CalculatorInput>(emptyInput);
  const [contact, setContact] = useState<ContactInfo>(emptyContact);
  const [step, setStep] = useState(1);

  const breakdown = useMemo(() => calculateQuote(input), [input]);

  const stepValidation = useMemo(
    () => validateStep(step, input, contact),
    [step, input, contact]
  );

  function patch(update: Partial<CalculatorInput>) {
    setInput((prev) => ({ ...prev, ...update }));
  }

  function patchAndNext(update: Partial<CalculatorInput>) {
    setInput((prev) => {
      const nextInput = { ...prev, ...update };
      const validation = validateStep(step, nextInput, contact);

      if (validation.valid && step < TOTAL_STEPS) {
        setStep((current) => (current === step ? current + 1 : current));
      }

      return nextInput;
    });
  }

  function patchContact(update: Partial<ContactInfo>) {
    setContact((prev) => ({ ...prev, ...update }));
  }

  function toggleAddOn(addOnId: string, optionId: string) {
    const current = input.selectedAddOns[addOnId];
    const selectedAddOns = { ...input.selectedAddOns };
    if (current === optionId) {
      delete selectedAddOns[addOnId];
    } else {
      selectedAddOns[addOnId] = optionId;
    }
    patch({ selectedAddOns });
  }

  function goToStep(next: number) {
    if (next >= 1 && next <= TOTAL_STEPS) {
      setStep(next);
    }
  }

  function nextStep() {
    if (stepValidation.valid && step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
  }

  function prevStep() {
    if (step > 1) setStep((s) => s - 1);
  }

  return {
    input,
    contact,
    step,
    breakdown,
    stepValidation,
    totalSteps: TOTAL_STEPS,
    patch,
    patchAndNext,
    patchContact,
    toggleAddOn,
    goToStep,
    nextStep,
    prevStep
  };
}
