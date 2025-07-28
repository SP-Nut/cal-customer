'use client';

import { Service, Size } from '@/app/lib/types';

interface ServicesSelectorProps {
  services: Service[];
  selectedSize: Size;
  selectedServices: string[];
  onToggle: (serviceId: string, optionId?: string) => void;
  selectedOptions?: Record<string, string>;
}

export function ServicesSelector({
  services,
  selectedSize,
  selectedServices,
  selectedOptions = {},
  onToggle,
}: ServicesSelectorProps) {
  return (
    <section id="services" className="space-y-4">
      <h2 className="text-xl font-semibold">บริการหลัก</h2>
      <div className="grid gap-2">
        {services
          .filter(
            (service) =>
              !service.requiresSize || service.requiresSize === selectedSize.id
          )
          .map((service) => (
            <button
              key={service.id}
              className={`p-3 rounded-lg border ${
                selectedServices.includes(service.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => !service.options && onToggle(service.id)}
            >
              <div className="flex justify-between items-center">
                <span>{service.name}</span>
                <span className="text-sm text-gray-600">
                  ฿{service.price.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 text-left">
                {service.description}
              </p>
              {service.options && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {service.options.map(option => (
                    <button
                      key={option.id}
                      className={`p-2 text-sm rounded border relative overflow-hidden ${
                        selectedOptions[service.id] === option.id
                          ? 'border-blue-500'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(service.id, option.id);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {option.color && (
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-200" 
                            style={{ backgroundColor: option.color }}
                          />
                        )}
                        <span>{option.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </button>
          ))}
      </div>
    </section>
  );
}
