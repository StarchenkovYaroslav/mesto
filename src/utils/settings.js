export const apiSettings = {
  token: '0b40a95f-9332-4356-a732-eb5ba165765e',
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  userRequest: '/users/me',
  initialCardsRequest: '/cards',
  newCardRequest: '/cards',
  cardOffRequest: '/cards/',
  cardLikeRequest: '/cards/likes/',
  userInfoRequest: '/users/me',
  userAvatarRequest: '/users/me/avatar'
}
export const formClassesAndSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button_type_submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  errorPostfix: '-error'
};

export const cardClassesAndSelectors = {
  elementSelector: '.card',
  imageSelector: '.card__image',
  titleSelector: '.card__title',
  likeButtonSelector: '.card__like-button',
  likeCounterSelector: '.card__like-counter',
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
  aboutSelector: '.profile__about'
}

export const userCardTemplateSelector = '#user-card-template';

export const othersCardTemplateSelector = '#others-card-template';

export const loadingMessage = 'Сохранение...';
