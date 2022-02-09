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
    body.addEventListener('keydown', closePopupEscape);
    body.addEventListener('click', closePopupEscape);
}

//Функция закрыть попап универсальная
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//Функция закрыть попап кнопкой 'Escape' и кликом на Overlay универсальная
function closePopupEscape(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.code === 'Escape') {
        closePopup(popupOpened);
    }
    if (evt.target.classList.contains("popup_opened")) {
        closePopup(popupOpened);
    }
}


//Функция открыть попап редактирования профиля
function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEditProfile);
}

//Функция закрыть попап редактирования профиля
function closeEditProfilePopup() {
    closePopup(popupEditProfile);
}


//Функция редактирования профиля
function getFormEditProfile(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEditProfile);
}


editBtn.addEventListener('click', openEditProfilePopup);
closeBtnEditProfile.addEventListener('click', closeEditProfilePopup);
formEditProfile.addEventListener('submit', getFormEditProfile);


//Переменные редактирования профиля
const popupAddCard = body.querySelector('.popup_add-card');
const addBtn = body.querySelector('.profile__button-add');
const closeBtnAddCard = body.querySelector('.popup__close_add-card');
const formAddCard = body.querySelector('.popup__form_add-card');
const titleInput = body.querySelector('.popup__input_type_title');
const linkInput = body.querySelector('.popup__input_type_link');


//Функция открыть попап добавления карточек
function openAddCardPopup() {
    formAddCard.reset();
    openPopup(popupAddCard);
}

//Функция закрыть попап добавления карточек
function closeAddCardPopup() {
    closePopup(popupAddCard);
}


addBtn.addEventListener('click', openAddCardPopup);
closeBtnAddCard.addEventListener('click', closeAddCardPopup);
formAddCard.addEventListener('submit', addCard);


//Переменные карточек и попапа с изображением
const popupOpenPic = body.querySelector('.popup_pic');
const closeBtnPopupOpenPic = body.querySelector('.popup__close_pic');
const popupOpenPicImg = document.querySelector('.popup__photo');
const popupOpenPicTitle = document.querySelector('.popup__photo-title');
const cardItems = body.querySelector('.cards__items');
const cardTemplate = body.querySelector('.cards-template').content;


//Функция открыть попап с фотографией
function openOpenPicPopup(data) {
    popupOpenPicImg.src = data.link;
    popupOpenPicImg.alt = data.name;
    popupOpenPicTitle.textContent = data.name;
    openPopup(popupOpenPic);
}

//Функция закрыть попап с фотографией
function closeOpenPicPopup() {
    closePopup(popupOpenPic);
}

closeBtnPopupOpenPic.addEventListener('click', closeOpenPicPopup);


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

    closeAddCardPopup();
}


//Функция поставить лайк на фото
function likeCard(evt) {
    evt.target.classList.toggle('cards__button-like_active');
}


//Функция удалить фото
function deleteCard(evt) {
    evt.target.closest('.cards__item').remove();
}
