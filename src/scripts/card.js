// card.js

import { likeCard as apiLikeCard, deleteCard as apiDeleteCard } from './api.js';

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
  cardImage.addEventListener('click', () => openImagePopup(item.link, item.name));
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardLikeCount, item._id)); // Передаем cardLikeCount и cardId

  return cardItem;
}

export function likeCard(cardLikeButton, cardLikeCount, cardId) {
  const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');

  apiLikeCard(cardId, isLiked)
    .then(data => {
      cardLikeCount.textContent = data.likes.length; // Обновляем количество лайков
      cardLikeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(err => {
      console.error('Ошибка при лайке карточки:', err);
    });
}

export function deleteCard(cardId, cardItem) {
  apiDeleteCard(cardId)
    .then(() => {
      cardItem.remove(); // Удаляем карточку из DOM
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err));
}