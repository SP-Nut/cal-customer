import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "กรุณาระบุชื่อ"),
  phone: z.string().min(1, "กรุณาระบุเบอร์โทร"),
  lineId: z.string().default(""),
  note: z.string().default("")
});

const calculatorInputSchema = z.object({
  category: z.enum(["translucent", "opaque"]),
  materialId: z.string().min(1),
  sizeCode: z.enum(["M", "M_PLUS", "L", "L_PLUS", "STAINLESS_S", "STAINLESS_M"]),
  width: z.number().nonnegative().max(100),
  length: z.number().nonnegative().max(100),
  installationType: z.enum(["with-posts", "no-posts", "survey"]),
  postCount: z.number().int().min(0).max(100),
  selectedAddOns: z.record(z.string(), z.string()),
  quantities: z.record(z.string(), z.number().nonnegative().max(1000))
});

const quoteSchema = z.object({
  contact: contactSchema,
  input: calculatorInputSchema,
  breakdown: z.object({
    area: z.number().nonnegative(),
    subtotal: z.number().nonnegative(),
    warnings: z.array(z.string()),
    materialLine: z.unknown().nullable(),
    addOnLines: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        detail: z.string(),
        amount: z.number()
      })
    )
  })
});

function buildEmailHtml(data: z.infer<typeof quoteSchema>, referenceId: string): string {
  const { contact, input, breakdown } = data;

  const categoryLabel = input.category === "translucent" ? "หลังคาโปร่งแสง" : "หลังคาทึบแสง";
  const installationLabel =
    input.installationType === "with-posts"
      ? `มีเสารับโครงสร้าง (${input.postCount} ต้น)`
      : input.installationType === "no-posts"
      ? "ไม่มีเสา (ยึดผนัง)"
      : "ให้ทีมสำรวจแนะนำ";

  const addOnRows = breakdown.addOnLines
    .map(
      (line) => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #f1f5f9;color:#475569">${line.label}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #f1f5f9;color:#475569;text-align:right">${line.detail}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #f1f5f9;font-weight:600;text-align:right">฿${line.amount.toLocaleString()}</td>
      </tr>`
    )
    .join("");

  const warningHtml =
    breakdown.warnings.length > 0
      ? `<div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:10px 14px;margin:16px 0;color:#92400e;font-size:13px">
          ⚠️ ${breakdown.warnings.join("<br/>⚠️ ")}
        </div>`
      : "";

  return `<!DOCTYPE html>
<html lang="th">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Prompt',Helvetica,Arial,sans-serif">
  <div style="max-width:600px;margin:24px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08)">

    <!-- Header -->
    <div style="background:#243F7A;padding:24px 28px;color:white">
      <p style="margin:0;font-size:12px;opacity:0.7;letter-spacing:0.1em;text-transform:uppercase">SP Kansard</p>
      <h1 style="margin:6px 0 0;font-size:22px;font-weight:700">คำขอใบเสนอราคาใหม่</h1>
      <p style="margin:6px 0 0;font-size:13px;opacity:0.8">Ref: <strong>${referenceId}</strong></p>
    </div>

    <!-- Contact -->
    <div style="padding:20px 28px;border-bottom:1px solid #e2e8f0">
      <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em">ข้อมูลลูกค้า</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 0;color:#64748b;width:110px">ชื่อ-นามสกุล</td><td style="padding:4px 0;font-weight:600;color:#0f172a">${contact.name}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b">เบอร์โทร</td><td style="padding:4px 0;font-weight:600;color:#0f172a"><a href="tel:${contact.phone}" style="color:#243F7A">${contact.phone}</a></td></tr>
        <tr><td style="padding:4px 0;color:#64748b">Line ID</td><td style="padding:4px 0;font-weight:600;color:#0f172a">${contact.lineId || "—"}</td></tr>
        ${contact.note ? `<tr><td style="padding:4px 0;color:#64748b;vertical-align:top">หมายเหตุ</td><td style="padding:4px 0;color:#0f172a">${contact.note}</td></tr>` : ""}
      </table>
    </div>

    <!-- Spec -->
    <div style="padding:20px 28px;border-bottom:1px solid #e2e8f0">
      <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em">สเปคงาน</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:4px 0;color:#64748b;width:110px">ประเภท</td><td style="padding:4px 0;font-weight:600;color:#0f172a">${categoryLabel}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b">วัสดุ</td><td style="padding:4px 0;font-weight:600;color:#0f172a">${input.materialId}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b">โครงสร้าง</td><td style="padding:4px 0;font-weight:600;color:#0f172a">${input.sizeCode}</td></tr>
        <tr><td style="padding:4px 0;color:#64748b">ขนาด</td><td style="padding:4px 0;font-weight:600;color:#0f172a">${input.width} × ${input.length} ม. = ${breakdown.area.toFixed(2)} ตร.ม.</td></tr>
        <tr><td style="padding:4px 0;color:#64748b">ติดตั้ง</td><td style="padding:4px 0;font-weight:600;color:#0f172a">${installationLabel}</td></tr>
      </table>
    </div>

    <!-- Price breakdown -->
    <div style="padding:20px 28px">
      <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;color:#334155;text-transform:uppercase;letter-spacing:0.05em">ราคาประเมิน</h2>
      ${warningHtml}
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead>
          <tr style="background:#f8fafc">
            <th style="padding:8px 12px;text-align:left;font-weight:600;color:#64748b;border-bottom:2px solid #e2e8f0">รายการ</th>
            <th style="padding:8px 12px;text-align:right;font-weight:600;color:#64748b;border-bottom:2px solid #e2e8f0">รายละเอียด</th>
            <th style="padding:8px 12px;text-align:right;font-weight:600;color:#64748b;border-bottom:2px solid #e2e8f0">จำนวนเงิน</th>
          </tr>
        </thead>
        <tbody>
          ${
            breakdown.materialLine
              ? `<tr>
              <td style="padding:6px 12px;border-bottom:1px solid #f1f5f9;font-weight:600">${(breakdown.materialLine as { label: string }).label}</td>
              <td style="padding:6px 12px;border-bottom:1px solid #f1f5f9;color:#475569;text-align:right">${(breakdown.materialLine as { detail: string }).detail}</td>
              <td style="padding:6px 12px;border-bottom:1px solid #f1f5f9;font-weight:600;text-align:right">฿${(breakdown.materialLine as { amount: number }).amount.toLocaleString()}</td>
            </tr>`
              : ""
          }
          ${addOnRows}
        </tbody>
        <tfoot>
          <tr style="background:#EEF2FA">
            <td colspan="2" style="padding:12px;font-weight:700;color:#1A2F5C;font-size:15px">ราคาประเมินรวม</td>
            <td style="padding:12px;font-weight:800;color:#243F7A;font-size:20px;text-align:right">฿${breakdown.subtotal.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
      <p style="margin:12px 0 0;font-size:12px;color:#94a3b8">* ราคาประเมินเบื้องต้น ไม่รวม VAT ขึ้นกับหน้างานจริง</p>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center">
      SP Kansard | โทร 084-909-7777 | Line: @spkansard | spkansards@gmail.com
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "ข้อมูลไม่ถูกต้อง", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const referenceId = `SPK-${Date.now().toString(36).toUpperCase()}`;
  const data = parsed.data;

  // Send email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? "spkansards@gmail.com";

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "SP Kansard Calculator <noreply@spkansard.com>",
        to: [toEmail],
        replyTo: data.contact.phone ? undefined : undefined,
        subject: `[${referenceId}] ใบเสนอราคา — ${data.contact.name} | ${data.breakdown.subtotal.toLocaleString()} บาท`,
        html: buildEmailHtml(data, referenceId)
      });
    } catch (err) {
      console.error("Resend error:", err);
      // Don't fail the request — log and continue
    }
  }

  return NextResponse.json({
    ok: true,
    referenceId,
    message: "รับคำขอใบเสนอราคาแล้ว ทีมงานจะติดต่อกลับภายใน 2 ชั่วโมง"
  });
}

