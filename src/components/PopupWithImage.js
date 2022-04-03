import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__container-caption');
    this._image = this._popup.querySelector('.popup__container-modal-image');
  }
   
  open({title, image, alt}) {
    super.open();
    this._title.textContent = title;
    this._image.src = image;
    this._image.alt = alt;
  }  
}