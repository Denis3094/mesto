export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.code === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-img');
        this._popup.addEventListener('click', evt => {
            if (evt.target.classList.contains('popup_opened') || evt.target === closeButton) {
                this.close()
            }
        });

    }
}