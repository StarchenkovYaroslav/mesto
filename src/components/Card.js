export default class Card {
  _isMadeByUser;
  _isLikedByUser;
  _likeCounter;
  constructor(settings, data, handlers, userData) {
    this._templateSelector = settings.templateSelector;

    this._elementSelector = settings.elementSelector;
    this._imageSelector = settings.imageSelector;
    this._titleSelector = settings.titleSelector;
    this._likeButtonSelector = settings.likeButtonSelector;
    this._likeCounterSelector = settings.likeCounterSelector;
    this._activeLikeButtonClass = settings.activeLikeButtonClass;
    this._deleteButtonSelector = settings.deleteButtonSelector;
    this._activeDeleteButtonClass = settings.activeDeleteButtonClass;

    this._id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._ownerId = data.owner._id;

    this._handleImageClick = handlers.handleImageClick;
    this._handleLikeButtonClick = handlers.handleLikeButtonClick;
    this._handleDeleteButtonClick = handlers.handleDeleteButtonClick;

    this._userId = userData._id;

    this._element = this._getEmptyElement();
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeButtonElement = this._element.querySelector(this._likeButtonSelector);
    this._likeCounterElement = this._element.querySelector(this._likeCounterSelector);
    this._deleteButtonElement = this._element.querySelector(this._deleteButtonSelector);

    this._determineMadeByUser();
    this._determineLikedByUser();
    this._countLikes();

    this._fillElement();
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
    return this._element;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  toggleLike(cardData) {
    this._isLikedByUser = !this._isLikedByUser;
    this._likes = cardData.likes;

    this._checkLikedByUser();
    this._updateLikeCounter();
  }

  _fillElement() {
    this._setElementValues();
    this._setEventListeners();

    this._checkMadeByUser();
    this._checkLikedByUser();
  }

  _setElementValues() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._setLikeCounterElementValue();
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleImageClick(this);
    });
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick(this);
    });
    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteButtonClick(this);
    });
  }

  _updateLikeCounter() {
    this._countLikes();

    this._setLikeCounterElementValue();
  }

  _countLikes() {
    this._likeCounter = this._likes.length;
  }

  _setLikeCounterElementValue() {
    this._likeCounterElement.textContent = this._likeCounter;
  }

  _checkMadeByUser() {
    if (this._isMadeByUser) {
      this._activateDeleteButton();
    } else {
      this._deactivateDeleteButton();
    }
  }

  _checkLikedByUser() {
    if (this._isLikedByUser) {
      this._paintLikeButton();
    } else {
      this._cleanLikeButton();
    }
  }

  _determineMadeByUser() {
    this._isMadeByUser = this._ownerId === this._userId;
  }

  _determineLikedByUser() {
    this._isLikedByUser = this._likes.some(user => user._id === this._userId);
  }

  _paintLikeButton() {
    this._likeButtonElement.classList.add(this._activeLikeButtonClass);
  }

  _cleanLikeButton() {
    this._likeButtonElement.classList.remove(this._activeLikeButtonClass);
  }

  _activateDeleteButton() {
    this._deleteButtonElement.removeAttribute('disabled');
    this._deleteButtonElement.classList.add(this._activeDeleteButtonClass);
  }

  _deactivateDeleteButton() {
    this._deleteButtonElement.setAttribute('disabled', '');
    this._deleteButtonElement.classList.remove(this._activeDeleteButtonClass);
  }

  _getEmptyElement() {
    return this._getTemplate().querySelector(this._elementSelector).cloneNode(true);
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content;
  }
};
