export default class Card {
  constructor(settings, templateSelector, data, handleImageClick, user) {
    this._templateSelector = templateSelector;

    this._elementSelector = settings.elementSelector;
    this._imageSelector = settings.imageSelector;
    this._titleSelector = settings.titleSelector;
    this._likeButtonSelector = settings.likeButtonSelector;
    this._likeCounterSelector = settings.likeCounterSelector;
    this._activeLikeButtonClass = settings.activeLikeButtonClass;

    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._owner = data.owner;

    this._handleImageClick = handleImageClick;

    this._user = user;

    this._element = this._getEmptyElement();
    this._imageElement = this._element.querySelector(this._imageSelector);
    this._titleElement = this._element.querySelector(this._titleSelector);
    this._likeButtonElement = this._element.querySelector(this._likeButtonSelector);
    this._likeCounterElement = this._element.querySelector(this._likeCounterSelector);
  }

  get link() {
    return this._link;
  }

  get name() {
    return this._name;
  }

  getElement() {
    this._fillElement();

    return this._element;
  }

  _fillElement() {
    this._setElementsValues();
    this._setEventListeners();

    this._likes.forEach(user => {
      if (user._id === this._owner.id) {
        this._handleLikeButtonClick();
      }
    })
  }

  _setElementsValues() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likeCounterElement.textContent = this._likes.length;
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
