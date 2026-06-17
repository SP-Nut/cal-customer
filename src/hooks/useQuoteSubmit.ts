"use client";

import { useState } from "react";
import type { CalculatorInput, ContactInfo, QuoteBreakdown } from "@/domain/calculator/types";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

export interface QuoteResult {
  referenceId: string;
}

export function useQuoteSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submit(input: CalculatorInput, breakdown: QuoteBreakdown, contact: ContactInfo) {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, breakdown, contact })
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }

      setResult({ referenceId: data.referenceId });
      setStatus("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "ส่งข้อมูลไม่สำเร็จ กรุณาโทร 084-909-7777";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setResult(null);
    setErrorMessage(null);
  }

  return { status, result, errorMessage, submit, reset };
}
