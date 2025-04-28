const cardTemplate = document.querySelector('#card-template').content

const placesList = document.querySelector('.places__list')

function createCard(cardData, deleteCard) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardTitle.textContent = cardData.name
	deleteButton.addEventListener('click', () => {
		deleteCard(cardElement)
	})

	return cardElement
}
function deleteCard(cardElement) {
	cardElement.remove()
}
function renderCards() {
	initialCards.forEach(cardData => {
		const cardElement = createCard(cardData, deleteCard)
		placesList.append(cardElement)
	})
}

renderCards()
