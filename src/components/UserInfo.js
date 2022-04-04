export class UserInfo {
    constructor({profileNameSelector, profileJobSelector}) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
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
}