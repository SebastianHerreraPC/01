class Cards {
  constructor(image, text) {
    this._image = image;
    this._text = text;
  }
  _getTemplate() {
    const newCard = document
      .querySelector("#card")
      .textContent.querySelector(".card")
      .cloneNode(true);

    return newCard;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__text").textContent = this._text;

    return this._element;
  }
  initialCards.forEach((item) => {
    const card = new Cards(item.image, item.text);
    const cardElement = card.generateCard();

    document.querySelector(".card__container").append(cardElement);
    
  });

}
