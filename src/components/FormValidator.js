export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._errorPostfix = settings.errorPostfix;

    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._inputs.forEach(input => {
      this._hideInputError(input);
    });

    this._toggleSubmitButtonState();
  }

  _setEventListeners() {
    this._toggleSubmitButtonState();

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButtonState();
      });
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input, validationMessage) {
    const error = this._getErrorElement(input);

    error.textContent = validationMessage;
    error.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const error = this._getErrorElement(input);

    error.textContent = '';
    error.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _getErrorElement(input) {
    return this._form.querySelector(`.${input.id}${this._errorPostfix}`);
  }

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput(this._inputs)) {
      this._deactivateSubmitButton();
    } else {
      this._activateSubmitButton();
    }
  }

  _activateSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _deactivateSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', '');
  }

  _hasInvalidInput(inputs) {
    return inputs.some(input => {
      return !input.validity.valid;
    });
  }
}








