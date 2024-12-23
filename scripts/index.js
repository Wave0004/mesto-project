import addIcon from "../images/add-icon.svg";
import avatar from "../images/avatar.jpg";
import card1 from "../images/card_1.jpg";
import card2 from "../images/card_2.jpg";
import card3 from "../images/card_3.jpg";
import close from "../images/close.svg";
import deleteIcon from "../images/delete-icon.svg";
import editIcon from "../images/edit-icon.svg";
import likeActive from "../images/like-active.svg";
import likeInactive from "../images/like-inactive.svg";
import logo from "../images/logo.svg";

const Images = [
  { name: "AddIcon", link: addIcon },
  { name: "Avatar", link: avatar },
  { name: "Card1", link: card1 },
  { name: "Card2", link: card2 },
  { name: "Card3", link: card3 },
  { name: "Close", link: close },
  { name: "DeleteIcon", link: deleteIcon },
  { name: "EditIcon", link: editIcon },
  { name: "LikeActive", link: likeActive },
  { name: "LikeInactive", link: likeInactive },
  { name: "Logo", link: logo },
];

import "../pages/index.css";
import { createCard } from "../src/components/card.js";
import { openModal } from "../src/components/modal.js";
import { closeByEsc } from "../src/components/modal.js";
import {
  closeModal,
  closeModalOnOverlayClick,
} from "../src/components/modal.js";
import { initialCards } from "./cards.js";
import {
  enableValidation,
  checkInputValidity,
  showInputError,
  hideInputError,
  toggleSubmitButton,
  setEventListeners,
} from "../src/components/validate.js"; // Импортируем функцию валидации
import {
  addNewCard,
  editProfile,
  getInititalCards,
  getUserInfo,
  likeCard,
  removeCard,
  unLikeCard,
  updateAvatar,
} from "../src/components/api.js";

// Объект с настройками для валидации
const validationSettings = {
  formSelector: ".popup__form", // Селектор формы
  inputSelector: ".popup__input", // Селектор для полей ввода
  submitButtonSelector: ".popup__button", // Селектор для кнопки отправки формы
  errorClass: ".popup__input-error", // Селектор для элемента ошибки
  errorClassVisible: "popup__input-error_visible", // Класс для видимой ошибки
  inputInvalidClass: "popup__input_invalid", // Класс для невалидного поля
};

// Актуальные данные пользователя
const currentUserInfo = {
  _id: null,
};

// Включаем валидацию для всех форм
enableValidation(validationSettings);

// Поп-апы
const profilePopup = document.querySelector(".popup_type_edit"); // Поп-ап редактирования профиля
const cardPopup = document.querySelector(".popup_type_new-card"); // Поп-ап добавления карточки
const imagePopup = document.querySelector(".popup_type_image"); // Поп-ап с картинкой
const avatarPopup = document.querySelector(".popup_type_avatar");

// Закрытие всех поп-апов

const closePopupBtnEls = document.querySelectorAll(".popup__close");
closePopupBtnEls.forEach((closeBtnEl) =>
  closeBtnEl.addEventListener("click", (e) =>
    closeModal(e.target.closest(".popup"))
  )
);

//Редактирование профиля
const editProfileButton = document.querySelector(".profile__edit-button"); // Кнопка "редактировать профиль"

// Элементы профиля
const profileName = document.querySelector(".profile__title"); // Имя профиля
const profileDescription = document.querySelector(".profile__description"); // О себе
const profileAvatarEl = document.querySelector(".profile__image");

// Форма редактирования профиля и её поля
const profileFormElement = profilePopup.querySelector(".popup__form"); // Форма редактирования профиля
const nameInput = profileFormElement.querySelector(".popup__input_type_name"); // Поле Имя
const jobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
); // Поле "О себе"
const profileFormSubmitBtnElement =
  profilePopup.querySelector(".popup__button");

// Поле ввода в форму аватара

const avatarInputEl = avatarPopup.querySelector(".popup__input_type_url");
const avatarFormSubmitBtnElement = avatarPopup.querySelector(".popup__button");

// Открыть поп-ап редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});


// Обработчик отправки формы редактирования профиля
async function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newUserInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };

  //Изменение данных пользователя

  profileFormSubmitBtnElement.textContent = "Сохранение...";

  editProfile(newUserInfo)
    .then((info) => {
      profileName.textContent = info.name;
      profileDescription.textContent = info.about;
      closeModal(profilePopup);
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      profileFormSubmitBtnElement.textContent = "Сохранить";
    });
}

// Добавляем обработчик события "submit" для формы редактирования профиля
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Карточки
const placesList = document.querySelector(".places__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//Добавление новых карточек
const addCardButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const cardFormElement = cardPopup.querySelector(".popup__form"); // Форма добавления карточки
const cardNameInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
); // Поле Название
const cardLinkInput = cardFormElement.querySelector(".popup__input_type_url"); // Поле "Ссылка на картинку"
const cardFormSubmitBtnElement =
  cardFormElement.querySelector(".popup__button");

// Открыть поп-ап добавления карточки
addCardButton.addEventListener("click", () => {
  cardNameInput.value = ""; // Очистить поле "Название"
  cardLinkInput.value = ""; // Очистить поле "Ссылка на картинку"
  openModal(cardPopup);
});

// Открытие попапа аватара

profileAvatarEl.addEventListener("click", () => {
  avatarInputEl.value = profileAvatarEl.style.backgroundImage
    .replace('url("', "")
    .replace('")', "");

  openModal(avatarPopup);
});

async function renderCards(cards) {
  const placesList = document.querySelector(".places__list");
  cards.forEach((cardData) => {
    const cardElement = createCard({
      cardData,
      imagePopup,
      currentUserId: currentUserInfo._id,
      onRemove: removeCard,
      onLike: likeCard,
      onUnlike: unLikeCard,
    });

    placesList.append(cardElement);
  });
}

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  //   Отправляем карточку на сервер
  cardFormSubmitBtnElement.textContent = "Сохранение...";

  addNewCard(newCardData)
    .then((cardData) => {
      console.log(cardFormSubmitBtnElement);
      const newCard = createCard({
        cardData,
        imagePopup,
        currentUserId: currentUserInfo._id,
        onRemove: removeCard,
        onLike: likeCard,
        onUnlike: unLikeCard,
      });
      placesList.prepend(newCard); // Добавлsяем карточку в начало списка
      closeModal(cardPopup);
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      cardFormSubmitBtnElement.textContent = "Сохранить";
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const newAvatarUrl = avatarInputEl.value;

  avatarFormSubmitBtnElement.textContent = "Сохранение...";

  updateAvatar(newAvatarUrl)
    .then((userInfo) => {
      profileAvatarEl.style.backgroundImage = `url("${userInfo.avatar}")`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      avatarFormSubmitBtnElement.textContent = "Сохранить";
    });
}

// Добавляем обработчик события "submit" для формы добавления карточки
cardFormElement.addEventListener("submit", handleCardFormSubmit);

// Добавляем обработчик события "submit" для формы аватара пользователя



// Настройка валидации для формы
function setupFormValidation(form, settings) {
  // Добавляем settings как аргумент
  const inputs = form.querySelectorAll(".popup__input");
  const submitButton = form.querySelector(".popup__button");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, settings); // Передаем settings в checkInputValidity
      toggleSubmitButton(form, submitButton, settings); // Передаем settings в toggleSubmitButton
    });
  });

  // Устанавливаем начальное состояние кнопки
  toggleSubmitButton(form, submitButton, settings); // Передаем settings в toggleSubmitButton
}

// Инициализация форм
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const avatarForm = document.querySelector('.popup__form[name="new-avatar"]');

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Включение валидации для обеих форм
setupFormValidation(profileForm, validationSettings); // Передаем validationSettings
setupFormValidation(newCardForm, validationSettings); // Передаем validationSettings
setupFormValidation(avatarForm, validationSettings); // Передаем validationSettings

// Применяем обработчик ко всем поп-апам
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach((popup) => {
  popup.addEventListener("click", closeModalOnOverlayClick);
});

// Получение карточек с сервера и их рендер

getInititalCards()
  .then((cards) => {
    renderCards(cards);
  })
  .catch((err) => console.warn(err));

//   Получение своих данных пользователя с сервера

getUserInfo()
  .then((userInfo) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatarEl.style.backgroundImage = `url("${userInfo.avatar}")`;
    currentUserInfo._id = userInfo._id;
  })
  .catch((err) => console.warn(err));
