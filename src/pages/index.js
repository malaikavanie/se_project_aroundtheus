//***IMPORT SETTINGS***
import "../pages/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

import {
  initialCards,
  config,
  profileEditButton,
  profileAddButton,
  profileInputList,
  editImageButton,
  formList,
  formValidators,
} from "../utils/Constants.js";
import UserInfo from "../components/UserInfo.js";

//*** NEW USER INFO***
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

//***CARD DELETE CONFIRMATION***
const deleteConfirmationPopup = new PopupWithConfirmation(
  "#modal-confirm-delete",
  config
);

//***CHANGE PROFILE IMAGE***
const avatarEditPopup = new PopupWithForm(
  "#modal-change-profile",
  handleAvatarFormSubmit,
  config
);

//***NEW API***
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "03277265-2976-4ddf-957d-4d187bc8c844",
    "Content-Type": "application/json",
  },
});
//***USER INFORMATION FROM THE API***
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      description: res.about,
    });
    userInfo.setUserAvatar(res.avatar);
  })
  .catch(console.error);

const cardsContainer = new Section(
  { items: [], renderer: renderCard },
  ".cards__list"
);
//*** INITIAL CARDS FROM THE API***
api
  .getInitialCards()
  .then((res) => {
    //***RENDERER METHOD ON CARDSCONTAINER***

    cardsContainer.rendererItems(res);
  })
  .catch(console.error);

//***PREVIEW IMAGE***
const previewPopup = new PopupWithImage("#image-preview-modal");

//***POPUPWITHFORM***
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit,
  config
);
/*/***FUNCTION HANDLING DELETE SUBMIT***
function handleDeleteFormSubmit(values) {
  deleteConfirmationPopup.renderSaving(true);
  api
    .deleteCard(values)
    .then((res) => {
      const deleteCard = renderCard(res);
      cardsContainer.deleteItem(deleteCard);
      formValidators.deleteForm.resetForm();
      deleteConfirmationPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      deleteConfirmationPopup.renderSaving(false);
    });
}

*/

//***FUNCTION HANDLING DELETE CLICK***
function handleDeleteClick(card) {
  //console.log(card);
  deleteConfirmationPopup.open();
  deleteConfirmationPopup.setCallback(() => {
    deleteConfirmationPopup.renderSaving(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        deleteConfirmationPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteConfirmationPopup.renderSaving(false);
      });
  });
}

//***FUNCTION HANDLING LIKE CLICK***
function handleLikeClick(card) {
  api
    .likeCard(card.getId(), card.isLiked)
    .then((res) => card.toggleLikeCard(res.isLiked))
    .catch(console.error);
}

//***FUNCTION HANDLING AVATAR EDIT SUBMIT***
function handleAvatarFormSubmit(values) {
  avatarEditPopup.renderSaving(true);
  api
    .updateAvatar(values)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarEditPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarEditPopup.renderSaving(false);
    });
}

//***FUNCTION HANDLING PROFILE EDIT SUBMIT***
function handleProfileFormSubmit(values) {
  //profileEditPopup.renderLoading(true);
  profileEditPopup.renderSaving(true);
  api
    .editProfile(values)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });
      profileEditPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      profileEditPopup.renderSaving(false);
    });
}
//***POPUPWITHFORMIMAGE***
const addCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddImageFormSubmit,
  config
);

//***FUNCTION ADD IMAGE SUBMIT***
function handleAddImageFormSubmit(values) {
  addCardPopup.renderSaving(true);
  api
    .addCard(values)
    .then((res) => {
      const newCard = renderCard(res);
      cardsContainer.addItem(newCard);
      formValidators.addCardForm.resetForm();
      formValidators.addCardForm.disableSubmit();
      addCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      addCardPopup.renderSaving(false);
    });
}

//***FORM VALIDATOR CREATOR***
formList.forEach((form) => {
  const validator = new FormValidator(form, config);
  const formName = form.getAttribute("name");
  validator.enableValidation();
  formValidators[formName] = validator;
});

//***RENDER CARD FUNCTION***
function renderCard(cardData) {
  // console.log(cardData);
  const card = new Card(
    cardData,
    "#card",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.generateCard();
}

/*/***NEW SECTION***
const cardsContainer = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);*/

//***RENDER CARDSCONTAINER***
//cardsContainer.rendererItems();

/* **ADD IMAGE SUBMIT***
function handleAddImageFormSubmit(values) {
  const newCard = renderCard(values);
  cardsContainer.addItem(newCard);
  formValidators.addCardForm.resetForm();
  formValidators.addCardForm.disableSubmit();
  addCardForm.close();
}*/

//***POPULATE PREVIEW POPUP***
function handleImageClick(name, link) {
  previewPopup.open({ name, link });
}

/*/*** FILL INPUTS OF PROFILE EDIT POPUP ***
function fillProfileInputs() {
  const userCurrentInfo = userInfo.getUserInfo();
  profileInputList[0].value = userCurrentInfo.title;
  profileInputList[1].value = userCurrentInfo.description;
}*/

//***  CLICK EVENT LISTENER FOR THE EDIT BUTTON***
profileEditButton.addEventListener("click", () => {
  //const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(userInfo.getUserInfo());

  formValidators.profileForm.checkValidity();
  profileEditPopup.open();
});

//***CLICK EVENT LISTENER FOR THE ADD BUTTON***
profileAddButton.addEventListener("click", () => addCardPopup.open());

//*** EVENT LISTENERS FOR THE EDIT PROFILE MODAL***
profileEditPopup.setEventListeners();

//***EVENT LISTENERS TO THE ADD IMAGE***
addCardPopup.setEventListeners();

// *** EVENT LISTENERS FOR THE PREVIEW IMAGE MODAL****
previewPopup.setEventListeners();

//***ADD A CLICK EVENT LISTENER TO THE EDIT PICTURE BUTTON***
editImageButton.addEventListener("click", () => avatarEditPopup.open());

//***ADD EVENT LISTENERS TO THE CHANGE PICTURE MODAL***
avatarEditPopup.setEventListeners();

//***ADD EVENT LISTENERS TO THE DELETE CONFIRMATION MODAL***
deleteConfirmationPopup.setEventListeners();
