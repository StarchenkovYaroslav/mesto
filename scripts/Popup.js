export default class Popup {
  constructor(popupSettings, elementSelector) {
    if (this.constructor === Popup) {
      throw new Error("Can't instantiate abstract class!");
    }

    this._popupClass = popupSettings.popupClass;
    this._closeButtonClass = popupSettings.closeButtonClass;
    this._openedPopupClass = popupSettings.openedPopupClass;

    this._element = document.querySelector(elementSelector);
  }

  open() {
    document.addEventListener('keydown', this._handleKeydown.bind(this));
    this._element.classList.add(this._openedPopupClass);
  }

  close() {
    document.removeEventListener('keydown', this._handleKeydown.bind(this));
    this._element.classList.remove(this._openedPopupClass);
  }

  _setEventListeners() {
    this._element.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._popupClass)|| evt.target.classList.contains(this._closeButtonClass)) {
        this.close();
      }
    });
  }

  _handleKeydown(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
