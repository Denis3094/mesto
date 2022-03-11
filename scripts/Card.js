import {popupOpenPic ,popupOpenPicImg, popupOpenPicTitle, openPopup} from './utils.js';

export class Card {
    constructor(data, cardTemplateSelector) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._name = data.name;
        this._link = data.link;
    }

    likeCard = () => {
        this._cardLikeBtn.classList.toggle('cards__button-like_active');
    }

    deleteCard = () => {
        this._cardElement.remove();
    }

    openOpenPicPopup = () => {
        popupOpenPicImg.src = this._link;
        popupOpenPicImg.alt = `Изображение ${this._name}`;
        popupOpenPicTitle.textContent = this._name;
        openPopup(popupOpenPic);
    }

    _setEventListeners () {
        const cardDeleteBtn = this._cardElement.querySelector('.cards__button-remove');
        this._cardLikeBtn.addEventListener('click', likeCard);
        cardDeleteBtn.addEventListener('click', deleteCard);
        this._cardImg.addEventListener('click', () => openOpenPicPopup);
    }

    createCard() {
        this._cardElement =  this._cardTemplate.cloneNode(true);
        const cardTitle = this._cardElement.querySelector('.cards__title');
        this._cardImg = this._cardElement.querySelector('.cards__img');
        this._cardLikeBtn = this._cardElement.querySelector('.cards__button-like');



        this._cardImg.src = this._link;
        this._cardImg.alt =  this._name;
        cardTitle.textContent =  this._name;

        this._setEventListeners();

        return this._cardElement;
    }
}