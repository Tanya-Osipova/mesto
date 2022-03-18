import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('form');
    this.inputFields = this._form.querySelectorAll('input');
  }

  _getInputValues() {
    return Array.from(this.inputFields).map((inputfield) => inputfield.value)
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.querySelector('.popup__container-btn-close').addEventListener('click', () => {
      this.close();
    });

    this._popupSelector.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
