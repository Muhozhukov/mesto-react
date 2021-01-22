import React from 'react';

import closePopupImagePath from '../images/close__icon.svg';

function ImagePopup(props) {
    if (props.isOpen) {
        return(
        <div className="popup popup_opened popup_type_image">
        <div className="popup__cantainer popup__image-container">
        <button onClick={props.onClose} className="popup__close-button" type="reset">
            <img className="popup__close-button-image" src={closePopupImagePath} alt="Закрыть" />
        </button>
        <img src={props.card.data.link} alt={props.card.data.name} className="popup__image" />
        <h3 className="popup__image-title">{props.card.data.name}</h3>
        </div>
        </div>
    )
    } else {
        return(
            <div className="popup popup_type_image">
            <div className="popup__cantainer popup__image-container">
            <button onClick={props.onClose} className="popup__close-button" type="reset">
                <img className="popup__close-button-image" src={closePopupImagePath} alt="Закрыть" />
            </button>
            <img src={props.card.link} alt={props.card.name} className="popup__image" />
            <h3 className="popup__image-title">{props.card.name}</h3>
            </div>
            </div>
        )
    }
}
export default ImagePopup;