import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}){
  const [userName, setUserName] =  useState();
  const [userDescription, setUserDescription] =  useState();
  const [userAvatar, setUserAvatar] =  useState();
  const [cards, setCards] =  useState([]);

  useEffect(()=>{
    Promise.all([
      api.getUserInfo(),
      api.getCardsFromServer()
    ])
    .then(
      json=>{
        const [userInfo, data] = json;
        setUserName(userInfo.name)
        setUserDescription(userInfo.about)
        setUserAvatar(userInfo.avatar)
        const items = data.map(item => ({
            link: item.link,
            numberOfLikes: item.likes.length,
            name: item.name,
            id:item._id
          }))
          setCards(items)
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