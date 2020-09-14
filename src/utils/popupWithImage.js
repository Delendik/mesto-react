import {Popup} from './popup.js';

export class PopupWithImage extends Popup{
  constructor({popupSelector, linkOfPicture, titleOfPicture}){
    super(popupSelector);
    this._linkOfPicture = document.querySelector(linkOfPicture);
    this._titleOfPicture = document.querySelector(titleOfPicture);
  }

  open (name, link)  {
    super.open();
    this._linkOfPicture.alt = name;
    this._linkOfPicture.src = link;
    this._titleOfPicture.textContent = name;
  }

  close(){
    super.close();
  }

}