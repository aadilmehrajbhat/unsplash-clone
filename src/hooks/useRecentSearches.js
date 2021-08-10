import { useCallback } from 'react';
import createPersistedState from 'use-persisted-state';

const useSearchesState = createPersistedState('recent-searches');

function useRecentSearches() {
  const [recentSearches = [], setRecentSearches] = useSearchesState();

  const updateRecentSearches = useCallback(
    (value) => {
      const lastSearches = recentSearches
        .filter((item) => item !== value)
        .slice(-4);

      setRecentSearches([value, ...lastSearches]);
    },
    [recentSearches, setRecentSearches],
  );

  const clearRecentSearches = useCallback(
    () => setRecentSearches([]),
    [setRecentSearches],
  );

  return {
    recentSearches,
    setRecentSearches: updateRecentSearches,
    clearRecentSearches,
  };
}

export default useRecentSearches;
