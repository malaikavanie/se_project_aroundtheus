import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  //***POPUPWITHCONFIRMATION CONSTRUCTOR***
  constructor(popupSelector, { submitButtonSelector }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");

    this._button = this._popupElement.querySelector(submitButtonSelector);
    this._originalButtonText = this._button.textContent;
  }

  //***CHANGE BUTTON TEXT***
  renderSaving(isSaving) {
    isSaving
      ? (this._button.textContent = "Deleting...")
      : (this._button.textContent = this._originalButtonText);
  }

  //***CONFIRMATION CALLBACK ***
  setCallback(callback) {
    this._callback = callback;
  }

  //***ADD FUNCTIONALITY TO THE SETEVENTLISTENERS***
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback();
    });
    super.setEventListeners();
  }
}
