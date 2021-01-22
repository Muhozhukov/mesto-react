import React from 'react';
import addButtonPath from '../images/add__button.svg';
import profileEditButtonPath from '../images/edit__button.svg';
import api from '../utils/Api.js';
import Card from './Card';


function Main(props) {
    const [userName, setUserName] = React.useState('#');
    const [userDescription, setUserDescription] = React.useState('#');
    const [userAvatar, setUserAvatar] = React.useState('#');
    
    React.useEffect(() => {
      api.getUserInfo().then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
        })
    })
  return (
    <main className="page__container">
    <section className="profile">
      <div className="profile__flex-container">
        <div className="profile__image-container" style={{ backgroundImage: `url(${userAvatar})` }}>
          <div className="profile__edit-avatar-button-container">
            <button onClick={props.onEditAvatar} className="profile__edit-avatar-button"></button>
          </div>
        </div>
        <div className="profile__info-container">
          <div className="profile__info">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__profession">{userDescription}</p>
          </div>
          <button onClick={props.onEditProfile} className="profile__edit-button" type="button">
            <img src={profileEditButtonPath} alt="Редактировать" className="profile__edit-button-image" />
          </button>
        </div>
      </div>
      <button onClick={props.onAddPlace} className="profile__add-button" type="button">
        <img src={addButtonPath} alt="Добавить" className="profile__add-button-image" />
      </button>
    </section>
    <section className="elements">
        {props.cards.map((card, i) => (
        <Card 
        onCardClick={props.onCardClick} 
        card={card} key={card._id} onCardImageClick={props.onCardImageClick} />))}
    </section>
  </main>
  );
}

export default Main;