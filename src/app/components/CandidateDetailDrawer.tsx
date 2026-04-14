import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivityHubPanel } from './ActivityHubPanel';
import { CandidateHeader } from './CandidateHeader';
import { CandidateSidebar } from './CandidateSidebar';
import { GeneralInfoSection } from './sections/GeneralInfoSection';
import { ApplicationSection } from './sections/ApplicationSection';
import { VacanciesSection } from './sections/VacanciesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { DocumentsSection } from './sections/DocumentsSection';
import { FloatingActionBar } from './FloatingActionBar';
import { EditModeBar } from './EditModeBar';
import { Toaster, toast } from 'sonner';
import { Comment } from '../types/comments';
import { candidatesData } from '../data/candidatesData';
import { 
  notesToComments, 
  generateTasks, 
  generateActivities,
  generateSerenaInsights
} from '../utils/candidateHelpers';

// Definir tipo de tarea
export interface Task {
  id: string;
  name: string;
  status: 'por iniciar' | 'vencida' | 'finalizada';
  dueDate?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  comments?: Array<{
    id: string;
    text: string;
    author: string;
    date: string;
  }>;
}

interface CandidateDetailDrawerProps {
  candidateId: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  totalCandidates?: number;
  currentIndex?: number;
}

export function CandidateDetailDrawer({ 
  candidateId, 
  onPrevious, 
  onNext,
  onClose,
  totalCandidates = 74,
  currentIndex = 1
}: CandidateDetailDrawerProps) {
  const [activeSection, setActiveSection] = useState('generalInfo');
  const [triggerDocumentUpload, setTriggerDocumentUpload] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null);
  
  // Estados para controlar el ActivityHubPanel desde las etapas
  const [activityHubTab, setActivityHubTab] = useState('serena');
  const [selectedStageForComment, setSelectedStageForComment] = useState('general');
  const [isActivityHubCollapsed, setIsActivityHubCollapsed] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [focusTaskNameInput, setFocusTaskNameInput] = useState(false);
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(null);
  const [highlightedStageId, setHighlightedStageId] = useState<string | null>(null);
  
  // Estado para comentarios compartido entre StagesSection y ActivityHubPanel
  const [comments, setComments] = useState<Comment[]>([]);

  // Estado para tareas compartido entre ActivityHubPanel y ToDoTab
  const [tasks, setTasks] = useState<Task[]>([]);

  // Función para agregar un nuevo comentario
  const addComment = (
    text: string,
    stageId: string,
    stageName: string,
    isPrivate: boolean = false
  ) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text,
      author: 'Usuario Actual', // En producción, esto vendría del usuario autenticado
      authorInitials: 'UC',
      timestamp: new Date(),
      stageId,
      stageName,
      isPrivate,
    };
    setComments(prev => [...prev, newComment]);
  };

  // Función para editar un comentario
  const editComment = (id: string, newText: string) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === id ? { ...comment, text: newText } : comment
      )
    );
    toast.success('Comentario actualizado');
  };

  // Función para eliminar un comentario
  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
    toast.success('Comentario eliminado');
  };

  // Función para abrir el panel de comentarios con una etapa pre-seleccionada
  const openCommentPanel = (stageId: string) => {
    setActivityHubTab('comments');
    setSelectedStageForComment(stageId);
    // Abrir el panel si está cerrado
    if (isActivityHubCollapsed) {
      setIsActivityHubCollapsed(false);
    }
  };

  // Función para abrir el panel de tareas en modo creación
  const openTodosPanel = () => {
    setActivityHubTab('todos');
    setIsCreatingTask(true);
    setFocusTaskNameInput(true);
    // Abrir el panel si está cerrado
    if (isActivityHubCollapsed) {
      setIsActivityHubCollapsed(false);
    }
    // Reset focus flag después de un delay
    setTimeout(() => {
      setFocusTaskNameInput(false);
    }, 500);
  };

  // Función para navegar a documentos y abrir selector de archivos
  const handleAddDocument = () => {
    // Cambiar a la sección de documentos
    setActiveSection('documents');
    // Trigger file upload después de un pequeño delay para permitir que el componente se monte
    setTriggerDocumentUpload(true);
  };

  // Funciones para manejar el modo de edición
  const handleEditProfile = () => {
    setIsEditMode(true);
    // Navegar a la primera sección editable
    setActiveSection('generalInfo');
    toast.info('Modo de edición activado');
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
    // Aquí se guardarían los cambios
    toast.success('Cambios guardados exitosamente');
    console.log('Guardando cambios del perfil...');
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Aquí se descartarían los cambios
    toast.info('Edición cancelada');
    console.log('Cancelando edición...');
  };

  const mockCandidate = candidatesData.find(candidate => candidate.id === candidateId) || candidatesData.find(candidate => {
    // Fallback: try to match by index if candidateId is a numeric string
    const numericId = parseInt(candidateId, 10);
    if (!isNaN(numericId)) {
      return candidatesData.indexOf(candidate) === numericId - 1;
    }
    return false;
  }) || {
    name: 'Candidato no encontrado',
    location: 'Desconocido',
    email: 'no-disponible@example.com',
    phone: 'N/A',
    age: 0,
    identificationNumber: 'N/A',
    linkedin: '',
    experience: 'N/A',
    salaryRange: 'N/A',
    availability: 'N/A',
    noticePeriod: 'N/A',
    yearsExperience: 0,
    workedHereBefore: false,
    tags: [],
    matchScore: 0,
    confidence: 'low' as const,
  };

  // Resetear sección y generar datos cuando el candidato cambia
  useEffect(() => {
    // Siempre volver a Información General al cambiar de candidato
    setActiveSection('generalInfo');
    setHighlightedStageId(null);

    if (mockCandidate && 'notes' in mockCandidate) {
      // Generar comentarios desde notes
      const generatedComments = notesToComments(mockCandidate as any);
      setComments(generatedComments);
      
      // Generar tareas dinámicamente
      const generatedTasks = generateTasks(mockCandidate as any);
      // Convertir el formato de Task de helpers a Task del componente
      const formattedTasks = generatedTasks.map(task => ({
        id: task.id,
        name: task.name,
        status: task.completed ? ('finalizada' as const) : ('por iniciar' as const),
        dueDate: task.dueDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        assignee: {
          name: task.assignee,
          avatar: task.assigneeInitials,
        },
      }));
      setTasks(formattedTasks);
    }
  }, [candidateId]);

  // Set default active application when candidate changes
  useEffect(() => {
    if (mockCandidate && mockCandidate.applications && mockCandidate.applications.length > 0) {
      if (!activeApplicationId || !mockCandidate.applications.some((app: any) => app.id === activeApplicationId)) {
        setActiveApplicationId(mockCandidate.applications[0].id);
      }
    } else {
      setActiveApplicationId(null);
    }
  }, [candidateId, mockCandidate, activeApplicationId]);

  const activeApplication = mockCandidate?.applications?.find((app: any) => app.id === activeApplicationId) || mockCandidate?.applications?.[0];

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const renderSection = () => {
    const candidate = mockCandidate;
    
    switch (activeSection) {
      case 'generalInfo':
        return <GeneralInfoSection candidate={candidate} isEditMode={isEditMode} />;
      case 'application':
        return <ApplicationSection />;
      case 'vacancies':
        return (
          <VacanciesSection 
            candidate={candidate}
            applications={candidate.applications || []}
            comments={comments}
            addComment={addComment}
            openCommentPanel={openCommentPanel}
            highlightedStageId={highlightedStageId}
          />
        );
      case 'experience':
        return <ExperienceSection experiences={candidate.experience} isEditMode={isEditMode} />;
      case 'education':
        return <EducationSection education={candidate.education} isEditMode={isEditMode} />;
      case 'documents':
        return <DocumentsSection triggerUpload={triggerDocumentUpload} documents={(candidate as any).documents} />;
      default:
        return <GeneralInfoSection candidate={candidate} isEditMode={isEditMode} />;
    }
  };

  // Reset trigger when section changes
  React.useEffect(() => {
    if (triggerDocumentUpload && activeSection === 'documents') {
      // Reset after a short delay to allow the component to mount
      setTimeout(() => {
        setTriggerDocumentUpload(false);
      }, 500);
    }
  }, [activeSection, triggerDocumentUpload]);

  return (
    <div className="h-full bg-gray-50 flex flex-col relative">
      <Toaster position="top-center" />
      
      {/* Candidate Header */}
      <CandidateHeader
        candidate={{
          name: mockCandidate.name,
          location: mockCandidate.location,
          email: mockCandidate.email,
          phone: mockCandidate.phone,
          age: mockCandidate.age,
          identificationNumber: mockCandidate.identificationNumber,
          avatar: mockCandidate.avatar,
          linkedin: mockCandidate.linkedin,
        }}
        currentIndex={currentIndex}
        totalCandidates={totalCandidates}
        onBack={onClose || (() => {})}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Candidate Information */}
        <div className="flex-1 flex">
          {/* Sidebar */}
          <CandidateSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isEditMode={isEditMode}
            applications={mockCandidate?.applications}
            activeApplicationId={activeApplicationId}
            onApplicationChange={setActiveApplicationId}
          />

          {/* Center Column - Content Area */}
          <div id="candidate-center-column" className="flex-1 bg-gray-50 relative">
            {/* Scrollable Content */}
            <div className="absolute inset-0 overflow-auto">
              <div id="candidate-content-area" className="max-w-4xl mx-auto p-8 pb-32">
                {renderSection()}
              </div>
            </div>

            {/* Floating Action Bar o Edit Mode Bar - Fixed at bottom, constrained to content width */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-6">
              <div className="flex justify-center pointer-events-none">
                {isEditMode ? (
                  <EditModeBar
                    onSave={handleSaveChanges}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <FloatingActionBar
                    onReject={() => console.log('Reject')}
                    onNextStage={() => console.log('Next stage')}
                    onComment={() => openCommentPanel('general')}
                    onAddTodo={() => openTodosPanel()}
                    onMessage={() => console.log('Message')}
                    candidatePhone={mockCandidate.phone}
                    onAddDocument={handleAddDocument}
                    onEditProfile={handleEditProfile}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Activity Hub */}
        <ActivityHubPanel 
          comments={comments} 
          addComment={addComment} 
          editComment={editComment}
          deleteComment={deleteComment}
          activeTab={activityHubTab}
          onTabChange={setActivityHubTab}
          selectedStage={selectedStageForComment}
          onStageChange={setSelectedStageForComment}
          isCollapsed={isActivityHubCollapsed}
          onCollapsedChange={setIsActivityHubCollapsed}
          isCreatingTask={isCreatingTask}
          onCreatingTaskChange={setIsCreatingTask}
          focusTaskNameInput={focusTaskNameInput}
          tasks={tasks}
          setTasks={setTasks}
          highlightedTaskId={highlightedTaskId}
          setHighlightedTaskId={setHighlightedTaskId}
          onNavigateToSection={setActiveSection}
          setHighlightedStageId={setHighlightedStageId}
          candidate={mockCandidate as any}
        />
      </div>
    </div>
  );
}