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

const toggleButtonState = (inputList, saveElement, options) => {
  const { inactiveButtonClass } = options;

  if (hasInvalidInput(inputList)) {
    saveElement.classList.add(inactiveButtonClass);

    saveElement.setAttribute("disabled", true);
  } else {
    saveElement.classList.remove(inactiveButtonClass);

    saveElement.removeAttribute("disabled");
  }
};

function setEventListeners(formElement, options) {
  const { inputSelector } = options;

  const { submitSaveSelector } = options;

  const inputList = [...formElement.querySelectorAll(inputSelector)];

  const saveElement = formElement.querySelector(submitSaveSelector);

  toggleButtonState(inputList, saveElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);

      toggleButtonState(inputList, saveElement, options);
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

  submitSaveSelector: ".modal__save",

  inactiveSaveClass: "modal__save_disabled",

  inputErrorClass: "modal__input_type_error",

  errorClass: "modal__error_active",
};

enableValidation(config);
