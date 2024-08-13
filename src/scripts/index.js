// index.js

import "../pages/index.css";

import { initialCards } from "./cards.js";

export const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const closeButtons = document.querySelectorAll(".popup__close");

import { likeCard } from "./card.js";
import { createCard } from "./card.js";
import { deleteCard } from "./card.js";

//открытие попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openPopup(imagePopup);
}

//открытие попапа

import { openPopup } from "./modal.js";

//закрытие попапа

import { closePopup } from "./modal.js";

initialCards.forEach(function (item) {
  const cardItem = createCard(item, deleteCard, openImagePopup, likeCard);
  cardsContainer.append(cardItem);
});

editProfileButton.addEventListener("click", () => openPopup(editPopup));
addCardButton.addEventListener("click", () => openPopup(newCardPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});

// Находим форму в DOM
const formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const newJob = jobInput.value;
  const newName = nameInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileDescription.textContent = newJob;

  closePopup(document.querySelector(".popup_is-opened"));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

//даем возможность добавлять картинки
//найдем форму для добавления новой карточки
const newCardFormElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const placeName = newCardFormElement.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const imageLink = newCardFormElement.querySelector(
    ".popup__input_type_url"
  ).value;
  //создаем новую карточку
  const newCard = {
    name: placeName,
    link: imageLink,
  };
  const cardItem = createCard(newCard, deleteCard, openImagePopup, likeCard);
  cardsContainer.prepend(cardItem);

  closePopup(newCardPopup);
  newCardFormElement.reset();
}

newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
