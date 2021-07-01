import PropTypes from 'prop-types';
import { useState } from 'react';
import PhotoItem from '@components/PhotoItem';
import MasonryGrid from '@components/MasonryGrid';

function PhotoListing({ photos }) {
  const [masonryBreakpoints] = useState([
    { width: 760, columns: 2 },
    { width: 960, columns: 3 },
  ]);

  return (
    <MasonryGrid breakpoints={masonryBreakpoints}>
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </MasonryGrid>
  );
}

PhotoListing.defaultProps = {
  photos: [],
};

PhotoListing.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
};

export default PhotoListing;
