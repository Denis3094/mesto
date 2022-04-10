import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)
        this._handleSubmit = handleSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._submitBtn = this._popup.querySelector('.popup__button');
        this._text = this._submitBtn.textContent;
        this._inputs = [...this._form.querySelectorAll('.popup__input')]
    }


    _getInputValues() {
        this._inputs = [...this._form.querySelectorAll('.popup__input')]
        const values = {}
        this._inputs.forEach(input => {
            values[input.name] = input.value
        })
        return values
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler
    }


    renderLoading(isLoading, loadingText='Сохранение...') {
        if(isLoading) {
            this._submitBtn.textContent = loadingText;
        }
        else {
            this._submitBtn.textContent = this._text;
        }
    }


    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._handleSubmit(this._getInputValues())
        })
    }

    close() {
        super.close()
        this._form.reset()
    }
}