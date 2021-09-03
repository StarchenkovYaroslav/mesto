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

const editProfileForm = document.querySelector('.form_action_edit-profile-info');
const profileNameInput = document.querySelector('.form__input_data_profile-name');
const profileStatusInput = document.querySelector('.form__input_data_profile-status');

const addCardForm = document.querySelector('.form_action_add-new-card');
const cardTitleInput = document.querySelector('.form__input_data_card-title');
const imageUrlInput = document.querySelector('.form__input_data_image-url');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const editProfilePopup = document.querySelector('.popup_content_edit-profile-info-form');
const addCardPopup = document.querySelector('.popup_content_add-new-card-form');
const picturePopup = document.querySelector('.popup_content_picture');

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const pictureImageElement = document.querySelector('.picture__image');
const pictureDescriptionElement = document.querySelector('.picture__description');


// difining functions
function setProfileInfoInputs(profile) {
  profileNameInput.value = profile.name;
  profileStatusInput.value = profile.status;
}

function setPictureElements(card) {
  pictureImageElement.src = card.imageUrl;
  pictureImageElement.alt = card.title;
  pictureDescriptionElement.textContent = card.title;
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function profileEditButtonClickHandler() {
  setProfileInfoInputs({
    name: profileNameElement.textContent,
    status: profileStatusElement.textContent
  });

  openPopup(editProfilePopup);
}

function profileAddButtonClickHandler() {
  openPopup(addCardPopup);
}

function popupCloseButtonClickHandler(evt) {
  closePopup( evt.target.closest('.popup') );
}

function cardImageClickHandler(evt) {
  setPictureElements({
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

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;

  closePopup(editProfilePopup);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();

  const cardElement = createCardElement({
    title: cardTitleInput.value,
    imageUrl: imageUrlInput.value
  });
  cardsElement.prepend(cardElement);

  addCardForm.reset();

  closePopup(addCardPopup);
}


// adding listeners
profileEditButton.addEventListener('click', profileEditButtonClickHandler);

profileAddButton.addEventListener('click', profileAddButtonClickHandler);

popupCloseButtons.forEach(popupCloseButton => {
  popupCloseButton.addEventListener('click', popupCloseButtonClickHandler);
});

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

addCardForm.addEventListener('submit', addCardFormSubmitHandler);


// initial filling cards
initialCards.forEach(initialCard => {
  cardsElement.append( createCardElement(initialCard) );
});
