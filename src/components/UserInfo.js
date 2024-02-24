export default class UserInfo {
  //***USERINFO CONSTRUCTOR***
  constructor({ titleSelector, descriptionSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  //***RETURN OBJECT USERINFO***
  getUserInfo() {
    const userCurrentInfo = {};
    userCurrentInfo.title = this._titleElement.textContent;
    userCurrentInfo.description = this._descriptionElement.textContent;
    return userCurrentInfo;
  }

  //***SET THE USER INFO IN THE PROFILE***
  setUserInfo(data) {
    this._titleElement.textContent = data.title;
    this._descriptionElement.textContent = data.description;
  }
}
