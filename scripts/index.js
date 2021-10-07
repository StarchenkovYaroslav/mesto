import * as settings from './settings.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';

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
const profileNameElement = document.querySelector('.profile__name');
const profileStatusElement = document.querySelector('.profile__status');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-card-button');

const editProfileForm = document.querySelector('.form_action_edit-profile');
const profileNameInput = document.querySelector('.form__input_data_profile-name');
const profileStatusInput = document.querySelector('.form__input_data_profile-status');

const addCardForm = document.querySelector('.form_action_add-card');
const cardTitleInput = document.querySelector('.form__input_data_card-title');
const cardImageUrlInput = document.querySelector('.form__input_data_card-image-url');

const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup_content_edit-profile-form');
const addCardPopup = document.querySelector('.popup_content_add-card-form');
const picturePopup = document.querySelector('.popup_content_picture');

const pictureImageElement = document.querySelector('.picture__image');
const pictureDescriptionElement = document.querySelector('.picture__description');

// creating validators
const editProfileFormValidator = new FormValidator(settings.formClassesAndSelectors, editProfileForm);
const addCardFormValidator = new FormValidator(settings.formClassesAndSelectors, addCardForm);


// creating sections
const cardsContainer = new Section({
  items: initialCards,
  render: (cardData) => {
    cardsContainer.addElementToEnd( createCard(cardData).getElement() );
  }
}, '.cards');


// defining functions
function createCard(data) {
  return new Card(settings.cardClassesAndSelectors, data, cardImageClickHandler);
}

function setFormInputsValues(form, formValidator, data) {
  const inputs = Array.from(form.querySelectorAll('.form__input'));

  inputs.forEach(input => {
    if (input.name in data) {
      input.value = data[input.name];
    } else {
      throw new Error('inputs and data dont match');
    }
  });

  formValidator.resetValidation();
}

function resetForm(form, formValidator) {
  form.reset();
  formValidator.resetValidation();
}

function setProfileElementsValues(profile) {
  profileNameElement.textContent = profile.name;
  profileStatusElement.textContent = profile.status;
}

function setPictureElementsValues(card) {
  pictureImageElement.src = card.imageUrl;
  pictureImageElement.alt = card.title;
  pictureDescriptionElement.textContent = card.title;
}

function openPopup(popup) {
  document.addEventListener('keydown', documentKeyHandler);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', documentKeyHandler);
  popup.classList.remove('popup_opened');
}

function documentKeyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup( document.querySelector('.popup_opened') );
  }
}

function cardImageClickHandler(card) {
  setPictureElementsValues(card);
  openPopup(picturePopup);
}

function popupMousedownHandler(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup( evt.target.closest('.popup') );
  }
}

function profileEditButtonClickHandler() {
  setFormInputsValues(editProfileForm, editProfileFormValidator, {
    name: profileNameElement.textContent,
    status: profileStatusElement.textContent
  });

  openPopup(editProfilePopup);
}

function profileAddButtonClickHandler() {
  openPopup(addCardPopup);
}

function editProfileFormSubmitHandler() {
  setProfileElementsValues({
    name: profileNameInput.value,
    status: profileStatusInput.value
  });

  closePopup(editProfilePopup);
}

function addCardFormSubmitHandler() {
  const cardData = {
    title: cardTitleInput.value,
    imageUrl: cardImageUrlInput.value
  }
  cardsContainer.addElementToBegin( createCard(cardData).getElement() );

  resetForm(addCardForm, addCardFormValidator);

  closePopup(addCardPopup);
}


// adding listeners
editProfileButton.addEventListener('click', profileEditButtonClickHandler);

addCardButton.addEventListener('click', profileAddButtonClickHandler);

popups.forEach(popup => {
  popup.addEventListener('mousedown', popupMousedownHandler);
});

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

addCardForm.addEventListener('submit', addCardFormSubmitHandler);


// initial filling cards
cardsContainer.renderItems();

// init form validation
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
