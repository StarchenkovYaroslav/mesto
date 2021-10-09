import Popup from './Popup.js';
import FormValidator from './FormValidator.js';

export default class FormPopup extends Popup {
  constructor(popupSettings, elementSelector, formSettings, handleFormSubmit) {
    super(popupSettings, elementSelector);

    this._form = this._element.querySelector(formSettings.formSelector);
    this._formInputs = this._form.querySelectorAll(formSettings.inputSelector);
    this._formValidator = new FormValidator(formSettings, this._form);

    this._handleFormSubmit = handleFormSubmit;

    this._formValidator.enableValidation();
    this._setEventListeners();
  }

  close() {
    this._resetForm();

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


  _setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener('submit', () => {
      this._handleFormSubmit( this._getInputValues() );
    });
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach(formInput => {
      inputValues[formInput.name] = formInput.value;
    });

    return inputValues;
  }

  _resetForm() {
    this._form.reset();
    this._formValidator.resetValidation();
  }
}