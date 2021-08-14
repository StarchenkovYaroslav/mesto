let profileNameElement = document.querySelector('.profile__name');
let profileStatusElement = document.querySelector('.profile__status');
let profileEditButton = document.querySelector('.profile__edit-button');

let profileEditForm = document.querySelector('.form_action_edit-profile-info');
let profileNameInput = document.querySelector('.form__input_data_profile-name');
let profileStatusInput = document.querySelector('.form__input_data_profile-status');

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');

function setProfileInfo() {
  if (profileNameInput.value !== '' && profileStatusInput.value !== '') {
    profileNameElement.textContent = profileNameInput.value;
    profileStatusElement.textContent = profileStatusInput.value;
  } else throw new Error('at least one of arguments is empty');
}

function openPopup() {
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
  popup.classList.add('popup_opened');
  profileNameInput.focus();
}

function closePopup() {
  if (profileNameInput.placeholder !== '') profileNameInput.placeholder = '';
  if (profileStatusInput.placeholder !== '') profileStatusInput.placeholder = '';
  popup.classList.remove('popup_opened');
}

function profileEditFormSubmitHandler(evt) {
  evt.preventDefault();
  try {
    setProfileInfo();
    closePopup();
  } catch(err) {
    if (profileNameInput.value === '' && profileStatusInput.value === '') {
      profileNameInput.placeholder = 'Введите имя!';
      profileStatusInput.placeholder = 'Введите статус!';
    } else if (profileNameInput.value === '') {
      profileNameInput.placeholder = 'Введите имя!';
    } else if (profileStatusInput.value === '') {
      profileStatusInput.placeholder = 'Введите статус!';
    }
  }

}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

profileEditForm.addEventListener('submit', profileEditFormSubmitHandler);

for (let elem of profileEditForm.elements) {
  if (elem.type === "text") {
    elem.addEventListener('focus', function() {
      elem.selectionStart = elem.value.length;
    });
  }
}
