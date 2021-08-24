// getting profile elements from DOM
let profileNameElement = document.querySelector('.profile__name');
let profileStatusElement = document.querySelector('.profile__status');
let profileEditButton = document.querySelector('.profile__edit-button');

// getting form elements from DOM
let profileEditForm = document.querySelector('.form_action_edit-profile-info');
let profileNameInput = document.querySelector('.form__input_data_profile-name');
let profileStatusInput = document.querySelector('.form__input_data_profile-status');

// getting popup elements from DOM
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

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

// defining callback functions for listeners
function openPopup() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
  popup.classList.add('popup_opened');
  profileNameInput.focus();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  closePopup();
}

// adding listeners
profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
