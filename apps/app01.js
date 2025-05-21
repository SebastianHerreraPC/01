import { Cards } from "./cards.js";
import { FormValidator } from "./validator.js";
import { Section } from "./section.js";
import { Popup } from "./popups.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./userInfo.js";

document.addEventListener("DOMContentLoaded", function () {
  const token = "be99c1cb-2d4a-4521-b59a-f28ca399a70a";

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
    avatarSelector: ".profile__avatar-img",
  });

  const popupEditCard = new PopupWithForm(".popup__edit", (formData) => {});
  popupEditCard.setEventListeners();

  const popupAddCard = new PopupWithForm(".popup__add", (formData) => {});
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
    const updatedName = inputName.value;
    const updatedJob = inputJob.value;

    fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedName,
        about: updatedJob,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          job: userData.about,
          avatar: userData.avatar,
        });
        popupEditCard.close();
      })
      .catch((err) => {
        console.error("Error al actualizar perfil:", err);
      });
  });

  function renderCard(item) {
    const card = new Cards(item.link, item.name);
    const cardElement = card.generateCard();
    document.querySelector(cardContainerSelector).append(cardElement);
  }

  const cardsSection = new Section(
    {
      items: [],
      renderer: (item) => renderCard(item),
    },
    cardContainerSelector
  );

  fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    })
    .then((cards) => {
      console.log("Tarjetas cargadas:", cards);
      cardsSection._items = cards;
      cardsSection.renderItems();
    })
    .catch((err) => console.error("Error al cargar tarjetas:", err));

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

  fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      console.log("Si toma el usuario", userData);
    })
    .catch((err) => console.error("No jala el usuario:", err));

  formAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const newCardName = placeName.value;
    const newCardLink = placeImg.value;

    fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((newCardData) => {
        const newCard = new Cards(newCardData.link, newCardData.name);
        const cardElement = newCard.generateCard();
        cardsSection.addItem(cardElement);
        popupAddCard.close();
      })
      .catch((err) => {
        console.error("No se carga la tarjeta", err);
      });
  });
});
