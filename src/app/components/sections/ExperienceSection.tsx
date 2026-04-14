import React, { useState, useRef, useEffect } from 'react';
import { Briefcase, MapPin, Calendar, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

interface Experience {
  id?: string;
  company: string;
  position?: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  duration?: string;
  current?: boolean;
  description: string;
  achievements?: string[];
}

interface ExperienceSectionProps {
  experiences?: Experience[];
  isEditMode?: boolean;
}

const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'UX/UI Designer',
    company: 'Habi',
    location: 'Bogotá, Colombia',
    startDate: 'Marzo 2023',
    endDate: null,
    current: true,
    description: 'Diseño de interfaces para plataforma de compra-venta de inmuebles. Trabajo en equipo de producto enfocado en optimizar el flujo de búsqueda y cotización de propiedades.',
    achievements: [
      'Rediseñé el flujo de búsqueda de propiedades mejorando la usabilidad',
      'Colaboré con equipos de desarrollo en implementación de nuevas features',
      'Participé en sesiones de user research para validar diseños'
    ]
  },
  {
    id: '2',
    title: 'Diseñador Digital',
    company: 'Estudio Creativo Digital',
    location: 'Bogotá, Colombia',
    startDate: 'Enero 2022',
    endDate: 'Febrero 2023',
    current: false,
    description: 'Diseño de experiencias web y móviles para diversos clientes. Colaboración con desarrolladores y gestores de proyecto en metodología ágil.',
    achievements: [
      'Diseñé más de 10 proyectos web y móviles para diferentes clientes',
      'Implementé flujos de trabajo colaborativos con desarrollo',
      'Aprendí metodología ágil aplicada al diseño'
    ]
  },
  {
    id: '3',
    title: 'Junior Designer',
    company: 'Agencia 360',
    location: 'Bogotá, Colombia',
    startDate: 'Junio 2021',
    endDate: 'Diciembre 2021',
    current: false,
    description: 'Apoyo en diseño de campañas digitales y landing pages. Primer contacto profesional con herramientas de diseño de interfaces.',
    achievements: [
      'Diseñé más de 15 landing pages para diferentes campañas',
      'Aprendí herramientas como Figma y Adobe XD',
      'Colaboré con equipos de marketing y desarrollo'
    ]
  }
];

export function ExperienceSection({ experiences = mockExperiences, isEditMode = false }: ExperienceSectionProps) {
  // Ensure all experiences have IDs
  const experiencesWithIds = experiences.map((exp, index) => ({
    ...exp,
    id: exp.id || `exp-${index}-${Date.now()}`
  }));
  
  const [experienceList, setExperienceList] = useState<Experience[]>(experiencesWithIds);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Experience | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const editingRef = useRef<HTMLDivElement>(null);

  // Sync state with props when candidate changes
  useEffect(() => {
    setExperienceList(experiencesWithIds);
  }, [experiences]);

  // Scroll al elemento en edición cuando cambia editingId
  useEffect(() => {
    if (editingId && editingRef.current) {
      setTimeout(() => {
        editingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [editingId]);

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setEditForm({ ...exp });
    setIsCreatingNew(false);
  };

  const handleCancelEdit = () => {
    // Si estamos creando uno nuevo y cancelamos, eliminarlo de la lista
    if (isCreatingNew && editForm) {
      setExperienceList(prev => prev.filter(exp => exp.id !== editForm.id));
    }
    setEditingId(null);
    setEditForm(null);
    setIsCreatingNew(false);
  };

  const handleSaveEdit = () => {
    if (editForm) {
      setExperienceList(prev => prev.map(exp => exp.id === editForm.id ? editForm : exp));
      setEditingId(null);
      setEditForm(null);
      setIsCreatingNew(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = (id: string) => {
    setExperienceList(prev => prev.filter(exp => exp.id !== id));
    setDeletingId(null);
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const handleAdd = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: null,
      current: false,
      description: '',
      achievements: []
    };
    setExperienceList(prev => [...prev, newExp]); // Agregar al final
    setEditingId(newExp.id);
    setEditForm(newExp);
    setIsCreatingNew(true);
  };

  const updateEditForm = (field: keyof Experience, value: any) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const addAchievement = () => {
    if (editForm) {
      setEditForm({
        ...editForm,
        achievements: [...(editForm.achievements || []), '']
      });
    }
  };

  const updateAchievement = (index: number, value: string) => {
    if (editForm && editForm.achievements) {
      const newAchievements = [...editForm.achievements];
      newAchievements[index] = value;
      setEditForm({ ...editForm, achievements: newAchievements });
    }
  };

  const removeAchievement = (index: number) => {
    if (editForm && editForm.achievements) {
      const newAchievements = editForm.achievements.filter((_, i) => i !== index);
      setEditForm({ ...editForm, achievements: newAchievements });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Experiencia Laboral</h2>
            <p className="text-sm text-gray-600">{experienceList.length} {experienceList.length === 1 ? 'posición' : 'posiciones'}</p>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-4">
        {experienceList.map((exp, index) => (
          <div
            key={exp.id}
            className={`bg-white rounded-lg border p-6 transition-all ${
              deletingId === exp.id 
                ? 'border-red-300 bg-red-50' 
                : editingId === exp.id
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 hover:shadow-md'
            }`}
          >
            {/* Delete Confirmation Banner */}
            {deletingId === exp.id && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-red-900">
                    ¿Estás seguro de eliminar esta experiencia?
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => confirmDelete(exp.id)}
                      className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Mode */}
            {editingId === exp.id && editForm ? (
              <div className="space-y-4" ref={editingRef}>
                {/* Edit Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-200">
                  <h3 className="text-sm font-semibold text-blue-900">
                    {isCreatingNew ? 'Creando Nueva Experiencia' : 'Editando Experiencia'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Cargo</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => updateEditForm('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Senior Product Designer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Empresa</label>
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => updateEditForm('company', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. TechCorp Solutions"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ubicación</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => updateEditForm('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ej. Bogotá, Colombia"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha de inicio</label>
                    <input
                      type="text"
                      value={editForm.startDate}
                      onChange={(e) => updateEditForm('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Enero 2021"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha de fin</label>
                    <input
                      type="text"
                      value={editForm.endDate || ''}
                      onChange={(e) => updateEditForm('endDate', e.target.value || null)}
                      disabled={editForm.current}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      placeholder="ej. Diciembre 2022"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.current}
                      onChange={(e) => {
                        updateEditForm('current', e.target.checked);
                        if (e.target.checked) {
                          updateEditForm('endDate', null);
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Actualmente trabajo aquí</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => updateEditForm('description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe tus responsabilidades y rol"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Logros destacados</label>
                    <button
                      onClick={addAchievement}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Agregar logro
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editForm.achievements?.map((achievement, i) => (
                      <div key={`achievement-${i}`} className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(i, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe un logro destacado"
                        />
                        <button
                          onClick={() => removeAchievement(i)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* View Mode */
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{exp.position || exp.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="font-medium text-gray-900">{exp.company}</span>
                      {exp.current && (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
                          Actual
                        </span>
                      )}
                    </div>
                  </div>
                  {isEditMode && !deletingId && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="p-1.5 rounded hover:bg-blue-50 transition-colors"
                        title="Editar experiencia"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id!)}
                        className="p-1.5 rounded hover:bg-red-50 transition-colors"
                        title="Eliminar experiencia"
                      >
                        <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Location & Date */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>
                      {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Logros destacados:</h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={`${exp.id}-achievement-${i}`} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-600 mt-1.5">•</span>
                          <span className="flex-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {isEditMode && !editingId && (
          <button 
            onClick={handleAdd}
            className="w-full bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center justify-center gap-2 text-gray-500 group-hover:text-blue-600">
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Agregar experiencia laboral</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}