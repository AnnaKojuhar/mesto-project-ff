

export function createCard(item, deleteCard, openImagePopup, likeCard, cardTemplate){
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  cardImage.src=item.link;
  cardImage.alt = item.name;
  cardItem.querySelector('.card__title').textContent = item.name;
  cardDeleteButton.addEventListener('click', () => deleteCard(cardItem));
  cardImage.addEventListener('click', () => openImagePopup(item.link, item.name));
  cardLikeButton.addEventListener('click', ()=> likeCard(cardLikeButton));
  return cardItem;
}
export function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
}
export function deleteCard(cardItem){
  cardItem.remove();
}