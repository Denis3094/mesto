export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    isLiked() {
        this._userHasLikesCard = this._likes.find(user => user._id === this._userId)

        return this._userHasLikesCard
    }

    deleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _getTemplate() {
        this._template = this._cardTemplate.querySelector('.cards__item').cloneNode(true);
        return this._template
    }

    _setEventListeners() {
        this._cardDeleteBtn = this._cardElement.querySelector('.cards__button-remove');


        this._cardLikeBtn.addEventListener('click', () => this._handleLikeClick(this._id));
        this._cardDeleteBtn.addEventListener('click', () => this._handleDeleteClick(this._id));
        this._cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    _fillCard() {
        this._cardTitle = this._cardElement.querySelector('.cards__title');
        this._cardImg = this._cardElement.querySelector('.cards__img');
        this._cardLikeBtn = this._cardElement.querySelector('.cards__button-like');
        this._likeCountElement = this._cardElement.querySelector('.cards__like-count');

        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._cardTitle.textContent = this._name;
    }

    setLikes(newLikes) {
        this._likes = newLikes
        this._likeCountElement.textContent = this._likes.length;

        if (this.isLiked()) {
            this._fillLikeIcon()
        } else {
            this._eraseLikeIcon()
        }
    }

    _fillLikeIcon = () => {
        this._cardLikeBtn.classList.add('cards__button-like_active');
    }

    _eraseLikeIcon = () => {
        this._cardLikeBtn.classList.remove('cards__button-like_active');
    }

    createCard() {
        this._cardElement = this._getTemplate()

        this._fillCard();
        this._setEventListeners();

        this.setLikes(this._likes);

        if (this._ownerId !== this._userId) {
            this._cardElement.querySelector('.cards__button-remove').style.display = 'none'
        }


        return this._cardElement;
    }
}