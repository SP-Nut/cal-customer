import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      lineId,
      notes,
      material,
      selectedSize,
      dimensions,
      totalPrice,
      selectedServices,
      selectedExtras,
      mainServices,
      extraServices,
      selectedServiceOptions,
      gutterMaterials,
      pipeLength,
      electricalPoints,
      poleCount
    } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกชื่อและเบอร์โทรศัพท์' },
        { status: 400 }
      );
    }

    // สร้าง transporter สำหรับส่งอีเมล
    const transporter = nodemailer.createTransport({
      service: 'gmail', // หรือใช้ SMTP server อื่น
      auth: {
        user: process.env.EMAIL_USER, // อีเมลผู้ส่ง
        pass: process.env.EMAIL_PASSWORD, // App Password สำหรับ Gmail
      },
    });

    // สร้างเนื้อหาอีเมล
    const area = dimensions.width * dimensions.length;
    
    // สร้างรายการบริการที่เลือก
    let servicesList = '';
    
    // Main Services
    mainServices
      .filter((service: any) => selectedServices.includes(service.id))
      .forEach((service: any) => {
        let servicePrice = service.price || 0;
        const selectedOption = selectedServiceOptions[service.id];
        if (selectedOption && service.options) {
          const option = service.options.find((opt: any) => opt.id === selectedOption);
          if (option) {
            if (service.id === 'poles' && poleCount) {
              servicePrice = option.price * poleCount;
              servicesList += `- ${service.name} (${option.name}) - ${poleCount} ต้น: ฿${servicePrice.toLocaleString()}\n`;
            } else if (service.pricePerSqm) {
              servicePrice = option.price * area;
              servicesList += `- ${service.name} (${option.name}): ฿${servicePrice.toLocaleString()}\n`;
            } else {
              servicePrice = option.price;
              servicesList += `- ${service.name} (${option.name}): ฿${servicePrice.toLocaleString()}\n`;
            }
          }
        }
      });

    // Extra Services
    Object.entries(selectedExtras)
      .filter(([_, optionId]) => optionId)
      .forEach(([serviceId, optionId]: [string, any]) => {
        const service = extraServices.find((s: any) => s.id === serviceId);
        const option = service?.options.find((o: any) => o.id === optionId);
        if (service && option) {
          let finalPrice = option.price;
          
          if (serviceId === 'electrical' && electricalPoints[serviceId]) {
            finalPrice = option.price * electricalPoints[serviceId];
            servicesList += `- ${service.name}: ${electricalPoints[serviceId]} จุด - ฿${finalPrice.toLocaleString()}\n`;
          } else if (serviceId === 'pipe' && pipeLength[serviceId]) {
            const length = Math.max(pipeLength[serviceId], service.minimumLength || 3);
            finalPrice = option.price * length;
            servicesList += `- ${service.name}: ${length} เมตร - ฿${finalPrice.toLocaleString()}\n`;
          } else if (serviceId === 'gutter' && gutterMaterials[serviceId]) {
            // จัดการรางน้ำ
            servicesList += `- ${service.name}: ${option.name} - ฿${finalPrice.toLocaleString()}\n`;
          } else {
            servicesList += `- ${service.name}: ${option.name} - ฿${finalPrice.toLocaleString()}\n`;
          }
        }
      });

    const emailContent = `
คำขอใบเสนอราคากันสาดใหม่

=== ข้อมูลลูกค้า ===
ชื่อ-นามสกุล: ${name}
เบอร์โทรศัพท์: ${phone}
Line ID: ${lineId || 'ไม่ระบุ'}
หมายเหตุ: ${notes || 'ไม่มี'}

=== รายละเอียดโครงการ ===
วัสดุ: ${material.name}
ขนาด: ${selectedSize.name}
ขนาดพื้นที่: ${dimensions.width} x ${dimensions.length} เมตร (${area.toFixed(2)} ตร.ม.)

=== บริการที่เลือก ===
${servicesList || 'ไม่มีบริการเพิ่มเติม'}

=== สรุปราคา ===
ราคารวมทั้งหมด: ฿${totalPrice.toLocaleString()} (ไม่รวม VAT)

*หมายเหตุ: ราคานี้เป็นการประมาณการเบื้องต้น ราคาจริงอาจแตกต่างตามสภาพพื้นที่จริง

---
ส่งจากระบบคำนวณราคากันสาด SP Kansard
วันที่: ${new Date().toLocaleString('th-TH')}
    `;

    const htmlEmailContent = `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>คำขอใบเสนอราคา</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
    <div style="background: #6c757d; padding: 20px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: normal;">
            งานกันสาดมาแล้วจ้าาาา
        </h1>
        <p style="color: #e9ecef; margin: 5px 0 0 0; font-size: 14px;">คำขอใบเสนอราคาจาก SP Kansard</p>
    </div>

    <div style="background: white; padding: 20px; margin-bottom: 15px; border-left: 4px solid #6c757d;">
        <h3 style="color: #495057; margin: 0 0 15px 0; font-size: 18px;">ข้อมูลลูกค้า</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 6px 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: 500; width: 120px;">ชื่อ-นามสกุล</td>
                <td style="padding: 6px 10px; border: 1px solid #dee2e6;">${name}</td>
            </tr>
            <tr>
                <td style="padding: 6px 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: 500;">เบอร์โทร</td>
                <td style="padding: 6px 10px; border: 1px solid #dee2e6;"><a href="tel:${phone}" style="color: #6c757d; text-decoration: none;">${phone}</a></td>
            </tr>
            ${lineId ? `
            <tr>
                <td style="padding: 6px 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: 500;">Line ID</td>
                <td style="padding: 6px 10px; border: 1px solid #dee2e6;">${lineId}</td>
            </tr>` : ''}
            ${notes ? `
            <tr>
                <td style="padding: 6px 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: 500;">หมายเหตุ</td>
                <td style="padding: 6px 10px; border: 1px solid #dee2e6;">${notes}</td>
            </tr>` : ''}
        </table>
    </div>

    <div style="background: white; padding: 20px; margin-bottom: 15px; border-left: 4px solid #6c757d;">
        <h3 style="color: #495057; margin: 0 0 15px 0; font-size: 18px;">รายละเอียดโครงการ</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 6px 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: 500; width: 120px;">วัสดุ</td>
                <td style="padding: 6px 10px; border: 1px solid #dee2e6;"><strong>${material.name}</strong></td>
            </tr>
            <tr>
                <td style="padding: 6px 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: 500;">ขนาด</td>
                <td style="padding: 6px 10px; border: 1px solid #dee2e6;">${selectedSize.name}</td>
            </tr>
            <tr>
                <td style="padding: 6px 10px; background: #f8f9fa; border: 1px solid #dee2e6; font-weight: 500;">ขนาดพื้นที่</td>
                <td style="padding: 6px 10px; border: 1px solid #dee2e6;">
                    <strong>${dimensions.width} × ${dimensions.length} เมตร</strong> 
                    <span style="color: #6c757d;">(${area.toFixed(2)} ตร.ม.)</span>
                </td>
            </tr>
        </table>
    </div>

    ${servicesList ? `
    <div style="background: white; padding: 20px; margin-bottom: 15px; border-left: 4px solid #6c757d;">
        <h3 style="color: #495057; margin: 0 0 15px 0; font-size: 18px;">บริการที่เลือก</h3>
        <div style="background: #f8f9fa; padding: 15px; border: 1px solid #dee2e6;">
            ${servicesList.split('\n').filter(line => line.trim()).map(line => 
                `<div style="padding: 5px 0; border-bottom: 1px solid #dee2e6; font-size: 14px;">
                    ${line.replace(/- /, '• ').replace(/฿([0-9,]+)/g, '<strong>฿$1</strong>')}
                </div>`
            ).join('')}
        </div>
    </div>` : ''}

    <div style="background: #6c757d; color: white; padding: 20px; text-align: center; margin-bottom: 15px;">
        <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px;">สรุปราคา</h3>
        <div style="font-size: 28px; font-weight: bold; margin: 10px 0;">
            ฿${totalPrice.toLocaleString()}
        </div>
        <p style="margin: 0; font-size: 14px; color: #e9ecef;">(ไม่รวม VAT)</p>
    </div>

    <div style="background: #f8f9fa; border: 1px solid #dee2e6; padding: 15px; margin-bottom: 15px;">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
            <strong>หมายเหตุ:</strong> ราคานี้เป็นการประมาณการเบื้องต้น ราคาจริงอาจแตกต่างตามสภาพพื้นที่จริงและการสำรวจหน้างาน
        </p>
    </div>

    <div style="text-align: center; padding: 15px; background: #f8f9fa; border-top: 3px solid #6c757d;">
        <p style="margin: 0; color: #6c757d; font-size: 14px;">
            ส่งจาก <strong>SP Kansard</strong><br>
            วันที่: ${new Date().toLocaleString('th-TH', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            })}
        </p>
        <p style="margin: 10px 0 0 0; color: #495057; font-size: 14px; font-weight: 500;">
            ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
        </p>
    </div>
</body>
</html>
    `;

    // ส่งอีเมล
    await transporter.sendMail({
      from: `"SP Kansard" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || 'spkansards@gmail.com', // อีเมลผู้รับ
      subject: `📢❗🚨งานกันสาดมาแล้วจ้าาาา - ${name} (฿${totalPrice.toLocaleString()})`,
      text: emailContent,
      html: htmlEmailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการส่งอีเมล' },
      { status: 500 }
    );
  }
}
