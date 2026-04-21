import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Smile, Frown, Meh, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === null) {
      toast.error('Por favor selecciona una calificación');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://egarcia.app.n8n.cloud/webhook/a519263a-021f-4faf-a621-1ab6ce1bed11', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          comment,
          source: 'Candidate V1 Dashboard',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        toast.success('¡Gracias por tu feedback!', {
          description: 'Tus comentarios nos ayudan a evolucionar la plataforma.',
          icon: <Heart className="w-4 h-4 text-pink-500" />
        });
        setRating(null);
        setComment('');
        onClose();
      } else {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      toast.error('No se pudo enviar el feedback. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratings = [
    { value: 1, icon: <Frown className="w-8 h-8" />, label: 'Mejorable', color: 'hover:text-red-500' },
    { value: 2, icon: <Meh className="w-8 h-8" />, label: 'Neutral', color: 'hover:text-amber-500' },
    { value: 3, icon: <Smile className="w-8 h-8" />, label: '¡Genial!', color: 'hover:text-emerald-500' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
        {/* Backdrop glass */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Premium Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white/90 rounded-[32px] w-full max-w-[500px] shadow-[0_32px_80px_-15px_rgba(0,0,0,0.3)] border border-white overflow-hidden backdrop-blur-xl"
        >
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles className="w-24 h-24 rotate-12" />
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-3xl font-black tracking-tight mb-2">Tu opinión importa</h2>
            <p className="text-white/80 font-medium">Ayúdanos a construir el futuro de la selección de talento.</p>
          </div>

          <div className="p-8">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-6">¿Qué te parece la nueva experiencia V1?</label>
            
            <div className="flex justify-between gap-4 mb-10">
              {ratings.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRating(r.value)}
                  className={`flex-1 flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 group ${
                    rating === r.value 
                      ? 'bg-blue-50 border-blue-500 text-blue-600 scale-105 shadow-lg shadow-blue-100' 
                      : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 ' + r.color
                  }`}
                >
                  <div className={`transition-transform duration-300 group-hover:scale-110 ${rating === r.value ? 'scale-110' : ''}`}>
                    {r.icon}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-tight">{r.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Compártenos tus comentarios</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="¿Qué mejorarías? ¿Qué es lo que más te gustó?..."
                className="w-full h-36 bg-slate-50 border border-slate-100 rounded-2xl p-5 text-slate-700 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none resize-none font-medium leading-relaxed"
              />
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 py-4 rounded-2xl font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest text-xs"
              >
                Cerrar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || rating === null}
                className="flex-[2] bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-slate-900 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enviar Feedback</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FeedbackModal;
