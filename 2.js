const items = [
  {
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/oop/moved_card_detail.jpg",
    title: "BIOLOID",
    description:
      "Robot Kit es una popular serie de kits de construcción de robots de la empresa Robotis.La serie incluye varios kits diseñados tanto para principiantes como para usuarios avanzados.En este kit, encontrarás todo lo que necesitas para construir robots únicos y hacer diseños personalizados.El set incluye un software de programación, un mando a distancia, servomotores y mucho más.",
    price: "$999",
  },
  {
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/oop/moved_card_detail.jpg",
    title: "BIOLOID Premium kit",
    description:
      "BIOLOID Premium Kit tiene todo lo necesario para construir robots bípedos e incluye el servomotor Dynamixel Smart y el controlador CM-530. BIOLOID Premium Kit es perfecto para la educación, el entretenimiento y las competiciones de robótica.",
    price: "$1800",
  },
  {
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/oop/moved_card_detail2.png",
    title: "Airwheel",
    description:
      "Este modelo de bicicleta permite utilizar tanto el pedal como el motor eléctrico, así como la combinación de ambos. La Airwheel R8 está equipada con un set de baterías desmontables, que garantizan un suministro de energía suficiente y hacen que tus viajes sean más largos.",
    price: "$2000",
  },
];

class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._title;
    this._element.querySelector(".card__info").textContent = this._description;
    this._element.querySelector(".card__price-property").textContent =
      this._price;
    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._image})`;

    return this._element;
  }

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add("popup_is-opened");
  }
  _handleClosePopup() {
    popupImage.src = "";
    popupElement.classList.remove("popup_is-opened");
  }
  _setEventListeners() {
    this._element.addEventListener("click", () => {
      this._handleOpenPopup;
    });
    this._element.addEventListener("click", () => {
      this._handleClosePopup;
    });
  }
}

items.forEach((item) => {
  const card = new Card(item, ".horizontal-card");
  const cardElement = card.generateCard();

  document.querySelector(".card-list__items").append(cardElement);
});
