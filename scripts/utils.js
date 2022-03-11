//Функция закрыть попап универсальная
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
}

//Функция закрыть попап кнопкой 'Escape' универсальная
export function closePopupEscape(evt) {
    if (evt.code === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//Функция открыть попап универсальная
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
}

export const popupOpenPic = document.querySelector('.popup_pic');
export const popupOpenPicImg = popupOpenPic.querySelector('.popup__photo');
export const popupOpenPicTitle = popupOpenPic.querySelector('.popup__photo-title');