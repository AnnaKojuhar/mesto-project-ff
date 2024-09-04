// index.js

import "../pages/index.css";

import { likeCard } from "./card.js";
import { createCard } from "./card.js";
import { deleteCard } from "./card.js";
import { toggleButtonState } from "./validation.js";
import { enableValidation, clearValidation, objects } from "./validation.js";
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar } from './api.js';

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
let userId;

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardFormElement = document.querySelector(".popup_type_new-card .popup__form");
const placeNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
const imageLinkInput = newCardFormElement.querySelector(".popup__input_type_url");

const profileImage = document.querySelector('.profile__image');
const newAvaPopup = document.querySelector('.popup_type-new-ava');
const editAvaForm = document.querySelector(".popup_type-new-ava .popup__form");

function openImagePopup(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(imagePopup);
}

profileImage.addEventListener('click', () => {
  openModal(newAvaPopup);
});

function handleEditAvaFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = editAvaForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const avaInput = editAvaForm.querySelector("#new-ava");
  const newAvaUrl = avaInput.value;

  updateAvatar(newAvaUrl)
    .then(data => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(newAvaPopup);
      editAvaForm.reset();
      clearValidation(editAvaForm, objects);
      submitButton.textContent = originalButtonText;
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара:', err);
    });
}

editAvaForm.addEventListener("submit", handleEditAvaFormSubmit);

import { openModal } from "./modal.js";
import { closeModal } from "./modal.js";
import { setupPopupCloseOnClick } from "./modal.js";
setupPopupCloseOnClick();

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, objects);
  openModal(editPopup);
});

addCardButton.addEventListener("click", () => openModal(newCardPopup));

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

const editProfileForm = editPopup.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(".popup__input_type_description");

function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  const submitButton = editProfileForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  const newJob = jobInput.value;
  const newName = nameInput.value;

  updateUserInfo(newName, newJob)
    .then(data => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editPopup);
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля:', err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

editProfileForm.addEventListener("submit", handleFormSubmitEditProfile);

enableValidation(objects);

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = newCardFormElement.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  const placeName = placeNameInput.value;
  const imageLink = imageLinkInput.value;

  addNewCard(placeName, imageLink)
    .then(data => {
      cardsContainer.prepend(createCard(data, deleteCard, openImagePopup, likeCard, cardTemplate, userId));
      closeModal(newCardPopup);
      newCardFormElement.reset();
      clearValidation(editProfileForm, objects);
    })
    .catch(err => console.error('Ошибка при добавлении карточки:', err))
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsData]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData._id;

    cardsData.forEach(card => {
      const cardItem = createCard(card, deleteCard, openImagePopup, likeCard, cardTemplate, userId);
      cardsContainer.append(cardItem);
    });
  })
  .catch(err => console.error(err));