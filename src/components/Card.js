export default class Card {
  constructor(settings, templateSelector, data, handlers, user) {
    this._templateSelector = templateSelector;

    this._elementSelector = settings.elementSelector;
    this._imageSelector = settings.imageSelector;
    this._titleSelector = settings.titleSelector;
    this._likeButtonSelector = settings.likeButtonSelector;
    this._likeCounterSelector = settings.likeCounterSelector;
    this._activeLikeButtonClass = settings.activeLikeButtonClass;

    this._id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;

    this._user = user;

    this._isLikedByUser = false;
    this._checkLikeByUser();
    this._likeCounter = this._likes.length;

    this._handleImageClick = handlers.handleImageClick;
    this._handleLikeButtonClick = handlers.handleLikeButtonClick;

    this._element = this._getEmptyElement();
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeButtonElement = this._element.querySelector(this._likeButtonSelector);
    this._likeCounterElement = this._element.querySelector(this._likeCounterSelector);
  }

  get id() {
    return this._id;
  }

  get link() {
    return this._link;
  }

  get name() {
    return this._name;
  }

  get isLikedByUser() {
    return this._isLikedByUser;
  }

  getElement() {
    this._fillElement();

    return this._element;
  }

  toggleLike(cardData) {
    this._isLikedByUser = !this._isLikedByUser;
    this._likes = cardData.likes;

    this._updateLikeButtonView();
    this._updateLikeCounter();
  }

  _fillElement() {
    this._setElementsValues();
    this._setEventListeners();

    this._updateLikeButtonView();
    this._updateLikeCounter();
  }

  _setElementsValues() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick(this);
    });
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick(this);
    });
  }

  _updateLikeCounter() {
    this._likeCounter = this._likes.length;

    this._likeCounterElement.textContent = this._likeCounter;
  }

  _updateLikeButtonView() {
    if (this._isLikedByUser) {
      this._paintLikeButton();
    } else {
      this._cleanLikeButton();
    }
  }

  _paintLikeButton() {
    this._likeButtonElement.classList.add(this._activeLikeButtonClass);
  }

  _cleanLikeButton() {
    this._likeButtonElement.classList.remove(this._activeLikeButtonClass);
  }

  _checkLikeByUser() {
    this._likes.forEach(user => {
      if (user._id === this._user._id) {
        this._isLikedByUser = true;
      }
    })
  }

  _getEmptyElement() {
    return this._getTemplate().querySelector(this._elementSelector).cloneNode(true);
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content;
  }
};
