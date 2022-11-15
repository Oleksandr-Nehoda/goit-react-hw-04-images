import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onModalOpen }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onGettingLargeImg={onModalOpen}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
