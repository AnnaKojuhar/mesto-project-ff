// index.js

import "../pages/index.css";

//import { initialCards } from "./cards.js";

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
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newCardFormElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const placeNameInput = newCardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const imageLinkInput = newCardFormElement.querySelector(
  ".popup__input_type_url"
);


const profileImage = document.querySelector('.profile__image');
const newAvaPopup=document.querySelector('.popup_type-new-ava');
const editAvaForm = document.querySelector(".popup_type-new-ava .popup__form");


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

//открытие попапа с аватаром

profileImage.addEventListener('click', ()=>{
  openModal(newAvaPopup)
})

function handleEditAvaFormSubmit(evt) {
  evt.preventDefault(); 

  const submitButton = editAvaForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const avaInput = editAvaForm.querySelector("#new-ava");
  const newAvaUrl = avaInput.value;

  fetch('https://nomoreparties.co/v1/wff-cohort-21/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '5acfb509-852f-4951-8140-6745300cf269',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: newAvaUrl
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
 


//открытие попапа

import { openModal } from "./modal.js";

//закрытие попапа

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

// Находим форму в DOM

const editProfileForm = editPopup.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = editProfileForm.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
); // Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); 
  const submitButton = editProfileForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  const newJob = jobInput.value;
  const newName = nameInput.value;




 fetch('https://nomoreparties.co/v1/wff-cohort-21/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '5acfb509-852f-4951-8140-6745300cf269',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
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
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editProfileForm.addEventListener("submit", handleFormSubmitEditProfile);
//валидация форм редактиррования профиля
//функция добавления класса с ошибкой



const objects= {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};



//работаем с кнопкой сохранить
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
    
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
    
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, config);
  });
};

const clearValidation = (formElement, config) =>{
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  inputList.forEach((inputElement)=>{
    hideInputError(formElement, inputElement, config);
  })
  toggleButtonState(inputList, buttonElement, config)
}
 



// Вызовем функцию
enableValidation(objects);

//даем возможность добавлять картинки
//найдем форму для добавления новой карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = newCardFormElement.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  const placeName = placeNameInput.value;
  const imageLink = imageLinkInput.value;

  fetch('https://nomoreparties.co/v1/wff-cohort-21/cards', {
    method: 'POST',
    headers: {
      authorization: '5acfb509-852f-4951-8140-6745300cf269',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: placeName,
      link: imageLink
    })
   
  })
  .then(res=>res.json())
  .then(data=>cardsContainer.prepend(createCard(data,
    
    deleteCard,
    openImagePopup,
    likeCard,
    cardTemplate,
    userId
  )))
 .catch(err => console.error('Ошибка при добавлении карточки:', err))
.finally(()=>{
  closeModal(newCardPopup);
  newCardFormElement.reset();
  clearValidation(editProfileForm, objects); 
  
})
  

  const inputList = Array.from(
    newCardFormElement.querySelectorAll(".popup__input")
  );
  const buttonElement = newCardFormElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement, objects);
}

newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);


 fetch('https://nomoreparties.co/v1/wff-cohort-21/users/me ', {
  headers: {
    authorization: '5acfb509-852f-4951-8140-6745300cf269'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

  fetch('https://nomoreparties.co/v1/wff-cohort-21/cards',{
    headers: {
      authorization: '5acfb509-852f-4951-8140-6745300cf269'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });


  Promise.all([
    fetch('https://nomoreparties.co/v1/wff-cohort-21/users/me', {
      headers: {
        authorization: '5acfb509-852f-4951-8140-6745300cf269'
      }
    }).then(res => res.json()),
    fetch('https://nomoreparties.co/v1/wff-cohort-21/cards', {
      headers: {
        authorization: '5acfb509-852f-4951-8140-6745300cf269'
      }
    }).then(res => res.json())
  ])
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


  

  