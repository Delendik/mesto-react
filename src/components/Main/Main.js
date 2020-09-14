import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import Card from '../Card/Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}){
  const [userName, setInfoName] =  useState();
  const [userDescription, setInfoDescription] =  useState();
  const [userAvatar, setInfoAvatar] =  useState();
  const [cards, setInfoCard] =  useState([]);

  useEffect(()=>{
    api.getUserInfo()
    .then(res=>{
      setInfoName(res.name)
      setInfoDescription(res.about)
      setInfoAvatar(res.avatar)
    });
  }, [])
  
  useEffect(()=>{
    api.getCardsFromServer()
    .then(res=>{
      const items = res.map(item => ({
        link: item.link,
        numberOfLikes: item.likes.length,
        name: item.name,
        id:item._id
      }))
      setInfoCard(items)
    });
  }, [])

  return(
    <>
      <section className="profile">
        <div className="profile__containerImage">
          <img className="profile__image" src={userAvatar} alt="Аватар" onClick={onEditAvatar} />
        </div>

        <div className="profile__info"> 
          <div className="profile__edit">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__button"  onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button className="profile__addPicture" onClick={onAddPlace}></button>
      </section>

      <ul className="cardsList">
        {cards.map(card => <Card key={card.id} {...card} onCardClick = {onCardClick} />)}
      </ul>     
    </>
  )
}

export default Main;