import PropTypes from 'prop-types';
function PhotoItem({ photo }) {
  return (
    <figcaption className="photo-item">
      <a
        href={photo.links.html}
        title={photo.alt_description}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="photo-item__image"
          src={photo.urls.small}
          alt={photo.alt_description}
        />
      </a>
    </figcaption>
  );
}

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
};

export default PhotoItem;
