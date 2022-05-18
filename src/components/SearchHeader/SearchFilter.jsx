import styled from 'styled-components';
import ClearFilters from './ClearFilters';
import OrientationFilter from './OrientationFilter';
import OrderFilter from './OrderFilter';
import ColorFilter from './ColorFilter';

function SearchFilter() {
  return (
    <S.Container>
      <ClearFilters />
      <OrientationFilter />
      <ColorFilter />
      <OrderFilter />
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    margin-top: 0.75em;
    flex-wrap: wrap;
    align-items: center;
    @media screen and (min-width: 600px) {
      margin-top: 0;
    }
  `,
};

export default SearchFilter;
