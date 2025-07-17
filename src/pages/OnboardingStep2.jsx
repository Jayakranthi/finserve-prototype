import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import { step2ValidationSchema } from '../utils/validation';

const investmentGoalOptions = [
  'retirement',
  'wealth-building',
  'income-generation',
  'tax-optimization',
  'education-funding',
  'real-estate',
  'emergency-fund',
  'charitable-giving',
];

const riskToleranceDescriptions = {
  low: 'Conservative approach with focus on capital preservation',
  medium: 'Balanced approach with moderate growth potential',
  high: 'Aggressive approach with higher growth potential and risk',
};

export const OnboardingStep2 = ({
  initialValues,
  onSubmit,
  onNext,
  onBack,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: step2ValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onNext();
    },
  });

  const handleGoalChange = (goal) => {
    const currentGoals = formik.values.investmentGoals;
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    
    formik.setFieldValue('investmentGoals', newGoals);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Risk Tolerance
      </Typography>
      <FormControl component="fieldset" error={formik.touched.riskTolerance && Boolean(formik.errors.riskTolerance)}>
        <RadioGroup
          name="riskTolerance"
          value={formik.values.riskTolerance}
          onChange={formik.handleChange}
        >
          {(['low', 'medium', 'high']).map((level) => (
            <FormControlLabel
              key={level}
              value={level}
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1" textTransform="capitalize">
                    {level}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {riskToleranceDescriptions[level]}
                  </Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Investment Goals
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Select all that apply (up to 5 goals)
        </Typography>
        <FormGroup>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {investmentGoalOptions.map((goal) => (
              <FormControlLabel
                key={goal}
                control={
                  <Checkbox
                    checked={formik.values.investmentGoals.includes(goal)}
                    onChange={() => handleGoalChange(goal)}
                    disabled={!formik.values.investmentGoals.includes(goal) && formik.values.investmentGoals.length >= 5}
                  />
                }
                label={goal.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              />
            ))}
          </Box>
        </FormGroup>
      </Box>

      {formik.errors && Object.keys(formik.errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Please fix the errors above before continuing.
        </Alert>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Next Step
        </Button>
      </Box>
    </Box>
  );
}; 