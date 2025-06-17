import './pages/index.css'
import { createCard, handleLikeButton } from './components/card.js'
import { openModal, closeModal, setupModal } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import {
	getUserInfo,
	getInitialCards,
	updateProfile,
	addNewCard,
	deleteCard,
	likeCard,
	unlikeCard,
	updateAvatar,
} from './components/api.js'

const cardTemplate = document.querySelector('#card-template').content
const cardsContainer = document.querySelector('.places__list')

// Элементы профиля
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')

// Попап редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')
const profileForm = document.querySelector('form[name="edit-profile"]')
const nameInput = profileForm.querySelector('input[name="name"]')
const jobInput = profileForm.querySelector('input[name="description"]')

// Попап добавления карточки
const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')
const addCardForm = document.querySelector('form[name="new-place"]')
const placeNameInput = addCardForm.querySelector('input[name="place-name"]')
const placeLinkInput = addCardForm.querySelector('input[name="link"]')

// Попап изображения
const imagePopup = document.querySelector('.popup_type_image')
const imagePopupImage = imagePopup.querySelector('.popup__image')
const imagePopupCaption = imagePopup.querySelector('.popup__caption')

// Попап обновления аватара
const avatarPopup = document.querySelector('.popup_type_avatar')
const avatarForm = document.querySelector('form[name="edit-avatar"]')
const avatarInput = avatarForm.querySelector('input[name="avatar"]')

// Попап подтверждения удаления
const deleteCardPopup = document.querySelector('.popup_type_delete-card')
const deleteConfirmButton = deleteCardPopup.querySelector(
	'.popup__button_delete'
)

// Настройки валидации
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

let userId
let cardToDelete = { id: null, element: null }

// Функция отображения карточек
function renderCards(cards) {
	cards.forEach(card => {
		const cardElement = createCard(
			card,
			cardTemplate,
			userId,
			handleDeleteButtonClick,
			handleLikeCard,
			handleCardImageClick
		)
		cardsContainer.append(cardElement)
	})
}

// Обработчики событий
function handleCardImageClick(cardData) {
	imagePopupImage.src = cardData.link
	imagePopupImage.alt = cardData.name
	imagePopupCaption.textContent = cardData.name
	openModal(imagePopup)
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault()
	const submitButton = evt.submitter
	submitButton.textContent = 'Сохранение...'

	updateProfile(nameInput.value, jobInput.value)
		.then(userData => {
			profileTitle.textContent = userData.name
			profileDescription.textContent = userData.about
			closeModal(editProfilePopup)
		})
		.catch(console.error)
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

function handleAddCardSubmit(evt) {
	evt.preventDefault()
	const submitButton = evt.submitter
	submitButton.textContent = 'Сохранение...'

	addNewCard(placeNameInput.value, placeLinkInput.value)
		.then(newCard => {
			const cardElement = createCard(
				newCard,
				cardTemplate,
				userId,
				handleDeleteButtonClick,
				handleLikeCard,
				handleCardImageClick
			)
			cardsContainer.prepend(cardElement)
			addCardForm.reset()
			closeModal(addCardPopup)
		})
		.catch(console.error)
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

function handleDeleteButtonClick(cardId, cardElement) {
	cardToDelete = { id: cardId, element: cardElement }
	openModal(deleteCardPopup)
}

function handleDeleteConfirm() {
	const originalText = deleteConfirmButton.textContent
	deleteConfirmButton.textContent = 'Удаление...'
	deleteConfirmButton.disabled = true

	deleteCard(cardToDelete.id)
		.then(() => {
			cardToDelete.element.remove()
			closeModal(deleteCardPopup)
			cardToDelete = { id: null, element: null }
		})
		.catch(console.error)
		.finally(() => {
			deleteConfirmButton.textContent = originalText
			deleteConfirmButton.disabled = false
		})
}

function handleLikeCard(cardId, isLiked) {
	return isLiked ? unlikeCard(cardId) : likeCard(cardId)
}

function handleAvatarSubmit(evt) {
	evt.preventDefault()
	const submitButton = evt.submitter
	submitButton.textContent = 'Сохранение...'

	updateAvatar(avatarInput.value)
		.then(userData => {
			profileAvatar.style.backgroundImage = `url(${userData.avatar})`
			closeModal(avatarPopup)
			avatarForm.reset()
		})
		.catch(console.error)
		.finally(() => {
			submitButton.textContent = 'Сохранить'
		})
}

// Инициализация приложения
function initApp() {
	// Настройка модальных окон
	document.querySelectorAll('.popup').forEach(setupModal)

	// Включение валидации
	enableValidation(validationConfig)

	// Обработчики форм
	profileForm.addEventListener('submit', handleProfileFormSubmit)
	addCardForm.addEventListener('submit', handleAddCardSubmit)
	avatarForm.addEventListener('submit', handleAvatarSubmit)

	// Обработчик кнопки подтверждения удаления
	deleteConfirmButton.addEventListener('click', handleDeleteConfirm)

	// Обработчики кнопок
	editButton.addEventListener('click', () => {
		nameInput.value = profileTitle.textContent
		jobInput.value = profileDescription.textContent
		clearValidation(profileForm, validationConfig)
		openModal(editProfilePopup)
	})

	addButton.addEventListener('click', () => {
		addCardForm.reset()
		clearValidation(addCardForm, validationConfig)
		openModal(addCardPopup)
	})

	profileAvatar.addEventListener('click', () => {
		avatarForm.reset()
		clearValidation(avatarForm, validationConfig)
		openModal(avatarPopup)
	})

	// Загрузка данных
	Promise.all([getUserInfo(), getInitialCards()])
		.then(([userData, cards]) => {
			userId = userData._id
			profileTitle.textContent = userData.name
			profileDescription.textContent = userData.about
			profileAvatar.style.backgroundImage = `url(${userData.avatar})`
			renderCards(cards)
		})
		.catch(console.error)
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', initApp)
