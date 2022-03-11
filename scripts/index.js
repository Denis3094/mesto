import {openPopup, closePopup} from './utils.js';
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';


const configValidate = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
//Переменные редактирования профиля
const editBtn = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const popups = document.querySelectorAll('.popup');
//Переменные добавления карточек
const popupAddCard = document.querySelector('.popup_add-card');
const addBtn = document.querySelector('.profile__button-add');
const formAddCard = document.querySelector('.popup__form_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const cardItems = document.querySelector('.cards__items');
const cardTemplate = document.querySelector('.cards-template').content;

const editProfileValidator = new FormValidator(configValidate, formEditProfile);
const addCardValidator = new FormValidator(configValidate, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


//Перебираем все попапы на странице и привязываем закрытие на кнопку крестик и по Overlay
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.parentElement.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});


//Функция записи данных из полей в профиле в попап
function writeDataEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//Функция открыть попап редактирования профиля
function openEditProfilePopup() {
    editProfileValidator.resetErrors();
    writeDataEditProfilePopup();
    editProfileValidator.toggleButtonState();
    openPopup(popupEditProfile);
}

//Функция записи данных из попапа в поля профиля
function writeDataEditProfile() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

//Функция редактирования профиля
function submitEditProfile(evt) {
    evt.preventDefault();
    writeDataEditProfile();
    closePopup(popupEditProfile);
}

//Функция открыть попап добавления карточек
function openAddCardPopup() {
    addCardValidator.resetErrors();
    addCardValidator.toggleButtonState();
    openPopup(popupAddCard);
}



const renderCard = (data) => {
    const card = new Card(data);
    const cardElement = card.createCard();
    cardItems.prepend(cardElement);
}

initialCards.forEach(renderCard);



function addCard(evt) {
    evt.preventDefault();

    renderCard({
        name: titleInput.value,
        link: linkInput.value
    });

    closePopup(popupAddCard);
}

editBtn.addEventListener('click', openEditProfilePopup);
formEditProfile.addEventListener('submit', submitEditProfile);
addBtn.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', addCard);

