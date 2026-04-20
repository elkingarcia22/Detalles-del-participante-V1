import React from 'react';
import { Bot, Download, FileText, CheckCircle2, TrendingUp, MessageSquare, Quote, Star, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

interface SerenaAIInterviewSectionProps {
  interviewData?: {
    transcript: Array<{
      role: 'serena' | 'candidate';
      text: string;
      timestamp?: string;
    }>;
    questionScores: Array<{
      objective: string;
      question: string;
      score: number;
    }>;
    overallFeedback: {
      summary: string;
      strengths: string[];
      improvements: string[];
    };
  };
  score?: number;
  isValentina?: boolean;
}

export function SerenaAIInterviewSection({ interviewData, score = 88, isValentina }: SerenaAIInterviewSectionProps) {
  // If no data is passed, we show a placeholder or the default view (for demo purposes we use the passed data)
  if (!interviewData) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <Bot className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">No hay datos de entrevista disponibles para este candidato.</p>
      </div>
    );
  }

  const { transcript, questionScores, overallFeedback } = interviewData;

  const handleDownloadFeedback = () => {
    if (isValentina) {
      toast.error('No se pudo generar el reporte de feedback consolidado. Inténtalo de nuevo más tarde.');
      return;
    }
    toast.success('Descargando reporte de feedback de Serena IA...');
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Summary Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">Resultado de Entrevista con Serena IA</h3>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-semibold py-0 uppercase">
                  Completada
                </Badge>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                {overallFeedback.summary}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Score Total</p>
            <p className={cn(
              "text-4xl font-black",
              score >= 80 ? "text-blue-600" : score >= 60 ? "text-amber-600" : "text-red-600"
            )}>{score}</p>
          </div>
        </div>
      </div>

      {/* 2. Questions & Scores List */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h4 className="text-sm font-bold tracking-tight text-slate-700 uppercase">Análisis y Puntaje por Pregunta</h4>
        </div>
        
        <div className="grid gap-3">
          {questionScores.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Objetivo</span>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      {item.objective}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pregunta</span>
                    <p className="text-sm font-bold text-gray-900 leading-relaxed">
                      {item.question}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center min-w-[70px] p-2 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-2xl font-black text-slate-800">{item.score}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Puntos</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Transcript View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <h4 className="text-sm font-bold tracking-tight text-slate-700 uppercase">Transcripción de la Conversación</h4>
          </div>
          <Badge variant="secondary" className="text-[10px] font-medium text-gray-500">
            {transcript.length} Intervenciones
          </Badge>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
            {transcript.map((msg, idx) => (
              <div key={idx} className={cn(
                "flex flex-col gap-2",
                msg.role === 'candidate' ? "items-end" : "items-start"
              )}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === 'serena' && <Bot className="w-4 h-4 text-blue-600" />}
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {msg.role === 'serena' ? 'Serena IA' : 'Candidato'}
                  </span>
                  {msg.timestamp && (
                    <span className="text-[10px] text-gray-300 font-medium">{msg.timestamp}</span>
                  )}
                </div>
                <div className={cn(
                  "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === 'candidate' 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-gray-700 border border-slate-200 rounded-tl-none"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border-t border-slate-200 p-4 text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 text-xs font-bold hover:bg-blue-50 gap-2"
              onClick={() => {
                if (isValentina) {
                  toast.error('La transcripción completa no está disponible para su descarga en este momento.');
                  return;
                }
                toast.success('Abriendo transcripción completa en PDF...');
              }}
            >
              <FileText className="w-4 h-4" />
              Ver transcripción completa (PDF)
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Feedback Consolidated Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h4 className="text-sm font-bold tracking-tight text-slate-700 uppercase">Feedback Consolidado</h4>
          </div>
          <Button 
            onClick={handleDownloadFeedback}
            variant="outline"
            size="sm" 
            className="h-9 px-4 text-xs font-bold border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Descargar Feedback
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6">
            <h5 className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Fortalezas detectadas
            </h5>
            <ul className="space-y-3">
              {overallFeedback.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-emerald-900 leading-relaxed font-medium">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Development Areas */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-6">
            <h5 className="text-xs font-black text-amber-700 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Áreas de desarrollo
            </h5>
            <ul className="space-y-3">
              {overallFeedback.improvements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <p className="text-sm text-amber-900 leading-relaxed font-medium">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
