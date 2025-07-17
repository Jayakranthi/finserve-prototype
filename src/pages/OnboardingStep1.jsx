import React from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import { step1ValidationSchema } from '../utils/validation';

export const OnboardingStep1 = ({
  initialValues,
  onSubmit,
  onNext,
}) => {
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      password: initialValues.password || '',
      confirmPassword: initialValues.confirmPassword || '',
    },
    validationSchema: step1ValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onNext();
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'info.50' }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Note:</strong> After completing onboarding, an account will be created with your email address and the password you set below.
        </Typography>
      </Paper>
      
      <Box display="flex" gap={3} sx={{ flexWrap: 'wrap', mb: 3 }}>
        <Box flex="1 1 300px" minWidth="300px">
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            required
          />
        </Box>
        <Box flex="1 1 300px" minWidth="300px">
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            required
          />
        </Box>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          placeholder="5550123456"
          required
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          required
        />
      </Box>

      {formik.errors && Object.keys(formik.errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Please fix the errors above before continuing.
        </Alert>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
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