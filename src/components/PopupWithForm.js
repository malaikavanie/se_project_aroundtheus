import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //***POPUPWITHFORM CONSTRUCTOR***
  constructor(
    popupSelector,
    formSubmit,
    { formSelector, submitButtonSelector }
  ) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(formSelector);
    this._button = this._popupElement.querySelector(submitButtonSelector);
    //this._submitButtonText = this._submitButton.textContent;
    this._formSubmit = formSubmit;
    this._originalButtonText = this._button.textContent;

    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
  }

  //***COLLECTING THE INPUT VALUES***
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  //***ADDING FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD**
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._formSubmit(values);
    });
    super.setEventListeners();
  }
  //***SET MODAL INPUTS***
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderSaving(isSaving) {
    isSaving
      ? (this._button.textContent = "Saving...")
      : (this._button.textContent = this._originalButtonText);
  }
  /*/***CHANGE BUTTON TEXT WITH RENDER LOADING***
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._originalButtonText;
    }*/
}
