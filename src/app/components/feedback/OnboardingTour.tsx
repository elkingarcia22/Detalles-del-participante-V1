import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, Sparkles, MousePointer2 } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext';

interface TourStep {
  target: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    target: 'center',
    title: '¡Impulsa tu Reclutamiento!',
    content: 'Bienvenido a la nueva experiencia V1. Te guiaremos a través de las mejoras clave para que aproveches al máximo la plataforma.',
    icon: <Sparkles size={24} />,
    position: 'center'
  },
  {
    target: '[data-tour="candidate-card"]',
    title: 'Explora Candidatos',
    content: 'Selecciona un candidato de la lista para ver su perfil detallado. Hemos estandarizado toda la información técnica para tu comodidad.',
    icon: <MousePointer2 size={24} />,
    position: 'right'
  },
  {
    target: '[data-tour="candidate-header"]',
    title: 'Perfil Profesional',
    content: 'Aquí tienes un resumen ejecutivo del candidato: datos de contacto, ubicación y tags clave siempre a la mano.',
    icon: <div className="text-xl">👤</div>,
    position: 'bottom'
  },
  {
    target: '[data-tour="stages-tracker"]',
    title: 'Control del Proceso',
    content: 'Visualiza en qué punto se encuentra el candidato de forma rápida y visual con nuestro nuevo tracker de etapas.',
    icon: <div className="text-xl">📈</div>,
    position: 'bottom'
  },
  {
    target: '[data-tour="stages-list"]',
    title: 'Evidencia Técnica',
    content: 'Accede a los resultados de pruebas, análisis de IA y antecedentes en un formato claro y estandarizado.',
    icon: <div className="text-xl">📑</div>,
    position: 'top'
  },
  {
    target: '[data-tour="feedback-button"]',
    title: 'Queremos escucharte',
    content: 'Tu feedback es el motor de esta evolución. Usa este botón en cualquier momento para enviarnos tus impresiones.',
    icon: <div className="text-xl">💬</div>,
    position: 'left'
  }
];

const OnboardingTour: React.FC = () => {
  const { isTourActive, currentStep, nextStep, prevStep, finishTour } = useOnboarding();
  const [spotlightStyles, setSpotlightStyles] = useState<React.CSSProperties>({});
  const [tooltipStyles, setTooltipStyles] = useState<React.CSSProperties>({});
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isTourActive) {
      updateSpotlight();
      const timer = setInterval(updateSpotlight, 500); // Poll for layout changes (like drawer opening)
      return () => clearInterval(timer);
    }
  }, [isTourActive, currentStep, windowSize]);

  const updateSpotlight = () => {
    const step = TOUR_STEPS[currentStep];
    if (step.target === 'center') {
      setSpotlightStyles({ display: 'none' });
      setTooltipStyles({
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        position: 'fixed'
      });
      return;
    }

    const element = document.querySelector(step.target);
    if (!element) {
      // If element not found (e.g. drawer not open yet for drawer steps), show a generic floating tooltip or wait
      setSpotlightStyles({ display: 'none' });
      return;
    }

    const rect = element.getBoundingClientRect();
    const padding = 12;
    
    setSpotlightStyles({
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      display: 'block',
      borderRadius: '16px'
    });

    // Smart tooltip positioning
    const tooltipWidth = 380;
    const tooltipHeight = 220;
    const margin = 24;
    let top = 0;
    let left = 0;
    let transform = '';

    switch (step.position) {
      case 'bottom':
        top = rect.bottom + margin;
        left = Math.max(margin, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, window.innerWidth - tooltipWidth - margin));
        break;
      case 'top':
        top = rect.top - margin - tooltipHeight;
        left = Math.max(margin, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, window.innerWidth - tooltipWidth - margin));
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - margin - tooltipWidth;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + margin;
        break;
    }

    // Secondary adjustments to prevent horizontal overflow
    if (left + tooltipWidth > window.innerWidth - margin) left = window.innerWidth - tooltipWidth - margin;
    if (left < margin) left = margin;
    
    // Vertical overflow check
    if (top + tooltipHeight > window.innerHeight - margin) top = window.innerHeight - tooltipHeight - margin;
    if (top < margin) top = margin;

    setTooltipStyles({
      top: `${top}px`,
      left: `${left}px`,
      transform,
      position: 'fixed'
    });
  };

  if (!isTourActive) return null;

  const step = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[10001] pointer-events-none">
      <AnimatePresence>
        {/* 4-Panel Mask to allow clicking the hole */}
        <div className={`absolute inset-0 z-[10002] pointer-events-none transition-opacity duration-300 ${spotlightStyles.display === 'none' ? 'opacity-0' : 'opacity-100'}`}>
          {/* Top Mask */}
          <div 
            className="absolute top-0 left-0 right-0 bg-slate-900/60 backdrop-blur-[2px] pointer-events-auto transition-all duration-500" 
            style={{ height: Math.max(0, (spotlightStyles.top as number) || 0) }}
          />
          {/* Bottom Mask */}
          <div 
            className="absolute left-0 right-0 bottom-0 bg-slate-900/60 backdrop-blur-[2px] pointer-events-auto transition-all duration-500" 
            style={{ top: Math.min(windowSize.height, ((spotlightStyles.top as number) || 0) + ((spotlightStyles.height as number) || 0)) }}
          />
          {/* Left Mask */}
          <div 
            className="absolute left-0 bg-slate-900/60 backdrop-blur-[2px] pointer-events-auto transition-all duration-500" 
            style={{ 
              top: Math.max(0, (spotlightStyles.top as number) || 0), 
              height: (spotlightStyles.height as number) || 0,
              width: Math.max(0, (spotlightStyles.left as number) || 0)
            }}
          />
          {/* Right Mask */}
          <div 
            className="absolute right-0 bg-slate-900/60 backdrop-blur-[2px] pointer-events-auto transition-all duration-500" 
            style={{ 
              top: Math.max(0, (spotlightStyles.top as number) || 0), 
              height: (spotlightStyles.height as number) || 0,
              left: Math.min(windowSize.width, ((spotlightStyles.left as number) || 0) + ((spotlightStyles.width as number) || 0))
            }}
          />

          {/* Animated Border Frame (Non-blocking) */}
          <motion.div
            layout
            style={spotlightStyles}
            className="absolute border-[3px] border-blue-400/50 rounded-[16px] pointer-events-none"
            animate={{
              borderColor: ['rgba(96,165,250,0.4)', 'rgba(96,165,250,0.8)', 'rgba(96,165,250,0.4)'],
              boxShadow: [
                '0 0 0 0px rgba(96,165,250,0)',
                '0 0 0 20px rgba(96,165,250,0.15)',
                '0 0 0 0px rgba(96,165,250,0)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Tooltip Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={tooltipStyles}
          className="absolute z-[10003] w-[380px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto border border-white/50 overflow-hidden"
        >
          {/* Progress Bar Header */}
          <div className="h-1.5 w-full bg-slate-100 flex">
            {TOUR_STEPS.map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 h-full transition-all duration-500 ${i <= currentStep ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-transparent'}`}
              />
            ))}
          </div>

          <div className="p-7">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                {step.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-blue-600/60 block -mb-1">Paso {currentStep + 1} de {TOUR_STEPS.length}</span>
                <h3 className="font-black text-xl text-slate-800 tracking-tight">{step.title}</h3>
              </div>
              <button 
                onClick={finishTour}
                className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all border border-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <p 
              className="text-slate-600 leading-relaxed mb-8 font-medium"
              dangerouslySetInnerHTML={{ __html: step.content }}
            />

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 font-bold px-3 py-2 rounded-xl transition-all ${currentStep === 0 ? 'opacity-0' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <ChevronLeft size={20} />
                <span>Atrás</span>
              </button>

              <button
                onClick={currentStep === TOUR_STEPS.length - 1 ? finishTour : nextStep}
                className="flex items-center gap-3 bg-slate-900 group text-white pl-6 pr-4 py-3 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
              >
                <span>{currentStep === TOUR_STEPS.length - 1 ? 'Finalizar' : 'Continuar'}</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingTour;
