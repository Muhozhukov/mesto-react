import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
        props.onClose()
    }
    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Обновить аватар" name="edit-avatar">
        <label className="popup__lable">
          <input ref={avatarRef} id="card-title" className="popup__input popup__input_place" type="url" name="avatar" minLength="1" defaultValue="" placeholder="Ссылка на изображение" autoComplete="off" required />
          <span id="card-title-error" className="popup__error" id="title-error">Вы пропустили это поле</span>
        </label>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;