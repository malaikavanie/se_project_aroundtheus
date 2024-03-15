import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  //***POPUPWITHCONFIRMATION CONSTRUCTOR***
  constructor(popupSelector, { submitButtonSelector }) {
    super(popupSelector);
    this._button = this._popupElement.querySelector(submitButtonSelector);
    this._originalButtonText = this._button.textContent;
  }

  //***CHANGE BUTTON TEXT***
  renderSaving(isSaving) {
    isSaving
      ? (this._button.textContent = "Saving...")
      : (this._button.textContent = this._originalButtonText);
  }

  //***CONFIRMATION CALLBACK ***
  setCallback(callback) {
    this._callback = callback;
  }

  //***ADD FUNCTIONALITY TO THE SETEVENTLISTENERS***
  setEventListeners() {
    this._button.addEventListener("click", () => {
      this._callback();
    });
    super.setEventListeners();
  }
}

/*/***ADDING FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD**
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._formSubmit(values);
    });
    super.setEventListeners();
  }
  */
