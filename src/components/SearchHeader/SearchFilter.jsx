import ClearFilters from './ClearFilters';
import OrientationFilter from './OrientationFilter';
import OrderFilter from './OrderFilter';
import ColorFilter from './ColorFilter';

function SearchFilter() {
  return (
    <div className="search-filter">
      <ClearFilters />
      <OrientationFilter />
      <ColorFilter />
      <OrderFilter />
    </div>
  );
}

export default SearchFilter;
