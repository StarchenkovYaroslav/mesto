export default class UserInfo {
  _name;
  _about;
  _avatar;
  _id;
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  get id() {
    return this._id;
  }

  getInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      _id: this._id
    }
  }

  setInfo({name, about, avatar, _id}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;

    this._setElementValues()
  }

  _setElementValues() {
    this._nameElement.textContent = this._name;
    this._aboutElement.textContent = this._about;
    this._avatarElement.src = this._avatar;
  }
}
