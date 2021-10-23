import './index.css';

import {
  initialCards
} from '../utils/constants.js';
import {
  apiSettings,
  formClassesAndSelectors,
  cardClassesAndSelectors,
  popupClassesAndSelectors,
  pictureClassesAndSelectors,
  profileClassesAndSelectors,
  userCardTemplateSelector,
  othersCardTemplateSelector
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
import * as url from "url";


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

// getting user from server
api.getUser()
  .then(user => {
    avatarElement.src = user.avatar;

    userInfo.setInfo({
      name: user.name,
      status: user.about
    })
  });


// creating validators
const userInfoFormValidator = new FormValidator(formClassesAndSelectors, userInfoForm);
const newCardFormValidator = new FormValidator(formClassesAndSelectors, newCardForm);
const avatarFormValidator = new FormValidator(formClassesAndSelectors, avatarForm);


// creating sections
const cardsContainer = new Section({
  items: initialCards,
  render: renderCard
}, '.cards');



// creating popups
const userInfoPopup = new PopupWithForm(
  popupClassesAndSelectors,
  '.popup_content_edit-profile-form',
  formClassesAndSelectors,
  userInfoFormSubmit,
  userInfoFormValidator
);

const newCardPopup = new PopupWithForm (
  popupClassesAndSelectors,
  '.popup_content_add-card-form',
  formClassesAndSelectors,
  newCardFormSubmit,
  newCardFormValidator
);

const avatarPopup = new PopupWithForm(
  popupClassesAndSelectors,
  '.popup_content_change-avatar-form',
  formClassesAndSelectors,
  avatarFormSubmit,
  avatarFormValidator
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


// enabling forms validation
userInfoFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();


// adding listeners
userInfoButton.addEventListener('click', userInfoButtonClick);
newCardButton.addEventListener('click', newCardButtonClick);
avatarButton.addEventListener('click', avatarButtonClick);


// initial filling cards
cardsContainer.renderItems();


// defining handlers
function renderCard(cardData) {
  cardsContainer.addElementToEnd(createCardElement(cardData))
}

function confirmCardDeletion(card) {
  card.delete();

  cardOffPopup.close();
}

function avatarButtonClick() {
  avatarPopup.open();
}

function avatarFormSubmit(avatarData) {
  avatarElement.src = avatarData.imageUrl;

  avatarPopup.close();
}

function userInfoFormSubmit(profileData) {
  userInfo.setInfo(profileData)

  userInfoPopup.close();
}

function newCardFormSubmit(cardData) {
  cardsContainer.addElementToBegin(createCardElement(cardData));

  newCardPopup.close();
}

function cardImageClick(card) {
  cardImagePopup.open(card);
}

function cardDeleteButtonClick(card) {
  cardOffPopup.open(card);
}

function userInfoButtonClick() {
  userInfoPopup.setInputValues(userInfo.getInfo());

  userInfoPopup.open();
}

function newCardButtonClick() {
  newCardPopup.open();
}


// defining utility functions
function createCardElement(data) {
  return new CardOfUser(cardClassesAndSelectors,
    userCardTemplateSelector,
    data, cardImageClick,
    cardDeleteButtonClick).getElement();
}
