import PropTypes from 'prop-types';
import { useMemo } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { chunk } from '@utils/lists';
import styled from 'styled-components';
function MasonryGrid({ breakpoints, children }) {
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
      return <S.Column key={`column-${index}`}>{gridColumn}</S.Column>;
    });
  }, [childrenByColumns]);

  return <S.Container>{cells}</S.Container>;
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
  breakpoints: [],
};

MasonryGrid.propTypes = {
  breakpoints: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number,
      columns: PropTypes.number,
    }),
  ),
};

export default MasonryGrid;
