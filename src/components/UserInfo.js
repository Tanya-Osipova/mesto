export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userJobSelector = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      job: this._userJobSelector.textContent
    }
  }

  setUserInfo(name, job) {
    this._userNameSelector.textContent = name;
    this._userJobSelector.textContent = job;
  }
}