import React from 'react';
import { Box, Paper, Typography, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

export const OnboardingStep = ({
  currentStep,
  totalSteps,
  title,
  description,
  children,
  isCompleted = false,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => ({
    label: `Step ${index + 1}`,
    completed: index < currentStep || (index === currentStep - 1 && isCompleted),
  }));

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
          
          <Stepper activeStep={currentStep - 1} orientation="horizontal">
            {steps.map((step, index) => (
              <Step key={index} completed={step.completed}>
                <StepLabel
                  icon={
                    step.completed ? (
                      <CheckCircle color="primary" />
                    ) : (
                      <RadioButtonUnchecked />
                    )
                  }
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ mt: 4 }}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}; 