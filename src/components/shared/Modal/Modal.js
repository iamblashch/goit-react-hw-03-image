import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleClickBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
    console.log('evt.currentTarget :>> ', evt.currentTarget);
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.hendleClickBackdrop}>
        <div className={css.modal}>
          <img src={this.props.imgUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};
