import Popup from "./Popup.js";
//***POPUP IMAGE CONSTRUCTOR***
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }
  //*** FUNCTIONALITY SETTINGS OPEN/CLOSE***
  open({ name, link }) {
    this._profileImage.src = url;
    this._profileImage.alt = name;
    this._profileTitle.textContent = title;
    super.open();
  }

  close() {
    super.close();
  }

  setEventListener() {
    super.setEventListener();
  }
}
