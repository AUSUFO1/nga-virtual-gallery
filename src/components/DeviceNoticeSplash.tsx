'use client';

import { useState } from 'react';
import { Monitor } from 'lucide-react';

interface DeviceNoticeSplashProps {
  onContinue: () => void;
}

export default function DeviceNoticeSplash({ onContinue }: DeviceNoticeSplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(onContinue, 300); // Wait for fade out
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-circle {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .device-notice-circle {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(168, 207, 69, 0.3);
          animation: pulse-circle ease-in-out infinite;
        }
        
        .device-notice-circle-1 {
          width: 400px;
          height: 400px;
          top: 50%;
          left: 50%;
          animation-duration: 4s;
        }
        
        .device-notice-circle-2 {
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          animation-duration: 6s;
          animation-delay: -2s;
        }
        
        .device-notice-content {
          animation: fadeInUp 0.6s ease-out;
        }
      `}} />
      
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ 
          background: 'linear-gradient(135deg, #20a25b 0%, #1a8a4d 50%, #20a25b 100%)'
        }}
      >
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="device-notice-circle device-notice-circle-1"></div>
          <div className="device-notice-circle device-notice-circle-2"></div>
        </div>

        {/* Content */}
        <div className="device-notice-content relative z-10 max-w-lg w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-linear-to-br from-[#20a25b] to-[#a8cf45] rounded-full flex items-center justify-center shadow-lg">
              <Monitor className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1a4d2e' }}>
            Experience the Gallery at its Best!
          </h2>

          {/* Message */}
          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
            Our immersive 3D virtual gallery delivers the finest experience on desktop and laptop screens, 
            where you can fully appreciate every detail of the artworks.
          </p>

          {/* Decorative line */}
          <div className="mb-8 h-1 w-24 mx-auto rounded-full" style={{ 
            background: 'linear-gradient(to right, #20a25b, #a8cf45, #20a25b)'
          }}></div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full md:w-auto px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-lg 
                     hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
            style={{ 
              background: 'linear-gradient(135deg, #20a25b 0%, #1a8a4d 100%)'
            }}
          >
            Continue to Gallery →
          </button>

          {/* Small footer text */}
          <p className="mt-6 text-sm text-gray-500">
            You can still explore on this device
          </p>
        </div>
      </div>
    </>
  );
}