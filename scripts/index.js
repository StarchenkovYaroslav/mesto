// getting profile elements from DOM
let profileNameElement = document.querySelector('.profile__name');
let profileStatusElement = document.querySelector('.profile__status');
let profileEditButton = document.querySelector('.profile__edit-button');

// getting form elements from DOM
let profileEditForm = document.querySelector('.form_action_edit-profile-info');
let profileNameInput = document.querySelector('.form__input_data_profile-name');
let profileStatusInput = document.querySelector('.form__input_data_profile-status');

// getting popup elements forom DOM
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

// defining callback functions for listeners
function openPopup() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
  popup.classList.add('popup_opened');
  profileNameInput.focus();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  closePopup();
}

// adding listeners
profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
