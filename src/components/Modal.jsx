import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  state = { opened: false };
  intervalId;
  componentDidMount() {
    document.addEventListener('keydown', this.keyListener);
    this.intervalId = setInterval(() => {
      console.log('Modal opened');
    }, 2000);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyListener);
    clearInterval(this.intervalId);
  }

  keyListener = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
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
      >
        <div style={{ width: '50%', height: '50%', backgroundColor: '#fff' }}>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
