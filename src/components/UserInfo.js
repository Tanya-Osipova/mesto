export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    }
  }
  
  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job
  }

  setId(id) {
    this._id = id
  }

  getId() {
    return this._id
  }
}
