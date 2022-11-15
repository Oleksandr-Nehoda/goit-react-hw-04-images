import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, largeImageUrl }) => {
  useEffect(() => {
    const closeByEscape = e => {
      if (e.code !== 'Escape') return;
      closeModal();
    };
    window.addEventListener('keydown', closeByEscape);
    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeModal]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <img src={largeImageUrl} alt="img" />
    </div>,
    modalRoot
  );
};

Modal.protoType = {
  closeModal: PropTypes.func,
  largeImageUrl: PropTypes.string,
};
