import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '../services/api';

export const useFinancialData = () => {
  const queryClient = useQueryClient();

  const {
    data: financialData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['financialData'],
    queryFn: async () => {
      const response = await ApiService.getFinancialData();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  const refreshMutation = useMutation({
    mutationFn: ApiService.refreshFinancialData,
    onSuccess: (response) => {
      queryClient.setQueryData(['financialData'], response.data);
    },
    onError: (error) => {
      console.error('Failed to refresh financial data:', error);
    },
  });

  const refreshData = () => {
    refreshMutation.mutate();
  };

  return {
    financialData,
    isLoading,
    error,
    refetch,
    refreshData,
    isRefreshing: refreshMutation.isPending,
  };
}; 