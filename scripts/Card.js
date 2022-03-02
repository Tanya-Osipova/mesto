import { openPopup } from "./index.js";

const popupElement = document.querySelector('.popup_image');
const popupImage = document.querySelector('.popup__container-modal-image');
const popupCaption = document.querySelector('.popup__container-caption');

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._image = data.image;
    this._cardSelector = cardSelector;
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
    // like
    this._element.querySelector('.cards__btn-like').addEventListener('click', () => {
      this._handleLike();
    });

    // delete
    this._element.querySelector('.cards__btn-trash').addEventListener('click', () => {
      this._handleDelete();
    });

    // open popup
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      popupImage.src = this._image;
      popupCaption.textContent = this._title;
      openPopup(popupElement);
    });
  }  
  
  // handle like
  _handleLike() {
    this._element.querySelector('.cards__btn-like').classList.toggle('cards__btn-like_active');
  }

  // handle delete
  _handleDelete() {
    this._element.remove();
  }
}

