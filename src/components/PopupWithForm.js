import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSettings, elementSelector, formSettings, handleFormSubmit, formValidator, loadingMessage) {
    super(popupSettings, elementSelector);

    this._form = this._element.querySelector(formSettings.formSelector);
    this._formInputs = this._form.querySelectorAll(formSettings.inputSelector);
    this._formSubmitButton = this._form.querySelector(formSettings.submitButtonSelector);

    this._fomrSubmitButtonText = this._formSubmitButton.textContent;

    this._formValidator = formValidator;

    this._handleFormSubmit = handleFormSubmit;

    this._loadingMessage = loadingMessage;

    this._setEventListeners();
  }

  close() {
    this._clearInputValues();

    super.close();
  }

  setInputValues(data) {
    this._formInputs.forEach(formInput => {
      if (formInput.name in data) {
        formInput.value = data[formInput.name];
      } else {
        throw new Error('inputs and data dont match');
      }
    });

    this._formValidator.resetValidation();
  }

  showLoadingMessage() {
    this._formSubmitButton.textContent = this._loadingMessage;
  }

  hideLoadingMessage() {
    this._formSubmitButton.textContent = this._fomrSubmitButtonText;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach(formInput => {
      inputValues[formInput.name] = formInput.value;
    });

    return inputValues;
  }

  _clearInputValues() {
    this._form.reset();
    this._formValidator.resetValidation();
  }
}
