export default class Api {
  //***API CONSTRUCTOR***
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //***RENDER RESULT FROM SERVER***
  renderResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error :${res.status}`);
    }
  }

  //***TO GET USER INFO METHOD***
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  //***GET INTIAL CARDS METHOD***
  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  //***EDIT PROFILE METHOD***
  async editProfile({ name, description }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    });
    return this.renderResult(res);
  }

  //***ADD CARD METHOD***
  addCard({ name, link }) {
    return fecth(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.renderResult);
  }

  //***DELETE CARD METHOD***
  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this.renderResult(res);
  }

  //***LIKE CARD METHOD***
  likeCard(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  //***UPDATE AVATAR METHOD***
  async updateAvatar({ link }) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
    return this.renderResult(res);
  }
}
