import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import useMouseHover from '@hooks/useMouseHover';
import AuthorDetails from './AuthorDetails';
import DownloadPhoto from './DownloadPhoto';

function PhotoItem({ photo }) {
  const [ref, isHovering] = useMouseHover();
  return (
    <S.Container ref={ref}>
      <S.Link
        href={photo.links.html}
        title={photo.alt_description}
        target="_blank"
        rel="noopener noreferrer"
      >
        <S.Image src={photo.urls.small} alt={photo.alt_description} />
        {isHovering && (
          <S.BottomBar>
            <AuthorDetails author={photo.user} />
            <DownloadPhoto url={photo.links.download + '&force=true'} />
          </S.BottomBar>
        )}
      </S.Link>
    </S.Container>
  );
}

const reveal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const S = {
  Container: styled.figcaption`
    animation: ${reveal} 0.7s ease;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      pointer-events: none;
    }

    &:hover:before {
      content: '';
      z-index: 0;

      background-image: linear-gradient(
        rgba(0, 0, 0, 0.3) 10%,
        rgba(0, 0, 0, 0.17) 30%,
        transparent 50%,
        rgba(0, 0, 0, 0.17) 70%,
        rgba(0, 0, 0, 0.45) 90%
      );
    }
  `,
  Link: styled.a`
    display: flex;
  `,
  Image: styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: opacity;
    cursor: zoom-in;
  `,
  BottomBar: styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 1.45rem;
    display: flex;
    justify-content: space-between;
  `,
};

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default PhotoItem;
