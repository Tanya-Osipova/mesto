import PopupWithForm from "./PopupWithForm.js";

export default class PopupDelete extends PopupWithForm {
  constructor(popupSelector,submitForm) {
    super(popupSelector)
    this._submitForm = submitForm;
    this._id = ''
  }

  open(id) {
    super.open()
    this._id = id
  }
  
  setEventListeners() {
    //super.setEventListeners();
    
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Удаление...';
      this._submitForm(this._id)
        .then(() => this.close())
        .finally(() => {
          this._submitButton.textContent = 'Да';
        })
    });
  }
}