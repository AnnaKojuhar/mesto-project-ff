// @todo: Темплейт карточки

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
  const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(item, deleteCard){
  
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  
  cardImage.src=item.link;

  cardImage.alt = item.name;
  cardItem.querySelector('.card__title').textContent = item.name;
  cardDeleteButton.addEventListener('click', () => deleteCard(cardItem));

return cardItem;
}
 function deleteCard(cardItem){
  cardItem.remove();
}

 initialCards.forEach(function(item){
  const cardItem = createCard(item, deleteCard);
  cardsContainer.append(cardItem);
 });

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
