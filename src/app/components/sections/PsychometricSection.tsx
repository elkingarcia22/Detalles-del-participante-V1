import React from 'react';
import { Brain, Download, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface PsychometricSectionProps {
  score?: number;
  isValentina?: boolean;
}

export function PsychometricSection({ score = 88, isValentina }: PsychometricSectionProps) {
  const reports = [
    { name: 'Prueba de Aptitud Lógica', date: '12 Abr 2026', type: 'PDF' },
    { name: 'Test de Personalidad (Big Five)', date: '12 Abr 2026', type: 'PDF' },
    { name: 'Razonamiento Verbal y Numérico', date: '12 Abr 2026', type: 'PDF' },
  ];

  const handleDownload = (reportName: string) => {
    if (isValentina) {
      toast.error('Estamos presentando inconvenientes para generar el reporte de pruebas. Por favor, intenta más tarde.');
      return;
    }
    toast.success(`Descargando ${reportName}...`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Resultados Pruebas Psicométricas</h4>
            <p className="text-xs text-gray-500">Batería de pruebas de aptitud y personalidad</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{score}%</div>
          <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider text-right">Promedio Global</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <p className="text-xs font-medium text-emerald-800">
          Fit cultural y competencias cognitivas por encima del percentil 85 para este cargo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Interpretación de Resultados</h5>
          <div className="space-y-4 bg-white border border-gray-200 p-4 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              El candidato muestra un fuerte componente de pensamiento lógico y resolución de problemas. En el test de personalidad, sobresale en <span className="font-semibold text-gray-900">Apertura a la experiencia</span> y <span className="font-semibold text-gray-900">Responsabilidad</span>, rasgos alineados con roles de diseño Senior.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reportes Descargables</h5>
          <div className="space-y-3">
            {reports.map((report) => (
              <button 
                key={report.name}
                onClick={() => handleDownload(report.name)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{report.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{report.date} • {report.type}</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
