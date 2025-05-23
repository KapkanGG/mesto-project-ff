function deleteCard(cardElement) {

	cardElement.remove()
}

function handleLikeButtonClick(evt) {

	evt.target.classList.toggle('card__like-button_is-active')
}


function createCard(
	cardData,
	cardTemplate,
	deleteCard,
	handleLikeButtonClick,
	handleCardImageClick
) {

	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)


	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	const likeButton = cardElement.querySelector('.card__like-button')

	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardTitle.textContent = cardData.name

	deleteButton.addEventListener('click', () => {
		deleteCard(cardElement)
	})

	likeButton.addEventListener('click', handleLikeButtonClick)

	cardImage.addEventListener('click', () => handleCardImageClick(cardData))

	return cardElement
}

export { deleteCard, handleLikeButtonClick, createCard }
