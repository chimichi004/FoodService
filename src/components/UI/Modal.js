import React from 'react';
import reactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
};

const Overlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>;
};


const Modal = props => {
    const portalElement = document.getElementById('overlays');

    return <>
       {reactDOM.createPortal( <Backdrop onClose={props.onClose} />, portalElement)}
       {reactDOM.createPortal(  <Overlay>{props.children}</Overlay>, portalElement)}
    </>;
};

export default Modal;