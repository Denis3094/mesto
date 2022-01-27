const body = document.querySelector('.page');
const popupContainer = body.querySelector('.popup__container');
const editPopup = body.querySelector('.popup_edit');
const addPopup = body.querySelector('.popup_add');
const editBtn = body.querySelector('.profile__button-edit');
const addBtn = body.querySelector('.profile__button-add');
const closeBtnEditProfile = body.querySelector('.popup__close_edit_profile');
const closeBtnAddCards = body.querySelector('.popup__close_add_cards');
const formElement = body.querySelector('.popup__form');
const nameInput = body.querySelector('.popup__input_type_name');
const jobInput = body.querySelector('.popup__input_type_job');
const profileName = body.querySelector('.profile__name');
const profileJob = body.querySelector('.profile__job');
const cardsItems = body.querySelector('.cards__items');
const cardsTemplate = body.querySelector('.cards-template').content;


//Функция открыть попап универсальная
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

//Функция открыть попап редактирования профиля
function editProfileOpenPopupHandler() {
	openPopup(editPopup);
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
}

//Функция закрыть попап универсальная
function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

//Функция закрыть попап редактирования профиля
function editProfileClosePopupHandler() {
	closePopup(editPopup);
}

//Функция закрыть попап при клике в любом месте и клавишей Escape
//function closePopupAnywhere(event) {
//	if (event.target === event.currentTarget || (event.code === 'Escape')) {
//		closePopup(event.target);
//	}
//}


//Функция открыть попап добавления карточек
function addCardsOpenPopupHandler() {
	openPopup(addPopup);
}

//Функция закрыть попап добавления карточек
function addCardsClosePopupHandler() {
	closePopup(addPopup);
}




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	// Так мы можем определить свою логику отправки.
	// О том, как это делать, расскажем позже.
	// Получите значение полей jobInput и nameInput из свойства value
	// Выберите элементы, куда должны быть вставлены значения полей
	// Вставьте новые значения с помощью textContent
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup();
}


///Функция добавления карточек на страницу
initialCards.forEach(function (element) {

	const cardElement = cardsTemplate.cloneNode(true);

	cardElement.querySelector('.cards__title').textContent = element.name;
	cardElement.querySelector('.cards__img').src = element.link;
	cardElement.querySelector('.cards__img').setAttribute('alt', `${element.name}`);
	cardsItems.append(cardElement);
});


editBtn.addEventListener('click', editProfileOpenPopupHandler);
addBtn.addEventListener('click', addCardsOpenPopupHandler);
closeBtnEditProfile.addEventListener('click', editProfileClosePopupHandler);
closeBtnAddCards.addEventListener('click', addCardsClosePopupHandler);
editPopup.addEventListener('click', closePopupAnywhere);
body.addEventListener('keyup', closePopupAnywhere);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);