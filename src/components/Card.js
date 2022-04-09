export default class Card {
  constructor(data, cardSelector, handleCardClick, handleDelete, api, userId) {
    this._title = data.name;
    this._image = data.link;
    this._alt = data.alt;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._likes = data.likes.length;
    this._api = api;
    this._userId = userId;
    this._ownerId = data.owner._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
    
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._cardImage =  this._element.querySelector('.cards__image');
    this._cardTitle = this._element.querySelector('.cards__title');
    this._likeButton = this._element.querySelector('.cards__btn-like');
    this._likesCounter = this._element.querySelector('.cards__like-counter');
    this._deleteButton = this._element.querySelector('.cards__btn-trash');
    
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._likesCounter.textContent = this._likes;
    this._element.id = this._id;
     
    if(this._userId === this._ownerId) {
      this._deleteButton.classList.add('cards__btn-trash_show')
    }
  
    this._setEventListeners();
    
    return this._element;
  }

  _setEventListeners() {
    
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete.open(this._id)
    });

    
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image, this._alt)
    });
    
  }  
  
  _handleLike() {
    if(!this._likeButton.classList.contains('cards__btn-like_active')) {
        //dislike
        this._api.likeCard(this._id)
          .then(res => {
            this._likesCounter.textContent = res.likes.length;
            this._likeButton.classList.add('cards__btn-like_active');
          })
          .catch((err)=> {
            console.log(err)
          })
    } else { 
        this._api.dislikeCard(this._id)
          .then(res => {
            this._likesCounter.textContent = res.likes.length
            this._likeButton.classList.remove('cards__btn-like_active');
          })
          .catch((err)=> {
            console.log(err)
          })
      }
  }
}
    

