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
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileEditForm = document.querySelector('.form_action_edit-profile-info');
const profileNameInput = document.querySelector('.form__input_data_profile-name');
const profileStatusInput = document.querySelector('.form__input_data_profile-status');

const newCardForm = document.querySelector('.form_action_add-new-card');
const cardTitleInput = document.querySelector('.form__input_data_card-title');
const imageUrlInput = document.querySelector('.form__input_data_image-url');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileEditPopup = document.querySelector('.popup_inner-form_edit-profile-info');
const newCardPopup = document.querySelector('.popup_inner-form_add-new-card');
const picturePopup = document.querySelector('.popup_content_picture');

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const pictureImageElement = document.querySelector('.picture__image');
const pictureDescriptionElement = document.querySelector('.picture__description');


// difining functions
function setProfileInfoInputs() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
}

function setPictureElements(imageUrl, description) {
  pictureImageElement.src = imageUrl;
  pictureImageElement.alt = description;
  pictureDescriptionElement.textContent = description;
}

function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

function handleLikeButtonClick(likeButton) {
  likeButton.classList.toggle('card__like-button_active');
}

function createCardElement(title, imageUrl) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardTitleElement.textContent = title;
  cardImageElement.src = imageUrl;
  cardImageElement.alt = title;

  cardImageElement.addEventListener('click', function() {
    setPictureElements(imageUrl, title);
    togglePopup(picturePopup);
  });

  cardLikeButton.addEventListener('click', function() {
    handleLikeButtonClick(cardLikeButton);
  });

  cardDeleteButton.addEventListener('click', function() {
    cardElement.remove();
  })

  return cardElement;
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  togglePopup(profileEditPopup);
}

function newCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardElement = createCardElement(cardTitleInput.value, imageUrlInput.value);
  cardsElement.prepend(cardElement);
  togglePopup(newCardPopup);
}


// adding listeners
profileEditButton.addEventListener('click', function() {
  setProfileInfoInputs();
  togglePopup(profileEditPopup);
});

profileAddButton.addEventListener('click', function() {
  togglePopup(newCardPopup);
});

popupCloseButtons.forEach(popupCloseButtonElement => {
  popupCloseButtonElement.addEventListener('click', function() {
    togglePopup(popupCloseButtonElement.closest('.popup'));
  });
});

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);

newCardForm.addEventListener('submit', newCardFormSubmitHandler);


// initial filling cards
initialCards.forEach(initialCard => {
  const cardElement = createCardElement(initialCard.title, initialCard.imageUrl);
  cardsElement.append(cardElement);
});
