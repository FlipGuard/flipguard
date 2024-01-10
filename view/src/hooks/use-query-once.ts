import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useQueryOnce<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) {
    return useQuery(queryKey, queryFn, {
        cacheTime: Infinity,
        staleTime: Infinity,
        ...options,
    });
}
