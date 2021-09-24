export function openPopup(popup) {
  document.addEventListener('keydown', documentKeyHandler);
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  document.removeEventListener('keydown', documentKeyHandler);
  popup.classList.remove('popup_opened');
}

export function setPictureElementValues(card) {
  document.querySelector('.picture__image').src = card.imageUrl;
  document.querySelector('.picture__image').alt = card.title;
  document.querySelector('.picture__description').textContent = card.title;
}

function documentKeyHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup( document.querySelector('.popup_opened') );
  }
}
