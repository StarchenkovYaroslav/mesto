import Popup from './Popup.js';

export default class PopupToConfirm extends Popup {
  _objectToHandle;

  constructor(popupSettings, elementSelector, formSettings, handleConfirmation) {
    super(popupSettings, elementSelector);

    this._inactiveButtonClass = formSettings.inactiveButtonClass;

    this._form = this._element.querySelector(formSettings.formSelector);

    this._handleConfirmation = handleConfirmation;

    this._setEventListeners();
  }

  open(objectToHandle) {
    this._objectToHandle = objectToHandle;

    super.open();
  }

  close() {
    this._objectToHandle = null;

    super.close();
  }

  _setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleConfirmation(this._objectToHandle);
    });
  }
}
