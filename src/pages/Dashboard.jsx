import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useFinancialData } from '../hooks/useFinancialData';
import { PortfolioCard } from '../components/PortfolioCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const { financialData, isLoading, error, refreshData, isRefreshing } = useFinancialData();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {user?.firstName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's your financial overview
          </Typography>
        </Box>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Button variant="contained" onClick={refreshData} disabled={isRefreshing}>
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
        {isRefreshing && <CircularProgress size={20} />}
      </Box>

      {isLoading ? (
        <LoadingSpinner message="Loading portfolio data..." />
      ) : error ? (
        <Alert severity="error">{(error).message || 'Failed to load data.'}</Alert>
      ) : financialData ? (
        <>
          <Box display="flex" gap={3} sx={{ mb: 4, flexWrap: 'wrap' }}>
            <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Total Portfolio Value
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  ${financialData.totalPortfolioValue.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {financialData.gainLossPercent >= 0 ? '+' : ''}{financialData.gainLossPercent}% this month
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Total Gain/Loss
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  ${financialData.totalGainLoss.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All time performance
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Cash Balance
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  ${financialData.cashBalance.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available for trading
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Portfolio Holdings
            </Typography>
            <Box display="flex" gap={3} sx={{ flexWrap: 'wrap' }}>
              {financialData.holdings.map((holding) => (
                <Box key={holding.id} sx={{ flex: '1 1 250px', minWidth: '250px' }}>
                  <PortfolioCard holding={holding} />
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              Recent Transactions
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {financialData.recentTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{tx.symbol || '-'}</TableCell>
                      <TableCell>${tx.amount.toLocaleString()}</TableCell>
                      <TableCell>{tx.status}</TableCell>
                      <TableCell>{tx.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      ) : null}

      <Alert severity="info" sx={{ mt: 4 }}>
        This is a prototype demonstrating the FinServe platform. The data shown is simulated for demonstration purposes.
      </Alert>
    </Container>
  );
}; 