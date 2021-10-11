export default class Popup {
  constructor(popupSettings, elementSelector) {
    if (this.constructor === Popup) {
      throw new Error("Can't instantiate abstract class!");
    }

    this._popupClass = popupSettings.popupClass;
    this._closeButtonClass = popupSettings.closeButtonClass;
    this._openedPopupClass = popupSettings.openedPopupClass;

    this._element = document.querySelector(elementSelector);

    this._handleKeydown = this._handleKeydown.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleKeydown);

    this._element.classList.add(this._openedPopupClass);
  }

  close() {
    document.removeEventListener('keydown', this._handleKeydown);

    this._element.classList.remove(this._openedPopupClass);
  }

  _setEventListeners() {
    this._element.addEventListener('mousedown', (evt) => {
      if ( this._isClickToClose(evt) ) {
        this.close();
      }
    });
  }

  _handleKeydown(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _isClickToClose(evt) {
    return evt.target.classList.contains(this._popupClass)
      || evt.target.classList.contains(this._closeButtonClass);
  }
}
