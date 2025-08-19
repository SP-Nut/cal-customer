import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Read raw body to avoid JSON parse errors when body is empty
    const raw = await request.text();
    if (!raw) {
      return NextResponse.json({ success: false, message: 'empty request body' }, { status: 400 });
    }
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      return NextResponse.json({ success: false, message: 'invalid JSON body' }, { status: 400 });
    }
    
    // Log ข้อมูลคำขอใบเสนอราคา
    console.log('=== คำขอใบเสนอราคาใหม่ ===');
    console.log('วันที่:', new Date().toLocaleString('th-TH'));
    console.log('ลูกค้า:', data.customer);
    console.log('รายละเอียด:', data.quote);
    console.log('===============================');
    
    // ในโปรเจ็กต์จริงจะบันทึกลงฐานข้อมูล
    // await saveQuoteRequest(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'คำขอใบเสนอราคาถูกบันทึกเรียบร้อยแล้ว' 
    });
    
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' },
      { status: 500 }
    );
  }
}
