export default class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._token = settings.token;

    this._userRequest = settings.userRequest;
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
      })
      .then(user => {
        return user;
      })
      .catch(error => {
        console.log(error);
      })
  }



}
