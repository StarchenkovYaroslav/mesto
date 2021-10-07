import * as constants from './constants.js';
import Card from './Card.js';
import Section from './Section.js';
import FormPopup from './FormPopup.js';
import PicturePopup from './PicturePopup.js';
import Profile from './Profile.js';


// getting elements from DOM
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-card-button');


// creating sections
const cardsContainer = new Section({
  items: constants.initialCards,
  render: cardsContainerRenderer
}, '.cards');


// creating user
const profile = new Profile(constants.profileClassesAndSelectors);


// creating popups
const editProfilePopup = createFormPopup(
  '.popup_content_edit-profile-form',
  editProfileFormSubmitHandler
);

const addCardPopup = createFormPopup(
  '.popup_content_add-card-form',
  addCardFormSubmitHandler
);

const picturePopup = createPicturePopup('.popup_content_picture',);


// defining functions
function createCard(data) {
  return new Card(constants.cardClassesAndSelectors, data, cardImageClickHandler);
}

function createFormPopup(elementSelector, formSubmitHandler) {
  return new FormPopup(
    constants.popupClassesAndSelectors,
    elementSelector,
    constants.formClassesAndSelectors,
    formSubmitHandler
  )
}

function createPicturePopup(elementSelector) {
  return new PicturePopup(
    constants.popupClassesAndSelectors,
    elementSelector,
    constants.pictureClassesAndSelectors
  )
}

function cardsContainerRenderer(cardData) {
  cardsContainer.addElementToEnd( createCard(cardData).getElement() )
}

function editProfileFormSubmitHandler(profileData) {
  profile.setInfo(profileData)

  editProfilePopup.close();
}

function addCardFormSubmitHandler(cardData) {
  cardsContainer.addElementToBegin( createCard(cardData).getElement() );

  addCardPopup.resetForm();

  addCardPopup.close();
}

function cardImageClickHandler(card) {
  picturePopup.open(card);
}

function profileEditButtonClickHandler() {
  editProfilePopup.setInputValues( profile.getInfo() );

  editProfilePopup.open();
}

function profileAddButtonClickHandler() {
  addCardPopup.open();
}


// adding listeners
editProfileButton.addEventListener('click', profileEditButtonClickHandler);

addCardButton.addEventListener('click', profileAddButtonClickHandler);


// initial filling cards
cardsContainer.renderItems();
