// getting profile elements from DOM
const profileNameElement = document.querySelector('.profile__name');
const profileStatusElement = document.querySelector('.profile__status');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// getting form elements from DOM
const profileEditForm = document.querySelector('.form_action_edit-profile-info');
const profileNameInput = document.querySelector('.form__input_data_profile-name');
const profileStatusInput = document.querySelector('.form__input_data_profile-status');

const newImageFormElement = document.querySelector('.form_action_add-new-image');

// getting popup elements from DOM
const popupElements = document.querySelectorAll('.popup');
const popupEditProfileInfoElement = document.querySelector('.popup__inner-form_edit-profile_info');
const popupAddNewImageElement = document.querySelector('.popup__inner-form_add-new-image');

// initial filling cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
initialCards.forEach(card => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');

  cardTitleElement.textContent = card.name;
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;

  cardsElement.insertAdjacentElement('beforeend', cardElement);
});

// difining common functions
function setProfileInfoInputs() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
}

// defining callback functions for listeners
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  togglePopup(popupEditProfileInfoElement);
}

// adding listeners
profileEditButton.addEventListener('click', function() {
  setProfileInfoInputs();
  togglePopup(popupEditProfileInfoElement);
});

profileAddButton.addEventListener('click', function() {
  togglePopup(popupAddNewImageElement);
});

popupElements.forEach(popupElement => {
  const popupCloseButton = popupElement.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', function() {
    togglePopup(popupElement);
  })
});

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
