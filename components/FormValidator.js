export default class FormValidator {
  //***FORM VALIDATOR CONSTRUCTOR***
  constructor(
    formElement,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    }
  ) {
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  //***SHOWING INPUT ERROR***
  _showInputError = (inputElement) => {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  //***HIDIMG INPUT ERROR***
  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  };

  //***CHECKING ELEMENTS VALIDITY***
  _checkInputValidity = (inputElement) => {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //***CHECKING INPUT ELEMENTS VALIDITY***
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //-***TOGGLING SUBMIT BUTTON***
  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmit();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  //***SET EVENT LISTENERS***
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  //***CHECK VALIDITY***
  checkValidity() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList);
    });
  }

  //***METHOD TO ENABLE VALIDATION***
  enableValidation() {
    this._setEventListeners();
  }

  //***DISABLE SUBMIT BUTTON***
  disableSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  //***RESET THE FORM***
  resetForm() {
    this._formElement.reset();
  }
}
