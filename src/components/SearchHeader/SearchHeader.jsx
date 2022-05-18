import styled from 'styled-components';
import PhotosCount from './PhotosCount';
import SearchFilter from './SearchFilter';

function SearchHeader() {
  return (
    <S.Container>
      <PhotosCount />
      <SearchFilter />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.75em 1.2rem 0;
    position: sticky;
    min-height: var(--search-header-height);
    width: 100vw;
    top: var(--header-height);
    z-index: 1;
    background: #fff;
    box-shadow: 0 8px 6px -6px rgb(0 0 0 / 9%);
    @media screen and (min-width: 600px) {
      flex-direction: row;
      align-items: center;
      padding: 0 1.2rem;
    }
  `,
};

export default SearchHeader;
