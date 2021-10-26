import './index.css';

import {
  apiSettings,
  formClassesAndSelectors,
  cardClassesAndSelectors,
  popupClassesAndSelectors,
  pictureClassesAndSelectors,
  profileClassesAndSelectors,
  loadingMessage,
  errorMessage
} from '../utils/settings.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupForConfirmation from '../components/PopupForConfirmation.js';
import Api from '../components/Api.js';


// getting elements from DOM
const userInfoButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-card-button');
const avatarButton = document.querySelector('.profile__avatar-button');

const userInfoForm = document.querySelector('.form_action_edit-profile');
const newCardForm = document.querySelector('.form_action_add-card');
const avatarForm = document.querySelector('.form_action_change-avatar');

const avatarElement = document.querySelector('.profile__avatar');


// creating api
const api = new Api(apiSettings);


// creating userInfo
const userInfo = new UserInfo(profileClassesAndSelectors);


// creating sections
const cardsContainer = new Section(renderCard, '.cards');


// creating validators
const userInfoFormValidator = new FormValidator(formClassesAndSelectors, userInfoForm);
const newCardFormValidator = new FormValidator(formClassesAndSelectors, newCardForm);
const avatarFormValidator = new FormValidator(formClassesAndSelectors, avatarForm);


// creating popups
const userInfoPopup = new PopupWithForm(
  popupClassesAndSelectors,
  '.popup_content_edit-profile-form',
  formClassesAndSelectors,
  userInfoFormSubmit,
  userInfoFormValidator,
  loadingMessage
);

const newCardPopup = new PopupWithForm (
  popupClassesAndSelectors,
  '.popup_content_add-card-form',
  formClassesAndSelectors,
  newCardFormSubmit,
  newCardFormValidator,
  loadingMessage
);

const avatarPopup = new PopupWithForm(
  popupClassesAndSelectors,
  '.popup_content_change-avatar-form',
  formClassesAndSelectors,
  avatarFormSubmit,
  avatarFormValidator,
  loadingMessage
);

const cardOffPopup = new PopupForConfirmation(
  popupClassesAndSelectors,
  '.popup_content_confirm-delete-card-form',
  formClassesAndSelectors,
  confirmCardDeletion
);

const cardImagePopup = new PopupWithImage(
  popupClassesAndSelectors,
  '.popup_content_picture',
  pictureClassesAndSelectors
);


// getting user and initial cards form server
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setInfo(userData);

    cardsContainer.renderItems(initialCards);
  })
  .catch(() => {
    showServerError();
  });


// enabling forms validation
userInfoFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


// adding listeners
userInfoButton.addEventListener('click', userInfoButtonClick);
newCardButton.addEventListener('click', newCardButtonClick);
avatarButton.addEventListener('click', avatarButtonClick);


// defining callbacks
function renderCard(cardData) {
  cardsContainer.addElementToEnd(createCardElement(cardData, userInfo.getInfo()))
}

function confirmCardDeletion(card) {
  api.deleteCard(card)
    .then(() => {
      card.delete();

      cardOffPopup.close();
    })
    .catch(() => {
      showServerError();
    });
}

function avatarFormSubmit(avatarData) {
  avatarPopup.showLoadingMessage();

  api.editUserAvatar(avatarData)
    .then(userData => {
      userInfo.setInfo(userData);

      avatarPopup.close();
    })
    .catch(() => {
      showServerError();
    })
    .finally(() => {
      avatarPopup.hideLoadingMessage();
    });
}

function userInfoFormSubmit(userData) {
  userInfoPopup.showLoadingMessage();

  api.editUserInfo(userData)
    .then(userData => {
      userInfo.setInfo(userData);

      userInfoPopup.close();
    })
    .catch(() => {
      showServerError();
    })
    .finally(() => {
      userInfoPopup.hideLoadingMessage();
    });
}

function newCardFormSubmit(cardData) {
  newCardPopup.showLoadingMessage();

  api.addCard(cardData)
    .then(cardData => {
      cardsContainer.addElementToBegin(createCardElement(cardData, userInfo.getInfo()));
      newCardPopup.close();
    })
    .catch(() => {
      showServerError();
    })
    .finally(() => {
      newCardPopup.hideLoadingMessage();
    });
}

function cardImageClick(card) {
  cardImagePopup.open(card);
}

function cardDeleteButtonClick(card) {
  cardOffPopup.open(card);
}

function cardLikeButtonClick(card) {
  api.toggleCardLike(card)
    .then(cardData => {
      card.toggleLike(cardData);
    })
    .catch(showServerError);
}

function avatarButtonClick() {
  avatarPopup.open();
}

function userInfoButtonClick() {
  userInfoPopup.setInputValues(userInfo.getInfo());

  userInfoPopup.open();
}

function newCardButtonClick() {
  newCardPopup.open();
}


// defining utility functions
function createCardElement(cardData, userData) {
  return new Card(
    cardClassesAndSelectors,
    cardData,
    {
      handleImageClick: cardImageClick,
      handleLikeButtonClick: cardLikeButtonClick,
      handleDeleteButtonClick: cardDeleteButtonClick
    },
    userData,
  ).getElement();
}

function showServerError() {
  alert(errorMessage);
}
