const profileElement = document.querySelector('.profile');
const profileNameElement = profileElement.querySelector('.profile__name');
const profileStatusElement = profileElement.querySelector('.profile__status');
const profileEditButton = profileElement.querySelector('.profile__edit-button');

const profileEditForm = document.querySelector('.form_action_edit-profile-info');
const profileNameInput = profileEditForm.querySelector('.form__input_data_profile-name');
const profileStatusInput = profileEditForm.querySelector('.form__input_data_profile-status');

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

for (let elem of profileEditForm.elements) {
  if (elem.type === "text") {
    elem.addEventListener('focus', function() {
      elem.selectionStart = elem.value.length;
    });
  }
}

profileEditButton.addEventListener('click', function() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
  popup.classList.add('popup_opened');
  profileNameInput.focus();
});

popupCloseButton.addEventListener('click', function() {
  if (profileNameInput.placeholder !== '') profileNameInput.placeholder = '';
  if (profileStatusInput.placeholder !== '') profileStatusInput.placeholder = '';
  popup.classList.remove('popup_opened');
});

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  if (profileNameInput.value !== '' && profileStatusInput.value !== '') {
    profileNameElement.textContent = profileNameInput.value;
    profileStatusElement.textContent = profileStatusInput.value;
    popup.classList.remove('popup_opened');
  } else if (profileNameInput.value === '' && profileStatusInput.value === '') {
    profileNameInput.placeholder = 'Введите имя!';
    profileStatusInput.placeholder = 'Введите статус!';
  } else if (profileNameInput.value === '') {
    profileNameInput.placeholder = 'Введите имя!';
  } else if (profileStatusInput.value === '') {
    profileStatusInput.placeholder = 'Введите статус!';
  }
}

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);
