import Card from './Card.js';

export default class CardOfUser extends Card {
  constructor(settings, templateSelector, data, handleImageClick) {
    super(settings, templateSelector, data, handleImageClick);

    this._deleteButtonElement = this._element.querySelector(settings.deleteButtonSelector);
  }

  _setEventListeners() {
    super._setEventListeners();

    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteButtonClick();
    })
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }
}
