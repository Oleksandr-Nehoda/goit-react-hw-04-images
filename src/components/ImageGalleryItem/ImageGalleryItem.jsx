import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onGettingLargeImg,
}) => {
  return (
    <li key={id} className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt="img"
        onClick={() => onGettingLargeImg(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onGettingLargeImg: PropTypes.func.isRequired,
};
