import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

export type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

export const useFirebaseMutation = <TData, TVariables>(
  mutationFn: MutationFn<TData, TVariables>, // 실제 API 함수
  options?: UseMutationOptions<TData, Error, TVariables>, // React Query 옵션
): UseMutationResult<TData, Error, TVariables> => {
  return useMutation<TData, Error, TVariables>({ mutationFn, ...options });
};
