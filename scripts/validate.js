const configValidate = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass}) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, {inputErrorClass}) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, enums) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, enums);
    } else {
        hideInputError(formElement, inputElement, enums);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
}

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        enableSubmitButton(buttonElement, inactiveButtonClass);
    }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest)
    });
};

enableValidation(configValidate);