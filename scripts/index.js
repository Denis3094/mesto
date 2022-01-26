const body = document.querySelector('.page');
const popupContainer = body.querySelector('.popup__container');
const popup = body.querySelector('.popup');
const editBtn = body.querySelector('.profile__button-edit');
const closeBtn = body.querySelector('.popup__close');
const formElement = body.querySelector('.popup__form');
const nameInput = body.querySelector('.popup__input_type_name');
const jobInput = body.querySelector('.popup__input_type_job');
const profileName = body.querySelector('.profile__name');
const profileJob = body.querySelector('.profile__job');
const cardsItems = body.querySelector('.cards__items');
const cardsTemplate = body.querySelector('.cards-template').content;

const initialCards = [{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

///Функция добавления карточек на страницу
initialCards.forEach(function (element) {

	const cardElement = cardsTemplate.cloneNode(true);

	cardElement.querySelector('.cards__title').textContent = element.name;
	cardElement.querySelector('.cards__img').src = element.link;
	cardsItems.append(cardElement);
});


//Функция открыть попап
function openPopup() {
	popup.classList.add('popup_opened');
	nameInput.value = profileName.textContent;
	jobInput.value = profileJob.textContent;
}
//Функция закрыть попап
function closePopup() {
	popup.classList.remove('popup_opened');
}
//Функция закрыть попап при клике в любом месте и клавишей Escape
function closePopupAnywhere(event) {
	if (event.target === event.currentTarget || (event.code === 'Escape')) {
		closePopup();
	}
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


editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupAnywhere);
body.addEventListener('keyup', closePopupAnywhere);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);