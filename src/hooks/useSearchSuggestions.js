import getValue from 'lodash/get';
import { useMemo } from 'react';
import { useQuery } from '@lib/query-client';
import { fetchUnsplashSearchSuggestions } from '@services/unsplash-api';

export const getKey = () => 'search-suggestions';

const useSearchSuggestions = () => {
  const { isLoading, isError, isSuccess, data } = useQuery(
    getKey(),
    fetchUnsplashSearchSuggestions,
    { staleTime: Infinity },
  );

  const { trendingSearches, trendingTopics, trendingCollections } = useMemo(
    () => ({
      trendingSearches: getValue(data, 'trendingSearches', null),
      trendingTopics: getValue(data, 'trendingTopics', null),
      trendingCollections: getValue(data, 'trendingCollections', null),
    }),
    [data],
  );

  return {
    isLoading,
    isError,
    isSuccess,
    trendingSearches,
    trendingTopics,
    trendingCollections,
  };
};

export default useSearchSuggestions;
