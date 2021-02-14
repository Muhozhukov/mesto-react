import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [currentUser, setCurrentUser] = React.useState('#');
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
  function handleUpdateUser(data) {
    api.editUserInfo(data)
    .then((res) => {
      setCurrentUser(res)
    })
  }
  function handleUpdateAvatar(data) {
    api.changeProfileAvatar(data)
    .then((res) => {
      setCurrentUser(res)
    })
  }
  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
    .then((res) => {
      setCards([res, ...cards])
    })
  }
  //Постановка лайка карточке
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.likeToCard(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
    } else {
      api.deleteLikeToCard(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }) 
    }
  }
  //Удаление карточки
  function handleCardDelete(card) {
    const cardIsMine = card.owner._id == currentUser._id;
    if (cardIsMine) {
      api.deleteCard(card._id).then(() => {
        const deletedCard = cards.filter((item) => {
          if (item._id === card._id) return false;})
          setCards(deletedCard)
      })
    }
  }

    //Получение информации о пользователе
  React.useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
      })
  }, [currentUser])

    //Отрисовка карточек
  React.useEffect(() => {
      api.getInitialCards().then((res) => {
          setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header  />
        <Main onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={(data) => handleCardClick(data)}
          cards={cards}
          setCards={(data) => setCards(data)}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm title="Вы уверены" name="delete-image" />
        <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
