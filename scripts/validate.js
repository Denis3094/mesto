const configValidate = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const formSubmit = (evt) => {
    evt.preventDefault();
}

const setInputValid = (inputErrorClass, errorMessage, input) => {
    errorMessage.textContent = '';
    input.classList.remove(inputErrorClass);
}

const setInputInvalid = (inputErrorClass, errorMessage, input) => {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
}

const checkInputValidity = ({inputErrorClass}, form, input) => {
    const errorMessage = form.querySelector(`#error-${input.id}`);
    console.log(errorMessage);
    if (input.validity.valid) {
        setInputValid(inputErrorClass, errorMessage, input);
    } else {
        setInputInvalid(inputErrorClass, errorMessage, input);
    }
}

const disableButton = (inactiveButtonClass, button) => {
    button.setAttribute('disabled', '');
    button.classList.add(inactiveButtonClass);
}

const enableButton = (inactiveButtonClass, button) => {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
}

const checkButtonValidity = ({inactiveButtonClass}, form, button) => {
    if (form.checkValidity()) {
        enableButton(inactiveButtonClass, button);
    } else {
        disableButton(inactiveButtonClass, button);
    }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {

    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach(form => {
        form.addEventListener('submit', formSubmit);

        const inputs = form.querySelectorAll(inputSelector);
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach(input => {
            input.addEventListener('input', (evt) => {
                checkInputValidity(rest, form, input);
                checkButtonValidity(rest, form, button);
            });
        });
    });
}

enableValidation(configValidate);