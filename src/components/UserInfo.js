export default class UserInfo {
  //***USERINFO CONSTRUCTOR***
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  //***RETURN OBJECT USERINFO***
  getUserInfo() {
    const userCurrentInfo = {};
    userCurrentInfo.name = this._nameElement.textContent;
    userCurrentInfo.description = this._descriptionElement.textContent;
    return userCurrentInfo;
  }

  //***SET THE USER INFO IN THE PROFILE***
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
  }
}
