//Переменные редактирования профиля
const editBtn = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const popups = document.querySelectorAll('.popup')

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

//Функция открыть попап универсальная
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
}

//Функция закрыть попап универсальная
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
}

//Функция закрыть попап кнопкой 'Escape' универсальная
function closePopupEscape(evt) {
    if (evt.code === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//Функция записи данных из полей в профиле в попап
function writeDataEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//Функция открыть попап редактирования профиля
function openEditProfilePopup() {
    writeDataEditProfilePopup();
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

editBtn.addEventListener('click', openEditProfilePopup);
formEditProfile.addEventListener('submit', submitEditProfile);


//Переменные редактирования профиля
const popupAddCard = document.querySelector('.popup_add-card');
const addBtn = document.querySelector('.profile__button-add');
const formAddCard = document.querySelector('.popup__form_add-card');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const addSubmitBtn = document.querySelector('.popup__button_make');


//Функция открыть попап добавления карточек
function openAddCardPopup() {
    formAddCard.reset();
    disableButton(configValidate.inactiveButtonClass, addSubmitBtn);
    openPopup(popupAddCard);
}

addBtn.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', addCard);


//Переменные карточек и попапа с изображением
const popupOpenPic = document.querySelector('.popup_pic');
const popupOpenPicImg = document.querySelector('.popup__photo');
const popupOpenPicTitle = document.querySelector('.popup__photo-title');
const cardItems = document.querySelector('.cards__items');
const cardTemplate = document.querySelector('.cards-template').content;

//Функция открыть попап с фотографией
function openOpenPicPopup(data) {
    popupOpenPicImg.src = data.link;
    popupOpenPicImg.alt = data.name;
    popupOpenPicTitle.textContent = data.name;
    openPopup(popupOpenPic);
}

//Функция создания карточки
function createCard(card) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitle = cardElement.querySelector('.cards__title');
    const cardImg = cardElement.querySelector('.cards__img');
    const cardLikeBtn = cardElement.querySelector('.cards__button-like');
    cardLikeBtn.addEventListener('click', likeCard);
    const cardDeleteBtn = cardElement.querySelector('.cards__button-remove');
    cardDeleteBtn.addEventListener('click', deleteCard);

    //Прослушиваем клик по картинке и открываем функцию открытия попапа с фотографией
    cardImg.addEventListener('click', () => openOpenPicPopup(card));

    //Записываем данные из переданного парметра card в функцю creatCard
    cardImg.src = card.link;
    cardImg.alt = card.name;
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

    renderCard({
        name: titleInput.value,
        link: linkInput.value
    });

    closePopup(popupAddCard);
}

//Функция поставить лайк на фото
function likeCard(evt) {
    evt.target.classList.toggle('cards__button-like_active');
}

//Функция удалить фото
function deleteCard(evt) {
    evt.target.closest('.cards__item').remove();
}
