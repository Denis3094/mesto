export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }

    _showInputError(inputElement, errorMessage) {
        const {inputErrorClass} = this._settings;
        console.log(`#error-${inputElement.id}`)
        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const {inputErrorClass} = this._settings;

        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _disableSubmitButton() {
        const {inactiveButtonClass} = this._settings;

        this._buttonElement.classList.add(inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableSubmitButton() {
        const {inactiveButtonClass} = this._settings;

        this._buttonElement.classList.remove(inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    };

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._setEventListeners();
    };

    resetErrors() {
        this._form.reset();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}