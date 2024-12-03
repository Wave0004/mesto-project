// Поп-апы
const profilePopup = document.querySelector('.popup_type_edit'); // Поп-ап редактирования профиля
const cardPopup = document.querySelector('.popup_type_new-card'); // Поп-ап добавления карточки
const imagePopup = document.querySelector('.popup_type_image'); // Поп-ап с картинкой

// Универсальная функция для открытия поп-апа
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

// Универсальная функция для закрытия поп-апа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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

// Добавляем класс анимации ко всем поп-апам при загрузке страницы
document.querySelectorAll('.popup').forEach(popup => {
    popup.classList.add('popup_is-animated');
});
