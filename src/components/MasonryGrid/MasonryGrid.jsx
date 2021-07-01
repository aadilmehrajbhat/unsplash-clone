import PropTypes from 'prop-types';
import { useMemo } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { chunk } from '@utils/lists';

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
      return (
        <div className="masonry-column" key={`column-${index}`}>
          {gridColumn}
        </div>
      );
    });
  }, [childrenByColumns]);

  return <section className="masonry-container">{cells}</section>;
}

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
