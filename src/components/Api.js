export default class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._token = settings.token;

    this._userRequest = settings.userRequest;
    this._initialCardsRequest = settings.initialCardsRequest;
    this._newCardRequest = settings.newCardRequest;
    this._cardLikeRequest = settings.cardLikeRequest;
    this._userInfoRequest = settings.userInfoRequest;
    this._userAvatarRequest = settings.userAvatarRequest;
    this._cardOffRequest = settings.cardOffRequest;
  }

  getUser() {
    return fetch(this._baseUrl + this._userRequest, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`error: ${response.status}`);
      });
  }

  editUserInfo(userData) {
    return fetch(this._baseUrl + this._userInfoRequest, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`error: ${response.status}`);
      });
  }

  editUserAvatar(avatarData) {
    return fetch(this._baseUrl + this._userAvatarRequest, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatarData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`error: ${response.status}`);
      });
  }

  getInitialCards() {
    return fetch(this._baseUrl + this._initialCardsRequest, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`error: ${response.status}`);
      });
  }

  addCard(cardData) {
    return fetch(this._baseUrl + this._newCardRequest, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`error: ${response.status}`);
      });
  }

  deleteCard(card) {
    return fetch(this._baseUrl + this._cardOffRequest + card.id, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`error: ${response.status}`);
      });
  }

  toggleCardLike(card) {
    const method = card.isLikedByUser ? 'DELETE' : 'PUT';

    return fetch(this._baseUrl + this._cardLikeRequest + card.id, {
      method: method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`error: ${response.status}`);
      });
  }
}