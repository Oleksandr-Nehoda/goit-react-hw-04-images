import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {

  render() {
    const {id, webformatURL, largeImageURL, onGettingLargeImg } = this.props;

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
  }
}

ImageGalleryItem.propTypes = {
  onGettingLargeImg: PropTypes.func.isRequired,
};