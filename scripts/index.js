import * as settings from './settings.js';
import FormValidator from './FormValidator.js';

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

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const pictureImageElement = document.querySelector('.picture__image');
const pictureDescriptionElement = document.querySelector('.picture__description');

const forms = document.querySelectorAll('.form');


// defining functions
function setFormInputsValues(form, data) {
  const inputs = Array.from(form.querySelectorAll('.form__input'));

  inputs.forEach(input => {
    if (input.name in data) {
      input.value = data[input.name];
    } else {
      throw new Error('inputs and data dont match');
    }
  });

  new FormValidator(settings.formClassesAndSelectors, form).resetValidation();
}

function resetForm(form) {
  form.reset();
  new FormValidator(settings.formClassesAndSelectors, form).resetValidation();
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

function popupMousedownHandler(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup( evt.target.closest('.popup') );
  }
}

function profileEditButtonClickHandler() {
  setFormInputsValues(editProfileForm, {
    name: profileNameElement.textContent,
    status: profileStatusElement.textContent
  });

  openPopup(editProfilePopup);
}

function profileAddButtonClickHandler() {
  openPopup(addCardPopup);
}

function cardImageClickHandler(evt) {
  setPictureElementsValues({
    title: evt.target.closest('.card').querySelector('.card__title').textContent,
    imageUrl: evt.target.src
  });

  openPopup(picturePopup);
}

function cardLikeButtonClickHandler(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function cardDeleteButtonClickHandler(evt) {
  evt.target.closest('.card').remove();
}

function createCardElement(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitleElement.textContent = card.title;
  cardImageElement.src = card.imageUrl;
  cardImageElement.alt = card.title;

  cardImageElement.addEventListener('click', cardImageClickHandler);
  cardLikeButton.addEventListener('click', cardLikeButtonClickHandler);
  cardDeleteButton.addEventListener('click', cardDeleteButtonClickHandler);

  return cardElement;
}

function editProfileFormSubmitHandler() {
  setProfileElementsValues({
    name: profileNameInput.value,
    status: profileStatusInput.value
  });

  closePopup(editProfilePopup);
}

function addCardFormSubmitHandler() {
  const cardElement = createCardElement({
    title: cardTitleInput.value,
    imageUrl: cardImageUrlInput.value
  });
  cardsElement.prepend(cardElement);

  resetForm(addCardForm);

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
initialCards.forEach(initialCard => {
  cardsElement.append( createCardElement(initialCard) );
});

// init form validation
forms.forEach(form => {
  new FormValidator(settings.formClassesAndSelectors, form).enableValidation();
});
