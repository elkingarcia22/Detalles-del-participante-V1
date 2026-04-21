import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Search, ChevronDown, Clock, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Drawer } from '../components/ui/drawer';
import { CandidateDetailDrawer } from '../components/CandidateDetailDrawer';
import { SerenaIAPanel } from '../components/SerenaIAPanel';
import { Badge } from '../components/ui/badge';
import { Tooltip } from '../components/ui/tooltip';
import { candidatesData } from '../data/candidatesData';
import { cn } from '../components/ui/utils';
import { useOnboarding } from '../context/OnboardingContext';

export function CandidateListPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isTourActive, currentStep, nextStep } = useOnboarding();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isSerenaOpen, setIsSerenaOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setSelectedCandidateId(id);
    } else {
      setSelectedCandidateId(null);
    }
  }, [id]);

  const candidates = [
    { id: 'cand-001', name: 'Andrés Parra Gómez', cvScore: 85, experience: '5 años', appliedTime: 'Aplicó hace 5 meses', status: 'En progreso' },
    { id: 'cand-003', name: 'Carlos Alberto González ...', cvScore: 78, experience: '3 años', appliedTime: 'Aplicó hace 3 semanas', status: 'En progreso' },
    { id: 'cand-004', name: 'Diana Paola Rodríguez Suárez', cvScore: 82, experience: '4 años', appliedTime: 'Aplicó hace 1 mes', status: 'En progreso' },
    { id: 'cand-002', name: 'Valentina Herrera Castro', cvScore: 94, experience: '8 años', appliedTime: 'Aplicó hace 3 meses', status: 'En progreso', hasBlocker: true, blockerReason: 'Documentación incompleta: Referencias laborales pendientes de validación.' },
    { id: 'cand-005', name: 'María Fernanda López To...', cvScore: 82, experience: '4 años', appliedTime: 'Aplicó hace 1 mes', status: 'En progreso' },
    { id: 'cand-006', name: 'José Antonio Ramírez Sá...', cvScore: 76, experience: '6 años', appliedTime: 'Aplicó hace 2 meses', status: 'En progreso' },
    { id: 'cand-007', name: 'Ana Gabriela Morales Cruz', cvScore: 88, experience: '5 años', appliedTime: 'Aplicó hace 3 semanas', status: 'En progreso' },
  ];

  const handleCandidateClick = (candidateId: string | number) => {
    if (isTourActive && currentStep === 1 && candidateId === 'cand-001') {
      nextStep();
    }
    navigate(`/candidatos/candidato/${candidateId}`);
  };

  const totalCandidates = 74;
  const currentIndex = selectedCandidateId 
    ? Math.max(1, candidatesData.findIndex(c => c.id.toString() === selectedCandidateId.toString()) + 1)
    : 1;

  const handlePrevious = () => {
    if (selectedCandidateId) {
      const idx = candidatesData.findIndex(c => c.id.toString() === selectedCandidateId.toString());
      if (idx > 0) {
        navigate(`/candidatos/candidato/${candidatesData[idx - 1].id}`);
      }
    }
  };

  const handleNext = () => {
    if (selectedCandidateId) {
      const idx = candidatesData.findIndex(c => c.id.toString() === selectedCandidateId.toString());
      if (idx < candidatesData.length - 1) {
        navigate(`/candidatos/candidato/${candidatesData[idx + 1].id}`);
      }
    }
  };

  const CandidateCard = ({ candidate }: { candidate: any }) => (
    <div
      onClick={() => handleCandidateClick(candidate.id)}
      data-tour={candidate.id === 1 ? 'candidate-card-andres' : undefined}
      className={cn(
        "bg-white rounded-lg border p-4 hover:shadow-md cursor-pointer transition-shadow",
        candidate.hasBlocker ? "border-amber-200 bg-amber-50/40" : "border-gray-200"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className={cn(
          "font-medium text-sm",
          candidate.hasBlocker ? "text-amber-900" : "text-gray-900"
        )}>{candidate.name}</h4>
        <button className="text-gray-400">⋯</button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold mb-1">{candidate.cvScore}</div>
          <div className="text-xs text-gray-500 mb-2">CV Score</div>
        </div>
        
        {candidate.hasBlocker && (
          <div className="px-2 py-1 rounded bg-amber-50 border border-amber-200 text-[9px] font-bold text-amber-700 uppercase tracking-tighter">
            ACCIÓN REQUERIDA
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
          {candidate.experience}
        </span>
        <span className="text-xs text-gray-500">{candidate.appliedTime}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-blue-600">
          <Clock className="w-3 h-3" />
          {candidate.status}
        </div>
        {candidate.hasBlocker && <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />}
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Optimized Ultra-Compact Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-slate-500 hover:text-slate-900 h-8 px-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">Volver</span>
            </Button>
            <div className="h-6 w-px bg-slate-100" />
            <div>
               <h1 className="text-sm font-bold text-slate-800 leading-tight">Especialista de reclutamiento</h1>
               <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="outline" className="bg-blue-50/50 text-blue-700 border-blue-100 text-[9px] px-1.5 py-0 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> Bogotá
                  </Badge>
                  <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-[9px] px-1.5 py-0">+ 4 años exp.</Badge>
                  <span className="text-[10px] text-slate-400 font-bold ml-1 uppercase tracking-wider">{totalCandidates} APLICACIONES</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Serena IA Button */}
            <Tooltip content="Asistente Serena IA">
              <button 
                onClick={() => setIsSerenaOpen(!isSerenaOpen)}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all group",
                  isSerenaOpen 
                    ? "bg-slate-800 text-white shadow-lg" 
                    : "bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-600 text-white shadow-md hover:scale-105"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {isSerenaOpen ? 'Cerrar' : 'Serena IA'}
                </span>
              </button>
            </Tooltip>

            {/* Stats - Compact Row */}
            <div className="flex items-center gap-4 bg-slate-50/50 px-3 py-1.5 rounded-lg border border-slate-100">
               <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-[8px] text-slate-400 font-bold uppercase leading-tight">Entrevistas</p>
                    <p className="text-xs font-bold text-slate-700 leading-tight">48/80</p>
                  </div>
                  <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden truncate">
                    <div className="h-full bg-blue-600" style={{ width: '60%' }} />
                  </div>
               </div>
               <div className="h-4 w-px bg-slate-200" />
               <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-[8px] text-slate-400 font-bold uppercase leading-tight">Psicométricas</p>
                    <p className="text-xs font-bold text-slate-700 leading-tight">28/60</p>
                  </div>
                  <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden truncate">
                    <div className="h-full bg-blue-600" style={{ width: '47%' }} />
                  </div>
               </div>
            </div>
            

          </div>
        </div>

        {/* Ultra-Compact Tabs */}
        <div className="flex gap-4 mt-2">
          {['Info Vacante', 'Candidatos', 'CVs Importados'].map((tab) => (
            <button
              key={tab}
              className={cn(
                "pb-1 text-[11px] font-bold border-b-2 transition-all px-1",
                tab === 'Candidatos' ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area with Serena Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Board Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30">
          {/* Search Bar - Thin */}
          <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar candidatos..."
                className="w-full pl-8 pr-4 h-8 text-[11px] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
               <span>Anteriormente en la compañía:</span>
               <button className="flex items-center gap-1 text-slate-800 font-bold">
                 Selecciona una opción
                 <ChevronDown className="w-3 h-3" />
               </button>
            </div>
          </div>

          {/* Candidate Columns - Grid with limited heights */}
          <div className="flex-1 overflow-x-auto p-4 scrollbar-hide">
            <div className="grid grid-cols-4 gap-4 h-full min-w-[800px]">
              {/* Column 1: Evaluación CV */}
              <div className="flex flex-col h-full">
                <div className="bg-white rounded-t-lg border border-slate-200 p-3 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Evaluación CV</h3>
                  <div className="flex items-center gap-2 mt-1 text-[9px] font-bold">
                     <span className="text-green-600">8 ACTIVOS</span>
                     <span className="text-slate-400">16 TOTAL</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-100/30 border-x border-b border-slate-200 rounded-b-lg p-2 overflow-y-auto space-y-2">
                  {candidates.slice(0, 3).map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>

              {/* Column 2: Serena AI */}
              <div className="flex flex-col h-full">
                <div className="bg-white rounded-t-lg border border-slate-200 p-3 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Serena AI</h3>
                  <div className="flex items-center gap-2 mt-1 text-[9px] font-bold">
                     <span className="text-green-600">6 ACTIVOS</span>
                     <span className="text-slate-400">8 TOTAL</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-100/30 border-x border-b border-slate-200 rounded-b-lg p-2 overflow-y-auto space-y-2">
                  {candidates.slice(0, 2).map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>

              {/* Column 3: Psicométrica */}
              <div className="flex flex-col h-full">
                <div className="bg-white rounded-t-lg border border-slate-200 p-3 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Psicométrica</h3>
                  <div className="flex items-center gap-2 mt-1 text-[9px] font-bold">
                     <span className="text-green-600">5 ACTIVOS</span>
                     <span className="text-slate-400">6 TOTAL</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-100/30 border-x border-b border-slate-200 rounded-b-lg p-2 overflow-y-auto space-y-2">
                  {candidates.slice(1, 4).map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>

              {/* Column 4: Para Revisión */}
              <div className="flex flex-col h-full">
                <div className="bg-white rounded-t-lg border border-slate-200 p-3 shadow-sm">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Para Revisión</h3>
                  <div className="flex items-center gap-2 mt-1 text-[9px] font-bold">
                     <span className="text-green-600">5 ACTIVOS</span>
                     <span className="text-slate-400">5 TOTAL</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-100/30 border-x border-b border-slate-200 rounded-b-lg p-2 overflow-y-auto space-y-2">
                  {candidates.filter(c => c.hasBlocker || c.name.includes('María') || c.name.includes('José')).map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Serena Panel */}
        <SerenaIAPanel 
          isOpen={isSerenaOpen} 
          onClose={() => setIsSerenaOpen(false)}
          mode="global"
          allCandidates={candidatesData}
        />
      </div>

      {/* Candidate Detail Drawer */}
      <Drawer
        open={selectedCandidateId !== null}
        onClose={() => navigate('/candidatos')}
        width="90%"
      >
        <CandidateDetailDrawer
          candidateId={selectedCandidateId!}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onClose={() => navigate('/candidatos')}
          currentIndex={currentIndex}
          totalCandidates={totalCandidates}
        />
      </Drawer>
    </div>
  );
}