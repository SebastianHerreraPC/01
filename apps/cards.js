export class Cards {
  constructor(image, text) {
    this._image = image;
    this._text = text;
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
        this._element.remove();
      });
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", function () {
        this.classList.toggle("card__like-button_active");
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
