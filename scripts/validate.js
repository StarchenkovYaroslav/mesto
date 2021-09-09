function hasInvalidInput(inputs) {
  return inputs.some(input => {
    return !input.validity.valid;
  });
}

function toggleButtonState(settings, button, inputs) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

function showInputError(settings, form, input, validationMessage) {
  const error = form.querySelector(`.${input.id}-error`);

  error.textContent = validationMessage;
  error.classList.add(settings.errorClass);
  input.classList.add(settings.inputErrorClass);
}

function hideInputError(settings, form, input) {
  const error = form.querySelector(`.${input.id}-error`);

  error.textContent = '';
  error.classList.remove(settings.errorClass);
  input.classList.remove(settings.inputErrorClass);
}

function checkInputValidity(settings, form, input) {
  if (!input.validity.valid) {
    showInputError(settings, form, input, input.validationMessage);
  } else {
    hideInputError(settings, form, input);
  }
}

function setEventListeners(settings, form) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, submitButton, inputs);

  inputs.forEach(input => {
    input.addEventListener('input', function (evt) {
      checkInputValidity(settings, form, input);
      toggleButtonState(settings, submitButton, inputs);
    });
  });
}

function enableValidation(settings) {
  const forms = Array.from(document.forms);

  forms.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(settings, form);
  });
}

enableValidation({
  formSelector: '.form',
  fieldsetSelector: '.form__input-container',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});
