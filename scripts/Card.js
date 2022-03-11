export class Card {
    constructor(data, cardTemplateSelector, handleCardClick) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }

    _likeCard = () => {
        this._cardLikeBtn.classList.toggle('cards__button-like_active');
    }

    _deleteCard = () => {
        this._cardElement.remove();
    }

    _setEventListeners() {
        const cardDeleteBtn = this._cardElement.querySelector('.cards__button-remove');

        this._cardLikeBtn.addEventListener('click', this._likeCard);
        cardDeleteBtn.addEventListener('click', this._deleteCard);
        this._cardImg.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    _fillCard() {
        const cardTitle = this._cardElement.querySelector('.cards__title');

        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        cardTitle.textContent = this._name;
    }

    createCard() {
        //Спасибо! Тупанул на этой строчке :) Думал еще почему с this._cardElement не работало удаление)
        this._cardElement = this._cardTemplate.querySelector('.cards__item').cloneNode(true);
        this._cardImg = this._cardElement.querySelector('.cards__img');
        this._cardLikeBtn = this._cardElement.querySelector('.cards__button-like');

        this._fillCard();
        this._setEventListeners();

        return this._cardElement;
    }
}