import React, { useState, useEffect } from 'react';
import { Layers, ChevronLeft, ChevronRight, Briefcase, GraduationCap, User, FileText } from 'lucide-react';
import { cn } from './ui/utils';
import { Tooltip } from './ui/tooltip';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface CandidateSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isEditMode?: boolean;
}

const menuSections: SidebarItem[] = [
  { id: 'generalInfo', label: 'Información General', icon: User },
  { id: 'experience', label: 'Experiencia Laboral', icon: Briefcase },
  { id: 'education', label: 'Educación', icon: GraduationCap },
  { id: 'stages', label: 'Etapas', icon: Layers },
  { id: 'documents', label: 'Documentos', icon: FileText },
];

export function CandidateSidebar({ activeSection, onSectionChange, isEditMode }: CandidateSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse after 3 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsed(true);
    }, 1500); // Reducido a 1.5 segundos (mitad del tiempo original)

    return () => clearTimeout(timer);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div 
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out relative',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-6 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
        title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
        )}
      </button>

      <div className="flex-1 py-6 overflow-y-auto overflow-x-visible">
        {/* Menu Sections */}
        <div className={cn(isCollapsed ? 'px-2' : 'px-3')}>
          <nav className="space-y-1">
            {menuSections
              .filter((item) => {
                // En modo edición, solo mostrar secciones editables
                if (isEditMode) {
                  return ['generalInfo', 'experience', 'education'].includes(item.id);
                }
                return true;
              })
              .map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              const button = (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isCollapsed ? 'px-2 justify-center' : 'px-3',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-blue-600' : 'text-gray-400')} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={item.id} content={item.label} side="right">
                    {button}
                  </Tooltip>
                );
              }

              return button;
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}