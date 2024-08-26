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
const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const newCardFormElement = document.querySelector(".popup_type_new-card .popup__form");
  const placeNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
  const imageLinkInput = newCardFormElement.querySelector(".popup__input_type_url");
import { likeCard } from "./card.js";
import { createCard } from "./card.js";
import { deleteCard } from "./card.js";

//открытие попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(imagePopup);
}

//открытие попапа

import { openModal } from "./modal.js";

//закрытие попапа

import { closeModal } from "./modal.js";
 
import {setupPopupCloseOnClick} from "./modal.js";
setupPopupCloseOnClick();

initialCards.forEach(function (item) {
  const cardItem = createCard(item, deleteCard, openImagePopup, likeCard, cardTemplate);
  cardsContainer.append(cardItem);
});

editProfileButton.addEventListener("click", () =>{nameInput.value = profileName.textContent
jobInput.value = profileDescription.textContent
 openModal(editPopup)});

addCardButton.addEventListener("click", () => openModal(newCardPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");                         
    closeModal(popup);
  });
});

// Находим форму в DOM

const editProfileForm = editPopup.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = editProfileForm.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = editProfileForm.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const newJob = jobInput.value;
  const newName = nameInput.value;
  
  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileDescription.textContent = newJob;
  
  

  closeModal(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editProfileForm.addEventListener("submit", handleFormSubmitEditProfile);

//даем возможность добавлять картинки
//найдем форму для добавления новой карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const imageLink = imageLinkInput.value;
  //создаем новую карточку
  const newCard = {
    name: placeName,
    link: imageLink,
  };
  const cardItem = createCard(newCard, deleteCard, openImagePopup, likeCard, cardTemplate);
  cardsContainer.prepend(cardItem);

  closeModal(newCardPopup);
  newCardFormElement.reset();
}



newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
