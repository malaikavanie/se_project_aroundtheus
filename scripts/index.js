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

const imageAddForm = document.forms["addCardForm"];
const previewImage = document.querySelector(".modal__image");

const previewImageTitle = document.querySelector(".modal__image-title");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileCreateModal = document.querySelector(".modal__create");
const profileAddButton = document.querySelector(".profile__add-button");
const profileSaveModal = document.querySelector(".modal__save");
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
const profileAddForm = profileAddModal.querySelector(".modal__form");
const modalProfileEdit = document.querySelector("#modal-profile-edit");
const profileForm = document.forms["profileForm"];

const modalImagePreview = document.querySelector("#image-preview-modal");
const previewImageCloseButton =
  modalImagePreview.querySelector(".modal__close");

function createCard(data) {
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
}

const cardsContainer = document.querySelector(".cards__list");
const likeButtons = document.querySelectorAll(".card__like-button");
initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.append(card);
});

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle(" ");
  });
});

function openPopop(modal) {
  modal.classList.add("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  openPopop(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileEditCloseButton.addEventListener("click", () => {
  closePopop(profileEditModal);
});

function closePopop(modal) {
  modal.classList.remove("modal_opened");
}

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closePopop(profileEditModal);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
});

profileAddButton.addEventListener("click", () => {
  openPopop(profileAddModal);
  //cardTitleInput.value = cardTitle.textContent;
  //cardUrlInput.value = cardUrl.textContent;
});

profileAddCloseButton.addEventListener("click", () => {
  closePopop(profileAddModal);
});

previewImageCloseButton.addEventListener("click", () => {
  closePopop(modalImagePreview);
});

profileAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closePopop(profileAddModal);
  const userCard = {};
  userCard.link = cardUrlInput.value;
  userCard.name = cardTitleInput.value;
  const card = createCard(userCard);
  cardsContainer.prepend(card);
  profileAddForm.reset();
});

//function handleAddImageFormSubmit(evt) {
// evt.preventDefault();
// const userCard = {};
//userCard["name"] = modalImageTitle.value;
// userCard["url"] = modalImageUrl.value;
//const card = createCard(userCard);
//cardsContainer.prepend(card);
// imageAddForm.reset();
//closePopop(modalAddImage);}

//profileForm.addEventListener("submit", handleProfileFormSubmit);
//addButton.addEventListener("click", () => openModal(modalAddImage));
//imageAddForm.addEventListener("submit", handleAddImageFormSubmit);
