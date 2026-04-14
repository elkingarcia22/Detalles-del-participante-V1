import React, { useState } from 'react';
import { JobView } from '../components/JobView';
import { CandidateDetailDrawer } from '../components/CandidateDetailDrawer';
import { Drawer } from '../components/ui/drawer';
import { DrawerNavigation } from '../components/DrawerNavigation';
import { candidatesData } from '../data/candidatesData';

export function JobPage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Lista de candidatos activos ordenados
  const activeCandidates = candidatesData.filter(c => c.status === 'active' || c.status === 'hired');
  
  // Encontrar el índice actual del candidato seleccionado
  const currentCandidateIndex = activeCandidates.findIndex(c => c.id === selectedCandidateId);
  const currentIndex = currentCandidateIndex >= 0 ? currentCandidateIndex + 1 : 1;
  const totalCandidates = activeCandidates.length;

  const handleCandidateClick = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
  };

  const handleCloseDrawer = () => {
    setSelectedCandidateId(null);
  };

  const handlePrevious = () => {
    if (currentCandidateIndex > 0) {
      const previousCandidate = activeCandidates[currentCandidateIndex - 1];
      setSelectedCandidateId(previousCandidate.id);
    }
  };

  const handleNext = () => {
    if (currentCandidateIndex < activeCandidates.length - 1) {
      const nextCandidate = activeCandidates[currentCandidateIndex + 1];
      setSelectedCandidateId(nextCandidate.id);
    }
  };

  return (
    <>
      <JobView onCandidateClick={handleCandidateClick} />
      
      {selectedCandidateId && (
        <Drawer
          open={!!selectedCandidateId}
          onClose={handleCloseDrawer}
          width="90%"
          navigationButtons={
            <DrawerNavigation
              currentIndex={currentIndex}
              totalCandidates={totalCandidates}
              onClose={handleCloseDrawer}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          }
        >
          <CandidateDetailDrawer
            candidateId={selectedCandidateId}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onClose={handleCloseDrawer}
            totalCandidates={totalCandidates}
          />
        </Drawer>
      )}
    </>
  );
}