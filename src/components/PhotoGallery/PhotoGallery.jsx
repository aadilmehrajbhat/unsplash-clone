import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import useOnScreen from '@hooks/useOnScreen';
import PhotoListing from '@components/PhotoListing';

function PhotoGallery({ photos, onFetchPhotos }) {
  const elementRef = useRef();
  const onScreen = useOnScreen(elementRef, { rootMargin: '800px' });

  useEffect(() => {
    onScreen && onFetchPhotos && onFetchPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onFetchPhotos && onFetchPhotos(), []);

  return (
    <>
      <PhotoListing photos={photos}></PhotoListing>
      <span style={{ visibility: 'hidden' }} ref={elementRef}></span>
    </>
  );
}

PhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
  onFetchPhotos: PropTypes.func,
};

export default PhotoGallery;
