//***IMPORT SETTINGS***
import "../pages/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  initialCards,
  config,
  profileEditButton,
  profileAddButton,
  profileInputList,
  formList,
  formValidators,
} from "../utils/Constants.js";
import UserInfo from "../components/UserInfo.js";

//*** NEW USER INFO***
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

//***FORM VALIDATOR CREATOR***
formList.forEach((form) => {
  const validator = new FormValidator(form, config);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = validator;
});

//***RENDER CARD FUNCTION***
function renderCard(cardData) {
  const card = new Card(cardData, "#card", handleImageClick);
  return card.generateCard();
}

//***NEW SECTION***
const cardsContainer = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

//***RENDER CARDSCONTAINER***
cardsContainer.rendererItems();

//***POPUPWITHFORM***
const profileEditModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit,
  config
);

//***POPUPWITHFORMIMAGE***
const profileAddModal = new PopupWithForm(
  "#profile-add-modal",
  handleAddImageFormSubmit,
  config
);

//***PREVIEW IMAGE***
const modalImagePreview = new PopupWithImage("#image-preview-modal");

//***PROFILE EDIT SUBMIT***
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values);
  profileEditModal.close();
}

//***ADD IMAGE SUBMIT***
function handleAddImageFormSubmit(values) {
  const newCard = renderCard(values);
  cardsContainer.addItem(newCard);
  formValidators.addCardForm.resetForm();
  formValidators.addCardForm.disableSubmit();
  profileAddModal.close();
}

//***POPULATE PREVIEW MODAL***
function handleImageClick(name, link) {
  previewModal.open({ name, link });
}

//*** FILL INPUTS OF PROFILE EDIT MODAL ***
function fillProfileInputs() {
  const userCurrentInfo = userInfo.getUserInfo();
  profileInputList[0].value = userCurrentInfo.name;
  profileInputList[1].value = userCurrentInfo.description;
}

//***  CLICK EVENT LISTENER FOR THE EDIT BUTTON***
profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  formValidators.profileForm.checkValidity();
  profileEditModal.open();
});

//***CLICK EVENT LISTENER FOR THE ADD BUTTON***
profileAddButton.addEventListener("click", () => addImageModal.open());

//*** EVENT LISTENERS FOR THE EDIT PROFILE MODAL***
profileEditModal.setEventListeners();

//***EVENT LISTENERS TO THE ADD IMAGE***
addImageModal.setEventListeners();

// *** EVENT LISTENERS FOR THE PREVIEW IMAGE MODAL****
modalImagePreview.setEventListeners();

/* /***OBJECT-CARDS ARRAY SETTINGS***
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

//***NEW CREATE/RENDER CARD FUNCTION***
const cardsContainer = document.querySelector(".cards__list");

function renderCard(cardData) {
  const card = new Card(cardData, "#card", handleImageClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}
//*** APPEND CARDS***
function appendCard(cardData) {
  const cardElement = createCard(cardData);
  cardsContainer.append(cardElement);
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
  openPopup(modalImagePreview);
}

//***FUNCTION OPEN MODAL***
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalWithEscape);
  modal.addEventListener("mousedown", closeModalWithRemoteClick);
}
//***EDIT BUTTON SETTINGS***
function fillProfileInputs() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}
/*profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

//***FUNCTION CLOSE MODAL***
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalWithEscape);
  modal.removeEventListener("mousedown", closeModalWithRemoteClick);
}

function closeModalWithEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function closeModalWithRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

//***EDIT PROFILE SETTINGS***
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closePopup(profileEditModal);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
});
profileAddCloseButton.addEventListener("click", () => {
  closePopup(profileAddModal);
});
previewImageCloseButton.addEventListener("click", () => {
  closePopup(modalImagePreview);
});

//***ADD IMAGE FUNCTION***
function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();
  const userCard = {};

  userCard.name = cardTitleInput.value;
  userCard.link = cardUrlInput.value;

  renderCard(userCard);
  formValidators.addCardForm.resetForm();
  formValidators.addCardForm.disableSubmit();
  closePopup(profileAddModal);
}
//***PROFILE EDIT MODAL EVENTS***
profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  formValidators.profileForm.checkValidity();
  openPopup(profileEditModal);
});

//***ADD IMAGE MODAL EVENTS***
profileAddButton.addEventListener("click", () => openPopup(profileAddModal));
imageAddForm.addEventListener("submit", handleProfileAddFormSubmit);

//***OBJECT CONFIG SETTINGS***
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
  formSelector: ".modal__form",
};

//***FORM VALIDATOR SETTINGS***
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

/* **MODAL CLOSE EVENT LOOP***
closeButtons.forEach((button) => {
  const modal = button.closest(".modal__close");
  button.addEventListener("click", () => closePopup(modal));
});*/
