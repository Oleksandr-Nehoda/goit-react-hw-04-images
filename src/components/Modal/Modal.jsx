import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  closeByEscape = e => {
    if (e.code !== 'Escape') return;
    this.props.closeModal();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEscape);
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageUrl } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <img src={largeImageUrl} alt="img" />
      </div>,
      modalRoot
    );
  }
}

Modal.protoType = {
  closeModal: PropTypes.func,
  largeImageUrl: PropTypes.string,
};
