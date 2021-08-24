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
const imageTitleInput = document.querySelector('.form__input_data_image-title');
const imageLinkInput = document.querySelector('.form__input_data_image-path');

// getting popup elements from DOM
const popupElements = document.querySelectorAll('.popup');
const popupEditProfileInfoElement = document.querySelector('.popup__inner-form_edit-profile_info');
const popupAddNewImageElement = document.querySelector('.popup__inner-form_add-new-image');

// getting card elements from DOM
const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

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

initialCards.forEach(card => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardTitleElement.textContent = card.name;
  cardImageElement.src = card.link;
  cardImageElement.alt = card.name;

  cardLikeButton.addEventListener('click', function() {
    toggleLikeButton(cardLikeButton);
  });

  cardsElement.append(cardElement);
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

function toggleLikeButton(likeButton) {
  likeButton.classList.toggle('card__like-button_active');
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  togglePopup(popupEditProfileInfoElement);
}

function newImageFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardTitleElement.textContent = imageTitleInput.value;
  cardImageElement.src = imageLinkInput.value;
  cardImageElement.alt = imageTitleInput.value;

  cardLikeButton.addEventListener('click', function() {
    toggleLikeButton(cardLikeButton);
  });

  cardsElement.prepend(cardElement);

  togglePopup(popupAddNewImageElement);
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

newImageFormElement.addEventListener('submit', newImageFormSubmitHandler);
