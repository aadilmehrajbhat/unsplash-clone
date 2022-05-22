import PropTypes from 'prop-types';
import { useMemo } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { chunk } from '@utils/lists';
import styled from 'styled-components';
function MasonryGrid({ 'data-aid': dataAid, breakpoints, children }) {
  const { width: viewportWidth } = useWindowSize();

  const columns = useMemo(() => {
    return breakpoints.reduce(
      (totalColumns, breakpoint) =>
        viewportWidth > breakpoint.width ? breakpoint.columns : totalColumns,
      1,
    );
  }, [breakpoints, viewportWidth]);

  const childrenByColumns = useMemo(() => {
    return chunk(children, columns);
  }, [children, columns]);

  const cells = useMemo(() => {
    return childrenByColumns.map((gridColumn, index) => {
      return (
        <S.Column data-aid="masonry-column" key={`column-${index}`}>
          {gridColumn}
        </S.Column>
      );
    });
  }, [childrenByColumns]);

  return <S.Container data-aid={dataAid}>{cells}</S.Container>;
}

const S = {
  Container: styled.section`
    display: flex;
    margin: 1rem 0;
  `,
  Column: styled.div`
    flex: 1;

    & + & {
      margin-left: var(--masonry-col-gutter);
    }

    & > * {
      margin-top: var(--masonry-row-gutter);
    }
  `,
};

MasonryGrid.defaultProps = {
  'data-aid': 'masonry-grid',
  breakpoints: [],
};

MasonryGrid.propTypes = {
  'data-aid': PropTypes.string,
  breakpoints: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number,
      columns: PropTypes.number,
    }),
  ),
};

export default MasonryGrid;
