import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Refresh, TrendingUp, TrendingDown } from '@mui/icons-material';

export const PortfolioCard = ({ holding, onRefresh }) => {
  const isPositive = holding.changePercent >= 0;
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(holding.totalValue);

  const formattedChange = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Math.abs(holding.changeAmount));

  return (
    <Card elevation={2} sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {holding.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {holding.name}
            </Typography>
          </Box>
          {onRefresh && (
            <Tooltip title="Refresh data">
              <IconButton size="small" onClick={onRefresh}>
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Box display="flex" gap={2} sx={{ mb: 2 }}>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              Quantity
            </Typography>
            <Typography variant="h6">
              {holding.quantity.toLocaleString()}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary">
              Price
            </Typography>
            <Typography variant="h6">
              ${holding.currentPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Total Value
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formattedValue}
          </Typography>
        </Box>

        <Box mt={2} display="flex" alignItems="center" gap={1}>
          {isPositive ? (
            <TrendingUp color="success" fontSize="small" />
          ) : (
            <TrendingDown color="error" fontSize="small" />
          )}
          <Typography
            variant="body2"
            color={isPositive ? 'success.main' : 'error.main'}
            fontWeight="medium"
          >
            {isPositive ? '+' : '-'}{holding.changePercent.toFixed(2)}% ({formattedChange})
          </Typography>
        </Box>

        <Box mt={2}>
          <Chip
            label={holding.sector}
            size="small"
            variant="outlined"
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
}; 