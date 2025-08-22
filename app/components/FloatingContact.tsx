'use client';
import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X, MessageSquare } from 'lucide-react';

// TikTok Logo Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-4 h-4" />,
      label: 'โทร',
      action: () => window.open('tel:084-909-7777', '_self'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      label: 'Line',
      action: () => window.open('https://lin.ee/SJ245co', '_blank'),
      color: 'bg-green-400 hover:bg-green-500'
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: 'Msg',
      action: () => window.open('https://m.me/spkansard', '_blank'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: <TikTokIcon className="w-4 h-4" />,
      label: 'TikTok',
      action: () => window.open('https://www.tiktok.com/@spkansard', '_blank'),
      color: 'bg-black hover:bg-gray-800'
    },
    {
      icon: <Mail className="w-4 h-4" />,
      label: 'Email',
      action: () => window.open('mailto:spkansards@gmail.com', '_self'),
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <div className="fixed bottom-1/3 right-0 lg:left-4 lg:right-auto lg:bottom-6 z-50">
      {/* Contact Options - แสดงเมื่อขยาย */}
      {isExpanded && (
        <div className="mb-4 space-y-3 lg:space-y-3">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`flex items-center justify-end lg:justify-start animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Button with Text Inside */}
              <button
                onClick={method.action}
                className={`w-12 h-12 lg:w-16 lg:h-16 ${method.color} text-white rounded-l-lg lg:rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center transform hover:scale-110`}
              >
                <div className="w-3 h-3 lg:w-5 lg:h-5">{method.icon}</div>
                {method.label && <span className="text-xs font-medium mt-0.5 lg:mt-1">{method.label}</span>}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Contact Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-l-lg lg:rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform ${
          isExpanded ? 'scale-110' : 'hover:scale-110'
        }`}
      >
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
          {isExpanded ? (
            <X className="w-5 h-5 lg:w-8 lg:h-8" />
          ) : (
            <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8" />
          )}
        </div>
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