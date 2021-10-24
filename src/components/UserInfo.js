export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    }
  }

  setInfo({name, about}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
