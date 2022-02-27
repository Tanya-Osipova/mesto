const popupElement = document.querySelector('.popup_image');
const popupImage = document.querySelector('.popup__container-modal-image');
const popupCaption = document.querySelector('.popup__container-caption');
const popupCloseButton = document.querySelector('.popup__container-btn-close_image');

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
      this._handleOpenPopup();
    });

    // close popup
    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });

    document.addEventListener('keydown', (event) => {
      this._handleEscapeKey(event);
    });

    document.addEventListener('click', (event) => {
      this._handleOutsideClick(event);
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
  
  // handle open popup
  _handleOpenPopup() {
    popupImage.src = this._image;
    popupCaption.textContent = this._title;
    popupElement.classList.add('popup_opened');
  }

  // handle close popup
  _handleClosePopup() {
    popupImage.src = '';
    popupCaption.textContent = '';
    popupElement.classList.remove('popup_opened');
  }

  _handleEscapeKey(event) {
    if (event.key === 'Escape') {
      this._handleClosePopup()
    }
  }

  _handleOutsideClick(event) {
    if(event.target.classList.contains('popup_opened')) { 
      this._handleClosePopup(); 
    } 
  }
}

