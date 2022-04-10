export class UserInfo {
    constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._userAvatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent,
        }
    }

    setUserInfo(title, about) {
        this._nameElement.textContent = title
        this._jobElement.textContent = about
    }

    setUserAvatar(link) {
        this._userAvatar.style.backgroundImage = `url(${link})`;
    }
}