import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalBlock, Overlay } from "./Modal.styled";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            onClose();
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalBlock >
                {children}
            </ModalBlock>
        </Overlay>,
        modalRoot
    );
    
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
};