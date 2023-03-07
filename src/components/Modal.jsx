import { useKeyDown } from 'hooks/useKeyDown';
import React from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose = () => {} }) => {
  useKeyDown(true, onClose, 'Escape');

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0003',
      }}
      onClick={({ target, currentTarget }) =>
        target === currentTarget ? onClose() : null
      }
    >
      <div
        style={{
          width: '50%',
          height: '50%',
          backgroundColor: '#fff',
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
