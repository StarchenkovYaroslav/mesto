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
import FormPopup from '../components/FormPopup.js';
import PicturePopup from '../components/PicturePopup.js';
import Profile from '../components/Profile.js';
import FormValidator from '../components/FormValidator.js';


// getting elements from DOM
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-card-button');

export const editProfileForm = document.querySelector('.form_action_edit-profile');
export const addCardForm = document.querySelector('.form_action_add-card');


// creating validators
const editProfileFormValidator = new FormValidator(formClassesAndSelectors, editProfileForm);
const addCardFormValidator = new FormValidator(formClassesAndSelectors, addCardForm);

// creating sections
const cardsContainer = new Section({
  items: initialCards,
  render: renderCardsItems
}, '.cards');


// creating user
const profile = new Profile(profileClassesAndSelectors);


// creating popups
const editProfilePopup = new FormPopup(
  popupClassesAndSelectors,
  '.popup_content_edit-profile-form',
  formClassesAndSelectors,
  editProfileFormSubmit,
  editProfileFormValidator
);

const addCardPopup = new FormPopup (
  popupClassesAndSelectors,
  '.popup_content_add-card-form',
  formClassesAndSelectors,
  addCardFormSubmit,
  addCardFormValidator
);

const picturePopup = new PicturePopup(
  popupClassesAndSelectors,
  '.popup_content_picture',
  pictureClassesAndSelectors
);


// enabling forms validation
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();


// adding listeners
editProfileButton.addEventListener('click', editProfileButtonClick);

addCardButton.addEventListener('click', addCardButtonClick);


// initial filling cards
cardsContainer.renderItems();


// defining handlers
function renderCardsItems(cardData) {
  cardsContainer.addElementToEnd( createCardElement(cardData) )
}

function editProfileFormSubmit(profileData) {
  profile.setInfo(profileData)

  editProfilePopup.close();
}

function addCardFormSubmit(cardData) {
  cardsContainer.addElementToBegin( createCardElement(cardData) );

  addCardPopup.close();
}

function cardImageClick(card) {
  picturePopup.open(card);
}

function editProfileButtonClick() {
  editProfilePopup.setInputValues( profile.getInfo() );

  editProfilePopup.open();
}

function addCardButtonClick() {
  addCardPopup.open();
}


// defining utility functions
function createCardElement(data) {
  return new Card(cardClassesAndSelectors, data, cardImageClick).getElement();
}
