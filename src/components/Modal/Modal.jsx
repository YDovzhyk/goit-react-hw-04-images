/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes from 'prop-types';

import s from "./modal.module.css"

const Modal = ({close, content}) => {
    useEffect(() => {
        document.addEventListener("keydown", closeModal);
        return () => document.removeEventListener("keydown", closeModal)
    }, []);

    const closeModal = ({target, currentTarget, code}) => {
        if(target === currentTarget || code === "Escape") {
            close()
        }
    };
        return (
            <div className={s.overlay} onClick={closeModal}>
                <div className={s.modal}>
                    <span onClick={closeModal} className={s.close}>X</span>
                    <img className={s.photo} src={content.largeImageURL} alt={content.tags}/>
                </div>
            </div>
        )
    }


export default Modal;

Modal.defaultProps = {
    content: {},
    close: () => {}
}

Modal.propTypes = {
    close: PropTypes.func,
    content: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
}),
}