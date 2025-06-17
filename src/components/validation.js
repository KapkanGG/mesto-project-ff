// Функция для отключения кнопки
const disableButton = (buttonElement, settings) => {
	buttonElement.disabled = true
	buttonElement.classList.add(settings.inactiveButtonClass)
}

// Функция для показа ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, settings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(settings.inputErrorClass)
	errorElement.textContent = errorMessage
	errorElement.classList.add(settings.errorClass)
}

// Функция для скрытия ошибки валидации
const hideInputError = (formElement, inputElement, settings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(settings.inputErrorClass)
	errorElement.textContent = ''
	errorElement.classList.remove(settings.errorClass)
}

// Функция для проверки валидности поля
const checkInputValidity = (formElement, inputElement, settings) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		inputElement.setCustomValidity('')
	}

	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			settings
		)
	} else {
		hideInputError(formElement, inputElement, settings)
	}
}

// Функция для проверки наличия невалидных полей
const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
	})
}

// Функция для переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
	if (hasInvalidInput(inputList)) {
		disableButton(buttonElement, settings)
	} else {
		buttonElement.disabled = false
		buttonElement.classList.remove(settings.inactiveButtonClass)
	}
}

// Функция для добавления обработчиков событий
const setEventListeners = (formElement, settings) => {
	const inputList = Array.from(
		formElement.querySelectorAll(settings.inputSelector)
	)
	const buttonElement = formElement.querySelector(settings.submitButtonSelector)

	toggleButtonState(inputList, buttonElement, settings)

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement, settings)
			toggleButtonState(inputList, buttonElement, settings)
		})
	})
}

// Функция для включения валидации всех форм
export const enableValidation = settings => {
	const formList = Array.from(document.querySelectorAll(settings.formSelector))
	formList.forEach(formElement => {
		setEventListeners(formElement, settings)
	})
}

// Функция для очистки ошибок валидации
export const clearValidation = (formElement, settings) => {
	const inputList = Array.from(
		formElement.querySelectorAll(settings.inputSelector)
	)
	const buttonElement = formElement.querySelector(settings.submitButtonSelector)

	inputList.forEach(inputElement => {
		hideInputError(formElement, inputElement, settings)
		inputElement.setCustomValidity('')
	})

	disableButton(buttonElement, settings)
}
