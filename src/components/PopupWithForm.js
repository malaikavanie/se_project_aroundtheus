import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //***POPUPWITHFORM CONSTRUCTOR***
  constructor(popupSelector, formSubmit, { formSelector }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(formSelector);
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
  }

  //------------METHOD THAT COLLECTS THE INPUT VALUES-------------->>
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  //--------ADDS FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD---------->>
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._formSubmit(values);
    });
    super.setEventListeners();
  }
}
