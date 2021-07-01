import PageLayout from '@components/PageLayout';
import Container from '@components/Container';
import { useUnsplashSearch } from '@contexts/search-context';
import PhotoGallery from '@components/PhotoGallery';
import SearchHeader from '@components/SearchHeader';
import EmptyContent from '@components/EmptyContent';

function Search() {
  const { query, results, loading, fetchSearchResults } = useUnsplashSearch();

  return (
    <PageLayout>
      <SearchHeader />
      <Container>
        <h1 className="search-term">{query}</h1>
        <PhotoGallery photos={results} onFetchPhotos={fetchSearchResults} />
        {!loading && (!Array.isArray(results) || !results.length) && (
          <EmptyContent />
        )}
      </Container>
    </PageLayout>
  );
}

export default Search;
