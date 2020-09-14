export class Card {
  constructor({name, link, likes, owner}, {selector, handleCardLike, handleCardRemove, handleCardClick, myuserId}){
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._userId = owner._id; 
    this._selector = selector;
    this._handleCardLike = handleCardLike;
    this._handleCardRemove = handleCardRemove;
    this._handleCardClick = handleCardClick;
    this._myuserId = myuserId;
  }
  
  likeCard = (evt) => {
    evt.target.classList.toggle('card__like_black');
  };

  removeCard =  (evt) => {
    evt.target.closest('.card').remove();
  };

  _buttonListeners () {
    this._element.querySelector('.card__like').addEventListener('click', this._handleCardLike);
    this._element.querySelector('.card__trash').addEventListener('click', this._handleCardRemove);
    this._element.querySelector('.card__picture').addEventListener('click', this._handleCardClick);
  };  

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.cloneNode(true);
    return cardElement;
  }

  addLike(evt){
    evt.closest('.card').querySelector('.card__likeNumbers').textContent = (this._likes.length+=1);
  }

  removeLike(evt){
    evt.closest('.card').querySelector('.card__likeNumbers').textContent = (this._likes.length-=1);
  }

  checkLike(){
    this._element = this._getTemplate();
    const cardLikesColor = this._element.querySelector('.card__like');
    this._likes.some(element => {
      if(element._id.includes(this._myuserId)){
        cardLikesColor.classList.add('card__like_black');
      }
    });
  }

  createCard(){
    this._element = this._getTemplate();
    const cardTitle = this._element.querySelector('.card__title');
    const cardLink = this._element.querySelector('.card__picture');
    const cardLikes = this._element.querySelector('.card__likeNumbers');
    const cardLikesColor = this._element.querySelector('.card__like');
    cardTitle.textContent = this._name;
    cardLink.src = this._link;
    cardLikes.textContent = this._likes.length;
    this._likes.forEach(element => {
      if(element._id.includes(this._myuserId)){
        cardLikesColor.classList.add('card__like_black');
      }
    });
    this._buttonListeners();
    return this._element;
  }
  
  renderCard(){
    this.createCard()
    if(this._userId!=this._myuserId){
      const cardTrash = this._element.querySelector('.card__trash');
      cardTrash.style.display='none';
      cardTrash.setAttribute('disabled', true);
    }
    return this._element;
  }
}