import React, { useState, useRef } from 'react';
import { StagesSection } from './StagesSection';
import { Sparkles, Building2, ChevronRight, ChevronLeft, BriefcaseBusiness, AlertCircle } from 'lucide-react';
import { cn } from '../ui/utils';
import { Tooltip } from '../ui/tooltip';

interface VacanciesSectionProps {
  candidate: any;
  applications: any[];
  comments: any[];
  addComment: any;
  editComment?: any;
  deleteComment?: any;
  openCommentPanel: any;
  highlightedStageId: any;
}

export function VacanciesSection({ 
  candidate, 
  applications, 
  comments, 
  addComment, 
  editComment,
  deleteComment,
  openCommentPanel, 
  highlightedStageId 
}: VacanciesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setActiveTab('summary');
    setSelectedVacancyId(null);
  }, [candidate?.id]);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad de scroll
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Sub-componente: Vista de Historial / Resumen
  const renderSummaryView = () => {
    const activeCount = applications.filter(app => app.status === 'active').length;
    const totalCount = applications.length;

    const getStatusText = (status: string) => {
      switch (status) {
        case 'active': return 'EN CURSO';
        case 'hired': return 'CONTRATADO';
        case 'rejected': return 'RECHAZADO';
        default: return status.toUpperCase();
      }
    };
    
    const getStatusStyles = (status: string, isBlocked?: boolean) => {
      if (isBlocked) {
        return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', rings: 'ring-amber-100' };
      }
      switch (status) {
        case 'active': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-500', rings: 'ring-blue-100' };
        case 'hired': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', dot: 'bg-emerald-500', rings: 'ring-emerald-100' };
        case 'rejected': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', dot: 'bg-red-500', rings: 'ring-red-100' };
        default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-100', dot: 'bg-gray-500', rings: 'ring-gray-100' };
      }
    };

    return (
      <div className="space-y-4">
        {selectedVacancyId ? (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <button 
              onClick={() => setSelectedVacancyId(null)}
              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-4 transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              Volver al historial de vacantes
            </button>
            
            {applications.find(app => app.id === selectedVacancyId) && (
              <StagesSection 
                comments={comments} 
                addComment={addComment} 
                editComment={editComment}
                deleteComment={deleteComment}
                openCommentPanel={openCommentPanel} 
                highlightedStageId={highlightedStageId} 
                activeApplication={applications.find(app => app.id === selectedVacancyId)} 
                candidate={candidate} 
              />
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <BriefcaseBusiness className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Historial de Vacantes</h3>
                  <p className="text-sm text-gray-500">Participación en vacantes de la empresa</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                  VACANTES ACTUALES: {activeCount}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                  TOTAL: {totalCount}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {applications.map(app => {
                const isBlocked = app.status === 'active' && !!app.blocker;
                const styles = getStatusStyles(app.status, isBlocked);
                return (
                  <div 
                    key={app.id} 
                    onClick={() => setSelectedVacancyId(app.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                      isBlocked
                        ? "border-amber-200 bg-amber-50/40 hover:border-amber-300 hover:shadow-sm"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-4 h-4 rounded-full flex items-center justify-center ring-4", styles.rings)}>
                        {isBlocked
                          ? <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />
                          : <div className={cn("w-2 h-2 rounded-full", styles.dot)} />
                        }
                      </div>
                      <div>
                        <h4 className={cn(
                          "font-bold uppercase tracking-wide text-sm transition-colors",
                          isBlocked ? "text-amber-900 group-hover:text-amber-700" : "text-gray-900 group-hover:text-blue-600"
                        )}>{app.jobTitle}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">Postulación: {app.appliedDate || 'No disponible'}</p>
                        {isBlocked && app.blocker?.reason && (
                          <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            {app.blocker.reason}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isBlocked ? (
                        <div className="px-3 py-1.5 rounded-md border text-[10px] font-bold tracking-wide bg-amber-50 text-amber-700 border-amber-200">
                          ACCIÓN REQUERIDA
                        </div>
                      ) : (
                        <div className={cn("px-3 py-1.5 rounded-md border text-[10px] font-bold tracking-wide", styles.bg, styles.text, styles.border)}>
                          {getStatusText(app.status)}
                        </div>
                      )}
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-colors",
                        isBlocked ? "text-amber-300 group-hover:text-amber-500" : "text-gray-300 group-hover:text-blue-500"
                      )} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Sub-componente: Vista de Vacantes Sugeridas (Mockup)
  const renderSuggestionsView = () => {
    const suggestions = [
      { id: 'sug-1', role: 'Lead UX Researcher', match: 92, date: 'Abierta hace 2 días', location: 'Remoto' },
      { id: 'sug-2', role: 'Product Manager Senior', match: 85, date: 'Abierta hace 1 semana', location: 'Bogotá, Colombia' },
      { id: 'sug-3', role: 'Head of Product Design', match: 78, date: 'Abierta hace 3 días', location: 'Híbrido' }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-blue-100 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wider uppercase">Motor de Recomendación Ubits IA</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Vacantes Sugeridas para {candidate?.firstName || 'el candidato'}</h2>
            <p className="text-blue-100 text-sm">
              Con base en sus años de experiencia, habilidades técnicas extraídas de su CV y evaluaciones psicométricas previas, hemos encontrado estas posiciones abiertas que podrían hacer match con su perfil.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {suggestions.map(sug => (
            <div key={sug.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900">{sug.role}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{sug.location}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{sug.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end mb-1">
                    <span className="text-xl font-black text-emerald-600">{sug.match}%</span>
                    <span className="text-xs font-bold text-gray-400 mt-1 uppercase">Match</span>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${sug.match}%` }} />
                  </div>
                </div>
                <button className="px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
                  Invitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Identificar qué aplicación mostrar si estamas en un Tab de vacante individual
  const activeApplication = applications?.find(app => app.id === activeTab);
  
  // Ordenar aplicaciones: las activas primero
  const sortedApplications = applications ? [...applications].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return 0;
  }) : [];

  return (
    <div className="space-y-6">
      {/* Scrollable Tabs Header */}
      <div className="border-b border-gray-200 mt-2">
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={cn(
            "flex px-2 space-x-1 overflow-x-auto pb-1 scrollbar-hide cursor-grab active:cursor-grabbing select-none",
            isDown && "cursor-grabbing"
          )}
        >
          <button
            onClick={() => {
              setActiveTab('summary');
              setSelectedVacancyId(null);
            }}
            className={cn(
              "flex whitespace-nowrap items-center px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors border-b-2 gap-2",
              activeTab === 'summary' 
                ? "border-blue-600 text-blue-600 bg-blue-50/50" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            )}
          >
            Historial de Vacantes
          </button>

          <button
            onClick={() => {
              setActiveTab('suggestions');
              setSelectedVacancyId(null);
            }}
            className={cn(
              "flex whitespace-nowrap items-center px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors border-b-2 gap-2",
              activeTab === 'suggestions' 
                ? "border-amber-500 text-amber-600 bg-amber-50/50" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            )}
          >
            Vacantes Sugeridas
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {activeTab === 'summary' && renderSummaryView()}
        {activeTab === 'suggestions' && renderSuggestionsView()}
      </div>
    </div>
  );
}
