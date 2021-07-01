import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { searchUnsplashPhotos } from '@services/unsplash-api';
import { uniqueItems } from '@utils/lists';
import {
  DEFAULT_ORDER,
  DEFAULT_ORIENTATION,
  DEFAULT_COLOR,
  getColorFilterValue,
  getOrientationFilterValue,
  getOrderFilterValue,
} from '@components/SearchHeader';

const UnsplashSearchContext = createContext();

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 30;

function UnsplashSearchProvider({ children }) {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [orderFilter, setOrderFilter] = useState(DEFAULT_ORDER);
  const [orientationFilter, setOrientationFilter] =
    useState(DEFAULT_ORIENTATION);
  const [colorFilter, setColorFilter] = useState(DEFAULT_COLOR);

  const resetSearch = useCallback(() => {
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
    setResults([]);
    setLoading(false);
    setTotalCount(0);
    setTotalPages(0);
  }, []);

  const setSearchQuery = useCallback(
    (newQuery) => {
      setQuery((prevQuery) => {
        if (prevQuery !== newQuery) {
          resetSearch();
          setQuery(newQuery);
        }
      });
    },
    [resetSearch],
  );

  const fetchSearchResults = useCallback(() => {
    if (loading || !query || (totalPages && page + 1 > totalPages)) return;

    setLoading(true);

    const orderBy = getOrderFilterValue(orderFilter);
    const orientation = getOrientationFilterValue(orientationFilter);
    const color = getColorFilterValue(colorFilter);

    searchUnsplashPhotos({ page, pageSize, query, orderBy, orientation, color })
      .then((data) => {
        const { total, results, total_pages } = data;

        setTotalCount(total);
        setResults((prevResults) =>
          uniqueItems([...prevResults, ...results], 'id'),
        );
        setTotalPages(total_pages);
        setPage((prevPage) => (prevPage < total ? prevPage + 1 : prevPage));
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [
    loading,
    query,
    page,
    pageSize,
    orderFilter,
    orientationFilter,
    colorFilter,
    totalPages,
  ]);

  const setSearchFilter = useCallback(
    (callback) => (value) => {
      resetSearch();
      callback(value);
    },
    [resetSearch],
  );

  const resetFilters = useCallback(() => {
    setColorFilter(DEFAULT_COLOR);
    setOrderFilter(DEFAULT_ORDER);
    setOrientationFilter(DEFAULT_ORIENTATION);
  }, []);

  const hasFilters = useMemo(() => {
    return (
      orderFilter.value !== DEFAULT_ORDER.value ||
      orientationFilter.value !== DEFAULT_ORIENTATION.value ||
      colorFilter.value !== DEFAULT_COLOR.value
    );
  }, [orderFilter, colorFilter, orientationFilter]);

  useEffect(() => {
    fetchSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, orderFilter, orientationFilter, colorFilter]);

  const value = {
    page,
    pageSize,
    query,
    results,
    loading,
    totalCount,
    totalPages,
    resetSearch,
    setSearchQuery,
    fetchSearchResults,
    hasFilters,
    resetFilters: setSearchFilter(resetFilters),
    searchOrder: orderFilter,
    searchOrientation: orientationFilter,
    searchColor: colorFilter,
    setSearchOrder: setSearchFilter(setOrderFilter),
    setSearchOrientation: setSearchFilter(setOrientationFilter),
    setSearchColor: setSearchFilter(setColorFilter),
  };
  return (
    <UnsplashSearchContext.Provider value={value}>
      {children}
    </UnsplashSearchContext.Provider>
  );
}

function useUnsplashSearch() {
  const context = useContext(UnsplashSearchContext);
  if (context === undefined) {
    throw new Error(
      'useUnsplashSearch must be used within a UnsplashSearchProvider',
    );
  }
  return context;
}
export { UnsplashSearchProvider, useUnsplashSearch };
