export function formatBaht(value: number) {
  return `฿${Math.round(value).toLocaleString("th-TH")}`;
}

export function formatArea(value: number) {
  return `${value.toFixed(2)} ตร.ม.`;
}

