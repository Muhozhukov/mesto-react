//import logo from './logo.svg';

import closePopupImagePath from '../images/close__icon.svg';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }
  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  React.useEffect(() => {
      api.getInitialCards().then((res) => {
          setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  })

  return (
  <div className="page">
    <Header  />
    <Main onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={(data) => handleCardClick(data)}
      cards={cards}
      />
    <Footer />
    <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} title="Редактировать профиль" name="edit-profile">
        <label className="popup__lable">
          <input id="profile-name" className="popup__input popup__input_name" type="text" name="name" minLength="2" maxLength="40" defaultValue="Жак-Ив Кусто" placeholder="Имя" autoComplete="off" required />
          <span id="profile-name-error" className="popup__error" id="name-error">Вы пропустили это поле</span>
        </label>
        <label className="popup__lable">
          <input id="profile-profession" className="popup__input popup__input_profession" type="text" name="profession" minLength="2" maxLength="400" defaultValue="Исследователь океана" placeholder="О себе" autoComplete="off" required />
          <span id="profile-profession-error" className="popup__error" id="profession-error">Вы пропустили это поле</span>
        </label>
    </PopupWithForm>
    <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} title="Новое место" name="edit-card">
      <label className="popup__lable">
        <input id="card-title" className="popup__input popup__input_place" type="text" name="name" minLength="1" maxLength="30" defaultValue="" placeholder="Название" autoComplete="off" required />
        <span id="card-title-error" className="popup__error" id="title-error">Вы пропустили это поле</span>
      </label>
      <label className="popup__lable">
        <input id="card-url" className="popup__input popup__input_image-url" type="url" name="link" defaultValue="" placeholder="Ссылка на картинку" autoComplete="off" required />
        <span id="card-url-error" className="popup__error" id="image-error">Вы пропустили это поле</span>
      </label>
    </PopupWithForm>
    <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} title="Обновить аватар" name="edit-avatar">
      <label className="popup__lable">
        <input id="card-title" className="popup__input popup__input_place" type="url" name="avatar" minLength="1" defaultValue="" placeholder="Ссылка на изображение" autoComplete="off" required />
        <span id="card-title-error" className="popup__error" id="title-error">Вы пропустили это поле</span>
      </label>
    </PopupWithForm>
    <PopupWithForm title="Вы уверены" name="delete-image" />
    <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard} />



  </div>
  );
}

export default App;
