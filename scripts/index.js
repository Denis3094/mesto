import {initialCards} from './initialCards.js';
import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {Section} from "./Section.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js";

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
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
//Переменные добавления карточек
const addBtn = document.querySelector('.profile__button-add');
const formAddCard = document.querySelector('.popup__form_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const cardItems = document.querySelector('.cards__items');

const editProfileValidator = new FormValidator(configValidate, formEditProfile);
const addCardValidator = new FormValidator(configValidate, formAddCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();


//Функция открыть попап редактирования профиля
function openEditProfilePopup() {
    editProfileValidator.resetErrors();
    const {name, job} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = job;
    editProfileValidator.toggleButtonState();
    editProfilePopup.open();
}

//Функция редактирования профиля
function submitEditProfile(evt) {
    evt.preventDefault();
    userInfo.setUserInfo(nameInput.value, jobInput.value)
    editProfilePopup.close();
}

//Функция открыть попап добавления карточек
function openAddCardPopup() {
    addCardValidator.resetErrors();
    addCardValidator.toggleButtonState();
    addCardPopup.open();
}


const prependCard = (cardElement) => {
    cardItems.prepend(cardElement);
}

const renderCard = (data) => {
    const card = new Card(data, '.cards-template', () => {
        imagePopup.open(data.name, data.link);
    });
    const cardElement = card.createCard();
    prependCard(cardElement);
}


function addCard(data) {
    renderCard(data);
    addCardPopup.close();
}

editBtn.addEventListener('click', openEditProfilePopup);
addBtn.addEventListener('click', openAddCardPopup);

const section = new Section({items: initialCards, renderer: renderCard}, '.cards__items');
const imagePopup = new PopupWithImage('.popup_pic');
const addCardPopup = new PopupWithForm('.popup_add-card', (data) => {
    console.log(data);
    section.addItem(addCard(data));
});
const editProfilePopup = new PopupWithForm('.popup_edit-profile', submitEditProfile);

imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
section.renderItems();
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__job'})