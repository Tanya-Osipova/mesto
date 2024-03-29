export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  // Promise
  _makeRequest(promise) {
    return promise.then((res) => {
      if(res.ok) {
        return res.json();
      }
      throw 'Ошибка запроса'
    }).then((obj) => {
      console.log(obj);
      return obj;
    })
  }

  // Get Cards
  getCards() {
    const promise = fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      
    return this._makeRequest(promise);
  } 

  // Get User Info
  getUserInfo() {
    const promise = fetch(`${this._url}/users/me`, {
      headers: this._headers
    })

    return this._makeRequest(promise);
  }

  // Update Profile
  updateProfile(name, about) {
    const promise = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  
    return this._makeRequest(promise);
  }

  // Add Card
  addCard(card) {
    const promise = fetch(`${this._url}/cards`, {
      method:'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    
    return this._makeRequest(promise);
  }

  // Update avatar
  updateAvatar(url) {
    const promise = fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
    console.log('test')
    console.log(avatar)
    return this._makeRequest(promise);
  }

  // Delete Card
  deleteCard(cardId) {
    const promise = fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  
    return this._makeRequest(promise);
  }

  // Like Card
  likeCard(cardId) {
    const promise = fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });

    return this._makeRequest(promise);
  }

  // Dislike Card
  dislikeCard(cardId) {
    const promise = fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });

    return this._makeRequest(promise);
  }
}


