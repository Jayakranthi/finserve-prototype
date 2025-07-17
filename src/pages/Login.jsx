import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { LoadingOverlay } from '../components/LoadingOverlay';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.log('Login error caught:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@finserve.com');
    setPassword('demo123');
  };

  // Check for success message from onboarding
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the state to prevent showing the message again on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to FinServe
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to access your financial portfolio
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={isLoggingIn}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={isLoggingIn}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={isLoggingIn || !email || !password}
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In'}
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Demo Credentials
          </Typography>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="body2" gutterBottom>
                <strong>Email:</strong> demo@finserve.com
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Password:</strong> demo123
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleDemoLogin}
                sx={{ mt: 1 }}
              >
                Use Demo Credentials
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Button
              variant="text"
              onClick={() => navigate('/onboarding')}
              disabled={isLoggingIn}
            >
              Start Onboarding
            </Button>
          </Typography>
        </Box>
      </Paper>
      
      <LoadingOverlay 
        isLoading={isLoggingIn} 
        message="Authenticating..." 
      />
    </Container>
  );
}; 