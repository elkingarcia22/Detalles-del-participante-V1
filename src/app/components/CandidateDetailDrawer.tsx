import React, { useState, useEffect } from 'react';
import { SerenaIAPanel } from './SerenaIAPanel';
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
import { notesToComments, generateTasks } from '../utils/candidateHelpers';

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
  const [isSectionEditing, setIsSectionEditing] = useState(false);
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null);
  const [highlightedStageId, setHighlightedStageId] = useState<string | null>(null);
  const [isSerenaPanelOpen, setIsSerenaPanelOpen] = useState(false);
  
  // Estado para comentarios compartido entre StagesSection y ActivityHubPanel
  const [comments, setComments] = useState<Comment[]>([]);

  // Estado para tareas compartido entre ActivityHubPanel y ToDoTab
  const [tasks, setTasks] = useState<Task[]>([]);

  // Estado para edición sincronizada
  const [editedCandidateData, setEditedCandidateData] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);


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

  // Los comentarios se hacen directamente en cada etapa (inline)
  const openCommentPanel = (_stageId: string) => {};

  // Función para navegar a documentos y abrir selector de archivos
  const handleAddDocument = () => {
    // Cambiar a la sección de documentos
    setActiveSection('documents');
    // Trigger file upload después de un pequeño delay para permitir que el componente se monte
    setTriggerDocumentUpload(true);
  };

  // Funciones para manejar el modo de edición
  const handleEditProfile = () => {
    setEditedCandidateData({ ...mockCandidate });
    setValidationErrors([]);
    setIsEditMode(true);
    
    // Solo navegar a información general si no estamos en una sección ya editable
    if (!['experience', 'education'].includes(activeSection)) {
      setActiveSection('generalInfo');
    }
    
    toast.info('Modo de edición activado');
  };

  const handleSaveChanges = () => {
    // Definir campos obligatorios
    const mandatoryFields = [
      { key: 'firstName', label: 'Nombre' },
      { key: 'lastName', label: 'Apellido' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'phone', label: 'Teléfono' },
      { key: 'identificationNumber', label: 'Número de identificación' },
      { key: 'city', label: 'Ciudad' },
      { key: 'country', label: 'País' }
    ];
    
    // Simulación de error para Valentina Herrera Castro
    if (mockCandidate.name === 'Valentina Herrera Castro') {
      toast.error('Lo sentimos, no hemos podido guardar los cambios en el perfil. Por favor, inténtalo de nuevo en unos minutos.');
      return;
    }

    const errors: string[] = [];
    mandatoryFields.forEach(field => {
      if (!editedCandidateData[field.key] || editedCandidateData[field.key].toString().trim() === '') {
        errors.push(field.key);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    // Si pasa la validación
    setIsEditMode(false);
    setValidationErrors([]);
    // Aquí se guardarían los cambios realmente (en una DB u estado global persistente)
    toast.success('Cambios guardados exitosamente');
    console.log('Guardando cambios del perfil...', editedCandidateData);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setValidationErrors([]);
    setEditedCandidateData(null);
    toast.info('Edición cancelada');
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
    experience: [],
    education: [],
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
    // Al cambiar de candidato, mantenemos la sección activa
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

  const [isInsideVacancy, setIsInsideVacancy] = useState(false);
  const isValentina = mockCandidate?.name === 'Valentina Herrera Castro';

  const renderSection = () => {
    const candidate = mockCandidate;
    
    switch (activeSection) {
      case 'generalInfo':
        return (
          <GeneralInfoSection 
            candidate={isEditMode ? editedCandidateData : candidate} 
            isEditMode={isEditMode} 
            onDataChange={(newData: any) => setEditedCandidateData(newData)}
            validationErrors={validationErrors}
            isValentina={isValentina}
          />
        );
      case 'application':
        return <ApplicationSection />;
      case 'vacancies':
        return (
          <VacanciesSection 
            candidate={candidate}
            applications={candidate.applications || []}
            comments={comments}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
            openCommentPanel={openCommentPanel}
            highlightedStageId={highlightedStageId}
            onVacancySelect={setIsInsideVacancy}
            isValentina={isValentina}
          />
        );
      case 'experience':
        return <ExperienceSection experiences={candidate.experience} isEditMode={isEditMode} onEditingChange={setIsSectionEditing} isValentina={isValentina} />;
      case 'education':
        return <EducationSection education={candidate.education} isEditMode={isEditMode} onEditingChange={setIsSectionEditing} isValentina={isValentina} />;
      case 'documents':
        return <DocumentsSection triggerUpload={triggerDocumentUpload} documents={(candidate as any).documents} isValentina={isValentina} />;
      default:
        return (
          <GeneralInfoSection 
            candidate={isEditMode ? editedCandidateData : candidate} 
            isEditMode={isEditMode}
            onDataChange={(newData: any) => setEditedCandidateData(newData)}
            validationErrors={validationErrors}
          />
        );
    }
  };

  // Resetear estados al cambiar de sección
  useEffect(() => {
    setIsInsideVacancy(false);
    setIsSectionEditing(false);
  }, [activeSection]);

  // Resetear isSectionEditing al salir de modo edición general
  useEffect(() => {
    if (!isEditMode) {
      setIsSectionEditing(false);
    }
  }, [isEditMode]);

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
      <div data-tour="candidate-header">
        <CandidateHeader 
          candidate={mockCandidate} 
          currentIndex={currentIndex}
          totalCandidates={totalCandidates}
          onBack={onClose || (() => {})}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSerenaClick={() => setIsSerenaPanelOpen(true)}
          isDisabled={isSectionEditing}
          isValentina={isValentina}
        />
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Column - Candidate Information */}
        <div className="flex-1 flex transition-all duration-300 overflow-hidden">
          {/* Sidebar */}
          <CandidateSidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
            isEditMode={isEditMode}
            applications={mockCandidate.applications}
            activeApplicationId={activeApplicationId}
            onApplicationChange={setActiveApplicationId}
            isDisabled={isSectionEditing}
            isValentina={isValentina}
          />

          {/* Center Column - Content Area */}
          <div id="candidate-center-column" className="flex-1 bg-gray-50 relative">
            {/* Scrollable Content */}
            <div className="absolute inset-0 overflow-auto">
              <div id="candidate-content-area" className="max-w-4xl mx-auto p-8 pb-32">
                {renderSection()}
              </div>
            </div>

            {/* Floating Action Bar - Fixed at bottom center */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-6">
              <div className="flex justify-center pointer-events-none">
                {isEditMode ? (
                  <EditModeBar
                    onSave={handleSaveChanges}
                    onCancel={handleCancelEdit}
                    hideButtons={isSectionEditing}
                    isValentina={isValentina}
                  />
                ) : (
                  <FloatingActionBar
                    mode={isInsideVacancy ? 'vacancy' : 'general'}
                    onReject={() => console.log('Reject')}
                    onNextStage={() => console.log('Next stage')}
                    onComment={() => {}}
                    onAddTodo={() => {}}
                    onMessage={() => console.log('Message')}
                    candidatePhone={mockCandidate.phone}
                    onAddDocument={handleAddDocument}
                    onEditProfile={handleEditProfile}
                    isValentina={isValentina}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Serena IA Side Panel - Now anchored to the main container below header */}
        <SerenaIAPanel 
          isOpen={isSerenaPanelOpen} 
          onClose={() => setIsSerenaPanelOpen(false)} 
          candidate={mockCandidate} 
        />
      </div>
    </div>
  );
}