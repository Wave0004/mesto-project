import addIcon from '../images/add-icon.svg';
import avatar from '../images/avatar.jpg';
import card1 from '../images/card_1.jpg';
import card2 from '../images/card_2.jpg';
import card3 from '../images/card_3.jpg';
import close from '../images/close.svg';
import deleteIcon from '../images/delete-icon.svg';
import editIcon from '../images/edit-icon.svg';
import likeActive from '../images/like-active.svg';
import likeInactive from '../images/like-inactive.svg';
import logo from '../images/logo.svg';

const Images = [
    {name: 'AddIcon', link: addIcon},
    {name: 'Avatar', link: avatar},
    {name: 'Card1', link: card1},
    {name: 'Card2', link: card2},
    {name: 'Card3', link: card3},
    {name: 'Close', link: close},
    {name: 'DeleteIcon', link: deleteIcon},
    {name: 'EditIcon', link: editIcon},
    {name: 'LikeActive', link: likeActive},
    {name: 'LikeInactive', link: likeInactive},
    {name: 'Logo', link: logo},
];

import '../pages/index.css';
import { createCard } from '../src/components/card.js';
import {openModal} from "../src/components/modal.js";
import {closeByEsc} from "../src/components/modal.js";
import {closeModal, closeModalOnOverlayClick} from "../src/components/modal.js";
import {initialCards } from './cards.js';
import { enableValidation, checkInputValidity, showInputError, hideInputError, toggleSubmitButton, setEventListeners } from '../src/components/validate.js'; // Импортируем функцию валидации

// Объект с настройками для валидации
const validationSettings = {
    formSelector: '.popup__form', // Селектор формы
    inputSelector: '.popup__input', // Селектор для полей ввода
    submitButtonSelector: '.popup__button', // Селектор для кнопки отправки формы
    errorClass: '.popup__input-error', // Селектор для элемента ошибки
    errorClassVisible: 'popup__input-error_visible', // Класс для видимой ошибки
    inputInvalidClass: 'popup__input_invalid' // Класс для невалидного поля
};

// Включаем валидацию для всех форм
enableValidation(validationSettings);

// Поп-апы
const profilePopup = document.querySelector('.popup_type_edit'); // Поп-ап редактирования профиля
const cardPopup = document.querySelector('.popup_type_new-card'); // Поп-ап добавления карточки
const imagePopup = document.querySelector('.popup_type_image'); // Поп-ап с картинкой

// --- Редактирование профиля ---
const editProfileButton = document.querySelector('.profile__edit-button'); // Кнопка "редактировать профиль"
const closeProfilePopupButton = profilePopup.querySelector('.popup__close'); // Кнопка "закрыть" в поп-апе

// Элементы профиля
const profileName = document.querySelector('.profile__title'); // Имя профиля
const profileDescription = document.querySelector('.profile__description'); // О себе

// Форма редактирования профиля и её поля
const profileFormElement = profilePopup.querySelector('.popup__form'); // Форма редактирования профиля
const nameInput = profileFormElement.querySelector('.popup__input_type_name'); // Поле "Имя"
const jobInput = profileFormElement.querySelector('.popup__input_type_description'); // Поле "О себе"

// Открыть поп-ап редактирования профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

// Закрыть поп-ап редактирования профиля
closeProfilePopupButton.addEventListener('click', () => closeModal(profilePopup));

// Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
}

// Добавляем обработчик события "submit" для формы редактирования профиля
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// --- Карточки ---
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// --- Добавление новых карточек ---
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const closeCardPopupButton = cardPopup.querySelector('.popup__close'); // Кнопка закрытия поп-апа добавления карточки
const cardFormElement = cardPopup.querySelector('.popup__form'); // Форма добавления карточки
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name'); // Поле "Название"
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url'); // Поле "Ссылка на картинку"

// Открыть поп-ап добавления карточки
addCardButton.addEventListener('click', () => {
    cardNameInput.value = ''; // Очистить поле "Название"
    cardLinkInput.value = ''; // Очистить поле "Ссылка на картинку"
    openModal(cardPopup);
});

// Закрыть поп-ап добавления карточки
closeCardPopupButton.addEventListener('click', () => closeModal(cardPopup));

// --- Закрытие поп-апа с картинкой ---
const closeImagePopupButton = imagePopup.querySelector('.popup__close'); // Кнопка закрытия поп-апа с картинкой
closeImagePopupButton.addEventListener('click', () => closeModal(imagePopup));

function renderCards(cards) {
    const placesList = document.querySelector('.places__list');
    cards.forEach((card) => {
        const cardElement = createCard(card, imagePopup);
        placesList.append(cardElement);
    });
}

// Обработчик отправки формы добавления карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    const newCard = createCard(newCardData);
    placesList.prepend(newCard); // Добавляем карточку в начало списка
    closeModal(cardPopup);
}

// Добавляем обработчик события "submit" для формы добавления карточки
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Инициализация карточек
renderCards(initialCards);


// Настройка валидации для формы
function setupFormValidation(form, settings) { // Добавляем settings как аргумент
    const inputs = form.querySelectorAll('.popup__input');
    const submitButton = form.querySelector('.popup__button');

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
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

// Включение валидации для обеих форм
setupFormValidation(profileForm, validationSettings); // Передаем validationSettings
setupFormValidation(newCardForm, validationSettings); // Передаем validationSettings


// Применяем обработчик ко всем поп-апам
const allPopups = document.querySelectorAll('.popup');
allPopups.forEach((popup) => {
    popup.addEventListener('click', closeModalOnOverlayClick);
});




