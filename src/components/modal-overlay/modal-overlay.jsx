import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props) {
        return (
            <div className={modalOverlayStyles.overlay} onClick={props.onClose}></div>
        )
}

ModalOverlay.propsTypes = {
    onClose: PropTypes.func.isRequired
}

export default  ModalOverlay;