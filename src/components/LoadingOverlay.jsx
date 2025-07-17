import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingOverlay = ({ 
  isLoading, 
  message = 'Loading...' 
}) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderRadius: 'inherit',
      }}
    >
      <CircularProgress size={40} />
      <Typography 
        variant="body2" 
        sx={{ mt: 1, color: 'text.secondary' }}
      >
        {message}
      </Typography>
    </Box>
  );
}; 