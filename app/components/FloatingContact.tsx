'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X, MessageSquare, Video } from 'lucide-react';

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'โทรศัพท์',
      action: () => window.open('tel:084-909-7777', '_self'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'Line',
      action: () => window.open('https://lin.ee/SJ245co', '_blank'),
      color: 'bg-green-400 hover:bg-green-500'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: 'Messenger',
      action: () => window.open('https://m.me/spkansard', '_blank'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: <Video className="w-6 h-6" />,
      label: 'TikTok',
      action: () => window.open('https://www.tiktok.com/@spkansard', '_blank'),
      color: 'bg-black hover:bg-gray-800'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'อีเมล',
      action: () => window.open('mailto:spkansards@gmail.com', '_self'),
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options - แสดงเมื่อขยาย */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`flex items-center justify-end animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Label */}
              <div className="mr-3 bg-white px-3 py-2 rounded-lg shadow-md border border-slate-200">
                <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                  {method.label}
                </span>
              </div>
              
              {/* Icon Button */}
              <button
                onClick={method.action}
                className={`w-12 h-12 ${method.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110`}
              >
                {method.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Contact Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform ${
          isExpanded ? 'rotate-45' : 'hover:scale-110'
        }`}
      >
        {isExpanded ? (
          <X className="w-8 h-8" />
        ) : (
          <MessageSquare className="w-8 h-8" />
        )}
      </button>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
