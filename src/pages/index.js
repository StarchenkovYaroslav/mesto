import './index.css';

import {
  initialCards,
  addCardButton,
  editProfileButton
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
  editProfileFormSubmitHandler
);

const addCardPopup = createFormPopup(
  '.popup_content_add-card-form',
  addCardFormSubmitHandler
);

const picturePopup = createPicturePopup('.popup_content_picture',);


// adding listeners
editProfileButton.addEventListener('click', editProfileButtonClickHandler);

addCardButton.addEventListener('click', addCardButtonClickHandler);


// initial filling cards
cardsContainer.renderItems();


// defining handlers
function renderCardsItems(cardData) {
  cardsContainer.addElementToEnd( createCard(cardData).getElement() )
}

function editProfileFormSubmitHandler(profileData) {
  profile.setInfo(profileData)

  editProfilePopup.close();
}

function addCardFormSubmitHandler(cardData) {
  cardsContainer.addElementToBegin( createCard(cardData).getElement() );

  addCardPopup.close();
}

function cardImageClickHandler(card) {
  picturePopup.open(card);
}

function editProfileButtonClickHandler() {
  editProfilePopup.setInputValues( profile.getInfo() );

  editProfilePopup.open();
}

function addCardButtonClickHandler() {
  addCardPopup.open();
}


// defining utility functions
function createCard(data) {
  return new Card(cardClassesAndSelectors, data, cardImageClickHandler);
}

function createFormPopup(elementSelector, formSubmitHandler) {
  return new FormPopup(
    popupClassesAndSelectors,
    elementSelector,
    formClassesAndSelectors,
    formSubmitHandler
  )
}

function createPicturePopup(elementSelector) {
  return new PicturePopup(
    popupClassesAndSelectors,
    elementSelector,
    pictureClassesAndSelectors
  )
}