

export function createCard(item, deleteCard, openImagePopup, likeCard, cardTemplate, userId) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const cardLikeCount = cardItem.querySelector(".card__like-count");
  const cardLikeButton = cardItem.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLikeCount.textContent = item.likes.length; // Устанавливаем начальное количество лайков

  cardItem.querySelector('.card__title').textContent = item.name;
  if (item.owner._id !== userId) {
    cardDeleteButton.style.display = "none"; // Скрываем иконку удаления
  } else {
    cardDeleteButton.addEventListener('click', () => deleteCard(item._id, cardItem));
  }
  cardDeleteButton.addEventListener('click', () => deleteCard(cardItem));
  cardImage.addEventListener('click', () => openImagePopup(item.link, item.name));
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardLikeCount, item._id)); // Передаем cardLikeCount и cardId

  return cardItem;
}



export function likeCard(cardLikeButton, cardLikeCount, cardId) {
  cardLikeButton.classList.toggle('card__like-button_is-active');

  // Отправляем запрос на сервер для обновления количества лайков
  fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/${cardId}/likes`, {
    method: cardLikeButton.classList.contains('card__like-button_is-active') ? 'PUT' : 'DELETE',
    headers: {
      authorization: '5acfb509-852f-4951-8140-6745300cf269'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    cardLikeCount.textContent = data.likes.length; // Обновляем количество лайков
  })
  .catch(err => {
    console.error('Ошибка при лайке карточки:', err);
  });
}
//export function deleteCard(cardItem){
  //cardItem.remove();
//}                                
export function deleteCard(cardId, cardItem) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-21/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '5acfb509-852f-4951-8140-6745300cf269'
    }
  })
  .then(res => {
    if (res.ok) {
      cardItem.remove(); // Удаляем карточку из DOM
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  .catch(err => console.error('Ошибка при удалении карточки:', err));
}