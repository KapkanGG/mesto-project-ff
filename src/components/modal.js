export function openModal(popupElement) {
	popupElement.classList.add('popup_is-opened')

	document.addEventListener('keydown', handleEscClose)
}

export function closeModal(popupElement) {
	popupElement.classList.remove('popup_is-opened')

	document.removeEventListener('keydown', handleEscClose)
}

function handleEscClose(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened')
		if (openedPopup) {
			closeModal(openedPopup)
		}
	}
}

export function setupModal(popup) {
	const closeButton = popup.querySelector('.popup__close')
	closeButton.addEventListener('click', () => closeModal(popup))

	popup.addEventListener('mousedown', evt => {
		if (evt.target === popup) {
			closeModal(popup)
		}
	})
}


/*Спасибо за ревью :з*/