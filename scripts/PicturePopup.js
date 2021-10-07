import Popup from './Popup.js';

export default class PicturePopup extends Popup{
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
    this._imageElement.src = card.imageUrl;
    this._imageElement.alt = card.title;

    this._descriptionElement.textContent = card.title;
  }
}
