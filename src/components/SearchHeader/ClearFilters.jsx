import { useUnsplashSearch } from '@contexts/search-context';

function ClearFilters() {
  const { hasFilters, resetFilters } = useUnsplashSearch();

  if (!hasFilters) return null;

  return (
    <button className="clear-filters" onClick={resetFilters}>
      Clear
    </button>
  );
}

export default ClearFilters;
