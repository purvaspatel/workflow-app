import React, { useState, useEffect } from 'react';
import { Laptop, AlertTriangle, ChevronRight } from 'lucide-react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-6 max-w-sm w-full shadow-2xl">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="bg-yellow-500/10 p-3 rounded-full">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
          
          <h2 className="text-xl font-bold text-white">Desktop View Recommended</h2>
          
          <div className="bg-gray-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-3">
              <Laptop className="w-5 h-5" />
              <span className="font-medium">Flow Builder App</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              This is a flow diagram builder that works best on larger screens (dev is learning coding). You can create nodes, connect them, customize colors, and export your work. For the best experience, please use a desktop browser.
            </p>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors duration-200 text-sm font-medium mt-2"
          >
            Continue Anyway (Things might not look ok!!)
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;