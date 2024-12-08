// Функция для проверки валидности поля
export function checkInputValidity(input, settings) {
    const errorElement = input.parentElement.querySelector(settings.errorClass);
    if (!input.validity.valid) {
        showInputError(input, settings, input.validationMessage); // Показываем ошибку
    } else {
        hideInputError(input, settings); // Скрываем ошибку
    }
}

// Функция для показа ошибки
export function showInputError(input, settings, message) {
    const errorElement = input.parentElement.querySelector(settings.errorClass);
    errorElement.textContent = message;
    errorElement.classList.add(settings.errorClassVisible); // Делаем ошибку видимой
    input.classList.add(settings.inputInvalidClass); // Добавляем класс для невалидного поля
}

// Функция для скрытия ошибки
export function hideInputError(input, settings) {
    const errorElement = input.parentElement.querySelector(settings.errorClass);
    errorElement.textContent = ''; // Очищаем текст ошибки
    errorElement.classList.remove(settings.errorClassVisible); // Скрываем ошибку
    input.classList.remove(settings.inputInvalidClass); // Убираем класс для невалидного поля
}

// Функция для включения/выключения кнопки отправки формы
export function toggleSubmitButton(form, submitButton, settings) {
    if (form.checkValidity()) {
        submitButton.disabled = false; // Разблокировать кнопку
    } else {
        submitButton.disabled = true; // Заблокировать кнопку
    }
}

// Функция для установки слушателей событий на форму
export function setEventListeners(form, settings) {
    const inputs = form.querySelectorAll(settings.inputSelector);
    const submitButton = form.querySelector(settings.submitButtonSelector);

    // Для каждого поля настраиваем слушатель ввода
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, settings); // Проверяем поле на валидность
            toggleSubmitButton(form, submitButton, settings); // Обновляем состояние кнопки
        });
    });

    // Устанавливаем начальное состояние кнопки
    toggleSubmitButton(form, submitButton, settings);
}

// Функция для включения валидации
export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach((form) => {
        setEventListeners(form, settings); // Устанавливаем обработчики событий для каждой формы
    });
}
