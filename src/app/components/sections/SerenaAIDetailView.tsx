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
  Search
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
            className="rounded-xl px-6 py-2.5 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            Análisis y Puntajes
          </TabsTrigger>
          <TabsTrigger 
            value="transcript" 
            className="rounded-xl px-6 py-2.5 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Transcripción
          </TabsTrigger>
          <TabsTrigger 
            value="feedback" 
            className="rounded-xl px-6 py-2.5 text-xs font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            Feedback Serena
          </TabsTrigger>
        </TabsList>

        {/* 1. Analysis Tab */}
        <TabsContent value="analysis" className="mt-0 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 px-1 mb-2">
                <Target className="w-5 h-5 text-gray-400" />
                <h4 className="text-sm font-bold tracking-tight text-slate-700 uppercase">Desglose por Pregunta</h4>
              </div>
              <div className="grid gap-4">
                {questionScores.map((item, idx) => (
                  <Card key={idx} className="p-5 border-gray-100 hover:border-blue-100 transition-all hover:shadow-md group">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 border border-gray-100">
                              {idx + 1}
                            </span>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.objective}</span>
                          </div>
                          <div className="sm:hidden flex items-center gap-1.5">
                            <span className="text-xl font-black text-slate-800">{item.score}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase">Puntos</span>
                          </div>
                        </div>
                        <p className="text-base font-bold text-gray-900 leading-tight">
                          {item.question}
                        </p>
                        {item.feedback && (
                          <div className="bg-blue-50/30 border-l-2 border-blue-200 p-3 rounded-r-lg italic text-sm text-slate-600 leading-relaxed">
                            "{item.feedback}"
                          </div>
                        )}
                      </div>
                      <div className="hidden sm:flex flex-col items-center justify-center min-w-[80px] p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                        <span className="text-3xl font-black text-slate-800 group-hover:text-blue-700 transition-colors">{item.score}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Puntos</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 bg-slate-900 text-white border-none shadow-xl shadow-slate-200">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-slate-400">Resumen de Evaluación</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-sm font-medium text-slate-400">Preguntas respondidas</span>
                    <span className="text-lg font-bold">{questionScores.length}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-sm font-medium text-slate-400">Tiempo de entrevista</span>
                    <span className="text-lg font-bold">12:45 min</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="text-sm font-medium text-slate-400">Nivel de Confianza</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Alto (98%)</Badge>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-slate-400">Score General</span>
                      <span className="text-3xl font-black text-emerald-400">{score}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Observación de IA</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "El candidato demuestra una capacidad sobresaliente para articular soluciones técnicas complejas. Se recomienda profundizar en su experiencia con arquitecturas distribuidas en la entrevista técnica."
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 2. Transcript Tab */}
        <TabsContent value="transcript" className="mt-0 animate-in fade-in duration-300">
          <Card className="border-gray-100 shadow-sm overflow-hidden flex flex-col h-[700px]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Registro de la Conversación</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{transcript.length} Mensajes</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-bold gap-2 border-gray-200">
                <FileText className="w-4 h-4" />
                Ver PDF
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/50 custom-scrollbar">
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
                      
                      {/* Audio Button for Candidate */}
                      {msg.role === 'candidate' && (
                        <button 
                          onClick={() => handlePlayAudio(msg.text)}
                          className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                          title="Reproducir audio de esta respuesta"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="bg-gray-50 rounded-2xl px-6 py-3 flex items-center justify-between text-xs font-medium text-gray-500">
                <span className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Transcripción verificada por Nexión IA
                </span>
                <span className="italic">Duración total: 12m 45s</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 3. Feedback Tab */}
        <TabsContent value="feedback" className="mt-0 animate-in fade-in duration-300">
          <div className="space-y-6">
            <Card className="p-8 border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <Bot className="w-64 h-64 rotate-12" />
              </div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Resumen Ejecutivo de Serena</h4>
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
                          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-emerald-50 transition-colors">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
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
                          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center mt-0.5 flex-shrink-0 group-hover:bg-amber-50 transition-colors">
                            <Target className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed font-semibold group-hover:text-gray-900 transition-colors">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">3 Reclutadores han visto este feedback</span>
                  </div>
                  <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 font-bold text-xs gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Añadir comentario interno
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
