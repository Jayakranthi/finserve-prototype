import { ApiService } from '../api';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('login', () => {
    it('should login with demo credentials', async () => {
      const result = await ApiService.login('demo@finserve.com', 'demo123');
      
      expect(result.success).toBe(true);
      expect(result.data.user).toBeDefined();
      expect(result.data.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      await expect(
        ApiService.login('invalid@email.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1-555-0123',
        password: 'password123',
        preferences: {
          riskTolerance: 'medium',
          investmentGoals: ['retirement'],
          notificationPreferences: {
            email: true,
            sms: false,
            push: true,
          },
          theme: 'light',
        },
      };

      const result = await ApiService.register(userData);
      
      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe('john.doe@example.com');
      expect(result.data.token).toBeDefined();
    });

    it('should reject registration with existing email', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@finserve.com',
        phoneNumber: '+1-555-0123',
        password: 'password123',
        preferences: {
          riskTolerance: 'medium',
          investmentGoals: ['retirement'],
          notificationPreferences: {
            email: true,
            sms: false,
            push: true,
          },
          theme: 'light',
        },
      };

      await expect(ApiService.register(userData)).rejects.toThrow('Email already exists');
    });
  });

  describe('submitOnboarding', () => {
    it('should create account from onboarding data', async () => {
      const formData = {
        step1: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phoneNumber: '+1-555-0456',
          password: 'password123',
          confirmPassword: 'password123',
        },
        step2: {
          riskTolerance: 'high',
          investmentGoals: ['wealth-building'],
        },
        step3: {
          notificationPreferences: {
            email: true,
            sms: true,
            push: false,
          },
          theme: 'dark',
        },
      };

      const result = await ApiService.submitOnboarding(formData);
      
      expect(result.success).toBe(true);
      expect(result.data.user.email).toBe('jane.smith@example.com');
      expect(result.data.user.preferences.riskTolerance).toBe('high');
    });
  });

  describe('getFinancialData', () => {
    it('should return financial data', async () => {
      const result = await ApiService.getFinancialData();
      
      expect(result.success).toBe(true);
      expect(result.data.totalPortfolioValue).toBeDefined();
      expect(result.data.holdings).toBeDefined();
      expect(result.data.recentTransactions).toBeDefined();
    });
  });
}); 