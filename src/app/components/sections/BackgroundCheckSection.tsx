import React from 'react';
import { Shield, CheckCircle2, AlertCircle, Clock, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

interface BackgroundCheckSectionProps {
  data?: {
    status: 'clean' | 'issues' | 'pending';
    completedDate: string;
    details: Array<{ category: string; result: string; status: 'pass' | 'fail' | 'warning' }>;
  };
  isValentina?: boolean;
}

export function BackgroundCheckSection({ data, isValentina }: BackgroundCheckSectionProps) {
  if (!data) {
    return (
      <div className="bg-gray-50 border border-gray-200 border-dashed rounded-lg p-8 text-center">
        <Clock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-500">La verificación de antecedentes no ha sido iniciada.</p>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pass': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-white' };
      case 'fail': return { icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' };
      case 'warning': return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' };
      default: return { icon: Shield, color: 'text-gray-600', bg: 'bg-gray-50' };
    }
  };

  const statusInfo = {
    clean: { label: 'TODO LIMPIO', color: 'bg-teal-500', icon: CheckCircle2, summary: 'El candidato ha superado satisfactoriamente todas las validaciones de antecedentes y referencias.' },
    issues: { label: 'HALLAZGOS DETECTADOS', color: 'bg-rose-500', icon: AlertCircle, summary: 'Se han encontrado inconsistencias o alertas importantes durante el proceso de verificación.' },
    pending: { label: 'EN PROCESO', color: 'bg-amber-500', icon: Clock, summary: 'El proceso de verificación está en curso. Algunas validaciones están pendientes de respuesta oficial.' }
  };

  const currentStatus = statusInfo[data.status];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${data.status === 'clean' ? 'bg-gray-100 text-gray-500' : `${currentStatus.color} text-white shadow-sm`} flex items-center justify-center`}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">Verificación de Antecedentes</h4>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Última actualización: {data.completedDate}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full ${data.status === 'clean' ? 'bg-gray-100 text-gray-600 border border-gray-200' : `${currentStatus.color} text-white`} text-[10px] font-bold tracking-wider`}>
          {currentStatus.label}
        </div>
      </div>

      <div className={`p-4 rounded-xl border ${data.status === 'clean' ? 'bg-teal-50 border-teal-100' : data.status === 'issues' ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'}`}>
        <div className="flex gap-3">
          <currentStatus.icon className={`w-5 h-5 flex-shrink-0 ${data.status === 'clean' ? 'text-teal-600' : data.status === 'issues' ? 'text-rose-600' : 'text-amber-600'}`} />
          <p className={`text-sm leading-relaxed ${data.status === 'clean' ? 'text-teal-900' : data.status === 'issues' ? 'text-rose-900' : 'text-amber-900'}`}>
            {currentStatus.summary}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Desglose de Validaciones</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.details.map((detail, idx) => {
            const config = getStatusConfig(detail.status);
            return (
              <div key={idx} className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <config.icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-900">{detail.category}</p>
                  <p className="text-xs text-gray-600 leading-tight">{detail.result}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-600">Reporte_Antecedentes_{data.completedDate.replace(/ /g, '_')}.pdf</span>
        </div>
        <button 
          onClick={() => {
            if (isValentina) {
              toast.error('Error al generar el certificado de antecedentes. Por favor, contacta a soporte.');
              return;
            }
            toast.success('Iniciando descarga del reporte completo...');
          }}
          className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          DESCARGAR REPORTE
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
