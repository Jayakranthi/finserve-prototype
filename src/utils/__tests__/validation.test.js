import { step1ValidationSchema, step2ValidationSchema, step3ValidationSchema } from '../validation';

describe('Validation Schemas', () => {
  describe('step1ValidationSchema', () => {
    it('should validate correct data', async () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '5550123456',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(step1ValidationSchema.validate(validData)).resolves.toBe(validData);
    });

    it('should validate 10-digit phone numbers', async () => {
      const validPhoneNumbers = [
        '5550123456',
        '1234567890',
        '9876543210'
      ];

      for (const phoneNumber of validPhoneNumbers) {
        const validData = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber,
          password: 'Password123!',
          confirmPassword: 'Password123!',
        };

        await expect(step1ValidationSchema.validate(validData)).resolves.toBe(validData);
      }
    });

    it('should reject invalid email', async () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        phoneNumber: '+1-555-0123',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(step1ValidationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should reject invalid phone numbers', async () => {
      const invalidPhoneNumbers = [
        '123', // too short
        'abc-def-ghij', // contains letters
        '+1-555-012', // too short
        '555-012-3456-7890', // too long
        '012-345-6789' // starts with 0
      ];

      for (const phoneNumber of invalidPhoneNumbers) {
        const invalidData = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber,
          password: 'Password123!',
          confirmPassword: 'Password123!',
        };

        await expect(step1ValidationSchema.validate(invalidData)).rejects.toThrow();
      }
    });

    it('should reject empty required fields', async () => {
      const invalidData = {
        firstName: '',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+15550123456',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(step1ValidationSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('step2ValidationSchema', () => {
    it('should validate correct data', async () => {
      const validData = {
        riskTolerance: 'medium',
        investmentGoals: ['retirement', 'wealth-building'],
      };

      await expect(step2ValidationSchema.validate(validData)).resolves.toBe(validData);
    });

    it('should reject invalid risk tolerance', async () => {
      const invalidData = {
        riskTolerance: 'invalid',
        investmentGoals: ['retirement'],
      };

      await expect(step2ValidationSchema.validate(invalidData)).rejects.toThrow();
    });

    it('should reject empty investment goals', async () => {
      const invalidData = {
        riskTolerance: 'medium',
        investmentGoals: [],
      };

      await expect(step2ValidationSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('step3ValidationSchema', () => {
    it('should validate correct data', async () => {
      const validData = {
        notificationPreferences: {
          email: true,
          sms: false,
          push: true,
        },
        theme: 'light',
      };

      await expect(step3ValidationSchema.validate(validData)).resolves.toBe(validData);
    });

    it('should reject invalid theme', async () => {
      const invalidData = {
        notificationPreferences: {
          email: true,
          sms: false,
          push: true,
        },
        theme: 'invalid',
      };

      await expect(step3ValidationSchema.validate(invalidData)).rejects.toThrow();
    });
  });
}); 