import { Cards } from "./cards.js";
import { FormValidator } from "./validator.js";

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".profile__edit-button");
  const closeButton = document.querySelector(".popup__close-button");
  const profileName = document.querySelector(".profile__name-text");
  const inputName = document.querySelector(".popup__input-name");
  const inputJob = document.querySelector(".popup__input-job");
  const profileJob = document.querySelector(".profile__job");
  const popupEdit = document.querySelector(".popup__edit");
  const formEdit = document.querySelector(".popup__form-edit");

  function popupOpen() {
    popupEdit.style.display = "block";
  }
  function popupClose() {
    popupEdit.style.display = "none";
  }
  editButton.addEventListener("click", function () {
    popupOpen();
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    inputJob.value = " ";
    inputName.value = " ";
  });
  closeButton.addEventListener("click", function (evt) {
    popupClose();
  });
  popupEdit.addEventListener("submit", function (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;

    popupClose();
  });

  //add images
  const formAdd = document.querySelector(".popup__form-add");
  const popupAdd = document.querySelector(".popup__add");
  const placeName = document.querySelector(".popup__input-lugar");
  const placeImg = document.querySelector(".popup__input-url");
  const cardContainer = document.querySelector(".cards__container");
  const nodeTemplate = document.querySelector("#card__template");
  const addButton = document.querySelector(".profile__add-button");
  const closeAddButton = document.querySelector(".popup__close-add-button");
  const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    },
  ];

  initialCards.forEach((item) => {
    const card = new Cards(item.link, item.name);
    const cardElement = card.generateCard();

    document.querySelector(".cards__container").append(cardElement);
  });

  function popupAddOpen() {
    popupAdd.style.display = "block";
  }
  function popupAddClose() {
    popupAdd.style.display = "none";
  }

  addButton.addEventListener("click", function () {
    popupAddOpen();
  });
  closeAddButton.addEventListener("click", function () {
    popupAddClose();
  });

  formAdd.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const value = placeName.value;
    const linkValue = placeImg.value;
    console.log(linkValue);
    const newCard = new Cards(linkValue, value);
    const cardElement = newCard.generateCard();
    cardContainer.prepend(cardElement);
    formAdd.reset();
    popupAddClose();
  });
  console.log(typeof Cards);
  console.log(new Cards("url", "nombre"));

  const likeButton = document.querySelectorAll(".card__like-button");

  // console.log("Formulario de edición:", formEdit);
  // console.log("Formulario de edición:", formAdd);

  if (formEdit) {
    const validatorEdit = new FormValidator(formEdit);
    validatorEdit.attachValidation();
  }
  if (formAdd) {
    const validatorAdd = new FormValidator(formAdd);
    validatorAdd.attachValidation();
  }
});
