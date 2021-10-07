export const initialCards = [
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

export const formClassesAndSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button_type_submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const cardClassesAndSelectors = {
  templateSelector: '#card-template',
  elementSelector: '.card',
  imageSelector: '.card__image',
  titleSelector: '.card__title',
  likeButtonSelector: '.card__like-button',
  deleteButtonSelector: '.card__delete-button',
  activeLikeButtonClass: 'card__like-button_active'
};

export const popupClassesAndSelectors = {
  popupClass: 'popup',
  closeButtonClass: 'popup__close-button',
  openedPopupClass: 'popup_opened'
}

export const pictureClassesAndSelectors = {
  imageSelector: '.picture__image',
  descriptionSelector: '.picture__description'
}

export const profileClassesAndSelectors = {
  nameSelector: '.profile__name',
  statusSelector: '.profile__status'
}
