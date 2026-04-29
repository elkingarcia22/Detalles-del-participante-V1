import React, { useState } from 'react';
import { 
  Bot, 
  Download, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  ChevronLeft,
  Play,
  Volume2,
  Trophy,
  Target,
  BarChart3,
  Sparkles,
  Plus,
  Lock,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';

interface SerenaAIDetailViewProps {
  interviewData?: {
    transcript: Array<{
      role: 'serena' | 'candidate';
      text: string;
      timestamp?: string;
      audioUrl?: string;
    }>;
    questionScores: Array<{
      objective: string;
      question: string;
      score: number;
      feedback?: string;
    }>;
    overallFeedback: {
      summary: string;
      strengths: string[];
      improvements: string[];
    };
  };
  score?: number;
  onBack: () => void;
  isValentina?: boolean;
}

export function SerenaAIDetailView({ interviewData, score = 88, onBack, isValentina }: SerenaAIDetailViewProps) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [comments, setComments] = useState([
    { id: 1, user: 'Ana Martínez', role: 'Senior Recruiter', date: '29 Abr, 2024', text: 'Excelente manejo de conceptos técnicos. Muy prometedor para el equipo de arquitectura.', avatar: 'AM', isPrivate: false },
    { id: 2, user: 'Carlos Ruiz', role: 'Tech Lead', date: '28 Abr, 2024', text: 'Me gustaría validar más su experiencia con Kubernetes en la siguiente fase.', avatar: 'CR', isPrivate: false }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: 'Usuario Actual',
      role: 'Reclutador',
      date: 'Hoy',
      text: newComment,
      avatar: 'UA',
      isPrivate: isPrivate
    };
    setComments([comment, ...comments]);
    setNewComment('');
    setIsAddingComment(false);
    setIsPrivate(false);
    toast.success('Comentario añadido correctamente');
  };

  if (!interviewData) {
    return (
      <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No hay datos disponibles</h3>
        <p className="text-gray-500 mb-6 text-sm">No se encontraron registros de la entrevista con Serena IA para este candidato.</p>
        <Button onClick={onBack} variant="outline" className="gap-2 border-gray-200">
          <ChevronLeft className="w-4 h-4" />
          Volver a las etapas de la vacante
        </Button>
      </div>
    );
  }

  const { transcript, questionScores, overallFeedback } = interviewData;

  const handlePlayAudio = (text: string) => {
    toast.info(`Reproduciendo audio: "${text.substring(0, 30)}..."`, {
      icon: <Volume2 className="w-4 h-4 text-blue-500" />,
    });
  };

  const handleDownloadReport = () => {
    if (isValentina) {
      toast.error('El reporte detallado no está disponible en este momento.');
      return;
    }
    toast.success('Descargando reporte completo de Serena IA...');
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Back Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-xl font-bold text-gray-900">Entrevista Serena IA</h2>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                Completada
              </Badge>
            </div>

          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-right px-4 hidden sm:block">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-0.5">Score de Candidato</p>
            <div className="flex items-center justify-end gap-2">
              <span className={cn(
                "text-2xl font-black",
                score >= 80 ? "text-gray-900" : score >= 60 ? "text-amber-600" : "text-red-600"
              )}>{score}/100</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="analysis" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-slate-200/50 p-1.5 rounded-2xl mb-8 w-full sm:w-auto flex justify-start h-auto border border-slate-200/30">
          <TabsTrigger 
            value="analysis" 
            className="rounded-xl px-6 py-2.5 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 transition-all flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Análisis y Puntajes
          </TabsTrigger>
          <TabsTrigger 
            value="transcript" 
            className="rounded-xl px-6 py-2.5 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Transcripción
          </TabsTrigger>
          <TabsTrigger 
            value="feedback" 
            className="rounded-xl px-6 py-2.5 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 transition-all flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Feedback Serena
          </TabsTrigger>
          <TabsTrigger 
            value="comments" 
            className="rounded-xl px-6 py-2.5 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Comentarios
          </TabsTrigger>
        </TabsList>

        {/* 1. Analysis Tab */}
        <TabsContent value="analysis" className="mt-0 animate-in fade-in duration-300 space-y-8">
          {/* 1. Resumen de Evaluación */}
          {/* 1. Resumen de Evaluación */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5 border-gray-100 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Preguntas</p>
                  <p className="text-2xl font-black text-gray-900">{questionScores.length}</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium mt-2">Respondidas exitosamente</p>
            </Card>

            <Card className="p-5 border-gray-100 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duración</p>
                  <p className="text-2xl font-black text-gray-900">12:45</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium mt-2">Minutos totales</p>
            </Card>

            <Card className="p-5 border-gray-100 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confianza</p>
                  <p className="text-2xl font-black text-gray-900">98%</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium mt-2">Nivel de precisión IA</p>
            </Card>
          </div>

          {/* 2. Desglose por Pregunta */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-400" />
                <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase">Desglose por Pregunta</h4>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                {questionScores.length} TOTALES
              </span>
            </div>
            
            <div className="grid gap-4">
              {questionScores.map((item, idx) => (
                <Card key={idx} className="p-5 border-gray-100 bg-white shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex-1 flex items-center gap-5">
                      <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xs font-black text-blue-600 border border-blue-100 shrink-0">
                        {idx + 1}
                      </span>
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest block leading-none">{item.objective}</span>
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                          {item.question}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      {item.feedback && (
                        <div className="hidden lg:block px-4 py-2 bg-gray-50/80 rounded-xl italic text-[10px] text-slate-500 max-w-[300px] truncate border border-gray-100">
                          "{item.feedback}"
                        </div>
                      )}
                      <div className="flex items-center gap-2.5 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-lg font-black text-slate-800">{item.score}</span>
                        <span className="text-[8px] font-bold text-gray-400 uppercase">Pts</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 3. Observaciones */}
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-2 px-1">
              <Sparkles className="w-4 h-4 text-gray-400" />
              <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase">Observación de IA</h4>
            </div>
            
            <Card className="p-8 border-gray-100 bg-slate-50/50 shadow-sm border-dashed rounded-3xl">
              <p className="text-base text-gray-700 leading-relaxed italic font-medium">
                "El candidato demuestra una capacidad sobresaliente para articular soluciones técnicas complejas. Se recomienda profundizar en su experiencia con arquitecturas distribuidas en la entrevista técnica, ya que mostró un dominio teórico excepcional pero con pocos ejemplos prácticos detallados."
              </p>
            </Card>
          </div>
        </TabsContent>

        {/* 2. Transcript Tab */}
        <TabsContent value="transcript" className="mt-0 animate-in fade-in duration-300">
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Registro de la Conversación</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{transcript.length} Mensajes</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-bold gap-2 border-gray-200" onClick={handleDownloadReport}>
                <Download className="w-4 h-4" />
                Descargar PDF
              </Button>
            </div>
            
            <div className="p-6 space-y-8 bg-slate-50/50">
              {transcript.map((msg, idx) => (
                <div key={idx} className={cn(
                  "flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.role === 'candidate' ? "flex-row-reverse" : "flex-row"
                )} style={{ animationDelay: `${idx * 50}ms` }}>
                  {/* Avatar */}
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm",
                    msg.role === 'serena' ? "bg-white border border-gray-100 text-blue-600" : "bg-slate-900 text-white"
                  )}>
                    {msg.role === 'serena' ? <Bot className="w-6 h-6" /> : <span className="font-black text-xs">CP</span>}
                  </div>
                  
                  {/* Bubble Container */}
                  <div className={cn(
                    "flex flex-col gap-1.5 max-w-[75%]",
                    msg.role === 'candidate' ? "items-end" : "items-start"
                  )}>
                    <div className="flex items-center gap-3 px-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {msg.role === 'serena' ? 'Serena IA' : 'Candidato'}
                      </span>
                      {msg.timestamp && <span className="text-[10px] text-gray-300 font-bold">{msg.timestamp}</span>}
                    </div>
                    
                    <div className={cn(
                      "relative p-4 rounded-3xl text-sm leading-relaxed shadow-sm transition-all group-hover:shadow-md",
                      msg.role === 'candidate' 
                        ? "bg-white text-gray-800 border-2 border-slate-100 rounded-tr-none" 
                        : "bg-slate-100 text-gray-700 border border-slate-200 rounded-tl-none"
                    )}>
                        {msg.text}
                        
                        {/* Audio Player for Candidate */}
                        {msg.role === 'candidate' && (
                          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
                            <button 
                              onClick={() => handlePlayAudio(msg.text)}
                              className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 shrink-0 group/play"
                            >
                              <Play className="w-4 h-4 fill-current ml-0.5 group-hover/play:scale-110 transition-transform" />
                            </button>
                            
                            <div className="flex-1 h-8 flex items-center gap-[3px] px-2">
                              {[
                                0.3, 0.5, 0.8, 0.4, 0.6, 0.9, 0.5, 0.7, 0.4, 0.8, 
                                0.6, 0.3, 0.5, 0.9, 0.4, 0.7, 0.5, 0.8, 0.4, 0.6,
                                0.9, 0.5, 0.7, 0.4, 0.8, 0.6, 0.3, 0.5, 0.9, 0.4
                              ].map((h, i) => (
                                <div 
                                  key={i} 
                                  className="flex-1 bg-slate-200 rounded-full transition-all duration-300" 
                                  style={{ 
                                    height: `${h * 100}%`,
                                    opacity: i > 12 ? 0.4 : 1 // Simulate partial progress
                                  }} 
                                />
                              ))}
                            </div>
                            
                            <div className="text-[10px] font-black text-slate-400 tabular-nums uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                              0:45
                            </div>
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              ))}
            </div>
            

          </Card>
        </TabsContent>

        {/* 3. Feedback Tab */}
        <TabsContent value="feedback" className="mt-0 animate-in fade-in duration-300">
          <div className="space-y-6">
            <Card className="p-8 border-gray-100 shadow-sm relative overflow-hidden">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Análisis cualitativo basado en respuestas y tono</p>
                  </div>
                </div>
                
                <p className="text-base text-gray-700 leading-relaxed max-w-4xl mb-10">
                  {overallFeedback.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <div className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                    <h5 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      Fortalezas Destacadas
                    </h5>
                    <ul className="space-y-5">
                      {overallFeedback.strengths.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed font-semibold group-hover:text-gray-900 transition-colors">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="bg-white border border-gray-200 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-200 transition-colors">
                    <h5 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      Áreas de Crecimiento
                    </h5>
                    <ul className="space-y-5">
                      {overallFeedback.improvements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Target className="w-3.5 h-3.5 text-amber-600" />
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed font-semibold group-hover:text-gray-900 transition-colors">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>


              </div>
            </Card>
          </div>
        </TabsContent>
        
        {/* 4. Comments Tab */}
        <TabsContent value="comments" className="mt-0 animate-in fade-in duration-300">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase">Lista de comentarios</h4>
                <Badge variant="outline" className="text-[10px] border-slate-200 bg-white">{comments.length}</Badge>
              </div>
              <Button 
                onClick={() => setIsAddingComment(!isAddingComment)}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 flex items-center gap-2 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                Añadir comentario
              </Button>
            </div>

            {/* Inline Comment Form */}
            {isAddingComment && (
              <Card className="p-6 border-slate-200 shadow-md bg-white animate-in slide-in-from-top-4 duration-300 rounded-3xl">
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario sobre el desempeño del candidato..."
                  className="w-full h-32 p-4 text-sm bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-slate-500/20 resize-none mb-4 placeholder:text-gray-400 font-medium"
                  autoFocus
                />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div 
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => setIsPrivate(!isPrivate)}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
                      isPrivate ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 group-hover:border-slate-300"
                    )}>
                      {isPrivate && <Lock className="w-3 h-3" />}
                    </div>
                    <span className="text-xs font-bold text-slate-600">Privado</span>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        setIsAddingComment(false);
                        setNewComment('');
                        setIsPrivate(false);
                      }}
                      className="flex-1 sm:flex-none rounded-xl text-slate-500 font-bold text-xs px-6 hover:bg-slate-100 transition-all"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="flex-1 sm:flex-none rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-8 py-2.5 shadow-lg shadow-slate-200 transition-all disabled:opacity-50"
                    >
                      Publicar
                    </Button>
                  </div>
                </div>
              </Card>
            )}
            
            {comments.length === 0 ? (
              <div className="p-16 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-400 font-medium">No hay comentarios aún.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} className="p-6 border-gray-100 shadow-sm bg-white hover:shadow-md transition-all group relative overflow-hidden">
                    {comment.isPrivate && (
                      <div className="absolute top-0 right-0 p-2">
                        <Lock className="w-3 h-3 text-slate-300" />
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xs shrink-0 border border-slate-200">
                        {comment.avatar}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-gray-900 group-hover:text-slate-900 transition-colors">{comment.user}</h5>
                          <span className="text-[10px] font-bold text-gray-400">{comment.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{comment.role}</p>
                          {comment.isPrivate && (
                            <Badge className="bg-slate-100 text-slate-500 border-none text-[8px] font-black uppercase px-1.5 h-4">Privado</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mt-3">{comment.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
