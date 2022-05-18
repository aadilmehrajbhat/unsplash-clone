import styled from 'styled-components';
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
        <S.Title>{query}</S.Title>
        <PhotoGallery photos={results} onFetchPhotos={fetchSearchResults} />
        {!loading && (!Array.isArray(results) || !results.length) && (
          <EmptyContent />
        )}
      </Container>
    </PageLayout>
  );
}

const S = {
  Title: styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
    margin: 4rem 0 3rem;

    &::first-letter {
      text-transform: capitalize;
    }
  `,
};

export default Search;
