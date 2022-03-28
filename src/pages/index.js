import '../pages/index.css';
import {
    initialCards,
    configValidate,
    editBtn,
    nameInput,
    jobInput,
    formEditProfile,
    addBtn,
    formAddCard,
} from "../utils/constants.js";
import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";


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
function submitEditProfile(data) {
    const {name, aboutMe} = data;
    userInfo.setUserInfo(name, aboutMe);
    editProfilePopup.close();
}

//Функция открыть попап добавления карточек
function openAddCardPopup() {
    addCardValidator.resetErrors();
    addCardValidator.toggleButtonState();
    addCardPopup.open();
}

//Функция создания карточек
const createCard = (data) => {
    const card = new Card(data, '.cards-template', () => {
        imagePopup.open(data.name, data.link);
    });
    const cardElement = card.createCard();

    return cardElement;
}

//Валидация модалок
const editProfileValidator = new FormValidator(configValidate, formEditProfile);
const addCardValidator = new FormValidator(configValidate, formAddCard);

//Рендер карточек на странице
const section = new Section({
    items: initialCards, renderer: (data) => {
        section.addItem(createCard(data));
    }
}, '.cards__items');

//Привязка модалок
const imagePopup = new PopupWithImage('.popup_pic');
const addCardPopup = new PopupWithForm('.popup_add-card', (data) => {
    section.addItem(createCard(data));
    addCardPopup.close();
});
const editProfilePopup = new PopupWithForm('.popup_edit-profile', submitEditProfile);

//Заполнение информации профиля
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileJobSelector: '.profile__job'});


//Обработчики
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
section.renderItems();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
editBtn.addEventListener('click', openEditProfilePopup);
addBtn.addEventListener('click', openAddCardPopup);

