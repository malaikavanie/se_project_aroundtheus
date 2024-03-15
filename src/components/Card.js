export default class Card {
  //***.CARD CONSTRUCTOR***
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  //***GET TEMPLATE***
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  //***GET THE CARD ELEMENT OUT OF THE TEMPLATE***
  getId() {
    return this._id;
  }

  //***ADD CARDS EVENT LISTENERS***
  _setEventListeners() {
    //***CLICK CARD EVENT LISTENER***
    this._imageElement.addEventListener("click", () => {
      this.handleImageClick(this._name, this._link);
    });

    //***CLICK LIKE EVENT LISTENER***
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });

    //*** CLICK DELETE EVENT LISTENER***
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
  }

  //*** HANDLE DELETE EVENT LISTENER***
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //***HANDLE CLICK LIKE EVENT LISTENER***
  _likeCard() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  ///***POPULATE CARD ***
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._setEventListeners();

    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", this._name);
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
