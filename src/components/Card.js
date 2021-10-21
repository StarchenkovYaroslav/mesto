export default class Card {
  constructor(settings, templateSelector, data, handleImageClick) {
    this._templateSelector = templateSelector;

    this._elementSelector = settings.elementSelector;
    this._imageSelector = settings.imageSelector;
    this._titleSelector = settings.titleSelector;
    this._likeButtonSelector = settings.likeButtonSelector;
    this._activeLikeButtonClass = settings.activeLikeButtonClass;

    this._imageUrl = data.imageUrl;
    this._title = data.title;

    this._handleImageClick = handleImageClick;

    this._element = this._getEmptyElement();
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeButtonElement = this._element.querySelector(this._likeButtonSelector);
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get title() {
    return this._title;
  }

  getElement() {
    this._fillElement();

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
  }

  _handleLikeButtonClick() {
    this._likeButtonElement.classList.toggle(this._activeLikeButtonClass);
  }

  _getEmptyElement() {
    return this._getTemplate().querySelector(this._elementSelector).cloneNode(true);
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content;
  }
};
