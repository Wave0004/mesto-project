// Универсальная функция для открытия поп-апа
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);  // Добавляем слушателя для клавиши Esc
}

export function closeByEsc(evt) {
    if (evt.key === 'Escape') {  // Проверяем, нажата ли клавиша Esc
        const openedPopup = document.querySelector('.popup_is-opened');  // Находим открытый поп-ап
        if (openedPopup) {
            closeModal(openedPopup);  // Закрываем поп-ап
        }
    }
}

// Универсальная функция для закрытия поп-апа
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);  // Удаляем слушателя для клавиши Esc
}

// Функция для закрытия поп-апа по клику на оверлей
export function closeModalOnOverlayClick(evt) {
    // Проверяем, что клик был именно по оверлею (поп-апу в целом)
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target); // Закрываем модалку
    }
}