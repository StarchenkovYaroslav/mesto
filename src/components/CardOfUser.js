import Card from './Card.js';

export default class CardOfUser extends Card {
  constructor(settings, templateSelector, data, handleImageClick, handleDeleteClick) {
    super(settings, templateSelector, data, handleImageClick);

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
