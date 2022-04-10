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
    avatar,
    formEditAvatar,
} from "../utils/constants.js";
import {FormValidator} from "../components/FormValidator.js";
import {Card} from "../components/Card.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {api} from "../components/Api.js";

let userId;

api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about)
        userInfo.setUserAvatar(res.avatar)
        userId = res._id
    })

api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const card = {
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id,
            }
            section.addItem(createCard(card));
        })
    })

//Функция открыть попап редактирования профиля
function openEditProfilePopup() {
    editProfileValidator.resetErrors();
    const {name, about} = userInfo.getUserInfo();
    nameInput.value = name;
    jobInput.value = about;
    editProfileValidator.toggleButtonState();
    editProfilePopup.open();
}

//Функция редактирования профиля
function submitEditProfile(data) {
    editProfilePopup.renderLoading(true)
    const {name, aboutMe} = data;
    api.editProfile(name, aboutMe)
        .then(() => {
            userInfo.setUserInfo(name, aboutMe);
            editProfilePopup.close();
        })
        .finally(() => {
            editProfilePopup.renderLoading(false)
        })
}

function submitEditAvatar(data) {
    avatarPopup.renderLoading(true)
    api.editAvatar(data)
        .then(res => {
            userInfo.setUserAvatar(res.avatar);
            avatarPopup.close();
        })
        .finally(() => avatarPopup.renderLoading(false))
}

function openEditAvatar() {
    editAvatarValidator.resetErrors()
    editAvatarValidator.toggleButtonState()
    avatarPopup.open()
}

//Функция открыть попап добавления карточек
function openAddCardPopup() {
    addCardValidator.resetErrors();
    addCardValidator.toggleButtonState();
    addCardPopup.open();
}

function submitAddCard(data) {
    addCardPopup.renderLoading(true);
    api.addCard(data)
        .then(res => {
            const card = {
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id,
            }
            section.addItem(createCard(card));
            addCardPopup.close();
        })
        .finally(() => {
            addCardPopup.renderLoading(false)
        })
}

function handleCardClick(data) {
    imagePopup.open(data.name, data.link);
}

function handleDeleteClick(id, card) {
    confirmPopup.open();
    confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
            .then(res => {
                card.deleteCard();
                confirmPopup.close();
            })
    });
}

function handleLikeCLick(id, card) {
    if (card.isLiked()) {
        api.deleteLike(id)
            .then(res => {
                card.setLikes(res.likes)
            })
    } else {
        api.addLike(id)
            .then(res => {
                card.setLikes(res.likes)
            })
    }
}

//Функция создания карточек
const createCard = (data) => {
    const card = new Card(data, '.cards-template',
        () => {
            handleCardClick(data)
        },
        (id) => {
            handleDeleteClick(id, card)
        },
        (id) => {
            handleLikeCLick(id, card)
        },
    );
    const cardElement = card.createCard();
    return cardElement;
}


//Валидация модалок
const editProfileValidator = new FormValidator(configValidate, formEditProfile);
const addCardValidator = new FormValidator(configValidate, formAddCard);
const editAvatarValidator = new FormValidator(configValidate, formEditAvatar);

// Рендер карточек на странице
const section = new Section({
    items: initialCards, renderer: (data) => {
        section.addItem(createCard(data));
    }
}, '.cards__items');

//Привязка модалок
const imagePopup = new PopupWithImage('.popup_pic');
const addCardPopup = new PopupWithForm('.popup_add-card', submitAddCard);
const editProfilePopup = new PopupWithForm('.popup_edit-profile', submitEditProfile);
const confirmPopup = new PopupWithForm('.popup_delete-confirm');
const avatarPopup = new PopupWithForm('.popup_edit-avatar', submitEditAvatar);

//Заполнение информации профиля
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__job',
    profileAvatarSelector: '.profile__avatar'
});


//Обработчики
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners()
editBtn.addEventListener('click', openEditProfilePopup);
addBtn.addEventListener('click', openAddCardPopup);
avatar.addEventListener('click', openEditAvatar);