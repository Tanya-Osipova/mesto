import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('form');
    this._inputList = this._form.querySelectorAll('.popup__container-input');
    this._submitButton = this._popup.querySelector('.popup__container-btn-submit');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popup.addEventListener('submit', () => {
      const currentButtonName = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._submitForm(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = currentButtonName;
        })
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
