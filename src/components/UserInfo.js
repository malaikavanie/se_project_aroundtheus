export default class UserInfo {
  //***USERINFO CONSTRUCTOR***
  constructor({ titleSelector, descriptionSelector, avatarSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
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

  //***SET THE USER AVATAR IN THE PROFILE***
  setUserAvatar(link) {
    this._avatarElement.setAttribute("src", link);
  }
}
