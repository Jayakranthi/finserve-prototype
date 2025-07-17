import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import { step3ValidationSchema } from '../utils/validation';

export const OnboardingStep3 = ({
  initialValues,
  onSubmit,
  onComplete,
  onBack,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema: step3ValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onComplete();
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Notification Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose how you'd like to receive notifications about your portfolio and account activity.
      </Typography>
      
      <FormControl component="fieldset" sx={{ mb: 4 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.notificationPreferences.email}
                onChange={(e) => formik.setFieldValue('notificationPreferences.email', e.target.checked)}
                name="email"
              />
            }
            label="Email Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.notificationPreferences.sms}
                onChange={(e) => formik.setFieldValue('notificationPreferences.sms', e.target.checked)}
                name="sms"
              />
            }
            label="SMS Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.notificationPreferences.push}
                onChange={(e) => formik.setFieldValue('notificationPreferences.push', e.target.checked)}
                name="push"
              />
            }
            label="Push Notifications"
          />
        </FormGroup>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Theme Preference
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose your preferred theme for the application interface.
      </Typography>
      
      <FormControl component="fieldset" error={formik.touched.theme && Boolean(formik.errors.theme)}>
        <RadioGroup
          name="theme"
          value={formik.values.theme}
          onChange={formik.handleChange}
        >
          <FormControlLabel
            value="light"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="body1">Light Theme</Typography>
                <Typography variant="body2" color="text.secondary">
                  Clean, bright interface for daytime use
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="dark"
            control={<Radio />}
            label={
              <Box>
                <Typography variant="body1">Dark Theme</Typography>
                <Typography variant="body2" color="text.secondary">
                  Easy on the eyes for evening use
                </Typography>
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

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
          Complete Onboarding
        </Button>
      </Box>
    </Box>
  );
}; 