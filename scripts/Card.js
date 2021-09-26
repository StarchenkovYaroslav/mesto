export default class Card {
  constructor(templateSelector, data, handleImageClick) {
    this._templateSelector = templateSelector;

    this._imageUrl = data.imageUrl;
    this._title = data.title;

    this._handleImageClick = handleImageClick;

    this._element = this._generateElement();
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get title() {
    return this._title;
  }

  get element() {
    return this._element;
  }

  _generateElement() {
    const element = this._getTemplate().querySelector('.card').cloneNode(true);

    this._setEventListeners(element);

    element.querySelector('.card__image').src = this._imageUrl;
    element.querySelector('.card__image').alt = this._title;
    element.querySelector('.card__title').textContent = this._title;

    return element;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content;
  }

  _setEventListeners(element) {
    element.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick(this);
    });
    element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });
  }

  _handleLikeButtonClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }
};
