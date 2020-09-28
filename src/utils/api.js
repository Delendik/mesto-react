class Api{
  constructor({url, headers}){
    this.url = url;
    this.headers = headers;
  }
  
  getUserInfo(){
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  getCardsFromServer(){
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeUserInfo({name, about}){
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name, about})
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeAvatar(items){
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(items)
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  addNewCard(items){
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(items)
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  deleteCard(id){
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(id, isLiked){
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: isLiked ?  'PUT' : 'DELETE',
      headers: this.headers
    })
    .then(res =>{ 
      return this._getResponseData(res);
    });
  }

  _getResponseData(res){    
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    'Content-Type': 'application/json',
    authorization: '2211156a-197b-42d9-becd-f429311725f7'
  }
})

export default api;