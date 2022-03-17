export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this.setEventListeners();
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__container-btn-close').addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handleClick.bind(this));
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
