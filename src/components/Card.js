import React from 'react';
import api from '../utils/Api.js';



function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      }  

      return (
    <div className="element">
      <img onClick={handleClick} src={props.card.link} alt={props.card.name} className="element__image" />
      <button className="element__delete-button element__delete-button_disabled" type="button">
        <img src="./images/Trash.svg" alt="Удалить" /></button>
      <div className="element__description">
        <h3 className="element__title">{props.card.name}</h3>
        <div className="element__likes">
        <button className="element__like-button" type="button">
        </button>
        <p className="element__number-of-likes">{props.card.likes.length}</p>
      </div>
      </div>
    </div>
)

}

export default Card;