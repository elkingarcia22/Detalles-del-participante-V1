import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, UserCheck, FileText, Bot, Brain, Lightbulb, Users, Shield, CheckCircle, MessageSquare, Send, Circle, CheckCircle2, Ban } from 'lucide-react';
import { cn } from '../ui/utils';
import { ScreeningSection } from './ScreeningSection';
import { InterviewsSection } from './InterviewsSection';
import { EvaluationsSection } from './EvaluationsSection';
import { MeetingsSection } from './MeetingsSection';
import { Comment } from '../../types/comments';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { CandidateData } from '../../data/candidatesData';
import { getStageStatus, getProgress } from '../../utils/candidateHelpers';

type StageStatus = 'completed' | 'current' | 'pending' | 'rejected';

interface StageCardProps {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  number: number;
  comments: Comment[];
  openCommentPanel?: (stageId: string) => void;
  hasContent?: boolean;
  status?: StageStatus;
}

// Componente simple para etapas que solo tienen comentarios
function StageCard({ id, title, category, icon: Icon, number, comments, openCommentPanel, hasContent = false, status = 'pending' }: StageCardProps) {
  const stageComments = comments.filter(comment => comment.stageId === id);

  // Define colores según el estado
  const statusConfig = {
    completed: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      numberBg: 'bg-emerald-50',
      numberBorder: 'border-emerald-300',
      numberText: 'text-emerald-700',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      badge: <Badge variant="outline" className="text-xs text-emerald-700 border-emerald-300 bg-emerald-50">Completado</Badge>
    },
    current: {
      bgColor: 'bg-blue-50/30',
      borderColor: 'border-blue-300',
      numberBg: 'bg-blue-50',
      numberBorder: 'border-blue-400',
      numberText: 'text-blue-700',
      icon: <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>,
      badge: <Badge variant="outline" className="text-xs text-blue-700 border-blue-400 bg-blue-50">En progreso</Badge>
    },
    pending: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      numberBg: 'bg-gray-50',
      numberBorder: 'border-gray-200',
      numberText: 'text-gray-400',
      icon: <Circle className="w-4 h-4 text-gray-300" />,
      badge: <Badge variant="outline" className="text-xs text-gray-500">Pendiente</Badge>
    },
    rejected: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      numberBg: 'bg-red-50',
      numberBorder: 'border-red-300',
      numberText: 'text-red-700',
      icon: <Ban className="w-4 h-4 text-red-600" />,
      badge: <Badge variant="outline" className="text-xs text-red-700 border-red-300 bg-red-50">Descartado</Badge>
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn("rounded-xl border overflow-hidden", config.bgColor, config.borderColor)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 p-4 sm:p-5">
        <div className="flex-1 flex items-center gap-3 sm:gap-4 min-w-0">
          <div className={cn("w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-full border-2 text-sm font-bold", config.numberBg, config.numberBorder, config.numberText)}>
            {(status === 'completed' || status === 'current' || status === 'rejected') ? config.icon : number}
          </div>
          <div className="flex-1 text-left min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              Categoría de etapa: {category}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          {config.badge}
          {stageComments.length > 0 && (
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {stageComments.length} {stageComments.length === 1 ? 'comentario' : 'comentarios'}
            </Badge>
          )}
          
          {/* Comment Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              if (openCommentPanel) {
                openCommentPanel(id);
              }
            }}
            className="flex-shrink-0"
            title="Comentar en el panel derecho"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Comments Display */}
      {stageComments.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-5 py-4">
          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4" />
            Comentarios en esta etapa
          </h4>
          <div className="space-y-2">
            {stageComments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {comment.authorInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {comment.isPrivate && (
                        <Badge variant="outline" className="text-xs">Privado</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1 break-words">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface StageAccordionProps {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  number: number;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  comments: Comment[];
  addComment: (text: string, stageId: string, stageName: string, isPrivate: boolean) => void;
  openCommentPanel?: (stageId: string) => void;
  status?: StageStatus;
}

function StageAccordion({ id, title, category, icon: Icon, number, isOpen, onToggle, children, comments, addComment, openCommentPanel, status = 'completed' }: StageAccordionProps) {
  const [commentText, setCommentText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  
  const stageComments = comments.filter(comment => comment.stageId === id);

  // Define colores según el estado
  const statusConfig = {
    completed: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      numberBg: 'bg-emerald-50',
      numberBorder: 'border-emerald-300',
      numberText: 'text-emerald-700',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      badge: <Badge variant="outline" className="text-xs text-emerald-700 border-emerald-300 bg-emerald-50">Completado</Badge>
    },
    current: {
      bgColor: 'bg-blue-50/30',
      borderColor: 'border-blue-300',
      numberBg: 'bg-blue-50',
      numberBorder: 'border-blue-400',
      numberText: 'text-blue-700',
      icon: <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>,
      badge: <Badge variant="outline" className="text-xs text-blue-700 border-blue-400 bg-blue-50">En progreso</Badge>
    },
    pending: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      numberBg: 'bg-gray-50',
      numberBorder: 'border-gray-200',
      numberText: 'text-gray-400',
      icon: <Circle className="w-4 h-4 text-gray-300" />,
      badge: <Badge variant="outline" className="text-xs text-gray-500">Pendiente</Badge>
    },
    rejected: {
      bgColor: 'bg-white',
      borderColor: 'border-gray-200',
      numberBg: 'bg-red-50',
      numberBorder: 'border-red-300',
      numberText: 'text-red-700',
      icon: <Ban className="w-4 h-4 text-red-600" />,
      badge: <Badge variant="outline" className="text-xs text-red-700 border-red-300 bg-red-50">Descartado</Badge>
    }
  };

  const config = statusConfig[status];

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(commentText, id, title, isPrivate);
      setCommentText('');
      setIsPrivate(false);
      setShowCommentInput(false);
    }
  };

  return (
    <div className={cn("rounded-xl border overflow-hidden", config.bgColor, config.borderColor)}>
      {/* Accordion Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 p-4 sm:p-5">
        <button
          onClick={onToggle}
          className="flex-1 flex items-center gap-3 sm:gap-4 hover:opacity-70 transition-opacity min-w-0"
        >
          <div className={cn("w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-full border-2 text-sm font-bold", config.numberBg, config.numberBorder, config.numberText)}>
            {(status === 'completed' || status === 'current' || status === 'rejected') ? config.icon : number}
          </div>
          <div className="flex-1 text-left min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              Categoría de etapa: {category}
            </p>
          </div>
        </button>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          {config.badge}
          {stageComments.length > 0 && (
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {stageComments.length} {stageComments.length === 1 ? 'comentario' : 'comentarios'}
            </Badge>
          )}
          
          {/* Comment Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              if (openCommentPanel) {
                openCommentPanel(id);
              }
            }}
            className="flex-shrink-0"
            title="Comentar en el panel derecho"
          >
            <MessageSquare className="w-4 h-4" />
          </Button>

          {/* Expand/Collapse Button */}
          <button
            onClick={onToggle}
            className="flex-shrink-0 p-2 hover:opacity-70 transition-opacity"
          >
            <ChevronDown 
              className={cn(
                'w-5 h-5 text-gray-400 transition-transform',
                isOpen ? 'rotate-180' : 'rotate-0'
              )} 
            />
          </button>
        </div>
      </div>

      {/* Comment Input Area - Shows when button is clicked */}
      {showCommentInput && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 sm:px-5 py-4">
          <div className="space-y-2">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Escribe un comentario sobre esta etapa..."
              className="resize-none text-sm bg-white"
              rows={3}
              autoFocus
            />
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded" 
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                Privado
              </label>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setShowCommentInput(false);
                    setCommentText('');
                    setIsPrivate(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleAddComment} disabled={!commentText.trim()}>
                  <Send className="w-4 h-4 mr-1" />
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accordion Content */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-4 sm:p-6">
            {children}
          </div>
          
          {/* Existing Comments Display */}
          {stageComments.length > 0 && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4" />
                  Comentarios en esta etapa
                </h4>
                <div className="space-y-2">
                  {stageComments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                          {comment.authorInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.timestamp).toLocaleDateString('es-ES', { 
                                day: 'numeric', 
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {comment.isPrivate && (
                              <Badge variant="outline" className="text-xs">Privado</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mt-1 break-words">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface StagesSectionProps {
  comments: Comment[];
  addComment: (text: string, stageId: string, stageName: string, isPrivate: boolean) => void;
  openCommentPanel?: (stageId: string) => void;
  highlightedStageId?: string | null;
  candidate?: CandidateData; // Agregar candidato
}

export function StagesSection({ comments, addComment, openCommentPanel, highlightedStageId, candidate }: StagesSectionProps) {
  const [openStages, setOpenStages] = useState<Set<string>>(new Set(['screening-talent']));
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Efecto para abrir automáticamente SOLO la etapa resaltada y hacer scroll
  React.useEffect(() => {
    if (highlightedStageId) {
      // Cerrar todas y abrir solo la resaltada
      setOpenStages(new Set([highlightedStageId]));
      
      // Hacer scroll a la etapa después de un pequeño delay para que se renderice
      setTimeout(() => {
        const element = stageRefs.current[highlightedStageId];
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  }, [highlightedStageId]);

  const toggleStage = (stageId: string) => {
    setOpenStages(prev => {
      const next = new Set(prev);
      if (next.has(stageId)) {
        next.delete(stageId);
      } else {
        next.add(stageId);
      }
      return next;
    });
  };

  // Calcular progreso y estados de etapas dinámicamente
  const currentStage = candidate?.currentStage || 'evaluacion-cv';
  const candidateStatus = candidate?.status || 'active';
  const progress = getProgress(currentStage);
  
  // Definir estados dinámicos para cada etapa
  const stageStatuses = {
    'screening-talent': getStageStatus('screening-talent', currentStage, candidateStatus),
    'evaluacion-cv': getStageStatus('evaluacion-cv', currentStage, candidateStatus),
    'serena-ai': getStageStatus('evaluacion-serena', currentStage, candidateStatus),
    'psicometrico': getStageStatus('evaluacion-psicometrica', currentStage, candidateStatus),
    'entrevista-pm': getStageStatus('entrevista-pm', currentStage, candidateStatus),
    'entrevista-hiring': getStageStatus('entrevista-hiring', currentStage, candidateStatus),
    'antecedentes': getStageStatus('antecedentes', currentStage, candidateStatus),
    'seleccionado': getStageStatus('seleccionado', currentStage, candidateStatus),
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Etapas del Proceso</h2>
        <p className="text-sm text-gray-600 mt-1">
          Gestiona todas las etapas del proceso de selección del candidato
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Progreso del candidato</h3>
          <span className="text-xs text-gray-500">{progress}</span>
        </div>
        
        {/* Visual Progress Bar - Desktop: 1 fila, Mobile: 2 filas */}
        <div className="hidden sm:block">
          <div className="relative flex items-center justify-between gap-1">
            {/* Mapeo dinámico de etapas */}
            {[
              { id: 'evaluacion-cv', label: 'CV', number: 1 },
              { id: 'evaluacion-serena', label: 'Serena IA', number: 2 },
              { id: 'evaluacion-psicometrica', label: 'Psico', number: 3 },
              { id: 'entrevista-tecnica', label: 'Ent. 1', number: 4 },
              { id: 'entrevista-pm', label: 'Ent. 2', number: 5 },
              { id: 'entrevista-hiring', label: 'Hiring', number: 6 },
              { id: 'antecedentes', label: 'Antec.', number: 7 },
              { id: 'seleccionado', label: 'Selecc.', number: 8 },
            ].map((stage, idx, arr) => {
              const status = getStageStatus(stage.id, currentStage, candidateStatus);
              
              const isCompleted = status === 'completed';
              const isCurrent = status === 'current';
              const isPending = status === 'pending';
              const isRejected = status === 'rejected';
              
              const lineCompleted = isCompleted || isRejected;
              const lineColor = isRejected ? 'bg-red-300' : lineCompleted ? 'bg-emerald-300' : 'bg-gray-200';
              
              return (
                <div key={stage.id} className="contents">
                  {/* Stage Circle */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center mb-1.5 relative z-10",
                      isCompleted && "bg-emerald-50 border-2 border-emerald-500",
                      isCurrent && "bg-blue-50 border-2 border-blue-500",
                      isPending && "bg-gray-50 border-2 border-gray-200",
                      isRejected && "bg-red-50 border-2 border-red-500"
                    )}>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isCurrent && <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>}
                      {isPending && <span className="text-[10px] text-gray-400 font-medium">{stage.number}</span>}
                      {isRejected && <Ban className="w-4 h-4 text-red-600" />}
                    </div>
                    <span className={cn(
                      "text-[9px] text-center whitespace-nowrap",
                      isCompleted && "text-emerald-600 font-medium",
                      isCurrent && "text-blue-600 font-medium",
                      isPending && "text-gray-400",
                      isRejected && "text-red-600 font-medium"
                    )}>
                      {stage.label}
                    </span>
                  </div>
                  
                  {/* Connector Line */}
                  {idx < arr.length - 1 && (
                    <div 
                      className={cn("h-0.5 flex-1 rounded-full self-start", lineColor)}
                      style={{ marginTop: '13.5px' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Progress Bar - Mobile: 2 filas de 4 etapas */}
        <div className="block sm:hidden space-y-4">
          {/* Primera fila: 4 etapas */}
          <div className="relative flex items-center justify-between gap-1">
            {[
              { id: 'evaluacion-cv', label: 'CV', number: 1 },
              { id: 'evaluacion-serena', label: 'Serena', number: 2 },
              { id: 'evaluacion-psicometrica', label: 'Psico', number: 3 },
              { id: 'entrevista-tecnica', label: 'Ent. 1', number: 4 },
            ].map((stage, idx, arr) => {
              const status = getStageStatus(stage.id, currentStage, candidateStatus);
              const isCompleted = status === 'completed';
              const isCurrent = status === 'current';
              const isPending = status === 'pending';
              const isRejected = status === 'rejected';
              
              const lineCompleted = isCompleted || isRejected;
              const lineColor = isRejected ? 'bg-red-300' : lineCompleted ? 'bg-emerald-300' : 'bg-gray-200';
              
              return (
                <div key={stage.id} className="contents">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center mb-1.5 relative z-10",
                      isCompleted && "bg-emerald-50 border-2 border-emerald-500",
                      isCurrent && "bg-blue-50 border-2 border-blue-500",
                      isPending && "bg-gray-50 border-2 border-gray-200",
                      isRejected && "bg-red-50 border-2 border-red-500"
                    )}>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isCurrent && <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>}
                      {isPending && <span className="text-[10px] text-gray-400 font-medium">{stage.number}</span>}
                      {isRejected && <Ban className="w-4 h-4 text-red-600" />}
                    </div>
                    <span className={cn(
                      "text-[9px] text-center whitespace-nowrap",
                      isCompleted && "text-emerald-600 font-medium",
                      isCurrent && "text-blue-600 font-medium",
                      isPending && "text-gray-400",
                      isRejected && "text-red-600 font-medium"
                    )}>
                      {stage.label}
                    </span>
                  </div>
                  
                  {idx < arr.length - 1 && (
                    <div 
                      className={cn("h-0.5 flex-1 rounded-full self-start", lineColor)}
                      style={{ marginTop: '13.5px' }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Segunda fila: 4 etapas */}
          <div className="relative flex items-center justify-between gap-1">
            {[
              { id: 'entrevista-pm', label: 'Ent. 2', number: 5 },
              { id: 'entrevista-hiring', label: 'Hiring', number: 6 },
              { id: 'antecedentes', label: 'Antec.', number: 7 },
              { id: 'seleccionado', label: 'Selecc.', number: 8 },
            ].map((stage, idx, arr) => {
              const status = getStageStatus(stage.id, currentStage, candidateStatus);
              const isCompleted = status === 'completed';
              const isCurrent = status === 'current';
              const isPending = status === 'pending';
              const isRejected = status === 'rejected';
              
              const lineCompleted = isCompleted || isRejected;
              const lineColor = isRejected ? 'bg-red-300' : lineCompleted ? 'bg-emerald-300' : 'bg-gray-200';
              
              return (
                <div key={stage.id} className="contents">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center mb-1.5 relative z-10",
                      isCompleted && "bg-emerald-50 border-2 border-emerald-500",
                      isCurrent && "bg-blue-50 border-2 border-blue-500",
                      isPending && "bg-gray-50 border-2 border-gray-200",
                      isRejected && "bg-red-50 border-2 border-red-500"
                    )}>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isCurrent && <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>}
                      {isPending && <span className="text-[10px] text-gray-400 font-medium">{stage.number}</span>}
                      {isRejected && <Ban className="w-4 h-4 text-red-600" />}
                    </div>
                    <span className={cn(
                      "text-[9px] text-center whitespace-nowrap",
                      isCompleted && "text-emerald-600 font-medium",
                      isCurrent && "text-blue-600 font-medium",
                      isPending && "text-gray-400",
                      isRejected && "text-red-600 font-medium"
                    )}>
                      {stage.label}
                    </span>
                  </div>
                  
                  {idx < arr.length - 1 && (
                    <div 
                      className={cn("h-0.5 flex-1 rounded-full self-start", lineColor)}
                      style={{ marginTop: '13.5px' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={(el) => (stageRefs.current['screening-talent'] = el)}>
        <StageAccordion
          id="screening-talent"
          title="Screening con Talent Acquisition"
          category="Filtro Inicial"
          icon={UserCheck}
          number={1}
          isOpen={openStages.has('screening-talent')}
          onToggle={() => toggleStage('screening-talent')}
          comments={comments}
          addComment={addComment}
          openCommentPanel={openCommentPanel}
          status={stageStatuses['screening-talent']}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-sm text-gray-600">
              Primera entrevista de filtro con el equipo de adquisición de talento para validar información básica, expectativas salariales y disponibilidad del candidato.
            </p>
          </div>
        </StageAccordion>
      </div>

      <div ref={(el) => (stageRefs.current['evaluacion-cv'] = el)}>
        <StageAccordion
          id="evaluacion-cv"
          title="Evaluación CV"
          category="Filtro Inicial"
          icon={FileText}
          number={1}
          isOpen={openStages.has('evaluacion-cv')}
          onToggle={() => toggleStage('evaluacion-cv')}
          comments={comments}
          addComment={addComment}
          openCommentPanel={openCommentPanel}
          status={stageStatuses['evaluacion-cv']}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
            {/* Header */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">Serena AI - Análisis de CV</h4>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    En revisión
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">7 ene 2025, 2:45 p.m.</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">CV Score</div>
                <div className="text-2xl font-bold text-blue-600">78</div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-gray-900">Evaluación del candidato</h5>
              
              <div className="grid gap-4">
                <div className="flex gap-3">
                  <div className="w-1.5 bg-blue-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium text-gray-900">Experiencia</div>
                    <p className="text-sm text-gray-600">
                      3 años de experiencia en desarrollo backend con Node.js y Python. Perfil junior-mid con proyectos sólidos pero aún en crecimiento.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 bg-blue-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium text-gray-900">Educación</div>
                    <p className="text-sm text-gray-600">
                      Ingeniería de Sistemas de la Universidad Santo Tomás (2018-2022). Certificaciones en AWS y desarrollo backend.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 bg-blue-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium text-gray-900">Tecnologías</div>
                    <p className="text-sm text-gray-600">
                      Fuerte en backend (Node.js, Express, MongoDB, PostgreSQL). Experiencia con AWS y arquitectura de microservicios.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 bg-blue-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium text-gray-900">Ubicación</div>
                    <p className="text-sm text-gray-600">
                      Residente en Sogamoso, Colombia. Disponibilidad para trabajo remoto o reubicación.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 bg-blue-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium text-gray-900">Estabilidad laboral</div>
                    <p className="text-sm text-gray-600">
                      Trabajos de 1-2 años en empresas de tecnología. Muestra progresión en roles técnicos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-5">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-blue-900 mb-1">Recomendación</div>
                    <p className="text-sm text-blue-800">
                      Candidato promedio con potencial. Cumple los requisitos básicos para la posición. Se recomienda avanzar a la entrevista con Serena IA para evaluar habilidades blandas y fit cultural.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </StageAccordion>
      </div>

      <div ref={(el) => (stageRefs.current['serena-ai'] = el)}>
        <StageCard
          id="serena-ai"
          title="Entrevista Serena IA"
          category="Filtro Inicial"
          icon={Bot}
          number={2}
          comments={comments}
          openCommentPanel={openCommentPanel}
          status={stageStatuses['serena-ai']}
        />
      </div>

      <StageCard
        id="psicometrico"
        title="Psicométrico"
        category="Evaluación"
        icon={Brain}
        number={3}
        comments={comments}
        openCommentPanel={openCommentPanel}
        status={stageStatuses['psicometrico']}
      />

      <StageAccordion
        id="entrevista-pm"
        title="Entrevista - Caso product sense"
        category="Prueba técnica"
        icon={Lightbulb}
        number={5}
        isOpen={openStages.has('entrevista-pm')}
        onToggle={() => toggleStage('entrevista-pm')}
        comments={comments}
        addComment={addComment}
        openCommentPanel={openCommentPanel}
        status={stageStatuses['entrevista-pm']}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600">
            Entrevista de caso práctico para evaluar capacidad de análisis de producto, pensamiento estratégico y toma de decisiones basada en datos.
          </p>
        </div>
      </StageAccordion>

      <StageCard
        id="entrevista-hiring"
        title="Entrevista Hiring Manager"
        category="Entrevista con Liderazgo"
        icon={Users}
        number={6}
        comments={comments}
        openCommentPanel={openCommentPanel}
        status={stageStatuses['entrevista-hiring']}
      />

      <StageAccordion
        id="antecedentes"
        title="Antecedentes Judiciales"
        category="Antecedentes Judiciales"
        icon={Shield}
        number={7}
        isOpen={openStages.has('antecedentes')}
        onToggle={() => toggleStage('antecedentes')}
        comments={comments}
        addComment={addComment}
        openCommentPanel={openCommentPanel}
        status={stageStatuses['antecedentes']}
      >
        <EvaluationsSection />
      </StageAccordion>

      <StageCard
        id="seleccionado"
        title="Seleccionado"
        category="Contratación"
        icon={CheckCircle}
        number={8}
        comments={comments}
        openCommentPanel={openCommentPanel}
        status={stageStatuses['seleccionado']}
      />
    </div>
  );
}