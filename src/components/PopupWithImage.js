import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSettings, elementSelector, pictureSettings) {
    super(popupSettings, elementSelector);

    this._imageElement = this._element.querySelector(pictureSettings.imageSelector);
    this._descriptionElement = this._element.querySelector(pictureSettings.descriptionSelector);

    this._setEventListeners();
  }

  open(card) {
    this._setElementValues(card);

    super.open();
  }

  _setElementValues(card) {
    this._imageElement.src = card.link;
    this._imageElement.alt = card.name;

    this._descriptionElement.textContent = card.name;
  }
}
