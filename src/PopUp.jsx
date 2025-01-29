import { X, Info, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const PopUp = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const hasSeenPopUp = localStorage.getItem('hasSeenPopUp');
    if (!hasSeenPopUp) {
      setTimeout(() => setShowPopUp(true), 300);
      localStorage.setItem('hasSeenPopUp', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopUp(false);
      setIsClosing(false);
    }, 200);
  };

  if (!showPopUp) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/50 transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`w-[28rem] bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl transform transition-all duration-200 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-gray-100">Welcome to Flow Builder</h3>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            Build your own amazing flow with colorful nodes and dynamic edges! Add nodes, connect them, change colors, and shapes.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            You can Export and IMport your designs as well!
          </p>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Ready to use</span>
            </div>
            <button 
              onClick={handleClose}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 text-sm font-medium rounded-md transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;