import './index.css';

import {
  initialCards
} from '../utils/constants.js';
import {
  formClassesAndSelectors,
  cardClassesAndSelectors,
  popupClassesAndSelectors,
  pictureClassesAndSelectors,
  profileClassesAndSelectors
} from '../utils/settings.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';


// getting elements from DOM
export const userInfoButton = document.querySelector('.profile__edit-button');
export const newCardButton = document.querySelector('.profile__add-card-button');

export const userInfoForm = document.querySelector('.form_action_edit-profile');
export const newCardForm = document.querySelector('.form_action_add-card');


// creating validators
const userInfoFormValidator = new FormValidator(formClassesAndSelectors, userInfoForm);
const newCardFormValidator = new FormValidator(formClassesAndSelectors, newCardForm);


// creating sections
const cardsContainer = new Section({
  items: initialCards,
  render: renderCard
}, '.cards');


// creating userInfo
const userInfo = new UserInfo(profileClassesAndSelectors);


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

const cardImagePopup = new PopupWithImage(
  popupClassesAndSelectors,
  '.popup_content_picture',
  pictureClassesAndSelectors
);


// enabling forms validation
userInfoFormValidator.enableValidation();
newCardFormValidator.enableValidation();


// adding listeners
userInfoButton.addEventListener('click', userInfoButtonClick);

newCardButton.addEventListener('click', newCardButtonClick);


// initial filling cards
cardsContainer.renderItems();


// defining handlers
function renderCard(cardData) {
  cardsContainer.addElementToEnd(createCardElement(cardData))
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

function userInfoButtonClick() {
  userInfoPopup.setInputValues(userInfo.getInfo());

  userInfoPopup.open();
}

function newCardButtonClick() {
  newCardPopup.open();
}


// defining utility functions
function createCardElement(data) {
  return new Card(cardClassesAndSelectors, data, cardImageClick).getElement();
}
