import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface SerenaIAChatButtonProps {
  candidate: any;
}

const getMockAIResponse = (question: string, candidateName: string) => {
  const q = question.toLowerCase();
  if (q.includes('experiencia') || q.includes('experience')) {
    return `${candidateName} cuenta con varios años de experiencia en su área. Su perfil muestra una progresión sólida en roles técnicos con habilidades bien definidas.`;
  }
  if (q.includes('debilidades') || q.includes('weakness')) {
    return `Según el análisis del CV, ${candidateName} está en fase de crecimiento. Tiene buena base técnica pero podría fortalecer experiencia en arquitecturas más complejas.`;
  }
  if (q.includes('salario') || q.includes('salary')) {
    return `La expectativa salarial de ${candidateName} está alineada con el presupuesto del rol. Se encuentra en un rango competitivo para su nivel de experiencia.`;
  }
  if (q.includes('disponibilidad')) {
    return `${candidateName} tiene disponibilidad para trabajo remoto y también está abierto a la posibilidad de reubicación si es necesario.`;
  }
  if (q.includes('fortalezas') || q.includes('strengths')) {
    return `Principales fortalezas de ${candidateName}: sólidos conocimientos técnicos, experiencia práctica en el área, y una progresión consistente mostrando crecimiento profesional.`;
  }
  if (q.includes('mover') || q.includes('etapa')) {
    return `Te recomiendo revisar las etapas completadas antes de mover a ${candidateName}. ¿Quieres que te muestre el resumen del proceso actual?`;
  }
  if (q.includes('whatsapp') || q.includes('contactar') || q.includes('escribir')) {
    return `Puedo ayudarte a contactar a ${candidateName} por WhatsApp. ¿Quieres que redacte un mensaje de seguimiento?`;
  }
  return `Basándome en el perfil de ${candidateName}, puedo decir que es un candidato con potencial. ¿Hay algún aspecto específico sobre el que quieras profundizar? Puedo analizar su experiencia técnica, stack, expectativas o cualquier otra área de interés.`;
};

export function SerenaIAChatButton({ candidate }: SerenaIAChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ from: 'ai' | 'user'; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const candidateName = candidate?.name || 'el candidato';

  // Detectar si hay bloqueadores en aplicaciones activas
  const blockedApps = candidate?.applications?.filter(
    (app: any) => app.status === 'active' && app.blocker
  ) || [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = { from: 'user' as const, text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        from: 'ai' as const,
        text: getMockAIResponse(chatInput, candidateName),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Circular floating button - 40x40 (w-10) */}
      <button
        onClick={() => setIsOpen(true)}
        title="Serena IA"
        className={cn(
          'pointer-events-auto relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200',
          'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-blue-400/20'
        )}
      >
        <Sparkles className="w-5 h-5 text-white" />
        {blockedApps.length > 0 && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full ring-2 ring-white shadow-sm animate-pulse" />
        )}
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat panel */}
          <div
            className={cn(
              'relative pointer-events-auto w-full max-w-sm flex flex-col rounded-2xl shadow-2xl overflow-hidden',
              'bg-white border border-slate-200',
              'animate-in fade-in slide-in-from-bottom-4 duration-300',
              'h-[560px] max-h-[80vh]'
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-100 flex-shrink-0 shadow-sm relative z-10">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">Serena IA</p>
                <p className="text-xs font-medium text-gray-500 truncate">Analizando a {candidateName}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
              {/* Initial Serena message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-200 flex-1 space-y-3">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Hola 👋 He analizado el perfil de{' '}
                    <span className="font-bold text-gray-900">{candidateName}</span>.
                  </p>

                  {/* Active applications status */}
                  {candidate?.applications?.filter((a: any) => a.status === 'active').map((app: any) => {
                    const isBlocked = !!app.blocker;
                    return (
                      <div key={app.id} className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                            {app.jobTitle}
                          </span>
                          <Badge
                            className={cn(
                              'text-[10px] font-bold px-2 py-0 border',
                              isBlocked
                                ? 'bg-amber-50 text-amber-600 border-amber-200'
                                : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            )}
                          >
                            {isBlocked ? 'En riesgo' : 'Al día'}
                          </Badge>
                        </div>
                        <div className="flex items-start gap-2">
                          <div
                            className={cn(
                              'mt-1.5 w-1.5 h-1.5 rounded-full shrink-0',
                              isBlocked ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                            )}
                          />
                          <p className="text-xs text-gray-600 leading-snug">
                            {isBlocked
                              ? app.blocker?.reason || `Bloqueado en ${app.currentStage}. Se requiere acción.`
                              : `Activo en ${app.currentStage?.replace(/-/g, ' ')}. Esperando siguiente interacción.`}
                          </p>
                        </div>
                        {isBlocked && (
                          <div className="flex gap-1.5 pt-1">
                            <button className="text-[10px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" /> WhatsApp
                            </button>
                            <button className="text-[10px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1">
                              <Mail className="w-3 h-3" /> Email
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <p className="text-xs font-medium text-gray-400">¿En qué te puedo ayudar?</p>
                </div>
              </div>

              {/* Dynamic messages */}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn('flex', msg.from === 'user' ? 'justify-end' : 'items-start gap-3')}
                >
                  {msg.from === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.from === 'ai'
                        ? 'bg-white border border-gray-200 shadow-sm rounded-tl-none text-gray-700'
                        : 'bg-blue-600 text-white rounded-tr-none font-medium shadow-sm'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={`Pregunta algo sobre ${candidateName}...`}
                  className="pr-10 bg-gray-50 border-gray-200 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-blue-600 hover:bg-blue-700 shadow-sm disabled:opacity-40 disabled:shadow-none text-white rounded-lg flex items-center justify-center transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 font-medium mt-2">
                Serena IA puede cometer errores. Verifica la información importante.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
