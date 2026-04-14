import React from 'react';
import { createPortal } from 'react-dom';
import {
  Ban,
  ArrowRight,
  MessageSquare,
  ListTodo,
  Mail,
  MoreHorizontal,
  Download,
  Share2,
  Eye,
  Printer,
  Phone,
  Video,
  RotateCcw,
  Layers,
  SkipForward,
  Shield,
  Copy,
  ChevronRight,
  FileText,
  Edit,
  AlertCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip } from './ui/tooltip';
import { toast } from 'sonner';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface FloatingActionBarProps {
  onReject: () => void;
  onNextStage: () => void;
  onComment: () => void;
  onAddTodo: () => void;
  onMessage: () => void;
  candidatePhone?: string;
  onAddDocument?: () => void;
  onEditProfile?: () => void;
}

export function FloatingActionBar({
  onReject,
  onNextStage,
  onComment,
  onAddTodo,
  onMessage,
  candidatePhone,
  onAddDocument,
  onEditProfile,
}: FloatingActionBarProps) {
  // Estado para dropdown personalizado
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);
  const [submenuPosition, setSubmenuPosition] = React.useState({ top: 0, left: 0 });
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const submenuTriggerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = React.useState(0);

  // Lista de botones en orden de prioridad (después de Descartar y Siguiente que siempre están)
  const buttonPriority = [
    { key: 'verCV', width: 55, label: 'Ver CV' },
    { key: 'email', width: 55, label: 'Email' },
    { key: 'llamar', width: 55, label: 'Llamar' },
    { key: 'comentar', width: 65, label: 'Comentar' },
    { key: 'tareas', width: 55, label: 'Tareas' },
  ];

  // Detectar el ancho disponible del contenedor padre
  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateAvailableWidth = () => {
      const parent = containerRef.current?.parentElement;
      if (parent) {
        const parentWidth = parent.offsetWidth;
        // Restar padding y márgenes
        setAvailableWidth(parentWidth - 32); // 32px = padding left + right
      }
    };

    updateAvailableWidth();

    // Usar ResizeObserver para detectar cambios en el tamaño
    const resizeObserver = new ResizeObserver(() => {
      updateAvailableWidth();
    });

    const parent = containerRef.current.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    window.addEventListener('resize', updateAvailableWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateAvailableWidth);
    };
  }, []);

  // Calcular qué botones mostrar según el espacio disponible
  const getVisibleButtons = () => {
    // Espacio base: Descartar (55) + Siguiente (55) + Más (50) + gaps y padding
    const baseWidth = 55 + 55 + 50 + 60; // 220px base
    let remainingWidth = availableWidth - baseWidth;

    const visible: Record<string, boolean> = {
      verCV: false,
      llamar: false,
      email: false,
      comentar: false,
      tareas: false,
      whatsapp: false,
      compartir: false,
      descargarCV: false,
      agregarEntrevista: false,
    };

    // Si no tenemos ancho disponible aún, mostrar configuración mínima
    if (availableWidth === 0) {
      return visible;
    }

    // Agregar botones según el espacio disponible en orden de prioridad
    for (const button of buttonPriority) {
      if (remainingWidth >= button.width + 10) { // +10 para gap
        visible[button.key as keyof typeof visible] = true;
        remainingWidth -= (button.width + 10);
      } else {
        break;
      }
    }

    return visible;
  };

  const visibleButtons = getVisibleButtons();

  // Cerrar dropdown al hacer click fuera
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsSubmenuOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Calcular posición del submenu cuando se abre
  React.useEffect(() => {
    if (isSubmenuOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setSubmenuPosition({
        top: rect.top,
        left: rect.right + 4, // 4px de margen desde el borde derecho del dropdown
      });
    }
  }, [isSubmenuOpen]);

  const handleDownloadCV = () => {
    // Por el momento, este botón no hace nada
    // toast.success('Descargando CV...');
    // console.log('Download CV');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Candidato - UBITS ATS',
        text: 'Compartir perfil de candidato',
        url: window.location.href,
      }).catch(() => {
        toast.error('No se pudo compartir');
      });
    } else {
      const url = window.location.href;
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Link copiado al portapapeles');
      } catch (err) {
        toast.error('No se pudo copiar');
      } finally {
        textArea.remove();
      }
    }
  };

  const handleWhatsApp = () => {
    if (candidatePhone) {
      const phoneNumber = candidatePhone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    } else {
      toast.error('Número de teléfono no disponible');
    }
  };

  const handleCall = () => {
    if (candidatePhone) {
      window.location.href = `tel:${candidatePhone}`;
    } else {
      toast.error('Número de teléfono no disponible');
    }
  };

  const handleSendEmail = () => {
    onMessage();
  };

  const handleSerenaLink = () => {
    toast.success('Abriendo entrevista con Serena IA...');
    console.log('Open Serena AI interview');
  };

  const handleReApply = () => {
    toast.success('Re-aplicando candidato a la etapa...');
    console.log('Re-apply candidate to stage');
  };

  const handleCopyApplicationId = () => {
    const applicationId = 'APP-2024-001234';
    
    // Método más robusto para copiar
    const textArea = document.createElement('textarea');
    textArea.value = applicationId;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Application ID copiado al portapapeles');
    } catch (err) {
      toast.error('No se pudo copiar');
    } finally {
      textArea.remove();
    }
  };

  const handleCopyCandidateId = () => {
    const candidateId = 'CAN-2024-567890';
    
    // Método más robusto para copiar
    const textArea = document.createElement('textarea');
    textArea.value = candidateId;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Candidate ID copiado al portapapeles');
    } catch (err) {
      toast.error('No se pudo copiar');
    } finally {
      textArea.remove();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-auto"
    >
      <div className="bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl backdrop-blur-sm bg-opacity-95 inline-flex">
        <div className="px-2 sm:px-3 py-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Reject Button - Always visible */}
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="h-auto flex-col gap-0.5 px-2 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-950 border-red-800 bg-transparent min-w-[50px] flex-shrink-0"
            >
              <Ban className="w-4 h-4" />
              <span className="text-[9px]">Descartar</span>
            </Button>

            {/* Next Stage Button - Always visible */}
            <Button
              size="sm"
              onClick={onNextStage}
              className="h-auto flex-col gap-0.5 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white min-w-[50px] flex-shrink-0"
            >
              <ArrowRight className="w-4 h-4" />
              <span className="text-[9px]">Siguiente</span>
            </Button>

            {/* View CV Button - Dynamic visibility */}
            {visibleButtons.verCV && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadCV}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[50px] flex-shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span className="text-[9px]">Ver CV</span>
              </Button>
            )}

            {/* Call Button - Dynamic visibility */}
            {visibleButtons.llamar && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCall}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[50px] flex-shrink-0"
              >
                <Phone className="w-4 h-4" />
                <span className="text-[9px]">Llamar</span>
              </Button>
            )}

            {/* Email Button - Dynamic visibility */}
            {visibleButtons.email && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSendEmail}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[50px] flex-shrink-0"
              >
                <Mail className="w-4 h-4" />
                <span className="text-[9px]">Email</span>
              </Button>
            )}

            {/* Comment Button - Dynamic visibility */}
            {visibleButtons.comentar && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onComment}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[56px] flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[9px]">Comentar</span>
              </Button>
            )}

            {/* Todo Button - Dynamic visibility */}
            {visibleButtons.tareas && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddTodo}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[50px] flex-shrink-0"
              >
                <ListTodo className="w-4 h-4" />
                <span className="text-[9px]">Tareas</span>
              </Button>
            )}

            {/* WhatsApp Button - Dynamic visibility */}
            {visibleButtons.whatsapp && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWhatsApp}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[54px] flex-shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span className="text-[9px]">WhatsApp</span>
              </Button>
            )}

            {/* Share Button - Dynamic visibility */}
            {visibleButtons.compartir && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[56px] flex-shrink-0"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-[9px]">Compartir</span>
              </Button>
            )}

            {/* Download CV Button - Dynamic visibility */}
            {visibleButtons.descargarCV && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownloadCV}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[60px] flex-shrink-0"
              >
                <Download className="w-4 h-4" />
                <span className="text-[9px]">Descargar</span>
              </Button>
            )}

            {/* Add Interview Button - Dynamic visibility */}
            {visibleButtons.agregarEntrevista && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.success('Abriendo formulario para agregar entrevista...')}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[60px] flex-shrink-0"
              >
                <Video className="w-4 h-4" />
                <span className="text-[9px]">Entrevista</span>
              </Button>
            )}

            {/* More Actions Dropdown - RESTAURADO */}
            <div
              ref={dropdownRef}
              className="relative"
            >
              <Button
                ref={buttonRef}
                variant="ghost"
                size="sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-auto flex-col gap-0.5 px-2 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 min-w-[45px] flex-shrink-0"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span className="text-[9px]">Más</span>
              </Button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 bottom-full mb-2 bg-gray-900 border border-gray-700 shadow-2xl rounded-lg backdrop-blur-sm bg-opacity-95 w-64 max-h-[70vh] overflow-y-auto z-50"
                >
                  {/* Mostrar acciones ocultas de la barra principal */}
                  {!visibleButtons.verCV && (
                    <div
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer rounded-t-lg transition-colors"
                      onClick={() => {
                        handleDownloadCV();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Ver CV</span>
                    </div>
                  )}

                  {!visibleButtons.llamar && (
                    <div
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => {
                        handleCall();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Llamar</span>
                    </div>
                  )}

                  {!visibleButtons.email && (
                    <div
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => {
                        handleSendEmail();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Email</span>
                    </div>
                  )}

                  {!visibleButtons.comentar && (
                    <div
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => {
                        onComment();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Comentar</span>
                    </div>
                  )}

                  {!visibleButtons.tareas && (
                    <div
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => {
                        onAddTodo();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <ListTodo className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Tareas</span>
                    </div>
                  )}

                  {/* Separador si hay botones ocultos */}
                  {(!visibleButtons.verCV || !visibleButtons.llamar || !visibleButtons.email || !visibleButtons.comentar || !visibleButtons.tareas) && (
                    <div className="h-px bg-gray-700 my-1" />
                  )}

                  {/* 1. Descargar CV */}
                  <div
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => {
                      handleDownloadCV();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Download className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>Descargar CV</span>
                  </div>

                  {/* 2. Agregar entrevista */}
                  <div
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => {
                      toast.success('Abriendo formulario para agregar entrevista...');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Video className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>Agregar entrevista</span>
                  </div>

                  {/* 3. Mover a etapa - CON PORTAL PARA SUBMENU LATERAL */}
                  <div>
                    <div
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                      onMouseEnter={() => setIsSubmenuOpen(true)}
                      ref={submenuTriggerRef}
                    >
                      <div className="flex items-center">
                        <Layers className="w-4 h-4 mr-3 flex-shrink-0" />
                        <span>Mover a etapa</span>
                      </div>
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    </div>
                    
                    {/* Submenu usando Portal para renderizar fuera del dropdown */}
                    {isSubmenuOpen && typeof document !== 'undefined' && createPortal(
                      <div 
                        className="fixed bg-gray-900 border border-gray-700 shadow-2xl rounded-lg backdrop-blur-sm bg-opacity-95 w-72 max-h-[70vh] overflow-y-auto z-[100] py-2"
                        style={{ 
                          top: `${submenuPosition.top}px`,
                          left: `${submenuPosition.left}px`
                        }}
                        onMouseLeave={() => setIsSubmenuOpen(false)}
                        onMouseEnter={() => setIsSubmenuOpen(true)}
                      >
                        <div className="text-xs text-gray-500 px-3 py-1.5 mb-1">Seleccionar etapa:</div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Screening con Talent Acquisition');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Screening con Talent Acquisition</span>
                        </div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Evaluación CV');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Evaluación CV</span>
                        </div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Serena AI');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Serena AI</span>
                        </div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Psicométrico');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Psicométrico</span>
                        </div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Entrevista - Caso product sense');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Entrevista - Caso product sense</span>
                        </div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Entrevista Hiring Manager');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Entrevista Hiring Manager</span>
                        </div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Antecedentes Judiciales');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Antecedentes Judiciales</span>
                        </div>
                        
                        <div
                          className="flex items-center px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-blue-600 cursor-pointer transition-colors mx-1 rounded-md"
                          onClick={() => {
                            toast.success('✓ Movido a: Seleccionado');
                            setIsDropdownOpen(false);
                            setIsSubmenuOpen(false);
                          }}
                        >
                          <span>Seleccionado</span>
                        </div>
                      </div>,
                      document.body
                    )}
                  </div>

                  {/* 4. Omitir Etapa */}
                  <div
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => {
                      toast.success('Omitiendo etapa actual...');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <SkipForward className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>Omitir Etapa</span>
                  </div>

                  {/* 5. Solicitar verificación de antecedentes judiciales */}
                  <div
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => {
                      toast.success('Solicitando verificación de antecedentes...');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Shield className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>Solicitar verificación de antecedentes judiciales</span>
                  </div>

                  {/* 6. Copiar Application ID */}
                  <div
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => {
                      handleCopyApplicationId();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>Copiar Application ID</span>
                  </div>

                  {/* 7. Copiar Candidate ID */}
                  <div
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => {
                      handleCopyCandidateId();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>Copiar Candidate ID</span>
                  </div>

                  {/* 8. Imprimir perfil */}
                  <div
                    className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => {
                      handlePrint();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Printer className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span>Imprimir perfil</span>
                  </div>

                  {/* 9. Agregar documento */}
                  {onAddDocument && (
                    <div
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => {
                        onAddDocument();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Download className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Agregar documento</span>
                    </div>
                  )}

                  {/* 10. Editar perfil */}
                  {onEditProfile && (
                    <div
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer rounded-b-lg transition-colors"
                      onClick={() => {
                        onEditProfile();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Editar perfil</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}