export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.title;
    this._image = data.image;
    this._alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    
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
    this._deleteButton = this._element.querySelector('.cards__btn-trash');
    

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    this._setEventListeners();
    
    return this._element;
  }

  _setEventListeners() {
    
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image, this._alt)
    });
    
  }  
  
  _handleLike() {
    this._likeButton.classList.toggle('cards__btn-like_active');
  }

  _handleDelete() {
    this._element.remove();
  }
}

