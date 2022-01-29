const body = document.querySelector('.page');
const popupContainer = body.querySelector('.popup__container');
const popupEditProfile = body.querySelector('.popup_edit-profile');
const popupAddCard = body.querySelector('.popup_add-card');
const editBtn = body.querySelector('.profile__button-edit');
const addBtn = body.querySelector('.profile__button-add');
const closeBtnEditProfile = body.querySelector('.popup__close_edit-profile');
const closeBtnAddCard = body.querySelector('.popup__close_add-card');
const formEditProfile = body.querySelector('.popup__form_edit-profile');
const formaddCard = body.querySelector('.popup__form_add-card');
const nameInput = body.querySelector('.popup__input_type_name');
const jobInput = body.querySelector('.popup__input_type_job');
const profileName = body.querySelector('.profile__name');
const profileJob = body.querySelector('.profile__job');
const cardsItems = body.querySelector('.cards__items');
const cardsTemplate = body.querySelector('.cards-template').content;
const titleInput = body.querySelector('.popup__input_type_title');
const linkInput = body.querySelector('.popup__input_type_link');
const cardTitle = body.querySelector('.cards__title');


//Функция открыть попап универсальная
function openPopup(popup) {
	popup.classList.add('popup_opened');
}


//Функция закрыть попап универсальная
function closePopup(popup) {
	popup.classList.remove('popup_opened');
}


//Функция открыть попап редактирования профиля
function editProfileOpenPopupHandler() {
	openPopup(popupEditProfile);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
}


//Функция закрыть попап редактирования профиля
function editProfileClosePopupHandler() {
	closePopup(popupEditProfile);
}

//Функция открыть попап добавления карточек
function addCardOpenPopupHandler() {
	openPopup(popupAddCard);
}


//Функция закрыть попап добавления карточек
function addCardClosePopupHandler() {
	closePopup(popupAddCard);
}


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formEditProfileSubmitHandler(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	// Так мы можем определить свою логику отправки.
	// О том, как это делать, расскажем позже.
	// Получите значение полей jobInput и nameInput из свойства value
	// Выберите элементы, куда должны быть вставлены значения полей
	// Вставьте новые значения с помощью textContent
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup(popupEditProfile);
}


//Функция добавления карточек из массива
function render() {
	initialCards.forEach(renderItem);
}

//Функция добавления карточек
function renderItem(item) {
	const newItem = cardsTemplate.cloneNode(true);

	newItem.querySelector('.cards__title').textContent = item.name;
	newItem.querySelector('.cards__img').src = item.link;
	newItem.querySelector('.cards__img').setAttribute('alt', `${item.name}`);
	newItem.querySelector('.cards__button-like').addEventListener('click', likeCard); // Лайк для карточек
	newItem.querySelector('.cards__button-remove').addEventListener('click', deleteCard); // Удаление карточек

	cardsItems.prepend(newItem);
}


//Функция добавления карточек пользователем
function addItem(evt) {
	evt.preventDefault();
	renderItem({
		name: titleInput.value,
		link: linkInput.value
	});
	titleInput.value = '';
	linkInput.value = '';
	closePopup(popupAddCard);
}


//Функция лайка для карточек
function likeCard(evt) {
	evt.target.classList.toggle('cards__button-like_active');
}


//Функция удаления карточек
function deleteCard(evt) {
	evt.target.closest('.cards__item').remove();
}


render();



editBtn.addEventListener('click', editProfileOpenPopupHandler);
addBtn.addEventListener('click', addCardOpenPopupHandler);
closeBtnEditProfile.addEventListener('click', editProfileClosePopupHandler);
closeBtnAddCard.addEventListener('click', addCardClosePopupHandler);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formaddCard.addEventListener('submit', addItem);