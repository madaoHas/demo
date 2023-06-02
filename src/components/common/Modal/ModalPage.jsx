import React from "react";
import classes from "./ModalPage.module.css";

const ModalPage = ({ isVisible = false, content, onClose, updateActive, id, active }) => {
    const keydownHandler = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    return !isVisible ? null : (
        <div className={classes.modal} onClick={onClose}>
            <div className={classes.modalDialog} onClick={e => e.stopPropagation()}>
                <div className={classes.modalBody}>
                    <div className={classes.modalContent}>{content}</div>
                </div>
                <div className={classes.buttons}>
                    <button onClick={ () => {
                        updateActive(id, active);
                        onClose();
                    }}>
                        ДА
                    </button>
                    <button onClick={onClose}>НЕТ</button>
                </div>
            </div>
        </div>
    );
};

export default ModalPage