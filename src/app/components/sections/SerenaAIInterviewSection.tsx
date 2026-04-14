import React from 'react';
import { Bot, Play, Volume2, Download, FileText, ExternalLink, CheckCircle2, TrendingUp, Headphones, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function SerenaAIInterviewSection() {
  return (
    <div className="space-y-6">
      {/* 1. Header Analysis Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">Serena IA - Análisis de Entrevista</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-semibold py-0 uppercase">
                  En revisión
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                15 de Marzo, 2024 • 18 min de duración
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Entrevista Score</p>
            <p className="text-4xl font-black text-blue-600">88</p>
          </div>
        </div>
      </div>

      {/* 2. Audio Player Section */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-6 mb-6">
          <button className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex-shrink-0">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </button>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-gray-400">
              <span>04:32</span>
              <span>18:15</span>
            </div>
            <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full flex items-center justify-end"
                style={{ width: '25%' }}
              >
                <div className="w-3 h-3 bg-white border-2 border-blue-500 rounded-full -mr-1.5 shadow-sm" />
              </div>
            </div>
          </div>
          
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between py-3 border-t border-gray-50 mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Headphones className="w-4 h-4 text-blue-400" />
            <span>Escuchando: <span className="font-semibold text-blue-600">Competencias de Liderazgo</span></span>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Descargar Audio
          </button>
        </div>
      </div>

      {/* 3. Transcription Actions */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-gray-700 font-bold">
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-sm tracking-tight text-slate-700 font-semibold">Transcripción completa</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
            <Download className="w-3.5 h-3.5" />
            Descargar PDF
          </Button>
          <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Ver Texto
          </Button>
        </div>
      </div>

      {/* 4. Detailed Analysis Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600">
          <TrendingUp className="w-5 h-5" />
          <h4 className="text-sm font-bold tracking-tight text-slate-700">Análisis Detallado</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 p-6 rounded-xl text-center shadow-sm">
            <p className="text-3xl font-black text-blue-600 mb-1">92%</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Habilidades Blandas</p>
          </div>
          <div className="bg-white border border-gray-100 p-6 rounded-xl text-center shadow-sm">
            <p className="text-3xl font-black text-indigo-600 mb-1">85%</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lógica y Estructura</p>
          </div>
          <div className="bg-white border border-gray-100 p-6 rounded-xl text-center shadow-sm">
            <p className="text-3xl font-black text-emerald-600 mb-1">88%</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fit Cultural</p>
          </div>
        </div>
      </div>

      {/* 5. Feedback Sections */}
      <div className="space-y-4">
        {/* Strengths */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6">
          <div className="flex items-center gap-2 text-emerald-700 mb-4 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="text-sm font-bold">Fortalezas detectadas</h4>
          </div>
          <ul className="space-y-3">
            {[
              'Articulación clara de experiencias previas manejando equipos distribuidos.',
              'Demuestra curiosidad intelectual y una actitud proactiva ante retos técnicos complejos.'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-emerald-900 leading-relaxed font-medium">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Development Areas */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-6">
          <div className="flex items-center gap-2 text-orange-700 mb-4 font-bold">
            <TrendingUp className="w-5 h-5" />
            <h4 className="text-sm font-bold">Áreas de desarrollo</h4>
          </div>
          <ul className="space-y-3">
            {[
              'Puede profundizar más en ejemplos específicos de resolución de conflictos interpersonales.'
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-orange-900 leading-relaxed font-medium">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
