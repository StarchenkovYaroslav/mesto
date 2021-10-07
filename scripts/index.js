import * as settings from './settings.js';
import Card from './Card.js';
import Section from './Section.js';
import FormPopup from './FormPopup.js';
import PicturePopup from './PicturePopup.js';
import Profile from './Profile.js';


const initialCards = [
  {
    title: 'Архыз',
    imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    imageUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// getting elements from DOM
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-card-button');


// creating sections
const cardsContainer = new Section({
  items: initialCards,
  render: cardsContainerRenderer
}, '.cards');


// creating user
const profile = new Profile(settings.profileClassesAndSelectors);


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
  return new Card(settings.cardClassesAndSelectors, data, cardImageClickHandler);
}

function createFormPopup(elementSelector, formSubmitHandler) {
  return new FormPopup(
    settings.popupClassesAndSelectors,
    elementSelector,
    settings.formClassesAndSelectors,
    formSubmitHandler
  )
}

function createPicturePopup(elementSelector) {
  return new PicturePopup(
    settings.popupClassesAndSelectors,
    elementSelector,
    settings.pictureClassesAndSelectors
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
