// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'Minfy',
  lastName: 'Tech',
  email: 'minfy.tech@example.com',
  phoneNumber: '+1-555-456-0123',
  preferences: {
    riskTolerance: 'medium',
    investmentGoals: ['retirement', 'wealth-building'],
    notificationPreferences: {
      email: true,
      sms: false,
      push: true,
    },
    theme: 'light',
  },
  createdAt: new Date(),
  isOnboarded: true,
};

// Mock financial data
const mockFinancialData = {
  totalPortfolioValue: 125000.00,
  totalGainLoss: 8750.00,
  gainLossPercent: 7.5,
  cashBalance: 15000.00,
  holdings: [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 50,
      currentPrice: 150.00,
      totalValue: 7500.00,
      changePercent: 2.5,
      changeAmount: 187.50,
      sector: 'Technology',
    },
    {
      id: '2',
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 30,
      currentPrice: 320.00,
      totalValue: 9600.00,
      changePercent: 1.8,
      changeAmount: 172.80,
      sector: 'Technology',
    },
    {
      id: '3',
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      quantity: 25,
      currentPrice: 240.00,
      totalValue: 6000.00,
      changePercent: -1.2,
      changeAmount: -72.00,
      sector: 'Automotive',
    },
    {
      id: '4',
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      quantity: 40,
      currentPrice: 140.00,
      totalValue: 5600.00,
      changePercent: 0.8,
      changeAmount: 44.80,
      sector: 'Financial Services',
    },
  ],
  recentTransactions: [
    {
      id: '1',
      type: 'buy',
      symbol: 'AAPL',
      amount: 7500.00,
      quantity: 50,
      price: 150.00,
      date: new Date('2024-01-15'),
      status: 'completed',
      description: 'Purchased 50 shares of AAPL',
    },
    {
      id: '2',
      type: 'dividend',
      symbol: 'MSFT',
      amount: 120.00,
      date: new Date('2024-01-10'),
      status: 'completed',
      description: 'Dividend payment from MSFT',
    },
    {
      id: '3',
      type: 'sell',
      symbol: 'TSLA',
      amount: 6000.00,
      quantity: 25,
      price: 240.00,
      date: new Date('2024-01-08'),
      status: 'completed',
      description: 'Sold 25 shares of TSLA',
    },
  ],
};

export class ApiService {
  // User Management
  static async getCurrentUser() {
    await delay(800);
    return {
      data: mockUser,
      success: true,
    };
  }

  static async updateUser(userData) {
    await delay(1000);
    const updatedUser = { ...mockUser, ...userData };
    return {
      data: updatedUser,
      success: true,
      message: 'User updated successfully',
    };
  }

  // Registration
  static async register(userData) {
    await delay(1500);
    
    // Simulate email validation
    if (userData.email === 'demo@finserve.com') {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      preferences: userData.preferences,
      createdAt: new Date(),
      isOnboarded: true,
    };

    // Store the new user for login purposes
    localStorage.setItem('finserve_registered_users', JSON.stringify([
      ...JSON.parse(localStorage.getItem('finserve_registered_users') || '[]'),
      { email: userData.email, password: userData.password, user: newUser }
    ]));

    return {
      data: {
        token: 'mock-jwt-token-' + Date.now(),
        user: newUser,
      },
      success: true,
      message: 'Registration successful',
    };
  }

  // Onboarding
  static async submitOnboarding(formData) {
    await delay(1500);
    
    const registrationData = {
      firstName: formData.step1.firstName,
      lastName: formData.step1.lastName,
      email: formData.step1.email,
      phoneNumber: formData.step1.phoneNumber,
      password: formData.step1.password,
      preferences: {
        riskTolerance: formData.step2.riskTolerance,
        investmentGoals: formData.step2.investmentGoals,
        notificationPreferences: formData.step3.notificationPreferences,
        theme: formData.step3.theme,
      },
    };

    return this.register(registrationData);
  }

  // Financial Data
  static async getFinancialData() {
    await delay(1200);
    // Simulate occasional errors
    if (Math.random() < 0.1) {
      throw new Error('Failed to fetch financial data');
    }
    return {
      data: mockFinancialData,
      success: true,
    };
  }

  static async refreshFinancialData() {
    await delay(2000);
    // Simulate data updates
    const updatedData = {
      ...mockFinancialData,
      totalPortfolioValue: mockFinancialData.totalPortfolioValue + (Math.random() - 0.5) * 1000,
      totalGainLoss: mockFinancialData.totalGainLoss + (Math.random() - 0.5) * 500,
    };
    return {
      data: updatedData,
      success: true,
      message: 'Financial data refreshed successfully',
    };
  }

  // Authentication (simulated)
  static async login(email, password) {
    await delay(1000);
    
    // Check demo credentials
    if (email === 'demo@finserve.com' && password === 'demo123') {
      return {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: mockUser,
        },
        success: true,
        message: 'Login successful',
      };
    }
    
    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem('finserve_registered_users') || '[]');
    const user = registeredUsers.find((u) => u.email === email && u.password === password);
    
    if (user) {
      return {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: user.user,
        },
        success: true,
        message: 'Login successful',
      };
    }
    
    throw new Error('Invalid credentials');
  }

  static async logout() {
    await delay(500);
    return {
      data: undefined,
      success: true,
      message: 'Logged out successfully',
    };
  }
} 