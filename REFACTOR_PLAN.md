# SP Kansard Calculator — Refactor Plan
> Created: 2026-06-17 | Based on full Product + UX/UI + Architecture Audit

---

## 🎯 Objective

1. Wizard flow (6 steps, one per screen — no long scroll)
2. Final step: Contact form → sends email to owner
3. No database — email only
4. New folder structure
5. Apply all audit recommendations

---

## 📦 Dependencies to Install

```bash
npm install resend clsx tailwind-merge
```

| Package | Purpose |
|---|---|
| `resend` | Send transactional email from API route |
| `clsx` | Conditional className utility |
| `tailwind-merge` | Merge Tailwind classes without conflicts |

---

## 🔑 Environment Variables Required

Create `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=spkansards@gmail.com
```

---

## 🗂️ New Folder Structure

```
app/
  globals.css          (updated design system)
  layout.tsx           (updated OG tags + metadata)
  page.tsx             (unchanged)
  sitemap.ts           (unchanged)
  api/
    quote/
      route.ts         (UPDATED — send email via Resend)

src/
  components/
    ui/
      Button.tsx       (UPDATED — loading state, disabled, size variants)
      Input.tsx        (NEW — text/number input with label + error)
      Badge.tsx        (NEW — label badges)

    calculator/
      CalculatorWizard.tsx    (REPLACES CalculatorShell + CalculatorControls)
      steps/
        StepCategory.tsx      (Step 1: ประเภทวัสดุ)
        StepMaterial.tsx      (Step 2: เลือกวัสดุ)
        StepStructure.tsx     (Step 3: ขนาดโครงสร้าง — replaces confusing M/M+/L/L+ labels)
        StepDimensions.tsx    (Step 4: พื้นที่ + รูปแบบติดตั้ง + จำนวนเสา)
        StepAddOns.tsx        (Step 5: บริการเสริม — grouped + accordion)
        StepContact.tsx       (Step 6: NEW — ชื่อ + เบอร์ + Line ID + submit)
      PreviewPanel.tsx        (UPDATED — next/image, sticky on desktop, compact)

    layout/
      TopBar.tsx        (MOVED from brand/TopBar.tsx)

  hooks/
    useCalculator.ts    (NEW — extract all state + logic from CalculatorWizard)
    useQuoteSubmit.ts   (NEW — submit + loading + error state)

  domain/
    calculator/
      pricing.ts        (UNCHANGED)
      types.ts          (UPDATED — add ContactInfo, update CalculatorInput)
      validation.ts     (NEW — per-step validation logic)

  data/
    materials.ts        (UNCHANGED)
    services.ts         (UNCHANGED)

  lib/
    format.ts           (UNCHANGED)
    cn.ts               (NEW — cn() helper using clsx + tailwind-merge)

  config/
    contact.ts          (UNCHANGED)

  # DELETED
  # src/components/brand/  → moved to src/components/layout/
  # src/components/calculator/CalculatorShell.tsx → replaced by CalculatorWizard
  # src/components/calculator/CalculatorControls.tsx → split into steps/
  # src/components/calculator/SummaryBar.tsx → dead code, removed
```

---

## 🔄 Wizard Flow (6 Steps)

```
Step 1 — ประเภทวัสดุ
  UI: 2 large cards (โปร่งแสง / ทึบแสง) with image
  Height: fits in ~300px — no scroll needed

Step 2 — เลือกวัสดุ
  UI: list of material cards with image + price badge
  Height: 3 materials per category, compact list

Step 3 — ขนาดโครงสร้าง
  UI: grid of 6 size cards (2 columns)
  Labels: human-readable (ไม่ใช้ M/M+/L/L+ เป็น code ล้วน)
  e.g. "มาตรฐาน (M)", "เสริมพิเศษ (M+)", "หนัก (L)", "หนักพิเศษ (L+)"

Step 4 — พื้นที่ + รูปแบบติดตั้ง
  UI: 2 number inputs (กว้าง/ยาว) + live area display
      3 installation type buttons
      conditional: จำนวนเสา stepper (if with-posts)
  Height: compact, fits without scroll

Step 5 — บริการเสริม
  UI: accordion groups (โครงสร้าง / ระบบน้ำ / ฐานราก / ไฟ)
  Default: collapsed, user expands what they need
  Each open group shows its options inline

Step 6 — ข้อมูลติดต่อ + สรุปราคา
  UI: 3 inputs (ชื่อ-นามสกุล *, เบอร์โทร *, Line ID)
      Price breakdown summary
      Submit button "ส่งคำขอใบเสนอราคา"
  Validation: ชื่อ required, เบอร์ required + format check
```

---

## 📐 Layout Design

### Desktop (≥1024px)
```
┌─ TopBar ─────────────────────────────────────────────────┐
├──────────────────────────┬───────────────────────────────┤
│                          │ ● ● ● ● ● ●  (step dots)      │
│  LEFT PANEL (sticky)     │                               │
│  ┌─ material image ────┐ │  STEP CONTENT                 │
│  │ [image]             │ │  (no internal scroll)         │
│  └─────────────────────┘ │                               │
│  ┌─ stats ─────────────┐ ├───────────────────────────────┤
│  │ วัสดุ | โครง | ม²   │ │ [← ย้อนกลับ]  [ถัดไป →]     │
│  └─────────────────────┘ └───────────────────────────────┘
│  ┌─ live price ────────┐
│  │ ฿XX,XXX             │
│  │ [ขอใบเสนอราคา]      │
│  └─────────────────────┘
└──────────────────────────┘
```

### Mobile (<1024px)
```
┌─ TopBar (compact) ───────┐
├──────────────────────────┤
│  ● ● ● ● ● ●  (step dots)│
├──────────────────────────┤
│                          │
│  STEP CONTENT            │
│  (full width)            │
│                          │
├──────────────────────────┤
│ [← ย้อน]    [ถัดไป →]   │
├──────────────────────────┤
│ STICKY BOTTOM:           │
│ ฿XX,XXX | [ขอใบเสนอ]     │
└──────────────────────────┘
```

---

## 📧 Email Flow

```
User fills Step 6 (contact form)
     ↓
Client validates (ชื่อ required, เบอร์ required + 10 digits)
     ↓
POST /api/quote  with { input, breakdown, contact }
     ↓
API validates with zod
     ↓
Resend sends HTML email to CONTACT_EMAIL
     ↓
Response: { ok: true, referenceId: "SPK-XXXX" }
     ↓
UI shows: "ส่งสำเร็จ! ref: SPK-XXXX — ทีมงานจะโทรภายใน 2 ชั่วโมง"
     + LINE button shortcut
```

### Email Content Template
```
Subject: [SPK-XXXX] ใบเสนอราคา — {ชื่อลูกค้า}

ชื่อ: {ชื่อ-นามสกุล}
เบอร์: {เบอร์โทร}
Line: {Line ID}
---
วัสดุ: {material name} / {size label}
พื้นที่: {width} x {length} = {area} ตร.ม.
รูปแบบ: {installation type}
---
ราคาวัสดุ: ฿{amount}
บริการเสริม: {add-ons list}
---
ราคาประเมินรวม: ฿{subtotal}
```

---

## 🎨 Design System Changes

### Colors (tailwind.config.ts)
```ts
brand: {
  50: "#EEF2FA",
  100: "#D6DFEF",
  200: "#ADBFDF",
  300: "#7B98C9",
  400: "#4D72B0",
  500: "#2E5499",
  600: "#243F7A",   // primary action
  700: "#1A2F5C",   // dark
  800: "#111F3D",
  900: "#0A1325"
}
```

### Typography
- Remove font weight 300, 500 (keep 400, 600, 700, 800 only)
- Use `font-extrabold` only for price display and hero
- Use `font-semibold` for headings, `font-medium` for labels

### Spacing
- Standardize: use p-4 for cards, p-5 for sections, gap-3 between items

---

## ✅ Accessibility Fixes

| Fix | File |
|---|---|
| Add `aria-label` on all icon-only buttons | TopBar, PreviewPanel |
| Focus trap on lightbox modal | PreviewPanel |
| `htmlFor` + `id` on all inputs | Input.tsx, StepDimensions, StepContact |
| Stepper buttons min 44×44px | useCalculator / StepDimensions |
| `focus-visible` ring in globals.css | globals.css |
| `aria-current="step"` on progress dots | CalculatorWizard |

---

## 🚀 Implementation Order

1. `npm install resend clsx tailwind-merge`
2. Update `tailwind.config.ts` (new color scale)
3. Update `app/globals.css` (focus-visible, font)
4. Create `src/lib/cn.ts`
5. Create `src/components/ui/Input.tsx`, `Badge.tsx`
6. Update `src/components/ui/Button.tsx`
7. Create `src/domain/calculator/validation.ts`
8. Update `src/domain/calculator/types.ts` (add ContactInfo)
9. Create `src/hooks/useCalculator.ts`
10. Create `src/hooks/useQuoteSubmit.ts`
11. Create step components (StepCategory → StepContact)
12. Update `PreviewPanel.tsx` (next/image, remove hero logic)
13. Create `CalculatorWizard.tsx`
14. Move `TopBar.tsx` → `src/components/layout/TopBar.tsx`
15. Update `app/api/quote/route.ts` (Resend email)
16. Update `app/layout.tsx` (OG tags)
17. Delete: CalculatorShell, CalculatorControls, SummaryBar, brand/
18. `npm run typecheck` — fix errors

---

## 🗑️ Files to Delete After Refactor

- `src/components/calculator/CalculatorShell.tsx`
- `src/components/calculator/CalculatorControls.tsx`
- `src/components/calculator/SummaryBar.tsx`
- `src/components/brand/TopBar.tsx`
- `src/components/brand/` (entire folder)
