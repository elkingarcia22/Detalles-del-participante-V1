import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingContextType {
  isWelcomeOpen: boolean;
  isTourActive: boolean;
  currentStep: number;
  isFeedbackModalOpen: boolean;
  startTour: () => void;
  finishTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  openFeedback: () => void;
  closeFeedback: () => void;
  setWelcomeOpen: (open: boolean) => void;
  setTourActive: (active: boolean) => void;
  setCurrentStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const startTour = () => {
    setIsWelcomeOpen(false);
    setIsTourActive(true);
    setCurrentStep(0);
  };

  const finishTour = () => {
    setIsTourActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : 0));
  
  const openFeedback = () => setIsFeedbackModalOpen(true);
  const closeFeedback = () => setIsFeedbackModalOpen(false);

  return (
    <OnboardingContext.Provider
      value={{
        isWelcomeOpen,
        isTourActive,
        currentStep,
        isFeedbackModalOpen,
        startTour,
        finishTour,
        nextStep,
        prevStep,
        openFeedback,
        closeFeedback,
        setWelcomeOpen: setIsWelcomeOpen,
        setTourActive: setIsTourActive,
        setCurrentStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
