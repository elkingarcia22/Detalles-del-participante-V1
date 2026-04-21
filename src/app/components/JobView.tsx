import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical, MapPin, Calendar, Sparkles, X, ExternalLink } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tooltip } from './ui/tooltip';
import { SerenaIAPanel } from './SerenaIAPanel';
import { candidatesData } from '../data/candidatesData';
import { cn } from './ui/utils';

// Configuración de etapas del proceso (8 etapas del proceso + etapa final)
const stages = [
  { id: 'screening-talent', name: 'Screening Talent', order: 1 },
  { id: 'evaluacion-cv', name: 'Evaluación CV', order: 2 },
  { id: 'evaluacion-serena', name: 'Serena AI', order: 3 },
  { id: 'evaluacion-psicometrica', name: 'Test Psicométrico', order: 4 },
  { id: 'entrevista-tecnica', name: 'Entrevista Técnica', order: 5 },
  { id: 'entrevista-pm', name: 'Entrevista Product Manager', order: 6 },
  { id: 'entrevista-hiring', name: 'Entrevista Hiring Manager', order: 7 },
  { id: 'antecedentes', name: 'Verificación Antecedentes', order: 8 },
  { id: 'seleccionado', name: 'Seleccionado', order: 9 }
];

export function JobView({ onCandidateClick }: { onCandidateClick: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'info' | 'candidates' | 'cvs'>('candidates');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSerenaOpen, setIsSerenaOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, { active: boolean; discarded: boolean }>>({
    'screening-talent': { active: true, discarded: false },
    'evaluacion-cv': { active: true, discarded: false },
    'evaluacion-serena': { active: true, discarded: false },
    'evaluacion-psicometrica': { active: true, discarded: false },
    'entrevista-tecnica': { active: true, discarded: false },
    'entrevista-pm': { active: true, discarded: false },
    'entrevista-hiring': { active: true, discarded: false },
    'antecedentes': { active: true, discarded: false },
    'seleccionado': { active: true, discarded: false }
  });

  // Agrupar candidatos por etapa usando sus aplicaciones
  const candidatesByStage = stages.map(stage => {
    const stageCandidates = candidatesData.map(c => {
      const appInStage = c.applications?.find(app => app.currentStage === stage.id);
      if (appInStage) {
        return { ...c, _activeApp: appInStage };
      }
      return null;
    }).filter(Boolean) as (any)[];

    const active = stageCandidates.filter(c => c._activeApp.status === 'active' || c._activeApp.status === 'hired');
    const discarded = stageCandidates.filter(c => c._activeApp.status === 'rejected');
    
    return { ...stage, active, discarded, total: stageCandidates.length };
  });
    
  const renderCandidateCard = (candidate: any, isTourTarget?: boolean) => {
    const app = candidate._activeApp || candidate.applications?.[0] || {} as any;
    const daysSinceApplied = app.appliedDate 
      ? Math.floor((new Date().getTime() - new Date(app.appliedDate).getTime()) / (1000 * 60 * 60 * 24))
      : 0;
    
    return (
      <div 
        key={candidate.id}
        data-tour={isTourTarget ? "candidate-card" : undefined}
        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer mb-2 relative"
        onClick={() => onCandidateClick(candidate.id)}
      >
        <div className="flex items-start gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            {candidate.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-xs text-gray-900 truncate">{candidate.name}</h4>
          </div>
          <button className="p-0.5 hover:bg-gray-100 rounded flex-shrink-0">
            <MoreVertical className="w-3 h-3 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className={cn(
             "text-[10px] px-1.5 py-0",
             app.status === 'hired' ? "bg-green-50 text-green-700 border-green-100" :
             app.status === 'rejected' ? "bg-red-50 text-red-700 border-red-100" :
             "bg-blue-50 text-blue-700 border-blue-100"
          )}>
            {app.status === 'hired' ? 'Contratado' : app.status === 'rejected' ? 'Descartado' : 'En proceso'}
          </Badge>
          <span className="text-[10px] text-gray-400 uppercase font-bold">Hace {daysSinceApplied}d</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans">
      {/* Optimized Compact Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
               <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  16 <span className="text-gray-400 font-normal">Aplicaciones</span>
               </h1>
               <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="bg-blue-50/50 text-blue-700 border-blue-100 text-[9px] px-1.5 py-0 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> Bogotá
                  </Badge>
                  <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-[9px] px-1.5 py-0">+1 año exp.</Badge>
               </div>
            </div>
            <div className="h-8 w-px bg-slate-100" />
            <button className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
               <ExternalLink className="w-2.5 h-2.5" /> Ir a la vacante
            </button>
          </div>

          <div className="flex items-center gap-5">
            {/* Serena IA - Ultra Compact Toggle */}
            <Tooltip content={isSerenaOpen ? "Cerrar Asistente" : "Abrir Serena IA"}>
              <button 
                onClick={() => setIsSerenaOpen(!isSerenaOpen)}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all group",
                  isSerenaOpen 
                    ? "bg-slate-800 text-white shadow-lg shadow-slate-200" 
                    : "bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 text-white hover:scale-105 shadow-md shadow-indigo-100"
                )}
              >
                <Sparkles className={cn("w-3.5 h-3.5", !isSerenaOpen && "animate-pulse")} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {isSerenaOpen ? 'Cerrar' : 'Serena IA'}
                </span>
              </button>
            </Tooltip>

            {/* Stats - Compact Row */}
            <div className="flex items-center gap-4 bg-slate-50/50 px-3 py-1.5 rounded-lg border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[8px] text-slate-400 font-bold uppercase leading-tight">Entrevistas</p>
                  <p className="text-xs font-bold text-slate-700 leading-tight">48/80</p>
                </div>
                <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden truncate">
                   <div className="h-full bg-blue-500 w-[60%]" />
                </div>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[8px] text-slate-400 font-bold uppercase leading-tight">Psicométricas</p>
                  <p className="text-xs font-bold text-slate-700 leading-tight">28/60</p>
                </div>
                <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden truncate">
                   <div className="h-full bg-blue-500 w-[47%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row - Compact */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-4">
          {['Info Vacante', 'Candidatos', 'CVs Importados'].map((tab, idx) => {
            const isTabActive = (tab === 'Candidatos' && activeTab === 'candidates') || 
                               (tab === 'Info Vacante' && activeTab === 'info') ||
                               (tab === 'CVs Importados' && activeTab === 'cvs');
            const tabKey = tab === 'Candidatos' ? 'candidates' : tab === 'Info Vacante' ? 'info' : 'cvs';
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tabKey as any)}
                className={cn(
                  "py-2 text-[11px] font-bold border-b-2 transition-all px-1",
                  isTabActive ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'candidates' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search Bar - Thin */}
            <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar candidatos..."
                  className="pl-8 h-8 text-[11px] border-gray-200 focus:ring-1"
                />
              </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-x-auto bg-slate-50/30 p-4 scrollbar-hide">
                <div className="flex gap-4 h-full min-w-max">
                  {candidatesByStage.map(stage => (
                    <div key={stage.id} className="w-72 flex flex-col">
                      <div className="bg-white border border-slate-200 p-3 rounded-t-lg shadow-sm">
                        <h3 className="text-xs font-bold text-slate-800">{stage.order}. {stage.name}</h3>
                        <div className="flex gap-2 text-[9px] text-slate-400 mt-1 font-bold uppercase">
                          <span className="text-green-600">{stage.active.length} activos</span>
                          <span>{stage.total} total</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-slate-100/20 border-x border-b border-slate-200 rounded-b-lg p-2 overflow-y-auto space-y-2">
                        {stage.active.map((c, idx) => renderCandidateCard(c, stage.order === 1 && idx === 0))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <SerenaIAPanel 
                isOpen={isSerenaOpen} 
                onClose={() => setIsSerenaOpen(false)}
                mode="global"
                allCandidates={candidatesData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
