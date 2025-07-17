import * as yup from 'yup';

export const step1ValidationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^\d{10}$/,
      'Please enter a 10-digit phone number (e.g., 5550123456)'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain a special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const step2ValidationSchema = yup.object({
  riskTolerance: yup
    .string()
    .required('Risk tolerance is required')
    .oneOf(['low', 'medium', 'high'], 'Please select a valid risk tolerance'),
  investmentGoals: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one investment goal')
    .max(5, 'You can select up to 5 investment goals'),
});

export const step3ValidationSchema = yup.object({
  notificationPreferences: yup.object({
    email: yup.boolean().required(),
    sms: yup.boolean().required(),
    push: yup.boolean().required(),
  }),
  theme: yup
    .string()
    .required('Theme selection is required')
    .oneOf(['light', 'dark'], 'Please select a valid theme'),
});

export const completeOnboardingSchema = yup.object({
  step1: step1ValidationSchema,
  step2: step2ValidationSchema,
  step3: step3ValidationSchema,
}); 