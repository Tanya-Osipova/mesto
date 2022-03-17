import { popupElement, popupImage, popupCaption } from "../utils/constants.js"
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popupSelector.querySelector('.popup__container-caption');
    this._image = this._popupSelector.querySelector('.popup__container-modal-image');
  }
   
  open({title, image}) {
    super.open();
    this._title.textContent = title;
    this._image.src = image;
  }  
}