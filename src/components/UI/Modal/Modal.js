import React from 'react';
import './Modal.scss';

import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, closedModal, children }) => {
  return (
    <React.Fragment>
      <Backdrop clicked={closedModal} show={show} />
      <div className="modal"
        style={{
          transform: show ? 'translateY(0%)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0'
        }}
      >
        {children}
        <button 
          onClick={closedModal}
          className="btn btn-danger mt-5">
          CLOSED
        </button>
      </div>
    </React.Fragment>
  )
}

export default Modal;