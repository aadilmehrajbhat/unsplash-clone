import { useUnsplashSearch } from '@contexts/search-context';
import styled from 'styled-components';

function ClearFilters() {
  const { hasFilters, resetFilters } = useUnsplashSearch();

  if (!hasFilters) return null;

  return <S.Button onClick={resetFilters}>Clear</S.Button>;
}

const S = {
  Button: styled.button`
    background-color: #fff;
    color: #767676;
    padding: 0.75em 1em;
    font-size: 0.85rem;
    border: none;
    user-select: none;
    font-weight: 500;
    font-family: inherit;
    line-height: 1;
    cursor: pointer;

    &:hover {
      color: #111;
    }
  `,
};

export default ClearFilters;
