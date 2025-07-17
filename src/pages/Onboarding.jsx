import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { OnboardingStep } from '../components/OnboardingStep';
import { OnboardingStep1 } from './OnboardingStep1';
import { OnboardingStep2 } from './OnboardingStep2';
import { OnboardingStep3 } from './OnboardingStep3';
import { ApiService } from '../services/api';

const onboardingSteps = [
  {
    id: 'step1',
    title: 'Personal Information',
    description: 'Please provide your basic information to get started.',
  },
  {
    id: 'step2',
    title: 'Account Setup',
    description: 'Configure your investment preferences and risk tolerance.',
  },
  {
    id: 'step3',
    title: 'Preferences',
    description: 'Set your notification preferences and theme.',
  },
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    step2: {
      riskTolerance: 'medium',
      investmentGoals: [],
    },
    step3: {
      notificationPreferences: {
        email: true,
        sms: false,
        push: true,
      },
      theme: 'light',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleStepSubmit = (step, data) => {
    setFormData(prev => ({
      ...prev,
      [`step${step}`]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await ApiService.submitOnboarding(formData);
      setShowSuccess(true);
      setTimeout(() => {
        // Redirect to login with the newly created account info
        navigate('/login', { 
          state: { 
            message: 'Account created successfully! You can now log in with your email and password.' 
          } 
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during onboarding');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1
            initialValues={formData.step1}
            onSubmit={(data) => handleStepSubmit(1, data)}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <OnboardingStep2
            initialValues={formData.step2}
            onSubmit={(data) => handleStepSubmit(2, data)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <OnboardingStep3
            initialValues={formData.step3}
            onSubmit={(data) => handleStepSubmit(3, data)}
            onComplete={handleComplete}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <OnboardingStep
        currentStep={currentStep}
        totalSteps={3}
        title={onboardingSteps[currentStep - 1].title}
        description={onboardingSteps[currentStep - 1].description}
        isCompleted={isSubmitting}
      >
        {renderCurrentStep()}
      </OnboardingStep>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Account created successfully! Redirecting to login...
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}; 