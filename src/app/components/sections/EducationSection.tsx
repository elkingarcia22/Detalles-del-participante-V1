import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap, Calendar, Award, BookOpen, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  gpa?: string;
  honors?: string;
  description?: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

interface EducationSectionProps {
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
    current?: boolean;
    description?: string;
  }>;
  certificates?: Certificate[];
  isEditMode?: boolean;
}

const mockEducation: Education[] = [
  {
    id: '1',
    degree: 'Diseño Gráfico',
    institution: 'Universidad Nacional de Colombia',
    field: 'Diseño Visual',
    startDate: '2017',
    endDate: '2021',
    current: false,
    gpa: '3.8/5.0',
    description: 'Formación en diseño gráfico, diseño de marca, diseño editorial y fundamentos de diseño de interfaces digitales.'
  }
];

const mockCertificates: Certificate[] = [
  {
    id: '1',
    name: 'Curso de UX/UI Design',
    issuer: 'Platzi',
    date: 'Mayo 2022',
    credentialId: 'PLTZ-UX-2022-4567'
  },
  {
    id: '2',
    name: 'Diseño de Interfaces',
    issuer: 'Coursera - CalArts',
    date: 'Agosto 2022',
    credentialId: 'CRSA-UI-8901'
  },
  {
    id: '3',
    name: 'Figma Fundamentals',
    issuer: 'Figma Learn',
    date: 'Marzo 2023',
    credentialId: 'FIG-FUND-3456'
  }
];

export function EducationSection({ 
  education, 
  certificates = mockCertificates,
  isEditMode = false
}: EducationSectionProps) {
  // Convertir education simple a formato completo si existe
  const convertedEducation: Education[] = React.useMemo(() => {
    if (!education || education.length === 0) return mockEducation;
    
    return education.map((edu, index) => ({
      id: `edu-${index}`,
      degree: edu.degree,
      institution: edu.institution,
      field: edu.degree, // Usar degree como field por defecto
      startDate: edu.year,
      endDate: edu.year,
      current: edu.current || false,
      description: edu.description
    }));
  }, [education]);
  
  const [educationList, setEducationList] = useState<Education[]>(convertedEducation);
  const [certificateList, setCertificateList] = useState<Certificate[]>(certificates);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [deletingEducationId, setDeletingEducationId] = useState<string | null>(null);
  const [deletingCertId, setDeletingCertId] = useState<string | null>(null);
  const [editEducationForm, setEditEducationForm] = useState<Education | null>(null);
  const [editCertForm, setEditCertForm] = useState<Certificate | null>(null);
  const [isCreatingNewEducation, setIsCreatingNewEducation] = useState(false);
  const [isCreatingNewCert, setIsCreatingNewCert] = useState(false);
  const editingEducationRef = useRef<HTMLDivElement>(null);
  const editingCertRef = useRef<HTMLDivElement>(null);

  // Sync state with props when candidate changes
  useEffect(() => {
    setEducationList(convertedEducation);
  }, [convertedEducation]);

  useEffect(() => {
    setCertificateList(certificates);
  }, [certificates]);

  // Scroll automático a la educación en edición
  useEffect(() => {
    if (editingEducationId && editingEducationRef.current) {
      setTimeout(() => {
        editingEducationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [editingEducationId]);

  // Scroll automático a la certificación en edición
  useEffect(() => {
    if (editingCertId && editingCertRef.current) {
      setTimeout(() => {
        editingCertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [editingCertId]);

  // Education handlers
  const handleEditEducation = (edu: Education) => {
    setEditingEducationId(edu.id);
    setEditEducationForm({ ...edu });
    setIsCreatingNewEducation(false);
  };

  const handleCancelEditEducation = () => {
    // Si estamos creando uno nuevo y cancelamos, eliminarlo de la lista
    if (isCreatingNewEducation && editEducationForm) {
      setEducationList(prev => prev.filter(edu => edu.id !== editEducationForm.id));
    }
    setEditingEducationId(null);
    setEditEducationForm(null);
    setIsCreatingNewEducation(false);
  };

  const handleSaveEducation = () => {
    if (editEducationForm) {
      setEducationList(prev => prev.map(edu => edu.id === editEducationForm.id ? editEducationForm : edu));
      setEditingEducationId(null);
      setEditEducationForm(null);
      setIsCreatingNewEducation(false);
    }
  };

  const handleDeleteEducation = (id: string) => {
    setDeletingEducationId(id);
  };

  const confirmDeleteEducation = (id: string) => {
    setEducationList(prev => prev.filter(edu => edu.id !== id));
    setDeletingEducationId(null);
  };

  const cancelDeleteEducation = () => {
    setDeletingEducationId(null);
  };

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      field: '',
      startDate: '',
      endDate: null,
      current: false,
      gpa: '',
      honors: '',
      description: ''
    };
    setEducationList(prev => [...prev, newEdu]); // Agregar al final
    setEditingEducationId(newEdu.id);
    setEditEducationForm(newEdu);
    setIsCreatingNewEducation(true);
  };

  const updateEducationForm = (field: keyof Education, value: any) => {
    if (editEducationForm) {
      setEditEducationForm({ ...editEducationForm, [field]: value });
    }
  };

  // Certificate handlers
  const handleEditCertificate = (cert: Certificate) => {
    setEditingCertId(cert.id);
    setEditCertForm({ ...cert });
    setIsCreatingNewCert(false);
  };

  const handleCancelEditCertificate = () => {
    // Si estamos creando uno nuevo y cancelamos, eliminarlo de la lista
    if (isCreatingNewCert && editCertForm) {
      setCertificateList(prev => prev.filter(cert => cert.id !== editCertForm.id));
    }
    setEditingCertId(null);
    setEditCertForm(null);
    setIsCreatingNewCert(false);
  };

  const handleSaveCertificate = () => {
    if (editCertForm) {
      setCertificateList(prev => prev.map(cert => cert.id === editCertForm.id ? editCertForm : cert));
      setEditingCertId(null);
      setEditCertForm(null);
      setIsCreatingNewCert(false);
    }
  };

  const handleDeleteCertificate = (id: string) => {
    setDeletingCertId(id);
  };

  const confirmDeleteCertificate = (id: string) => {
    setCertificateList(prev => prev.filter(cert => cert.id !== id));
    setDeletingCertId(null);
  };

  const cancelDeleteCertificate = () => {
    setDeletingCertId(null);
  };

  const handleAddCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: ''
    };
    setCertificateList(prev => [...prev, newCert]); // Agregar al final
    setEditingCertId(newCert.id);
    setEditCertForm(newCert);
    setIsCreatingNewCert(true);
  };

  const updateCertForm = (field: keyof Certificate, value: any) => {
    if (editCertForm) {
      setEditCertForm({ ...editCertForm, [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Educación</h2>
            <p className="text-sm text-gray-600">
              {educationList.length} {educationList.length === 1 ? 'título' : 'títulos'} • {certificateList.length} {certificateList.length === 1 ? 'certificación' : 'certificaciones'}
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 px-1">
          Formación Académica
        </h3>
        <div className="space-y-4">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className={`bg-white rounded-lg border p-6 transition-all ${
                deletingEducationId === edu.id 
                  ? 'border-red-300 bg-red-50' 
                  : editingEducationId === edu.id
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:shadow-md'
              }`}
              ref={editingEducationId === edu.id ? editingEducationRef : null}
            >
              {/* Delete Confirmation Banner */}
              {deletingEducationId === edu.id && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-red-900">
                      ¿Estás seguro de eliminar esta formación académica?
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => confirmDeleteEducation(edu.id)}
                        className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={cancelDeleteEducation}
                        className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Mode */}
              {editingEducationId === edu.id && editEducationForm ? (
                <div className="space-y-4">
                  {/* Edit Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-900">
                      {isCreatingNewEducation ? 'Creando Nueva Formación Académica' : 'Editando Formación Académica'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveEducation}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEditEducation}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Título / Grado</label>
                    <input
                      type="text"
                      value={editEducationForm.degree}
                      onChange={(e) => updateEducationForm('degree', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Maestría en Diseño de Interacción"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Institución</label>
                    <input
                      type="text"
                      value={editEducationForm.institution}
                      onChange={(e) => updateEducationForm('institution', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Universidad de los Andes"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Campo de estudio</label>
                    <input
                      type="text"
                      value={editEducationForm.field}
                      onChange={(e) => updateEducationForm('field', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Diseño Digital"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Año de inicio</label>
                      <input
                        type="text"
                        value={editEducationForm.startDate}
                        onChange={(e) => updateEducationForm('startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ej. 2019"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Año de finalización</label>
                      <input
                        type="text"
                        value={editEducationForm.endDate || ''}
                        onChange={(e) => updateEducationForm('endDate', e.target.value || null)}
                        disabled={editEducationForm.current}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        placeholder="ej. 2021"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editEducationForm.current}
                        onChange={(e) => {
                          updateEducationForm('current', e.target.checked);
                          if (e.target.checked) {
                            updateEducationForm('endDate', null);
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Actualmente estudio aquí</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">GPA / Promedio (opcional)</label>
                      <input
                        type="text"
                        value={editEducationForm.gpa || ''}
                        onChange={(e) => updateEducationForm('gpa', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ej. 4.5/5.0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Honores (opcional)</label>
                      <input
                        type="text"
                        value={editEducationForm.honors || ''}
                        onChange={(e) => updateEducationForm('honors', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ej. Cum Laude"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción (opcional)</label>
                    <textarea
                      value={editEducationForm.description || ''}
                      onChange={(e) => updateEducationForm('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Describe tu especialización o áreas de enfoque"
                    />
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{edu.degree}</h4>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{edu.institution}</span>
                        {edu.current && (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
                            Actual
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {edu.honors && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
                          <Award className="w-3.5 h-3.5 text-yellow-600" />
                          <span className="text-xs font-medium text-yellow-700">{edu.honors}</span>
                        </div>
                      )}
                      {isEditMode && !deletingEducationId && (
                        <div className="flex items-center gap-2 ml-2">
                          <button
                            onClick={() => handleEditEducation(edu)}
                            className="p-1.5 rounded hover:bg-blue-50 transition-colors"
                            title="Editar formación"
                          >
                            <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="p-1.5 rounded hover:bg-red-50 transition-colors"
                            title="Eliminar formación"
                          >
                            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>
                        {edu.startDate} - {edu.current ? 'Presente' : edu.endDate}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>

                  {/* Field Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-xs font-medium">
                      {edu.field}
                    </span>
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
          {isEditMode && !editingEducationId && (
            <button 
              onClick={handleAddEducation}
              className="w-full bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center justify-center gap-2 text-gray-500 group-hover:text-blue-600">
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">Agregar formación académica</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 px-1">
          Licencias y certificaciones
        </h3>
        <div className="space-y-3">
          {certificateList.map((cert) => (
            <div
              key={cert.id}
              className={`bg-white rounded-lg border p-5 transition-all ${
                deletingCertId === cert.id 
                  ? 'border-red-300 bg-red-50' 
                  : editingCertId === cert.id
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-gray-200 hover:shadow-md'
              }`}
              ref={editingCertId === cert.id ? editingCertRef : null}
            >
              {/* Delete Confirmation Banner */}
              {deletingCertId === cert.id && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-red-900">
                      ¿Estás seguro de eliminar esta certificación?
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => confirmDeleteCertificate(cert.id)}
                        className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={cancelDeleteCertificate}
                        className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Mode */}
              {editingCertId === cert.id && editCertForm ? (
                <div className="space-y-4">
                  {/* Edit Header */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-900">
                      {isCreatingNewCert ? 'Creando Nueva Certificación' : 'Editando Certificación'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveCertificate}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEditCertificate}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de la certificación</label>
                    <input
                      type="text"
                      value={editCertForm.name}
                      onChange={(e) => updateCertForm('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Advanced Figma Certification"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Emisor</label>
                    <input
                      type="text"
                      value={editCertForm.issuer}
                      onChange={(e) => updateCertForm('issuer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Figma"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha de obtención</label>
                    <input
                      type="text"
                      value={editCertForm.date}
                      onChange={(e) => updateCertForm('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. Marzo 2023"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">ID de credencial (opcional)</label>
                    <input
                      type="text"
                      value={editCertForm.credentialId || ''}
                      onChange={(e) => updateCertForm('credentialId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. FIG-2023-ADV-1234"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">URL del certificado (opcional)</label>
                    <input
                      type="text"
                      value={editCertForm.url || ''}
                      onChange={(e) => updateCertForm('url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ej. https://figma.com/certificate/1234"
                    />
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{cert.date}</span>
                      </div>
                      {cert.credentialId && (
                        <div className="flex items-center gap-1">
                          <span className="font-mono">{cert.credentialId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {cert.url && !isEditMode && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Ver certificado
                      </a>
                    )}
                    {isEditMode && !deletingCertId && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditCertificate(cert)}
                          className="p-1.5 rounded hover:bg-blue-50 transition-colors"
                          title="Editar certificación"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className="p-1.5 rounded hover:bg-red-50 transition-colors"
                          title="Eliminar certificación"
                        >
                          <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isEditMode && !editingCertId && (
            <button 
              onClick={handleAddCertificate}
              className="w-full bg-white rounded-lg border-2 border-dashed border-gray-300 p-5 hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center justify-center gap-2 text-gray-500 group-hover:text-blue-600">
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">Agregar certificación</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}