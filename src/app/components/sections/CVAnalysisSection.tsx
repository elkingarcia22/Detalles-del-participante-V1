import React from 'react';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface CVAnalysisSectionProps {
  data?: {
    summary: string;
    score: number;
    criteria: Array<{ label: string, score: number, status: 'pass' | 'fail' | 'warning' }>;
  };
  candidateName: string;
}

export function CVAnalysisSection({ data, candidateName }: CVAnalysisSectionProps) {
  // Fallback data if none provided
  const summary = data?.summary || `El perfil de ${candidateName} presenta una alta afinidad con los requisitos técnicos de la vacante. Se destaca su trayectoria en roles similares y la progresión de responsabilidades en sus experiencias previas.`;
  const score = data?.score || 85;
  const analysisItems = data?.criteria || [
    { label: 'Experiencia Relevante', score: score > 90 ? 95 : 85, status: 'pass' },
    { label: 'Habilidades Técnicas', score: score > 80 ? 90 : 75, status: 'pass' },
    { label: 'Formación Académica', score: 100, status: 'pass' },
    { label: 'Estabilidad Laboral', score: score < 70 ? 60 : 85, status: score < 70 ? 'warning' : 'pass' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Análisis Automatizado de CV</h4>
            <p className="text-xs text-gray-500">Evaluado por Serena IA Engines</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{score}%</div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider text-right">Match Score CV</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Resumen de Evaluación</h5>
          <p className="text-sm text-gray-600 leading-relaxed">
            {summary}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
            <CheckCircle2 className="w-4 h-4 text-gray-400" />
            Perfil altamente recomendado para avanzar a entrevista técnica.
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Puntajes por Categoría</h5>
          <div className="space-y-3">
            {analysisItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className="text-gray-900 font-bold">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.status === 'pass' ? 'bg-blue-500' : 'bg-amber-500'}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
