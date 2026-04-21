import React from 'react';
import { MessageSquareText, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useOnboarding } from '../../context/OnboardingContext';

interface FeedbackFABProps {
  onClick: () => void;
}

const FeedbackFAB: React.FC<FeedbackFABProps> = ({ onClick }) => {
  const { isSerenaActive } = useOnboarding();
  const positionClasses = isSerenaActive ? 'right-[450px]' : 'right-8';

  return (
    <div className={`fixed bottom-8 ${positionClasses} z-[9999] flex flex-col items-end gap-3 group transition-all duration-300`}>
      {/* Premium Label Tooltip */}
      <motion.div 
        initial={{ opacity: 0, x: 20, scale: 0.8 }}
        whileHover={{ opacity: 1, x: 0, scale: 1 }}
        className="bg-white/90 backdrop-blur-md border border-white/50 px-4 py-2 rounded-2xl shadow-2xl mr-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          <p className="text-[11px] font-black tracking-tight text-slate-800 whitespace-nowrap uppercase">
            Ayúdanos a mejorar V1
          </p>
        </div>
      </motion.div>

      {/* Vibrant Pulsing FAB */}
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 rounded-[24px] bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600 text-white flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] overflow-hidden"
        data-tour="feedback-button"
      >
        {/* Animated Background Pulse */}
        <motion.div 
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-white rounded-full blur-2xl"
        />
        
        <div className="relative z-10 flex flex-col items-center">
          <MessageSquareText size={28} className="drop-shadow-lg" />
        </div>

        {/* Shiny sweep effect */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%]"
        />
      </motion.button>
    </div>
  );
};

export default FeedbackFAB;
