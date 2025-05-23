import './pages/index.css'
import {
	createCard,
	deleteCard,
	handleLikeButtonClick,
} from './components/card.js'
import { initialCards } from './components/cards.js'
import { openModal, closeModal, setupModal } from './components/modal.js'

const cardTemplate = document.querySelector('#card-template').content
const cardsContainer = document.querySelector('.places__list')

const editProfilePopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileForm = document.querySelector('form[name="edit-profile"]')
const nameInput = profileForm.querySelector('input[name="name"]')
const jobInput = profileForm.querySelector('input[name="description"]')

const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')
const addCardForm = document.querySelector('form[name="new-place"]')
const placeNameInput = addCardForm.querySelector('input[name="place-name"]')
const placeLinkInput = addCardForm.querySelector('input[name="link"]')

const imagePopup = document.querySelector('.popup_type_image')
const imagePopupImage = imagePopup.querySelector('.popup__image')
const imagePopupCaption = imagePopup.querySelector('.popup__caption')

function handleCardImageClick({ link, name }) {
	imagePopupImage.src = link
	imagePopupImage.alt = name
	imagePopupCaption.textContent = name
	openModal(imagePopup)
}

function handleProfileFormSubmit(evt) {
	evt.preventDefault()
	profileTitle.textContent = nameInput.value
	profileDescription.textContent = jobInput.value
	closeModal(editProfilePopup)
}

function handleAddCardSubmit(evt) {
	evt.preventDefault()

	const newCard = createCard(
		{
			name: placeNameInput.value,
			link: placeLinkInput.value,
		},
		cardTemplate,
		deleteCard,
		handleLikeButtonClick,
		handleCardImageClick
	)

	cardsContainer.prepend(newCard)
	addCardForm.reset()
	closeModal(addCardPopup)
}

function renderCards() {
	initialCards.forEach(cardData => {
		const cardElement = createCard(
			cardData,
			cardTemplate,
			deleteCard,
			handleLikeButtonClick,
			handleCardImageClick
		)
		cardsContainer.append(cardElement)
	})
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.popup').forEach(setupModal)

	profileForm.addEventListener('submit', handleProfileFormSubmit)
	addCardForm.addEventListener('submit', handleAddCardSubmit)

	editButton.addEventListener('click', () => {
		nameInput.value = profileTitle.textContent
		jobInput.value = profileDescription.textContent
		openModal(editProfilePopup)
	})

	addButton.addEventListener('click', () => openModal(addCardPopup))

	renderCards()
})
