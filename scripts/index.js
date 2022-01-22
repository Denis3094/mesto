const popupContainer = document.querySelector('.popup__container');
const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__button-edit');
const closeBtn = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


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
	console.log(nameInput.value);
	console.log(jobInput.value);
	// Выберите элементы, куда должны быть вставлены значения полей
	// Вставьте новые значения с помощью textContent
	profileName.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	closePopup();
}


editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupAnywhere);
document.addEventListener('keyup', closePopupAnywhere);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);