import PhotosCount from './PhotosCount';
import SearchFilter from './SearchFilter';

function SearchHeader() {
  return (
    <div className="search-header">
      <PhotosCount />
      <SearchFilter />
    </div>
  );
}

export default SearchHeader;
