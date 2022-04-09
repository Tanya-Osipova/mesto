export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton =  this._popup.querySelector('.popup__container-btn-close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this.setEventListeners();
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleClick);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleClick);
  }

  setEventListeners() {
   this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleClick(event) {
    if(event.target.classList.contains('popup_opened')) { 
      this.close(); 
    } 
  }
}
