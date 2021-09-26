export default class Card {
  constructor(templateSelector, data, handleImageClick) {
    this._templateSelector = templateSelector;

    this._imageUrl = data.imageUrl;
    this._title = data.title;

    this._handleImageClick = handleImageClick;

    this._element = this._getEmptyElement();
    this._imageElement = this._element.querySelector('.card__image');
    this._titleElement = this._element.querySelector('.card__title');
    this._likeButtonElement = this._element.querySelector('.card__like-button');
    this._deleteButtonElement = this._element.querySelector('.card__delete-button');

    this._fillElement();
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

  _fillElement() {
    this._setElementsValues();
    this._setEventListeners();
  }

  _setElementsValues() {
    this._imageElement.src = this._imageUrl;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick(this);
    });
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });
  }

  _handleLikeButtonClick() {
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _getEmptyElement() {
    return this._getTemplate().querySelector('.card').cloneNode(true);
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content;
  }
};
