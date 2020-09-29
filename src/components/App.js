import React, { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, isOpenEditProfile] =  useState(false);
  const [isAddPlacePopupOpen, isOpenAddPlace] =  useState(false);
  const [isEditAvatarPopupOpen, isOpenEditAvatar] =  useState(false);
  const [selectedCard, isOpenSelectedCard] =  useState(null);
  const [currentUser, setCurrentUser] =  useState({});
  const [cards, setCards] =  useState([]);
  
  useEffect(()=>{
    Promise.all([ 
      api.getUserInfo(), 
      api.getCardsFromServer() 
    ]) 
    .then( 
      json=>{ 
        const [userInfo, data] = json; 
        setCurrentUser(userInfo)
        const items = data.map(item => ({ 
          link: item.link,
          likes: item.likes,
          name: item.name,
          _id:item._id,
          owner:item.owner
          })) 
          setCards(items) 
        }
    )
    .catch((err) => { 
      console.log(err);  
    }); 
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  } 

  function handleCardDelete(card){
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id );
      setCards(newCards);
    })
    .catch((err) => { 
      console.log(err);  
    }); 
  }

  function handleEditProfileClick(){
    isOpenEditProfile(true);
  }

  function handleEditAvatarClick(){
    isOpenEditAvatar(true);
  }

  function handleAddPlaceClick(){
    isOpenAddPlace(true);
  }

  function handleUpdateUser(user){
    api.changeUserInfo(user)
    .then(res=>{
      setCurrentUser(res)
    })
    .catch((err) => { 
      console.log(err);  
    }); 
    isOpenEditProfile(false);
  }

  function handleUpdateAvatar(avatar){
    api.changeAvatar(avatar)
    .then(res=>{
      setCurrentUser(res)
    })
    .catch((err) => { 
      console.log(err);  
    }); 
    isOpenEditAvatar(false);
  }

  function handleAddPlaceSubmit(card){
    api.addNewCard(card).then(
      (newCard) => {
      setCards([...cards, newCard]); 
    })
    .catch((err) => { 
      console.log(err);  
    }); 
    isOpenAddPlace(false);
  }

  function closeAllPopups(){
    isOpenEditProfile(false);
    isOpenEditAvatar(false);
    isOpenAddPlace(false);
    isOpenSelectedCard(null)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick = {isOpenSelectedCard}
          cards = {cards}
          onCardLike = {handleCardLike}
          onCardDelete = {handleCardDelete}
        />
        <Footer />
        
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser = {handleUpdateUser} 
        /> 

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar = {handleUpdateAvatar}
        /> 

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onSubmitCard = {handleAddPlaceSubmit}
        />

        <PopupWithForm 
          title = {'Вы уверены?'}
          name = {'DeleteCard'}
          buttonTitle = {'Да'}
        /> 
          
        <ImagePopup 
          card = {selectedCard}
          onClose = {closeAllPopups}
        />
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
