import './index.css';

import {
  initialCards,
  addCardButton,
  editProfileButton,
  editProfileForm,
  addCardForm
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


// creating validators
const editProfileFormValidator = createFormValidator(editProfileForm);
const addCardFormValidator = createFormValidator(addCardForm);

// creating sections
const cardsContainer = new Section({
  items: initialCards,
  render: renderCardsItems
}, '.cards');


// creating user
const profile = new Profile(profileClassesAndSelectors);


// creating popups
const editProfilePopup = createFormPopup(
  '.popup_content_edit-profile-form',
  editProfileFormSubmit,
  editProfileFormValidator
);

const addCardPopup = createFormPopup(
  '.popup_content_add-card-form',
  addCardFormSubmit,
  addCardFormValidator
);

const picturePopup = createPicturePopup('.popup_content_picture',);


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
  cardsContainer.addElementToEnd( createCard(cardData).getElement() )
}

function editProfileFormSubmit(profileData) {
  profile.setInfo(profileData)

  editProfilePopup.close();
}

function addCardFormSubmit(cardData) {
  cardsContainer.addElementToBegin( createCard(cardData).getElement() );

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
function createFormValidator(formElement) {
  return new FormValidator(formClassesAndSelectors, formElement);
}

function createCard(data) {
  return new Card(cardClassesAndSelectors, data, cardImageClick);
}

function createFormPopup(elementSelector, formSubmitHandler, formValidator) {
  return new FormPopup(
    popupClassesAndSelectors,
    elementSelector,
    formClassesAndSelectors,
    formSubmitHandler,
    formValidator
  )
}

function createPicturePopup(elementSelector) {
  return new PicturePopup(
    popupClassesAndSelectors,
    elementSelector,
    pictureClassesAndSelectors
  )
}
