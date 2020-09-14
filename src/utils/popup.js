export class Popup {
  constructor(popupSelector){
    this._popupSelector = document.querySelector(popupSelector);
  }
  
  _handleEscClose = (evt) => {
    const ESC_CODE = 'Escape' ;
    if (evt.code === ESC_CODE) {
      this.close();
    }
  }

  open () {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _closeOverlay () {
    this.close();
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => this.close());
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup')) {
        this._closeOverlay (evt.target);
      }
    });
  }
}
