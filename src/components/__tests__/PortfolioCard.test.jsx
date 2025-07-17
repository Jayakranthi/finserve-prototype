import React from 'react';
import { render, screen } from '@testing-library/react';
import { PortfolioCard } from '../PortfolioCard';

const mockHolding = {
  id: '1',
  symbol: 'AAPL',
  name: 'Apple Inc.',
  quantity: 50,
  currentPrice: 150.00,
  totalValue: 7500.00,
  changePercent: 2.5,
  changeAmount: 187.50,
  sector: 'Technology',
};

describe('PortfolioCard', () => {
  it('renders holding information correctly', () => {
    render(<PortfolioCard holding={mockHolding} />);
    
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('$7,500.00')).toBeInTheDocument();
  });

  it('displays positive change correctly', () => {
    render(<PortfolioCard holding={mockHolding} />);
    
    expect(screen.getByText(/\+2\.50%/)).toBeInTheDocument();
    expect(screen.getByText(/\+\\$187\.50/)).toBeInTheDocument();
  });

  it('displays negative change correctly', () => {
    const negativeHolding = {
      ...mockHolding,
      changePercent: -1.5,
      changeAmount: -112.50,
    };
    
    render(<PortfolioCard holding={negativeHolding} />);
    
    expect(screen.getByText(/-1\.50%/)).toBeInTheDocument();
    expect(screen.getByText(/-\\$112\.50/)).toBeInTheDocument();
  });

  it('applies correct styling for positive change', () => {
    render(<PortfolioCard holding={mockHolding} />);
    
    const changeElement = screen.getByText(/\+2\.50%/);
    expect(changeElement).toHaveClass('MuiTypography-colorSuccess');
  });

  it('applies correct styling for negative change', () => {
    const negativeHolding = {
      ...mockHolding,
      changePercent: -1.5,
      changeAmount: -112.50,
    };
    
    render(<PortfolioCard holding={negativeHolding} />);
    
    const changeElement = screen.getByText(/-1\.50%/);
    expect(changeElement).toHaveClass('MuiTypography-colorError');
  });
}); 