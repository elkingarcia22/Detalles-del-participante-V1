import React from 'react';
import {
  User,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  Globe,
  CreditCard,
  Target,
  TrendingUp,
  Edit2,
} from 'lucide-react';

interface GeneralInfoSectionProps {
  candidate?: any; // CandidateData from candidatesData
  isEditMode?: boolean;
}

export function GeneralInfoSection({ candidate, isEditMode = false }: GeneralInfoSectionProps) {
  // Si no hay candidato, usar datos por defecto
  const defaultCandidate = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'email@example.com',
    phone: '+57 300 000 0000',
    nationality: 'Colombiana',
    identificationType: 'Cédula de Ciudadanía',
    identificationNumber: '0000000000',
    linkedin: '',
    country: 'Colombia',
    city: 'Bogotá',
    willingToRelocate: false,
    interestedLocations: [],
    birthDate: '01/01/1990',
    yearsExperience: 0,
    availability: 'A convenir',
    noticePeriod: '0',
    noticePeriodUnit: 'Días',
    expectedSalary: 'A convenir',
    currency: 'Peso colombiano (COP)',
    description: '',
    skills: [],
    matchScore: 0,
    confidence: 'low' as const,
  };
  
  const candidateData = candidate || defaultCandidate;
  const [editedData, setEditedData] = React.useState(candidateData);

  React.useEffect(() => {
    setEditedData(candidateData);
  }, [candidateData]);

  const handleInputChange = (field: string, value: any) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getConfidenceLabel = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      {/* Match Score Card - Solo visible si NO está en modo edición */}
      {!isEditMode && (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Match con la Vacante</h2>
                <p className="text-sm text-gray-600">Análisis de compatibilidad del candidato</p>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getConfidenceColor(
                candidateData.confidence
              )}`}
            >
              Confianza: {getConfidenceLabel(candidateData.confidence)}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white rounded-full h-4 shadow-inner">
              <div
                className="bg-gradient-to-r from-slate-600 to-blue-600 h-4 rounded-full transition-all flex items-center justify-end pr-2"
                style={{ width: `${candidateData.matchScore}%` }}
              >
                {candidateData.matchScore >= 20 && (
                  <span className="text-xs font-bold text-white">{candidateData.matchScore}%</span>
                )}
              </div>
            </div>
            {candidateData.matchScore < 20 && (
              <span className="text-2xl font-bold text-blue-600">{candidateData.matchScore}%</span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>
              Este candidato tiene un <strong>excelente match</strong> con los requisitos de la
              vacante
            </span>
          </div>
        </div>
      )}

      {/* Descripción del Candidato - Solo visible si NO está en modo edición */}
      {!isEditMode && candidateData.description && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Resumen Profesional</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{candidateData.description}</p>
        </div>
      )}

      {/* Habilidades - Solo visible si NO está en modo edición */}
      {!isEditMode && candidateData.skills && (candidateData.skills.technical || candidateData.skills.soft) && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Habilidades</h3>
          </div>
          
          {/* Habilidades Técnicas */}
          {candidateData.skills.technical && candidateData.skills.technical.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Técnicas</h4>
              <div className="flex flex-wrap gap-2">
                {candidateData.skills.technical.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Habilidades Soft */}
          {candidateData.skills.soft && candidateData.skills.soft.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidateData.skills.soft.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Información de Contacto */}
      <div className={`bg-white rounded-lg border p-6 ${isEditMode ? 'border-blue-300 shadow-md' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
          {isEditMode && (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Editando
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Nombre */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Nombre</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900 font-medium">{editedData.firstName}</p>
              )}
            </div>
          </div>

          {/* Apellido */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Apellido</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900 font-medium">{editedData.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Correo electrónico</label>
              {isEditMode ? (
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900 truncate">{editedData.email}</p>
              )}
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Teléfono</label>
              {isEditMode ? (
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">{editedData.phone}</p>
              )}
            </div>
          </div>

          {/* Nacionalidad */}
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Nacionalidad</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">{editedData.nationality}</p>
              )}
            </div>
          </div>

          {/* Identificación */}
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Número de identificación</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.identificationNumber}
                  onChange={(e) => handleInputChange('identificationNumber', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {editedData.identificationType} • {editedData.identificationNumber}
                </p>
              )}
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-start gap-3 col-span-2">
            <Linkedin className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">LinkedIn</label>
              {isEditMode ? (
                <input
                  type="url"
                  value={editedData.linkedin || ''}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : editedData.linkedin ? (
                <a
                  href={editedData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline truncate block"
                >
                  Ver perfil
                </a>
              ) : (
                <p className="text-sm text-gray-400">No especificado</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ubicación */}
      <div className={`bg-white rounded-lg border p-6 ${isEditMode ? 'border-blue-300 shadow-md' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ubicación</h3>
          {isEditMode && (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Editando
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Ciudad */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Ciudad</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">{editedData.city}</p>
              )}
            </div>
          </div>

          {/* País */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">País</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">{editedData.country}</p>
              )}
            </div>
          </div>

          {/* Disponible para reubicarse */}
          <div className="flex items-start gap-3 col-span-2">
            <MapPin className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Disponible para reubicarse</label>
              {isEditMode ? (
                <select
                  value={editedData.willingToRelocate ? 'yes' : 'no'}
                  onChange={(e) => handleInputChange('willingToRelocate', e.target.value === 'yes')}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="yes">Sí</option>
                  <option value="no">No</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{editedData.willingToRelocate ? 'Sí' : 'No'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className={`bg-white rounded-lg border p-6 ${isEditMode ? 'border-blue-300 shadow-md' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Información Adicional</h3>
          {isEditMode && (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Editando
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Fecha de nacimiento */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Fecha de nacimiento</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  placeholder="DD/MM/AAAA"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">{editedData.birthDate}</p>
              )}
            </div>
          </div>

          {/* Años de experiencia */}
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Años de experiencia</label>
              {isEditMode ? (
                <input
                  type="number"
                  value={editedData.yearsExperience}
                  onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value))}
                  min="0"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {editedData.yearsExperience} {editedData.yearsExperience === 1 ? 'año' : 'años'}
                </p>
              )}
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Disponibilidad</label>
              {isEditMode ? (
                <select
                  value={editedData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Tiempo completo">Tiempo completo</option>
                  <option value="Medio tiempo">Medio tiempo</option>
                  <option value="Por proyecto">Por proyecto</option>
                  <option value="Freelance">Freelance</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{editedData.availability}</p>
              )}
            </div>
          </div>

          {/* Preaviso */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Preaviso</label>
              {isEditMode ? (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editedData.noticePeriod}
                    onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                    min="0"
                    className="w-20 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={editedData.noticePeriodUnit}
                    onChange={(e) => handleInputChange('noticePeriodUnit', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Días">Días</option>
                    <option value="Semanas">Semanas</option>
                    <option value="Meses">Meses</option>
                  </select>
                </div>
              ) : (
                <p className="text-sm text-gray-900">
                  {editedData.noticePeriod} {editedData.noticePeriodUnit}
                </p>
              )}
            </div>
          </div>

          {/* Salario esperado */}
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Salario esperado</label>
              {isEditMode ? (
                <input
                  type="text"
                  value={editedData.expectedSalary}
                  onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                  placeholder="$18.000.000 - $22.000.000 COP"
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-sm text-gray-900">{editedData.expectedSalary}</p>
              )}
            </div>
          </div>

          {/* Moneda */}
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-gray-400 mt-2" />
            <div className="flex-1 min-w-0">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Moneda</label>
              {isEditMode ? (
                <select
                  value={editedData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Peso colombiano (COP)">Peso colombiano (COP)</option>
                  <option value="Dólar estadounidense (USD)">Dólar estadounidense (USD)</option>
                  <option value="Euro (EUR)">Euro (EUR)</option>
                  <option value="Peso mexicano (MXN)">Peso mexicano (MXN)</option>
                  <option value="Sol peruano (PEN)">Sol peruano (PEN)</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{editedData.currency}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}