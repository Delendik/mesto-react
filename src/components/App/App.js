import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';

function App() {

  const [isEditProfilePopupOpen, isOpenEditProfile] =  React.useState(false);
  const [isAddPlacePopupOpen, isOpenAddPlace] =  React.useState(false);
  const [isEditAvatarPopupOpen, isOpenEditAvatar] =  React.useState(false);
  const [selectedCard, isOpenselectedCard] =  React.useState(null);

  function handleEditProfileClick(){
    isOpenEditProfile(true);
  }

  function handleEdtAvatarClick(){
    isOpenEditAvatar(true);
  }

  function handleAddPlaceClick(){
    isOpenAddPlace(true);
  }

  function closeAllPopups(){
    isOpenEditProfile(false);
    isOpenEditAvatar(false);
    isOpenAddPlace(false);
    isOpenselectedCard(null)
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main 
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEdtAvatarClick}
          onCardClick = {isOpenselectedCard}
        />
        <Footer />
        <PopupWithForm 
          title = {'Редактировать профиль'}
          name = {'EditProfile'}
          buttonTitle = {'Сохранить'}
          isOpen = {isEditProfilePopupOpen}
          children = {
            <>
              <input type="text" className="popup__input popup__name" id='name-input' required minLength="2" maxLength="40" />
              <span className='popup__input_error' id='name-input-error'></span>
              <input type="text" className="popup__input popup__about" id='about-input' required minLength="2" maxLength="200" />
              <span className='popup__input_error' id='about-input-error'></span>
            </>
          }
          onClose = {closeAllPopups}
        />  

        <PopupWithForm 
          title = {'Новое место'}
          name = {'AddCard'}
          buttonTitle = {'Создать'}
          isOpen = {isAddPlacePopupOpen}
          children = {
            <>
              <input type="text" className="popup__input popup__nameOfPlace" name = "name" id='nameOfPlace-input' placeholder="Название" required minLength="1" maxLength="30" /> 
              <span className='popup__input_error' id='nameOfPlace-input-error'></span>
              <input type="url" className="popup__input popup__linkForPicture" name = "link" id='linkForPicture-input' placeholder="Ссылка на картинку" required />
              <span className='popup__input_error' id='linkForPicture-input-error'></span>
            </>
          }
          onClose = {closeAllPopups}
        />  

        <PopupWithForm 
          title = {'Обновить аватар'}
          name = {'EditProfileAvatar'}
          buttonTitle = {'Сохранить'}
          isOpen = {isEditAvatarPopupOpen}
          children = {
            <>
              <input type="url" className="popup__input popup__linkForAvatar" name = "linkAvatar" id='linkForAvatar-input'  placeholder="Ссылка на аватар" required />
              <span className='popup__input_error' id='linkForAvatar-input-error'></span>
            </>
          }
          onClose = {closeAllPopups}
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
  );
}

export default App;
