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
  render: (cardData) => {
    cardsContainer.addElementToEnd( createCard(cardData).getElement() );
  }
}, '.cards');


// creating user
const profile = new Profile(settings.profileClassesAndSelectors);

// creating popups
const editProfilePopup = new FormPopup(
  settings.popupClassesAndSelectors,
  '.popup_content_edit-profile-form',
  settings.formClassesAndSelectors,
  (profileData) => {
    profile.setInfo(profileData)

    editProfilePopup.close();
  }
)

const addCardPopup = new FormPopup(
  settings.popupClassesAndSelectors,
  '.popup_content_add-card-form',
  settings.formClassesAndSelectors,
  (cardData) => {
    cardsContainer.addElementToBegin( createCard(cardData).getElement() );

    addCardPopup.resetForm();

    addCardPopup.close();
  }
)

const picturePopup = new PicturePopup(
  settings.popupClassesAndSelectors,
  '.popup_content_picture',
  settings.pictureClassesAndSelectors
)

// defining functions
function createCard(data) {
  return new Card(settings.cardClassesAndSelectors, data, cardImageClickHandler);
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
