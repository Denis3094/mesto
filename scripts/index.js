const body = document.querySelector('.page');

//Переменные редактирования профиля
const editBtn = body.querySelector('.profile__button-edit');
const popupEditProfile = body.querySelector('.popup_edit-profile');
const profileName = body.querySelector('.profile__name');
const profileJob = body.querySelector('.profile__job');
const nameInput = body.querySelector('.popup__input_type_name');
const jobInput = body.querySelector('.popup__input_type_job');
const closeBtnEditProfile = body.querySelector('.popup__close_edit-profile');
const formEditProfile = body.querySelector('.popup__form_edit-profile');


//Функция открыть попап универсальная
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

//Функция закрыть попап универсальная
function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

//Функция открыть попап редактирования профиля
function getOpenEditProfilePopup() {
	openPopup(popupEditProfile);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
}

//Функция закрыть попап редактирования профиля
function getCloseEditProfilePopup() {
	closePopup(popupEditProfile);
}

//Функция редактирования профиля
function getFormEditProfile(evt) {
	evt.preventDefault();

	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;

	closePopup(popupEditProfile);
}


editBtn.addEventListener('click', getOpenEditProfilePopup);
closeBtnEditProfile.addEventListener('click', getCloseEditProfilePopup);
formEditProfile.addEventListener('submit', getFormEditProfile);



//Переменные редактирования профиля
const popupAddCard = body.querySelector('.popup_add-card');
const addBtn = body.querySelector('.profile__button-add');
const closeBtnAddCard = body.querySelector('.popup__close_add-card');
const formAddCard = body.querySelector('.popup__form_add-card');
const titleInput = body.querySelector('.popup__input_type_title');
const linkInput = body.querySelector('.popup__input_type_link');


//Функция открыть попап добавления карточек
function getOpenAddCardPopup() {
	openPopup(popupAddCard);
	titleInput.value = '';
	linkInput.value = '';
}

//Функция закрыть попап добавления карточек
function getClosAddCardPopup() {
	closePopup(popupAddCard);
}


addBtn.addEventListener('click', getOpenAddCardPopup);
closeBtnAddCard.addEventListener('click', getClosAddCardPopup);
formAddCard.addEventListener('submit', addCard);



//Переменные карточек и попапа с изображением
const popupOpenPic = body.querySelector('.popup_pic');
const closeBtnPopupOpenPic = body.querySelector('.popup__close_pic');
const popupOpenPicImg = document.querySelector('.popup__photo');
const popupOpenPicTitle = document.querySelector('.popup__photo-title');
const cardItems = body.querySelector('.cards__items');
const cardTemplate = body.querySelector('.cards-template').content;


//Функция открыть попап с фотографией
function getOpenOpenPicPopup(data) {
	openPopup(popupOpenPic);
	popupOpenPicImg.src = data.link;
	popupOpenPicTitle.textContent = data.name;
}

//Функция закрыть попап с фотографией
function getCloseOpenPicPopup() {
	closePopup(popupOpenPic);
}

closeBtnPopupOpenPic.addEventListener('click', getCloseOpenPicPopup);


//Функция создания карточки
function createCard(card) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardTitle = cardElement.querySelector('.cards__title');
	const cardImg = cardElement.querySelector('.cards__img');
	const cardLikeBtn = cardElement.querySelector('.cards__button-like');
	cardLikeBtn.addEventListener('click', getLikeCard);
	const cardDeleteBtn = cardElement.querySelector('.cards__button-remove');
	cardDeleteBtn.addEventListener('click', getDeleteCard);

	//Прослушиваем клик по картинке и открываем функцию открытия попапа с фотографией
	cardImg.addEventListener('click', () => getOpenOpenPicPopup(card));

	//Записываем данные из переданного парметра card в функцю creatCard
	cardImg.src = card.link;
	cardImg.setAttribute('alt', `${card.name}`);
	cardTitle.textContent = card.name;
	return cardElement;
}


//Передаем методом forEach все данные из массива в функцию renderCard
initialCards.forEach(renderCard);


//Добавляем карточки на странцу, ссылаясь на шаблон в функции createCard
function renderCard(card) {
	cardItems.prepend(createCard(card));
}


//Функция добавления карточки пользователем, путем передачи параметра с данными из инпутов в функцию renderCard
function addCard(evt) {
	evt.preventDefault();

	getClosAddCardPopup();

	renderCard({
		name: titleInput.value,
		link: linkInput.value
	});
}


//Функция поставить лайк на фото
function getLikeCard(evt) {
	evt.target.classList.toggle('cards__button-like_active');
}


//Функция удалить фото
function getDeleteCard(evt) {
	evt.target.closest('.cards__item').remove();
}