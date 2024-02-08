//***IMPORT SETTINGS***
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

//***OBJECT-CARDS ARRAY SETTINGS***
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//***CONST SELECTION SETTINGS***
const imageAddForm = document.forms["addCardForm"];
const closeButtons = document.querySelectorAll(".modal__close");
const previewImage = document.querySelector(".modal__image");
const previewImageTitle = document.querySelector(".modal__image-title");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileCreateModal = document.querySelector("#profile-create-modal");
const profileAddButton = document.querySelector(".profile__add-button");
const profileSaveModal = document.querySelector("#profile-save-modal");
const profileTitle = document.querySelector(".profile__title");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileAddCloseButton = profileAddModal.querySelector(".modal__close");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = profileAddModal.querySelector(".modal__form");
const modalProfileEdit = document.querySelector("#modal-profile-edit");
const modalImagePreview = document.querySelector("#image-preview-modal");
const previewImageCloseButton =
  modalImagePreview.querySelector(".modal__close");

//***FUNCTION CREATE CARDS***
/*function createCard(data) {
  const cardTemplate = document.querySelector("#card").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = data.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    previewImage.setAttribute("src", data.link);
    previewImage.setAttribute("alt", data.name);
    previewImageTitle.textContent = data.name;
    openPopop(modalImagePreview);
  });
  return cardElement; 
} */

//***CARD LIKE SETTINGS***
/*const cardsContainer = document.querySelector(".cards__list");
const likeButtons = document.querySelectorAll(".card__like-button");
initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.append(card);
}); */

//***NEW CREATE/RENDER CARD FUNCTION***
const cardsContainer = document.querySelector(".cards__list");

function renderCard(cardData) {
  const card = new Card(cardData, "#card", handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

//***RENDER INITIAL CARDS FUNCTION***
initialCards.reverse().forEach((cardData) => {
  renderCard(cardData);
});

//*** PREVIEW IMAGE SETTING***
function handleImageClick(name, link) {
  previewImage.setAttribute("src", link);
  previewImage.setAttribute("alt", name);
  previewImageTitle.textContent = name;
  openPopop(modalImagePreview);
}

//***ITERATE INITIAL CARDS IN REVERSE***
initialCards.reverse().forEach((cardData) => {
  renderCard(cardData);
});

//***FUNCTION OPEN MODAL***
function openPopop(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalWithEscape);
  modal.addEventListener("mousedown", closeModalWithRemoteClick);
}
//***EDIT BUTTON SETTINGS***
function fillProfileInputs() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}
profileEditButton.addEventListener("click", () => {
  openPopop(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileEditCloseButton.addEventListener("click", () => {
  closePopop(profileEditModal);
});

//***FUNCTION CLOSE MODAL***
function closePopop(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalWithEscape);
  modal.removeEventListener("mousedown", closeModalWithRemoteClick);
}

function closeModalWithEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopop(openedModal);
  }
}

function closeModalWithRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopop(evt.currentTarget);
  }
}

//***EDIT PROFILE SETTINGS***
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closePopop(profileEditModal);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
});
//***ADD BUTTON SETTINGS***
profileAddButton.addEventListener("click", () => {
  openPopop(profileAddModal);
});

profileAddCloseButton.addEventListener("click", () => {
  closePopop(profileAddModal);
});

previewImageCloseButton.addEventListener("click", () => {
  closePopop(modalImagePreview);
});

//***ADD IMAGE FUNCTION***
function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();
  const userCard = {};
  userCard["title"] = cardTitleInput.value;
  userCard["url"] = cardUrlInput.value;
  renderCard(userCard);
  formValidators.addCardForm.resetForm();
  formValidators.addCardForm.disableSubmit();
  closePopop(profileAddModal);
}
//***PROFILE EDIT MODAL EVENTS***
profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  formValidators.profileForm.checkValidity();
  openPopop(profileEditModal);
});

//***ADD IMAGE MODAL EVENTS***
profileAddButton.addEventListener("click", () => openPopop(profileAddModal));
imageAddForm.addEventListener("submit", handleProfileAddFormSubmit);

//***MODAL CLOSE EVENT LOOP***
closeButtons.forEach((button) => {
  const modal = button.closest(".modal__close");
  button.addEventListener("click", () => closePopop(modal));
});

//***OBJECT CONFIG SETTINGS***
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
  formSelector: ".modal__form",
};

//***FORM VALIDATOR SETTINGDS***
const formList = Array.from(document.querySelectorAll(config.formSelector));
const formValidators = {};
formList.forEach((form) => {
  const validator = new FormValidator(form, config);
  const formName = form.getAttribute("name");
  formValidators[formName] = validator;
});

//**ADD PROFILE VALIDATION***

formValidators.profileForm.enableValidation();

//**ADD CARD VALIDATION***
formValidators.addCardForm.enableValidation();

/*OTHER WAY TO ENABLE VALIDATION
const addcardFormValidator = new FormValidator( addCardForm , config);

const profileEditFormValidator = new FormValidator(profileEditForm, config);

addcardFormValidator.enableValidation();
profileEditFormValidator.enableValidation(); */
