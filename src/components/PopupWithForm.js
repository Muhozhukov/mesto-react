import React from 'react';
import closePopupImagePath from '../images/close__icon.svg';

function PopupWithForm(props) {
    if (props.isOpen) {
    return(
        <div className={`popup popup_type_${props.name} popup_opened`}>
            <form className="popup__form popup__cantainer popup__form_profile" name={props.name} noValidate>
                <button onClick={props.onClose} className="popup__close-button" type="reset">
                    <img className="popup__close-button-image" src={closePopupImagePath} alt="Закрыть" />
                </button>
                <div className="popup__container">
                    <h3 className="popup__title">{props.title}</h3>
                    {props.children}
                    <button className="popup__submit-button popup__submit-button_disabled" type="submit" disabled>Сохранить</button>
                </div>
            </form>
        </div>
    )
    } else {
        return (<div className={`popup popup_type_${props.name}`}>
        <form className="popup__form popup__cantainer popup__form_profile" name={props.name} noValidate>
            <button className="popup__close-button" type="reset">
                <img className="popup__close-button-image" src={closePopupImagePath} alt="Закрыть" />
            </button>
            <div className="popup__container">
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button className="popup__submit-button popup__submit-button_disabled" type="submit" disabled>Сохранить</button>
            </div>
        </form>
    </div>)
    }
}


export default PopupWithForm;