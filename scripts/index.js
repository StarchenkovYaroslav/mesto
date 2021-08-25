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
const popupCloseButtonElements = document.querySelectorAll('.popup__close-button');
const popupEditProfileInfoElement = document.querySelector('.popup__inner-form_edit-profile_info');
const popupAddNewImageElement = document.querySelector('.popup__inner-form_add-new-image');
const popupPictureElement = document.querySelector('.popup_content_picture');

// getting card elements from DOM
const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

// getting picture elements from DOM
const pictureImageElement = document.querySelector('.picture__image');
const pictureDescriptionElement = document.querySelector('.picture__description');

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

initialCards.forEach(initialCard => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitleElement.textContent = initialCard.name;
  cardImageElement.src = initialCard.link;
  cardImageElement.alt = initialCard.name;

  cardImageElement.addEventListener('click', function() {
    setPictureElements(cardImageElement.src, cardTitleElement.textContent);
    togglePopup(popupPictureElement);
  });

  cardLikeButton.addEventListener('click', function() {
    toggleLikeButton(cardLikeButton);
  });

  cardDeleteButton.addEventListener('click', function() {
    cardElement.remove();
  })

  cardsElement.append(cardElement);
});


// difining common functions
function setProfileInfoInputs() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
}

function setPictureElements(imageURL, description) {
  pictureImageElement.src = imageURL;
  pictureImageElement.alt = description;
  pictureDescriptionElement.textContent = description;
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
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitleElement.textContent = imageTitleInput.value;
  cardImageElement.src = imageLinkInput.value;
  cardImageElement.alt = imageTitleInput.value;

  cardImageElement.addEventListener('click', function() {
    setPictureElements(cardImageElement.src, cardTitleElement.textContent);
    togglePopup(popupPictureElement);
  });

  cardLikeButton.addEventListener('click', function() {
    toggleLikeButton(cardLikeButton);
  });

  cardDeleteButton.addEventListener('click', function() {
    cardElement.remove();
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

popupCloseButtonElements.forEach(popupCloseButtonElement => {
  popupCloseButtonElement.addEventListener('click', function() {
    togglePopup(popupCloseButtonElement.closest('.popup'));
  });
});

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);

newImageFormElement.addEventListener('submit', newImageFormSubmitHandler);
