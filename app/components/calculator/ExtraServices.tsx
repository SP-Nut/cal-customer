'use client';

import { ExtraService } from '@/app/lib/types';

interface ExtraServicesProps {
  services: ExtraService[];
  selectedExtras: Record<string, string>;
  onSelect: (serviceId: string, optionId: string) => void;
}

export function ExtraServices({
  services,
  selectedExtras,
  onSelect,
}: ExtraServicesProps) {
  return (
    <section id="extras" className="space-y-4">
      <h2 className="text-xl font-semibold">บริการเพิ่มเติม</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <div key={service.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {service.name}
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedExtras[service.id] || ''}
              onChange={(e) => onSelect(service.id, e.target.value)}
            >
              <option value="">ไม่เลือก</option>
              {service.options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name} - ฿{option.price.toLocaleString()}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
