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
    this._pictureImage.src = link;
    this._pictureImage.alt = name;
    this._pictureTitle.textContent = name;
    super.open();
  }

  close() {
    super.close();
  }

  setEventListener() {
    super.setEventListener();
  }
}
