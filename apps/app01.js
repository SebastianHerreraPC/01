import { Cards } from "./cards.js";
import { FormValidator } from "./validator.js";
import { Section } from "./section.js";
import { Popup } from "./popups.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./userInfo.js";

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".profile__edit-button");
  const profileName = document.querySelector(".profile__name-text");
  const inputName = document.querySelector(".popup__input-name");
  const inputJob = document.querySelector(".popup__input-job");
  const profileJob = document.querySelector(".profile__job");
  const formEdit = document.querySelector(".popup__form-edit");
  const closeButton = document.querySelector(".popup__close-button");

  const formAdd = document.querySelector(".popup__form-add");
  const placeName = document.querySelector(".popup__input-lugar");
  const placeImg = document.querySelector(".popup__input-url");
  const cardContainerSelector = ".cards__container";
  const addButton = document.querySelector(".profile__add-button");
  const closeAddButton = document.querySelector(".popup__close-add-button");

  const userInfo = new UserInfo({
    nameSelector: ".profile__name-text",
    jobSelector: ".profile__job",
  });

  const popupEditCard = new PopupWithForm(".popup__edit", (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.job,
    });
    popupEditCard.close();
  });
  popupEditCard.setEventListeners();

  const popupAddCard = new PopupWithForm(".popup__add", (formData) => {
    const { placeName, placeImg } = formData;
    const newCard = new Cards(placeImg, placeName);
    const cardElement = newCard.generateCard();
    cardsSection.addItem(cardElement);
    popupAddCard.close();
  });

  popupAddCard.setEventListeners();

  editButton.addEventListener("click", () => {
    popupEditCard.open();
    const currentUserInfo = userInfo.getUserInfo();
    inputName.value = currentUserInfo.name;
    inputJob.value = currentUserInfo.job;
  });

  closeButton.addEventListener("click", () => {
    popupEditCard.close();
  });

  formEdit.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    popupEditCard.close();
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
      renderer: (item) => renderCard(item),
    },
    cardContainerSelector
  );
  cardsSection.renderItems();

  addButton.addEventListener("click", () => {
    popupAddCard.open();
    placeName.value = "";
    placeImg.value = "";
  });

  closeAddButton.addEventListener("click", () => {
    popupAddCard.close();
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
