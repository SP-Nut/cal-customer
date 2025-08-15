'use client';

import React, { useState } from 'react';

export default function FloatingContact() {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
        </svg>
      ),
      label: 'โทรศัพท์',
      action: () => window.open('tel:+66-XX-XXX-XXXX', '_self'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.54 0c.86 0 1.56.7 1.56 1.56v20.88c0 .86-.7 1.56-1.56 1.56H4.46c-.86 0-1.56-.7-1.56-1.56V1.56C2.9.7 3.6 0 4.46 0h15.08zM8.91 6.75c-1.8 0-2.91 1.2-2.91 3.06 0 1.71.96 3.06 2.76 3.06 1.8 0 2.91-1.35 2.91-3.06 0-1.86-1.11-3.06-2.76-3.06zm6.24 0c-1.8 0-2.91 1.2-2.91 3.06 0 1.71.96 3.06 2.76 3.06 1.8 0 2.91-1.35 2.91-3.06 0-1.86-1.11-3.06-2.76-3.06zM8.91 15.75c-1.8 0-2.91 1.2-2.91 3.06 0 1.71.96 3.06 2.76 3.06 1.8 0 2.91-1.35 2.91-3.06 0-1.86-1.11-3.06-2.76-3.06zm6.24 0c-1.8 0-2.91 1.2-2.91 3.06 0 1.71.96 3.06 2.76 3.06 1.8 0 2.91-1.35 2.91-3.06 0-1.86-1.11-3.06-2.76-3.06z"/>
        </svg>
      ),
      label: 'Line',
      action: () => window.open('https://line.me/ti/p/YOUR_LINE_ID', '_blank'),
      color: 'bg-green-400 hover:bg-green-500'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      label: 'Facebook',
      action: () => window.open('https://facebook.com/YOUR_PAGE', '_blank'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      label: 'อีเมล',
      action: () => window.open('mailto:contact@yourcompany.com', '_self'),
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
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
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
