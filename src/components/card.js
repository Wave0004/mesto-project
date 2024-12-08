const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); // Получаем шаблон карточки
import {openModal} from "/src/components/modal.js";

export function createCard(cardData, imagePopup) {
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

