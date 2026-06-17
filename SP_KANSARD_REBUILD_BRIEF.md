# SP Kansard Rebuild Brief

Date: 2026-06-15

This document is the handoff brief for rebuilding the SP Kansard awning and roofing calculator from scratch. The old implementation has been removed, while image assets have been preserved.

## 1. Original Project Summary

The previous project was a Next.js App Router application using:

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide icons
- Nodemailer
- Zod
- Vercel Analytics

The main product was a multi-step price calculator for awning and roofing jobs.

Core flow:

1. Choose material category: translucent or opaque
2. Choose material
3. Choose size: M, M+, L, L+, Stainless S, Stainless M
4. Enter dimensions
5. Choose installation type
6. Choose services and add-ons
7. Review price and request a quote

The app also had a quote API that sent email through Gmail SMTP.

## 2. Preserved Assets

The following assets should be kept and reused during the rebuild.

### Brand and common images

- `public/materials/logo.webp`
- `public/materials/pr.png`
- `public/materials/aluminum-roof.jpg`
- `app/favicon.ico`

### Translucent material images

- `public/materials/translucent/ชินโคไลท์.webp`
- `public/materials/translucent/ชินโคไลท์H.webp`
- `public/materials/translucent/ชินโคไลท์N.webp`
- `public/materials/translucent/ชินโคไลท์S.webp`
- `public/materials/translucent/ชินโคไลท์เชด.webp`
- `public/materials/translucent/ชีทตัน.webp`
- `public/materials/translucent/ดีไลท์คลื่น.webp`
- `public/materials/translucent/ดีไลท์ลอนเรียบ.webp`
- `public/materials/translucent/โพลีคาร์บอเนต.webp`

### Opaque material images

- `public/materials/opaque/alr.webp`
- `public/materials/opaque/PU.webp`
- `public/materials/opaque/เมทัลชีท1.webp`
- `public/materials/opaque/ไวนิลคริปล๊อค.webp`

### Size images

- `public/size/size-m.png`
- `public/size/size-m+.png`
- `public/size/size-l.png`
- `public/size/size-l+.png`

## 3. Problems Found In The Old System

### 3.1 Oversized components

The old UI had very large files:

- `MaterialSelector.tsx`: about 1,210 lines
- `MaterialPreview.tsx`: about 916 lines

They mixed state, UI, pricing logic, responsive layout, modals, and conditional business rules. This made small changes risky.

### 3.2 Data, UI, and pricing were coupled

Material data, price data, service compatibility, and UI behavior were too tightly connected. A rebuild should separate catalog data from pricing logic and from React components.

### 3.3 Thai text encoding issues

Several files showed mojibake symptoms. The rebuild should use UTF-8 consistently and should avoid scattering Thai copy across many component files.

Recommendation:

- Keep copy in dedicated content/data files.
- Add editor config for UTF-8.
- Avoid script-based text replacement on Thai content unless encoding is verified.

### 3.4 Image path regression

The old history included a commit that removed material image paths, causing broken images. The rebuild should validate image paths during development or build.

### 3.5 Styling was not systemized

The UI used many Tailwind utilities directly and had mixed visual styles. It needs a clearer design system with stable tokens for color, spacing, radius, shadow, and typography.

### 3.6 Quote API needs stronger production behavior

The old quote API had:

- In-memory rate limiting
- Partial schema validation
- Large HTML email template embedded in the route
- SMTP dependency inside the request path

The rebuild should split validation, email rendering, transport, and rate limiting.

### 3.7 No test coverage

Pricing rules were not protected by tests. This is high risk because pricing is the business-critical part of the app.

## 4. Rebuild Goals

The new SP Kansard app should feel:

- Professional
- Trustworthy
- Clean
- Fast on mobile
- Easy for customers to complete
- Easy for the sales team to understand
- Easy for developers to maintain

It should not feel like:

- A generic landing page
- A colorful demo calculator
- A form-heavy internal tool
- A fragile UI held together by one large component

## 5. Recommended Product Direction

Build the calculator as the first screen. Do not start with a marketing landing page.

Desktop layout:

- Left side: visual preview, selected material, selected size, project summary
- Right side: step-by-step calculator controls
- Top bar: logo, phone, Line, quote action

Mobile layout:

- Single-column step flow
- Sticky progress header
- Sticky bottom price summary
- Compact contact actions that do not cover inputs

## 6. Suggested User Flow

### Step 1: Project type

Options:

- Translucent roof
- Opaque roof
- Not sure yet

### Step 2: Material

Material cards should show:

- Real image
- Material name
- Short description
- 2-3 benefit badges
- Starting price

### Step 3: Size

Show M, M+, L, L+, Stainless S, Stainless M with size images.

Each size should include a clear short explanation.

### Step 4: Dimensions

Inputs:

- Width
- Length

Show:

- Calculated area
- Base price
- Warning if dimensions are suspicious

### Step 5: Installation type

Options:

- With posts
- No posts
- Need site survey

If no posts are selected, show only relevant support options.

### Step 6: Add-ons

Group add-ons:

- Structure
- Ceiling
- Water system
- Foundation
- Electrical

### Step 7: Quote

Show a clear breakdown:

- Material
- Size
- Area
- Installation
- Add-ons
- Subtotal
- VAT note
- Contact options

## 7. Recommended New File Structure

```text
app/
  (site)/
    page.tsx
    layout.tsx
  api/
    quote/
      route.ts
  globals.css

src/
  components/
    brand/
      Logo.tsx
      ContactBar.tsx
    calculator/
      CalculatorShell.tsx
      CalculatorStepper.tsx
      PreviewPanel.tsx
      SummaryBar.tsx
      steps/
        ProjectTypeStep.tsx
        MaterialStep.tsx
        SizeStep.tsx
        DimensionsStep.tsx
        InstallationStep.tsx
        AddOnsStep.tsx
        QuoteStep.tsx
    ui/
      Button.tsx
      Card.tsx
      Field.tsx
      Modal.tsx
      Tabs.tsx
      ToggleGroup.tsx
      Tooltip.tsx
  config/
    brand.ts
    contact.ts
  data/
    materials.ts
    services.ts
    gutters.ts
  domain/
    calculator/
      types.ts
      pricing.ts
      eligibility.ts
      validation.ts
      quotePayload.ts
  lib/
    format.ts
    env.ts
  server/
    mail/
      quoteEmail.ts
      transporter.ts
  styles/
    tokens.css
```

## 8. Recommended Domain Model

```ts
type MaterialCategory = "translucent" | "opaque";

type SizeCode =
  | "M"
  | "M_PLUS"
  | "L"
  | "L_PLUS"
  | "STAINLESS_S"
  | "STAINLESS_M";

interface Material {
  id: string;
  category: MaterialCategory;
  name: string;
  shortName: string;
  image: string;
  description: string;
  badges: string[];
  availableSizes: SizeCode[];
  pricePerSqm: Partial<Record<SizeCode, number>>;
}

interface AddOn {
  id: string;
  group: "structure" | "ceiling" | "water" | "foundation" | "electrical";
  name: string;
  pricingMode: "free" | "fixed" | "perSqm" | "perMeter" | "perPoint" | "perPole";
  options: AddOnOption[];
  rule?: EligibilityRule;
}
```

## 9. Pricing Engine

Pricing should be a pure function, separate from React:

```ts
calculateQuote(input, catalog): QuoteBreakdown
```

The result should always contain:

- Material line
- Size line
- Area
- Service lines
- Add-on lines
- Warnings
- Subtotal
- VAT note

Minimum tests:

- Area calculation
- Unavailable size handling
- Stainless pricing
- Post count minimum
- Foundation quantity
- Pipe minimum length
- Electrical point count
- Gutter length pricing
- Total breakdown sum

## 10. Visual System

Suggested design tone:

- White and soft gray surfaces
- Blue/cyan brand accent
- Emerald for contact and success
- Amber only for price highlights or warnings
- Minimal gradients
- No nested cards
- Real product/material images as the visual anchor

Suggested CSS tokens:

```css
:root {
  --color-brand: #0ea5e9;
  --color-brand-dark: #0369a1;
  --color-ink: #111827;
  --color-muted: #64748b;
  --color-surface: #ffffff;
  --color-surface-soft: #f8fafc;
  --color-line: #e5e7eb;
  --radius-sm: 6px;
  --radius-md: 8px;
  --shadow-panel: 0 8px 24px rgba(15, 23, 42, 0.08);
}
```

## 11. Known Business Contact Details

Verify before production:

- Phone: `084-909-7777`
- Line: `@spkansard`
- Email: `spkansards@gmail.com`
- TikTok: `@spkansard`
- Facebook: `SP Kansard Official`
- Branch text found in old UI: main office, Bang Waek, Pathum Thani, Ratchaphruek

## 12. Before Rebuilding

Confirm these business rules:

1. Current material list
2. Current price per square meter for every material and size
3. Meaning of M, M+, L, L+, Stainless S, Stainless M
4. Which add-ons are available for which sizes/materials
5. Minimum post count
6. Foundation quantity rules
7. Pipe and gutter length rules
8. Whether VAT is included or excluded
9. Quote email recipient and sender configuration

## 13. Recommended Roadmap

### Phase 1: Foundation

- Create clean Next.js app
- Configure Tailwind and design tokens
- Build UI primitives
- Add catalog data and validation

### Phase 2: Calculator Core

- Build calculator state model
- Build pricing engine
- Build quote breakdown
- Add unit tests

### Phase 3: UI

- Build desktop calculator shell
- Build mobile flow
- Build preview panel
- Build sticky summary

### Phase 4: Quote API

- Add full request schema
- Split email template from route
- Validate environment variables
- Add production-ready rate limiting

### Phase 5: QA

- Desktop visual QA
- Mobile visual QA
- Image path validation
- Pricing regression tests
- Quote API test
- Accessibility pass

## 14. Recommendation

Rebuild from scratch using the preserved assets. This is better than continuing to patch the previous codebase because the old project had accumulated structural, styling, and encoding problems.

Use this file as the main rebuild brief.
