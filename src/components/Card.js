export default class Card {
  constructor(data, cardSelector, popup) {
    this._title = data.title;
    this._image = data.image;
    this._cardSelector = cardSelector;
    this._popup = popup
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
    this._setEventListeners();

    this._element.querySelector('.cards__image').src = this._image;
    this._element.querySelector('.cards__title').textContent = this._title;
    
    return this._element;
  }

  _setEventListeners() {
    
    this._element.querySelector('.cards__btn-like').addEventListener('click', () => {
      this._handleLike();
    });

    
    this._element.querySelector('.cards__btn-trash').addEventListener('click', () => {
      this._handleDelete();
    });

    
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._popup.open({
        title: this._title,
        image: this._image
      })
    });
    
  }  
  
  _handleLike() {
    this._element.querySelector('.cards__btn-like').classList.toggle('cards__btn-like_active');
  }

  _handleDelete() {
    this._element.remove();
  }
}

