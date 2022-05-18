import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
function PhotoItem({ photo }) {
  return (
    <S.Container>
      <a
        href={photo.links.html}
        title={photo.alt_description}
        target="_blank"
        rel="noopener noreferrer"
      >
        <S.Image src={photo.urls.small} alt={photo.alt_description} />
      </a>
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
        rgba(0, 0, 0, 0.3) 90%
      );
    }
  `,
  Image: styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: opacity;
    cursor: zoom-in;
  `,
};

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default PhotoItem;
