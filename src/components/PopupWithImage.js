import Popup from "./Popup.js";
//***POPUP IMAGE CONSTRUCTOR***
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
    console.log(this);
  }
  //*** FUNCTIONALITY SETTINGS OPEN/CLOSE***
  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewImageTitle.textContent = name;
    super.open();
  }
}
