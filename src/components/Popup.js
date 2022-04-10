export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
        this._closeButton = this._popup.querySelector('.popup__close-img');
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
        this._popup.addEventListener('mousedown', evt => {
            if (evt.target.classList.contains('popup_opened') || evt.target === this._closeButton) {
                this.close()
            }
        });

    }
}