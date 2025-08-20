'use client';
import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, X, MessageSquare, Video } from 'lucide-react';

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'โทร',
      action: () => window.open('tel:084-909-7777', '_self'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Line',
      action: () => window.open('https://lin.ee/SJ245co', '_blank'),
      color: 'bg-green-400 hover:bg-green-500'
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Msg',
      action: () => window.open('https://m.me/spkansard', '_blank'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: <Video className="w-5 h-5" />,
      label: 'TikTok',
      action: () => window.open('https://www.tiktok.com/@spkansard', '_blank'),
      color: 'bg-black hover:bg-gray-800'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      action: () => window.open('mailto:spkansards@gmail.com', '_self'),
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <div className="fixed bottom-6 right-4 lg:left-4 lg:right-auto z-50">
      {/* Contact Options - แสดงเมื่อขยาย */}
      {isExpanded && (
        <div className="mb-4 space-y-3">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`flex items-center justify-end lg:justify-start animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Button with Text Inside */}
              <button
                onClick={method.action}
                className={`w-16 h-16 ${method.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center transform hover:scale-110 border-2 border-white/20`}
              >
                {method.icon}
                <span className="text-xs font-medium mt-1">{method.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Contact Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform border-2 border-white/20 ${
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