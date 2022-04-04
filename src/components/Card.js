import {api} from "./Api";

export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._name = data.name;
        this._link = data.link;
        // this._likes = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _likeCard = () => {
        this._cardLikeBtn.classList.toggle('cards__button-like_active');
    }

    _deleteCard = () => {
        // this._cardElement.remove();
        this._handleDeleteClick();
    }

    _getTemplate() {
        const template = this._cardTemplate.querySelector('.cards__item').cloneNode(true);
        return template
    }

    _setEventListeners() {
        const cardDeleteBtn = this._cardElement.querySelector('.cards__button-remove');

        this._cardLikeBtn.addEventListener('click', this._likeCard);
        cardDeleteBtn.addEventListener('click', this._deleteCard);
        this._cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    _fillCard() {
        const cardTitle = this._cardElement.querySelector('.cards__title');
        this._cardImg = this._cardElement.querySelector('.cards__img');
        this._cardLikeBtn = this._cardElement.querySelector('.cards__button-like');

        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        cardTitle.textContent = this._name;
    }

    // _setLikes() {
    //     const likeCountElement = this._cardElement.querySelector('.cards__like-count');
    //     likeCountElement.textContent = this._likes.length;
    // }

    createCard() {
        this._cardElement = this._getTemplate()

        this._fillCard();
        this._setEventListeners();
        // this._setLikes();
        return this._cardElement;
    }
}