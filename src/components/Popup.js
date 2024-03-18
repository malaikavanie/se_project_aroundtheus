export default class Popup {
  //***POPUP CONSTRUCTOR***
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  //***ITTERATE OVER THE ITEMS ARRAY & RENDERS ITEM***
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  //***ADD DOM ELEMENT  TO THE CONTAINER***
  close = () => {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  };

  //***CLOSE POPUP WITH ESCAPE***
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  //***ADD CLICK EVENT LISTENER TO THE CLOSE BUTTON***
  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", this.close);
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
