class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }
  initialCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }
  deleteCard(cardId) {
    console.log(`Deleting card with ID: ${cardId}`);
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }
  likeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }
  unlikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }
}

const api = new Api("https://around-api.es.tripleten-services.com/v1", {
  Authorization: "b76c096b-39a4-4c42-9515-2bc0a8a3cd39",
  "Content-Type": "application/json",
});

export { api };
