import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.webformatURL}
          onClick={this.toggleModal}
          alt={this.props.alt}
          className="ImageGalleryItem-image"
        />
        {this.state.showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={this.props.largeImageURL} alt={this.props.alt} />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.protoType = {
  key: PropTypes.number,
  alt: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
};
