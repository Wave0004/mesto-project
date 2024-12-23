const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card"); // Получаем шаблон карточки
import { openModal } from "/src/components/modal.js";

export function createCard({
  cardData,
  imagePopup,
  currentUserId,
  onRemove,
  onLike,
  onUnlike,
}) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-value");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  let isLikedByCurrentUser = cardData.likes.find(
    (user) => user._id === currentUserId
  );

  if (currentUserId !== cardData.owner._id) {
    deleteButton.remove();
  }

  if (isLikedByCurrentUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // Слушатель для лайка
  likeButton.addEventListener("click", () => {
    if (isLikedByCurrentUser) {
      onUnlike(cardData._id)
        .then((info) => {
          console.log(info);
          likeButton.classList.remove("card__like-button_is-active");
          isLikedByCurrentUser = false;
          likeCounter.textContent = info.likes.length;
        })
        .catch((err) => console.warn(err));
    } else {
      onLike(cardData._id)
        .then((info) => {
          console.log(info);
          likeButton.classList.add("card__like-button_is-active");
          isLikedByCurrentUser = true;
          likeCounter.textContent = info.likes.length;
        })
        .catch((err) => console.warn(err));
    }
  });

  // Слушатель для удаления карточки
  deleteButton?.addEventListener("click", () => {
    onRemove(cardData._id)
      .then((info) => {
        console.log(info);
        cardElement.remove();
      })
      .catch((err) => console.warn(err));
  });

  // Слушатель для открытия изображения
  cardImage.addEventListener("click", () => {
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    openModal(imagePopup);
  });

  return cardElement;
}
