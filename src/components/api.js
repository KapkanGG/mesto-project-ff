const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-40',
	headers: {
		authorization: '6f37d469-900d-407d-8a37-a26b40cc39ad',
		'Content-Type': 'application/json',
	},
}

function checkResponse(res) {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка: ${res.status}`)
}

// Загрузка информации о пользователе
export const getUserInfo = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(checkResponse)
}

// Загрузка карточек
export const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(checkResponse)
}

// Обновление профиля
export const updateProfile = (name, about) => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name,
			about,
		}),
	}).then(checkResponse)
}

// Добавление новой карточки
export const addNewCard = (name, link) => {
	return fetch(`${config.baseUrl}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify({
			name,
			link,
		}),
	}).then(checkResponse)
}

// Удаление карточки
export const deleteCard = cardId => {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(checkResponse)
}

// Постановка лайка
export const likeCard = cardId => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: config.headers,
	}).then(checkResponse)
}

// Снятие лайка
export const unlikeCard = cardId => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: config.headers,
	}).then(checkResponse)
}

// Обновление аватара
export const updateAvatar = avatar => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar,
		}),
	}).then(checkResponse)
}
