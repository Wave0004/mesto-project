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

import initialCards from './cards.js'

// Поп-апы
const profilePopup = document.querySelector('.popup_type_edit'); // Поп-ап редактирования профиля
const cardPopup = document.querySelector('.popup_type_new-card'); // Поп-ап добавления карточки
const imagePopup = document.querySelector('.popup_type_image'); // Поп-ап с картинкой

// Универсальная функция для открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);  // Добавляем слушателя для клавиши Esc (4 номер)
}

// Универсальная функция для закрытия поп-апа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);  // Удаляем слушателя для клавиши Esc (4 номер)
}

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

// Функция создания карточки
function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Слушатель для лайка
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    // Слушатель для удаления карточки
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    // Слушатель для открытия изображения
    cardImage.addEventListener('click', () => {
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupCaption.textContent = cardData.name;

        openModal(imagePopup);
    });

    return cardElement;
}

// Вывод карточек на страницу
function renderCards(cards) {
    const cardElements = cards.map((card) => createCard(card));
    placesList.append(...cardElements);
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

// Функция проверки поля
function checkInputValidity(input) {
    const errorElement = input.parentElement.querySelector('.popup__input-error');
    if (!input.validity.valid) {
        showInputError(input, input.validationMessage); // Показываем сообщение
    } else {
        hideInputError(input); // Скрываем сообщение, если всё верно
    }
}

// Функция для показа ошибки
function showInputError(input, message) {
    const errorElement = input.parentElement.querySelector('.popup__input-error');
    errorElement.textContent = message; // Устанавливаем текст ошибки
    errorElement.style.display = 'block'; // Делаем ошибку видимой
    input.classList.add('popup__input_invalid'); // Добавляем стиль невалидного поля
}

// Функция для скрытия ошибки
function hideInputError(input) {
    const errorElement = input.parentElement.querySelector('.popup__input-error');
    errorElement.textContent = ''; // Очищаем текст ошибки
    errorElement.style.display = 'none'; // Скрываем ошибку
    input.classList.remove('popup__input_invalid'); // Убираем стиль невалидного поля
}

// Проверка всей формы
function checkFormValidity(form) {
    const inputs = form.querySelectorAll('.popup__input');
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.validity.valid) {
            isValid = false;
        }
    });

    return isValid;
}

// Отключение кнопки, если форма невалидна
function toggleSubmitButton(form, button) {
    if (checkFormValidity(form)) {
        button.disabled = false; // Включаем кнопку
    } else {
        button.disabled = true; // Отключаем кнопку
    }
}

// Настройка валидации для формы
function setupFormValidation(form) {
    const inputs = form.querySelectorAll('.popup__input');
    const submitButton = form.querySelector('.popup__button');

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input); // Проверяем поле на ввод
            toggleSubmitButton(form, submitButton); // Управляем состоянием кнопки
        });
    });

    // Устанавливаем начальное состояние кнопки
    toggleSubmitButton(form, submitButton);
}

// Инициализация форм
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');

// Включение валидации для обеих форм
setupFormValidation(profileForm);
setupFormValidation(newCardForm);

//------3номер------
// Функция для закрытия поп-апа по клику на оверлей
function closeModalOnOverlayClick(evt) {
    // Проверяем, что клик был именно по оверлею (поп-апу в целом)
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target); // Закрываем модалку
    }
}

// Применяем обработчик ко всем поп-апам
const allPopups = document.querySelectorAll('.popup');
allPopups.forEach((popup) => {
    popup.addEventListener('click', closeModalOnOverlayClick);
});


// 4 Номер
function closeByEsc(evt) {
    if (evt.key === 'Escape') {  // Проверяем, нажата ли клавиша Esc
        const openedPopup = document.querySelector('.popup_is-opened');  // Находим открытый поп-ап
        if (openedPopup) {
            closeModal(openedPopup);  // Закрываем поп-ап
        }
    }
}




