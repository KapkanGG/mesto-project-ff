const cardTemplate = document.querySelector('#card-template').content
const cardsContainer = document.querySelector('.places__list')
function deleteCard(cardElement) {
	cardElement.remove()
}
function createCard(cardData) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardTitle.textContent = cardData.name
	deleteButton.addEventListener('click', () => deleteCard(cardElement))
	
	return cardElement
}
function renderCards() {
	initialCards.forEach(cardData => {
		cardsContainer.append(createCard(cardData))
	})
}

renderCards()
