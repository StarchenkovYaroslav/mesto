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
  const inputs = Array.from( form.querySelectorAll(settings.inputSelector) );
  const submitButton = form.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, submitButton, inputs);

  inputs.forEach(input => {
    input.addEventListener('input', function () {
      checkInputValidity(settings, form, input);
      toggleButtonState(settings, submitButton, inputs);
    });
  });
}

export function enableValidation(settings) {
  const forms = Array.from( document.querySelectorAll('.form') );

  forms.forEach(form => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(settings, form);
  });
}

export function resetFormValidation(settings, form) {
  const inputs = Array.from( form.querySelectorAll('.form__input') );
  const submitButton = form.querySelector(settings.submitButtonSelector);

  inputs.forEach(input => {
    const error = form.querySelector(`.${input.id}-error`);

    input.classList.remove(settings.inputErrorClass);
    error.classList.remove(settings.errorClass);
  });

  toggleButtonState(settings, submitButton, inputs);
}
