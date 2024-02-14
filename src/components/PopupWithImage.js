import Popup from "./Popup.js";
//***POPUP IMAGE CONSTRUCTOR***
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._modalElement.querySelector(".modal__image");
    this._previewImageTitle = this._modalElement.querySelector(
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
