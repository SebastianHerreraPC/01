import { Cards } from "./cards.js";
import { FormValidator } from "./validator.js";
import { Section } from "./section.js";
import { Popup } from "./popups.js";

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".profile__edit-button");
  const profileName = document.querySelector(".profile__name-text");
  const inputName = document.querySelector(".popup__input-name");
  const inputJob = document.querySelector(".popup__input-job");
  const profileJob = document.querySelector(".profile__job");
  const formEdit = document.querySelector(".popup__form-edit");
  const closeButton = document.querySelector(".popup__close-button");

  //formulario de perfil
  const formAdd = document.querySelector(".popup__form-add");
  const placeName = document.querySelector(".popup__input-lugar");
  const placeImg = document.querySelector(".popup__input-url");
  const cardContainerSelector = ".cards__container";
  const addButton = document.querySelector(".profile__add-button");
  const closeAddButton = document.querySelector(".popup__close-add-button");

  const popupEditInstance = new Popup(".popup__edit");
  const popupAddInstance = new Popup(".popup__add");

  popupEditInstance.setEventListeners();
  popupAddInstance.setEventListeners();

  editButton.addEventListener("click", () => {
    popupEditInstance.open();
    inputName.value = "";
    inputJob.value = "";
  });

  closeButton.addEventListener("click", () => {
    popupEditInstance.close();
  });

  formEdit.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupEditInstance.close();
  });

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

  function renderCard(item) {
    const card = new Cards(item.link, item.name);
    const cardElement = card.generateCard();
    document.querySelector(cardContainerSelector).append(cardElement);
  }

  const cardsSection = new Section(
    {
      items: initialCards,
      render: (item) => renderCard(item),
    },
    cardContainerSelector
  );
  cardsSection.renderItems();

  addButton.addEventListener("click", () => {
    popupAddInstance.open();
    placeName.value = " ";
    placeImg.value = " ";
  });

  closeAddButton.addEventListener("click", () => {
    popupAddInstance.close();
  });

  formAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = placeName.value;
    const link = placeImg.value;
    const newCard = new Cards(link, name);
    const cardElement = newCard.generateCard();
    cardsSection.addItem(cardElement);
    formAdd.reset();
    popupAddInstance.close();
  });

  if (formEdit) {
    const validatorEdit = new FormValidator(formEdit);
    validatorEdit.attachValidation();
  }
  if (formAdd) {
    const validatorAdd = new FormValidator(formAdd);
    validatorAdd.attachValidation();
  }
});
