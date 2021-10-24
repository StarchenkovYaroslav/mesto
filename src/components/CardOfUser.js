import Card from './Card.js';

export default class CardOfUser extends Card {
  constructor(settings, templateSelector, data, handlers, user) {
    super(settings, templateSelector, data, handlers, user);

    this._deleteButtonElement = this._element.querySelector(settings.deleteButtonSelector);

    this._handleDeleteButtonClick = handlers.handleDeleteButtonClick;
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._deleteButtonElement.addEventListener('click', () => {
      this._handleDeleteButtonClick(this);
    })
  }
}
