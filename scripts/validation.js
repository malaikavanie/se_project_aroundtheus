const showInputError = (formElement, inputElement, options) => {
  const { inputErrorClass, errorClass } = options;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const { inputErrorClass, errorClass } = options;

  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);

  errorElement.classList.remove(errorClass);

  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, options) => {
  const { inactiveButtonClass } = options;

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);

    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);

    buttonElement.removeAttribute("disabled");
  }
};

function setEventListeners(formElement, options) {
  const { inputSelector } = options;

  const { submitButtonSelector } = options;

  const inputList = [...formElement.querySelectorAll(inputSelector)];

  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);

      toggleButtonState(inputList, buttonElement, options);
    });
  });
}

function enableValidation(options) {
  const { formSelector } = options;

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",

  inputSelector: ".modal__input",

  submitButtonSelector: ".modal__button",

  inactiveButtonClass: "modal__button_disabled",

  inputErrorClass: "modal__input_type_error",

  errorClass: "modal__error_active",
};

enableValidation(config);
