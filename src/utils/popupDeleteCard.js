import {Popup} from './popup.js';

export class PopupDeleteCard extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._form =  this._popupSelector.querySelector('.popup__formDeletePicture');
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__formDeletePicture').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    })
  }

  setSubmitHandler(func){
    this._handleFormSubmit = func;
  }
}