const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileStatusElement = profileElement.querySelector('.profile__status');
const profileEditButton = profileElement.querySelector('.profile__edit-button');

const profileEditForm = document.querySelector('.form_action_edit-profile-info');
const profileNameInput = profileEditForm.querySelector('.form__input_data_profile-name');
const profileStatusInput = profileEditForm.querySelector('.form__input_data_profile-status');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

profileEditButton.addEventListener('click', function() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
  popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

function profileEditFormSubmitHandler (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  popup.classList.remove('popup_opened');
}

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
