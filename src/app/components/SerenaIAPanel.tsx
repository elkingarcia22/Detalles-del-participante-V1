import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { Sparkles, X, Send, ChevronDown, Plus, Copy, Edit2, MessageCircle, Mail, AlertCircle } from 'lucide-react';
import { cn } from './ui/utils';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  from: 'ai' | 'user';
  text: string;
  timestamp: string;
  isActionable?: boolean;
}

interface SerenaIAPanelProps {
  isOpen: boolean;
  onClose: () => void;
  candidate?: any;
  mode?: 'candidate' | 'global';
  allCandidates?: any[];
  isValentina?: boolean;
}

const getMockAIResponse = (question: string, candidateName: string) => {
  const q = question.toLowerCase();
  if (q.includes('experiencia') || q.includes('experience')) {
    return `${candidateName} cuenta con una trayectoria sólida en diseño y desarrollo de productos. He analizado sus roles previos y destaca su capacidad para liderar proyectos técnicos complejos.`;
  }
  if (q.includes('habilidades') || q.includes('skills')) {
    return `Sus habilidades técnicas están en el top 5% de los candidatos. Domina Figma, Design Systems y tiene bases sólidas en desarrollo frontend, lo que lo hace un perfil híbrido muy valioso.`;
  }
  if (q.includes('contactado') || q.includes('whatsapp') || q.includes('mensaje')) {
    return `¡Claro! Estoy enviando el mensaje de seguimiento a ${candidateName} ahora mismo. Te avisaré en cuanto reciba una confirmación de entrega.`;
  }
  return `He analizado ese punto en el perfil de ${candidateName}. Su experiencia sugiere que tiene las competencias necesarias, aunque valdría la pena profundizar en la entrevista técnica sobre sus metodologías específicas.`;
};

export function SerenaIAPanel({ isOpen, onClose, candidate, mode, allCandidates, isValentina }: SerenaIAPanelProps) {
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const candidateName = candidate?.name || 'el candidato';
  const isGlobal = mode === 'global';
  
  // Encontrar candidatos bloqueados (solo para modo global)
  const blockedCandidates = isGlobal 
    ? (allCandidates || []).filter(c => {
        const apps = c.applications || [];
        return apps.some((a: any) => a.status === 'active' && a.blocker);
      })
    : [];

  const activeApps = !isGlobal 
    ? (candidate?.applications?.filter((a: any) => a.status === 'active') || [])
    : [];

  // Efecto inicial para saludar y dar contexto
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        if (isGlobal) {
          setMessages([
            {
              id: 'initial-global',
              from: 'ai',
              text: `Hola 👋 Soy Serena, tu asistente de reclutamiento. He analizado el flujo y he detectado ${blockedCandidates.length} candidatos con bloqueos que requieren tu atención.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isActionable: true
            }
          ]);
        } else {
          setMessages([
            {
              id: 'initial',
              from: 'ai',
              text: `Hola 👋 He analizado el estado de ${candidateName}. Actualmente tiene ${activeApps.length} vacantes activas.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isActionable: true
            }
          ]);
        }
        setIsTyping(false);
      }, 800);
    }
  }, [isOpen, isGlobal]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      from: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: 'ai',
        text: getMockAIResponse(chatInput, candidateName),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAction = (actionType: string, customName?: string) => {
    const targetName = customName || candidateName;

    if (isValentina && actionType === 'whatsapp') {
      toast.error('No es posible abrir WhatsApp en este momento. Inténtalo de nuevo en unos minutos.');
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        from: 'ai',
        text: actionType === 'whatsapp' 
          ? `¡Claro! Iniciando contacto por WhatsApp con ${targetName}...`
          : `Entendido, enviando correo electrónico de seguimiento a ${targetName}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div 
      className={cn(
        "h-full bg-white border-l border-gray-100 flex flex-col transition-all duration-300 ease-in-out overflow-hidden shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)]",
        isOpen ? "w-[420px] opacity-100" : "w-0 opacity-0 border-none"
      )}
    >
      {/* Absolute container to ensure it doesn't push parent height if content overflows */}
      <div className="flex flex-col h-full w-[420px] overflow-hidden">
        {/* Header - Fixed height */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800">Serena IA</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area - The only scrollable part */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={cn(
            "flex flex-col",
            msg.from === 'user' ? "items-end" : "items-start"
          )}>
            <div className={cn(
              "flex items-start gap-3",
              msg.from === 'user' ? "max-w-[85%]" : "max-w-[95%]"
            )}>
              {msg.from === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-500 shadow-lg flex-shrink-0 mt-1 animate-pulse border-2 border-white" />
              )}
              <div className="flex-1 space-y-2">
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.from === 'user' 
                    ? "bg-slate-100/80 text-slate-800 rounded-tr-none" 
                    : "bg-white border border-gray-100 text-slate-700 rounded-tl-none"
                )}>
                  {msg.text}

                  {/* Contextual Action Cards - Candidate Mode */}
                  {msg.isActionable && !isGlobal && activeApps.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {activeApps.map((app: any) => {
                        const isBlocked = !!app.blocker;
                        return (
                          <div key={app.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                {app.jobTitle}
                              </span>
                              <Badge className={cn(
                                "text-[9px] px-1.5 py-0 border-none",
                                isBlocked ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                              )}>
                                {isBlocked ? 'BLOQUEADO' : 'EN PROCESO'}
                              </Badge>
                            </div>
                            
                            {isBlocked && (
                              <div className="flex items-start gap-2 py-1">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-slate-600 leading-tight">
                                  {app.blocker?.reason || "Falta completar entrevista técnica."}
                                </p>
                              </div>
                            )}

                            {isBlocked && (
                              <div className="flex gap-2 pt-1 border-t border-slate-200/50">
                                <button 
                                  onClick={() => handleAction('whatsapp')}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                                >
                                  <MessageCircle className="w-3 h-3 text-emerald-500" /> WhatsApp
                                </button>
                                <button 
                                  onClick={() => handleAction('email')}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                                >
                                  <Mail className="w-3 h-3 text-blue-500" /> Email
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Contextual Action Cards - Global Mode */}
                  {msg.isActionable && isGlobal && blockedCandidates.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-[11px] font-semibold text-slate-500 mb-2 px-1">CANDIDATOS CON BLOQUEOS:</p>
                      {blockedCandidates.map((c: any) => {
                        const blockedApp = c.applications.find((a: any) => a.blocker);
                        return (
                          <div key={c.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                  {c.name.charAt(0)}
                                </div>
                                <span className="text-xs font-bold text-slate-800">
                                  {c.name}
                                </span>
                              </div>
                              <Badge className="bg-amber-100 text-amber-700 text-[9px] px-1.5 py-0 border-none uppercase">
                                Bloqueado
                              </Badge>
                            </div>
                            
                            <div className="flex items-start gap-2 bg-white/50 p-2 rounded-lg border border-slate-100">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                  {blockedApp?.jobTitle}
                                </p>
                                <p className="text-[11px] text-slate-600 leading-tight">
                                  {blockedApp?.blocker?.reason}
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-1">
                              <button 
                                onClick={() => handleAction('whatsapp', c.name)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                              >
                                <MessageCircle className="w-3 h-3 text-emerald-500" /> Ayudar vía WhatsApp
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className={cn(
                  "flex items-center gap-2 text-[11px] text-gray-400 font-medium px-1",
                  msg.from === 'user' ? "justify-end" : "justify-start"
                )}>
                  <span>{msg.timestamp}</span>
                  {msg.from === 'user' && (
                    <div className="flex items-center gap-2 ml-1">
                      <Copy className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600 transition-colors" />
                      <Edit2 className="w-3.5 h-3.5 cursor-pointer hover:text-gray-600 transition-colors" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-500 to-purple-500 shadow-lg flex-shrink-0 mt-1 animate-pulse border-2 border-white" />
            <div className="bg-slate-50 rounded-2xl rounded-tl-none px-5 py-3 border border-gray-100">
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed height */}
      <div className="flex-shrink-0 p-6 bg-white border-t border-gray-100">
        <div className="relative group">
          <div className="bg-white border border-gray-200 rounded-3xl p-4 pl-14 pr-14 shadow-sm group-focus-within:border-blue-300 group-focus-within:ring-4 group-focus-within:ring-blue-50 transition-all min-h-[80px] flex items-center">
            <textarea
              ref={inputRef}
              rows={1}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Responder..."
              className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400 resize-none text-sm outline-none"
            />
          </div>

          {/* Plus Button */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all">
            <Plus className="w-4 h-4" />
          </button>

          {/* Send Button with Gradient */}
          <button 
            onClick={handleSendMessage}
            disabled={!chatInput.trim() || isTyping}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-lg",
              "bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600",
              "hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:shadow-none"
            )}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[11px] text-center text-gray-400 font-medium mt-4">
          Agentes AI puede cometer errores, verifica las respuestas.
        </p>
      </div>
    </div>
  </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
