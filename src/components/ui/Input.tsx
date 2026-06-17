import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  suffix?: string;
}

export function Input({ label, error, hint, suffix, className, id, ...props }: InputProps) {
  const inputId = id ?? label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-semibold text-slate-700">
        {label}
        {props.required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div
        className={cn(
          "flex overflow-hidden rounded-md border bg-white transition-colors",
          error
            ? "border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100"
            : "border-slate-200 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100"
        )}
      >
        <input
          id={inputId}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3 py-2.5 text-base text-slate-900 outline-none placeholder:text-slate-400",
            className
          )}
          {...props}
        />
        {suffix && (
          <span className="flex items-center bg-slate-50 px-3 text-sm font-semibold text-slate-500 border-l border-slate-200">
            {suffix}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
