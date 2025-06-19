import { api } from "./api.js";
export class Cards {
  constructor(image, text, cardID, isLiked) {
    this._image = image;
    this._text = text;
    this._cardID = cardID;
    this._isLiked = isLiked;
  }
  _getTemplate() {
    const newCard = document
      .querySelector("#card__template")
      .content.querySelector(".card")
      .cloneNode(true);

    return newCard;
  }

  setEventListeners() {
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        console.log(`${this._cardID}`);
        this._element.remove();
        api.deleteCard(this._cardID).catch((err) => {
          console.error("Error deleting card:", err);
        });
      });

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("card__like-button_active");
      });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__text").textContent = this._text;
    this.setEventListeners();

    return this._element;
  }
}
