export function openModal(popup){
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEsc)
}
export function closeModal(popup){
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}
function closePopupOnEsc(event){
  if (event.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup){
      closeModal(openedPopup);
    }
  }
}


export function setupPopupCloseOnClick() {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        closeModal(popup);
      }
    });
  });
}


