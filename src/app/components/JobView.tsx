import React, { useState } from 'react';
import { Search, ChevronDown, MoreVertical, MapPin, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { candidatesData } from '../data/candidatesData';

interface JobViewProps {
  onCandidateClick: (candidateId: string) => void;
}

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

export function JobView({ onCandidateClick }: JobViewProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'candidates' | 'cvs'>('candidates');
  const [searchQuery, setSearchQuery] = useState('');
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

  // Agrupar candidatos por etapa
  const candidatesByStage = stages.map(stage => {
    const stageCandidates = candidatesData.filter(c => c.currentStage === stage.id);
    const active = stageCandidates.filter(c => c.status === 'active' || c.status === 'hired');
    const discarded = stageCandidates.filter(c => c.status === 'rejected');
    
    return {
      ...stage,
      active,
      discarded,
      total: stageCandidates.length
    };
  });

  const toggleSection = (stageId: string, section: 'active' | 'discarded') => {
    setExpandedSections(prev => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        [section]: !prev[stageId]?.[section]
      }
    }));
  };

  const renderCandidateCard = (candidate: typeof candidatesData[0], isCompact = false) => {
    const daysSinceApplied = Math.floor((new Date().getTime() - new Date(candidate.appliedDate).getTime()) / (1000 * 60 * 60 * 24));
    
    return (
      <div 
        key={candidate.id}
        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer mb-2"
        onClick={() => onCandidateClick(candidate.id)}
      >
        <div className="flex items-start gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            {candidate.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-xs text-gray-900 truncate">{candidate.name}</h4>
            <p className="text-xs text-gray-500">{candidate.age} años</p>
          </div>
          <button className="p-0.5 hover:bg-gray-100 rounded flex-shrink-0">
            <MoreVertical className="w-3 h-3 text-gray-400" />
          </button>
        </div>

        {!isCompact && (
          <div className="space-y-1.5 mb-2">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{candidate.location.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>Hace {daysSinceApplied}d</span>
            </div>
          </div>
        )}

        {candidate.status === 'hired' && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs w-full justify-center">
            ✓ Contratado
          </Badge>
        )}
        {candidate.status === 'rejected' && (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs w-full justify-center">
            Descartado
          </Badge>
        )}
        {candidate.status === 'active' && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs w-full justify-center">
            En proceso
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>🔗 Ir a la vacante</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <button className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
            Bogotá
          </button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            + 1 años exp.
          </button>
        </div>
        <div className="flex items-baseline gap-4 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">16</h1>
          <span className="text-gray-600">Aplicaciones</span>
        </div>
        <p className="text-sm text-gray-500">8 en la última semana</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex gap-6 px-6">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Info Vacante
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'candidates'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Candidatos
          </button>
          <button
            onClick={() => setActiveTab('cvs')}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'cvs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            CVs Importados
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'candidates' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filters */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar candidatos..."
                  className="pl-10 text-sm"
                />
              </div>
              <Select defaultValue="ninguno">
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Filtros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ninguno">Todos los candidatos</SelectItem>
                  <SelectItem value="activos">Solo activos</SelectItem>
                  <SelectItem value="rechazados">Solo rechazados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Kanban Board - Horizontal Scrollable Stages */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-50 p-6">
            <div className="flex gap-4 h-full min-w-max">
              {candidatesByStage.map(stage => {
                const activeExpanded = expandedSections[stage.id]?.active ?? true;
                const discardedExpanded = expandedSections[stage.id]?.discarded ?? false;
                
                return (
                  <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col">
                    {/* Stage Header */}
                    <div className="bg-white rounded-t-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {stage.order}. {stage.name}
                        </h3>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {stage.total}
                        </span>
                      </div>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span className="text-green-600">{stage.active.length} activos</span>
                        {stage.discarded.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-red-600">{stage.discarded.length} descartados</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Stage Content - Scrollable */}
                    <div className="flex-1 bg-gray-50 border-l border-r border-b border-gray-200 rounded-b-lg overflow-y-auto p-3">
                      {/* Active Candidates */}
                      {stage.active.length > 0 && (
                        <div className="mb-3">
                          <button
                            onClick={() => toggleSection(stage.id, 'active')}
                            className="w-full flex items-center justify-between px-2 py-1.5 bg-green-50 hover:bg-green-100 rounded transition-colors mb-2"
                          >
                            <span className="text-xs font-medium text-green-700">
                              Activos ({stage.active.length})
                            </span>
                            <ChevronDown className={`w-3 h-3 text-green-700 transition-transform ${
                              activeExpanded ? '' : '-rotate-90'
                            }`} />
                          </button>
                          {activeExpanded && (
                            <div className="space-y-2">
                              {stage.active.map(candidate => renderCandidateCard(candidate))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Rejected Candidates */}
                      {stage.discarded.length > 0 && (
                        <div>
                          <button
                            onClick={() => toggleSection(stage.id, 'discarded')}
                            className="w-full flex items-center justify-between px-2 py-1.5 bg-red-50 hover:bg-red-100 rounded transition-colors mb-2"
                          >
                            <span className="text-xs font-medium text-red-700">
                              Descartados ({stage.discarded.length})
                            </span>
                            <ChevronDown className={`w-3 h-3 text-red-700 transition-transform ${
                              discardedExpanded ? '' : '-rotate-90'
                            }`} />
                          </button>
                          {discardedExpanded && (
                            <div className="space-y-2">
                              {stage.discarded.map(candidate => renderCandidateCard(candidate))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Empty State */}
                      {stage.total === 0 && (
                        <div className="text-center py-8 text-xs text-gray-400">
                          Sin candidatos
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-3xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Designer Senior</h2>
            <p className="text-gray-700 mb-6">
              Buscamos un Product Designer Senior apasionado por crear experiencias digitales excepcionales.
              Trabajarás en el diseño de productos que impactan a millones de usuarios en Latinoamérica.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Requisitos</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>5+ años de experiencia en diseño de producto digital</li>
                  <li>Dominio de Figma y herramientas de diseño modernas</li>
                  <li>Experiencia en Design Systems</li>
                  <li>Portfolio que demuestre impacto medible</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ofrecemos</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Salario competitivo ($8M - $12M COP)</li>
                  <li>Trabajo remoto o híbrido</li>
                  <li>Crecimiento profesional</li>
                  <li>Beneficios adicionales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cvs' && (
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No hay CVs importados</p>
          </div>
        </div>
      )}
    </div>
  );
}