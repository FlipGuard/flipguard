import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { queryClient } from '../config/react-query';

export function useIdentityQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(queryKey: TQueryKey, fallback: TQueryFnData, options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
    const identityFn = () => queryClient.getQueryData<TQueryFnData>(queryKey) ?? fallback;
    return useQuery(queryKey, identityFn, options);
}
