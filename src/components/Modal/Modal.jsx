import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, imgLarge }) => {
  useEffect(() => {
    const handleCloseOnEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleCloseOnEscape);

    return () => {
      window.removeEventListener('keydown', handleCloseOnEscape);
    };
  }, [onClose]);

  const hendleCloseOnOverlay = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={hendleCloseOnOverlay}>
      <ModalWindow>
        <img src={imgLarge} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};
