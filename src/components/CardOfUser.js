import Card from './Card.js';

export default class CardOfUser extends Card {
  constructor(settings, templateSelector, data, handleImageClick, user, handleDeleteClick) {
    super(settings, templateSelector, data, handleImageClick, user);

    this._deleteButtonElement = this._element.querySelector(settings.deleteButtonSelector);

    this._handleDeleteClick = handleDeleteClick;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteClick(this);
    })
  }
}
