import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import CloseIcon from '../icons/close/close';

function Modal(props) {
    const {onClose, children, title} = props;
    const handleEscCloseModal = (e) => {
        if (e.keyCode === 27) {
            onClose(e);
        }
    }
    React.useEffect(() => {
        document.addEventListener('keyup', handleEscCloseModal);
        return () => {
            document.removeEventListener('keyup', handleEscCloseModal);
        }
    })

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={`${modalStyles.modal}`}>
                <div className={modalStyles.header}>
                    <h3 className={`${modalStyles.title}`}>{title}</h3>
                    <div className={modalStyles.close} onClick={onClose}><CloseIcon type={"primary"} /></div>
                </div>
                <div>{children}</div>
            </div>
        </>,
        document.getElementById('modal-root')
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string
}

export default  Modal;