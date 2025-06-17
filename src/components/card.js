export function deleteCard(cardElement) {
	cardElement.remove()
}

export function handleLikeButtonClick(evt) {
	evt.target.classList.toggle('card__like-button_is-active')
}

export function createCard(
	cardData,
	cardTemplate,
	userId,
	handleDeleteCard,
	handleLikeButton,
	handleCardImageClick
) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
	const cardImage = cardElement.querySelector('.card__image')
	const cardTitle = cardElement.querySelector('.card__title')
	const deleteButton = cardElement.querySelector('.card__delete-button')
	const likeButton = cardElement.querySelector('.card__like-button')
	const likeCount = cardElement.querySelector('.card__like-count')

	// Заполняем данные карточки
	cardImage.src = cardData.link
	cardImage.alt = cardData.name
	cardTitle.textContent = cardData.name
	likeCount.textContent = cardData.likes.length

	// Проверяем, является ли текущий пользователь владельцем карточки
	if (cardData.owner._id !== userId) {
		deleteButton.style.display = 'none'
	} else {
		deleteButton.addEventListener('click', () => {
			handleDeleteCard(cardData._id, cardElement)
		})
	}

	// Проверяем, поставил ли текущий пользователь лайк
	const isLiked = cardData.likes.some(like => like._id === userId)
	if (isLiked) {
		likeButton.classList.add('card__like-button_is-active')
	}

	// Обработчик лайка
	likeButton.addEventListener('click', () => {
		handleLikeButton(cardData._id, isLiked)
			.then(updatedCard => {
				likeCount.textContent = updatedCard.likes.length
				likeButton.classList.toggle('card__like-button_is-active')
			})
			.catch(err => {
				console.error('Ошибка при обновлении лайка:', err)
			})
	})

	// Обработчик клика по изображению
	cardImage.addEventListener('click', () => {
		handleCardImageClick({ link: cardData.link, name: cardData.name })
	})

	return cardElement
}
