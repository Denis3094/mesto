class Api {
    constructor({baseUrl, headers}) {
        this._headers = headers
        this._baseUrl = baseUrl
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)

    }

    getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
    })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(console.log)
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)
    }

    // другие методы работы с API
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: '15cc18ab-690a-4577-b713-81216f409444',
        'Content-Type': 'application/json'
    }
});
