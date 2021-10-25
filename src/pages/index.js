import './index.css';

import {
  apiSettings,
  formClassesAndSelectors,
  cardClassesAndSelectors,
  popupClassesAndSelectors,
  pictureClassesAndSelectors,
  profileClassesAndSelectors,
  userCardTemplateSelector,
  othersCardTemplateSelector,
  loadingMessage,
  errorMessage
} from '../utils/settings.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import CardOfUser from '../components/CardOfUser.js';
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


// getting user from server
let user;

api.getUser()
  .then(userData => {
    user = userData;

    avatarElement.src = user.avatar;

    userInfo.setInfo({
      name: user.name,
      about: user.about
    })
  })
  .catch(() => {
    alert(errorMessage);
  });


// getting initial cards from server
api.getInitialCards()
  .then(initialCards => {
    cardsContainer.renderItems(initialCards);
  })
  .catch(() => {
    alert(errorMessage);
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
  cardsContainer.addElementToEnd(createCardElement(cardData, user))
}

function confirmCardDeletion(card) {
  api.deleteCard(card)
    .then(() => {
      card.delete();

      cardOffPopup.close();
    })
    .catch(() => {
      alert(errorMessage);
    });
}

function avatarFormSubmit(avatarData) {
  avatarPopup.showLoadingMessage();

  api.editUserAvatar(avatarData)
    .then(userData => {
      user = userData;

      avatarElement.src = user.avatar;

      avatarPopup.close();
    })
    .catch(() => {
      alert(errorMessage);
    })
    .finally(() => {
      avatarPopup.hideLoadingMessage();
    });
}

function userInfoFormSubmit(userData) {
  userInfoPopup.showLoadingMessage();

  api.editUserInfo(userData)
    .then(userData => {
      user = userData;

      userInfo.setInfo(user);

      userInfoPopup.close();
    })
    .catch(() => {
      alert(errorMessage);
    })
    .finally(() => {
      userInfoPopup.hideLoadingMessage();
    });
}

function newCardFormSubmit(cardData) {
  newCardPopup.showLoadingMessage();

  api.addCard(cardData)
    .then(cardData => {
      cardsContainer.addElementToBegin(createCardElement(cardData, user));
      newCardPopup.close();
    })
    .catch(() => {
      alert(errorMessage);
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
    .catch(() => {
      alert(errorMessage);
    });
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
function createCardElement(cardData, user) {
  if (cardData.owner._id === user._id) {
    return new CardOfUser(
      cardClassesAndSelectors,
      userCardTemplateSelector,
      cardData,
      {
        handleImageClick: cardImageClick,
        handleLikeButtonClick: cardLikeButtonClick,
        handleDeleteButtonClick: cardDeleteButtonClick
      },
      user,
    ).getElement();
  } else {
    return new Card(
      cardClassesAndSelectors,
      othersCardTemplateSelector,
      cardData,
      {
        handleImageClick: cardImageClick,
        handleLikeButtonClick: cardLikeButtonClick
      },
      user,
    ).getElement();
  }
}
