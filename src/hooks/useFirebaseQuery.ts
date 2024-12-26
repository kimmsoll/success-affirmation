import { ApiResult } from 'api/firebase/affirmation';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFirebaseQuery = <T>(
  queryKey: string[],
  queryFn: (params?: any) => Promise<ApiResult<T>>,
  options?: UseQueryOptions<T>,
) => {
  return useQuery({
    queryKey,
    queryFn: async (params) => {
      const result = await queryFn(params);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    ...options,
  });
};
