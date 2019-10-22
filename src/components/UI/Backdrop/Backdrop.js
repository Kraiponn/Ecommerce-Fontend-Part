import React from 'react';
import './Backdrop.scss';

const BackDrop = ({show, clicked}) => {
  let ui = show ? <div className="Backdrop" onClick={clicked}></div> : null;
  return ui;
}

export default BackDrop;