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

function createCardElement(imageURL, title) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitleElement.textContent = title;
  cardImageElement.src = imageURL;
  cardImageElement.alt = title;

  cardImageElement.addEventListener('click', function() {
    setPictureElements(imageURL, title);
    togglePopup(popupPictureElement);
  });

  cardLikeButton.addEventListener('click', function() {
    toggleLikeButton(cardLikeButton);
  });

  cardDeleteButton.addEventListener('click', function() {
    deleteCardElement(cardElement);
  })

  return cardElement;
}


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
  const cardElement = createCardElement(initialCard.link, initialCard.name);
  cardsElement.append(cardElement);
});



// defining callback functions for listeners
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

function toggleLikeButton(likeButton) {
  likeButton.classList.toggle('card__like-button_active');
}

function deleteCardElement(cardElement) {
  cardElement.remove();
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  togglePopup(popupEditProfileInfoElement);
}

function newImageFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = createCardElement(imageLinkInput.value, imageTitleInput.value);
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
