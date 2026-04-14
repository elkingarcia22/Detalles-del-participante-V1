import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Search, ChevronDown, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Drawer } from '../components/ui/drawer';
import { CandidateDetailDrawer } from '../components/CandidateDetailDrawer';
import { DrawerNavigation } from '../components/DrawerNavigation';

export function CandidateListPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Sync drawer state with URL
  useEffect(() => {
    if (id) {
      setSelectedCandidateId(id);
    } else {
      setSelectedCandidateId(null);
    }
  }, [id]);

  const candidates = [
    {
      id: 1,
      name: 'Jhoana Mercedes Martín...',
      cvScore: 85,
      experience: '5 años',
      appliedTime: 'Aplicó hace 5 meses',
      status: 'En progreso',
    },
    {
      id: 2,
      name: 'Carlos Alberto González ...',
      cvScore: 78,
      experience: '3 años',
      appliedTime: 'Aplicó hace 3 semanas',
      status: 'En progreso',
    },
    {
      id: 3,
      name: 'Diana Paola Rodríguez Suárez',
      cvScore: 82,
      experience: '4 años',
      appliedTime: 'Aplicó hace 1 mes',
      status: 'En progreso',
    },
    {
      id: 4,
      name: 'María Fernanda López To...',
      cvScore: 82,
      experience: '4 años',
      appliedTime: 'Aplicó hace 1 mes',
      status: 'En progreso',
    },
    {
      id: 5,
      name: 'José Antonio Ramírez Sá...',
      cvScore: 76,
      experience: '6 años',
      appliedTime: 'Aplicó hace 2 meses',
      status: 'En progreso',
    },
    {
      id: 6,
      name: 'Ana Gabriela Morales Cruz',
      cvScore: 88,
      experience: '5 años',
      appliedTime: 'Aplicó hace 3 semanas',
      status: 'En progreso',
    },
  ];

  const handleCandidateClick = (candidateId: number) => {
    navigate(`/candidatos/candidato/${candidateId}`);
  };

  const handlePrevious = () => {
    if (selectedCandidateId && parseInt(selectedCandidateId, 10) > 1) {
      navigate(`/candidatos/candidato/${parseInt(selectedCandidateId, 10) - 1}`);
    }
  };

  const handleNext = () => {
    if (selectedCandidateId && parseInt(selectedCandidateId, 10) < 74) {
      navigate(`/candidatos/candidato/${parseInt(selectedCandidateId, 10) + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a vacantes
            </Button>
            <span className="px-3 py-1 bg-gray-700 text-white text-xs rounded">
              Preview
            </span>
            <div className="ml-auto flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Entrevistas:</span>
                <span className="font-medium">48 / 80</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '60%' }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Psicométricas:</span>
                <span className="font-medium">28 / 60</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '47%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Job Title */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold mb-2">
              Especialista de reclutamiento y selección
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                Bogotá
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                + 4 años exp.
              </span>
            </div>
          </div>

          {/* Stats and Status */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">74</span>
                <span className="text-gray-600">Aplicaciones</span>
                <span className="text-sm text-gray-500">0 en la última semana</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Cerrada
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex gap-1 border-b border-gray-200">
            <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
              Info Vacante
            </button>
            <button className="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Candidatos
            </button>
            <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
              CVs Importados
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Candidatos que han trabajado en la compañía anteriormente:</span>
            <button className="flex items-center gap-1 text-gray-900">
              Selecciona una opción
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Candidate Columns */}
        <div className="grid grid-cols-4 gap-4">
          {/* Column 1: Evaluación CV */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="font-semibold mb-1">Evaluación CV: 16</h3>
              <button className="flex items-center gap-1 text-sm text-green-600">
                Activos: 8
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {candidates.slice(0, 3).map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => handleCandidateClick(candidate.id)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{candidate.name}</h4>
                    <button className="text-gray-400">⋯</button>
                  </div>
                  <div className="text-2xl font-bold mb-1">{candidate.cvScore}</div>
                  <div className="text-xs text-gray-500 mb-2">CV Score</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {candidate.experience}
                    </span>
                    <span className="text-xs text-gray-500">{candidate.appliedTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <Clock className="w-3 h-3" />
                    {candidate.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Serena AI */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="font-semibold mb-1">Serena AI: 8</h3>
              <button className="flex items-center gap-1 text-sm text-green-600">
                Activos: 6
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {candidates.slice(0, 2).map((candidate) => (
                <div
                  key={`serena-${candidate.id}`}
                  onClick={() => handleCandidateClick(candidate.id)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{candidate.name}</h4>
                    <button className="text-gray-400">⋯</button>
                  </div>
                  <div className="text-2xl font-bold mb-1">{candidate.cvScore}</div>
                  <div className="text-xs text-gray-500 mb-2">CV Score</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {candidate.experience}
                    </span>
                    <span className="text-xs text-gray-500">{candidate.appliedTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <Clock className="w-3 h-3" />
                    {candidate.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Psicométrica */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="font-semibold mb-1">Psicométrica: 6</h3>
              <button className="flex items-center gap-1 text-sm text-green-600">
                Activos: 5
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {candidates.slice(1, 4).map((candidate) => (
                <div
                  key={`psi-${candidate.id}`}
                  onClick={() => handleCandidateClick(candidate.id)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{candidate.name}</h4>
                    <button className="text-gray-400">⋯</button>
                  </div>
                  <div className="text-2xl font-bold mb-1">{candidate.cvScore}</div>
                  <div className="text-xs text-gray-500 mb-2">CV Score</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {candidate.experience}
                    </span>
                    <span className="text-xs text-gray-500">{candidate.appliedTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <Clock className="w-3 h-3" />
                    {candidate.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Para Revisión */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h3 className="font-semibold mb-1">Para Revisión: 5</h3>
              <button className="flex items-center gap-1 text-sm text-green-600">
                Activos: 5
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {candidates.slice(2, 5).map((candidate) => (
                <div
                  key={`review-${candidate.id}`}
                  onClick={() => handleCandidateClick(candidate.id)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md cursor-pointer transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{candidate.name}</h4>
                    <button className="text-gray-400">⋯</button>
                  </div>
                  <div className="text-2xl font-bold mb-1">{candidate.cvScore}</div>
                  <div className="text-xs text-gray-500 mb-2">CV Score</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {candidate.experience}
                    </span>
                    <span className="text-xs text-gray-500">{candidate.appliedTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <Clock className="w-3 h-3" />
                    {candidate.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Detail Drawer */}
      <Drawer
        open={selectedCandidateId !== null}
        onClose={() => navigate('/candidatos')}
        width="90%"
        navigationButtons={
          selectedCandidateId ? (
            <DrawerNavigation
              currentIndex={parseInt(selectedCandidateId, 10)}
              totalCandidates={74}
              onClose={() => navigate('/candidatos')}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          ) : null
        }
      >
        <CandidateDetailDrawer
          candidateId={selectedCandidateId!}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onClose={() => navigate('/candidatos')}
        />
      </Drawer>
    </div>
  );
}