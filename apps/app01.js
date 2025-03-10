import { Cards } from "./cards.js";

document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".profile__edit-button");
  const closeButton = document.querySelector(".popup__close-button");
  const profileName = document.querySelector(".profile__name-text");
  const inputName = document.querySelector(".popup__input-name");
  const inputJob = document.querySelector(".popup__input-job");
  const profileJob = document.querySelector(".profile__job");
  const popupEdit = document.querySelector(".popup__edit");

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
    inputJob.value = "";
    inputName.value = "";
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
  console.log(typeof Cards); // Debe decir 'function'
  console.log(new Cards("url", "nombre")); // Debe mostrar un objeto con métodos

  const likeButton = document.querySelectorAll(".card__like-button");
  likeButton.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  //validador
  const editForm = document.querySelector(".popup__form-edit");
  const addForm = document.querySelector(".popup__form-add");

  function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    input.classList.add("input-error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    input.classList.remove("input-error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  function validateField(input, errorId) {
    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        showError(input, errorId, "Este campo es obligatorio");
      } else if (input.validity.tooShort) {
        showError(
          input,
          errorId,
          `El texto debe tener al menos ${input.minLength} caracteres`
        );
      } else if (input.validity.typeMismatch && input.type === "url") {
        showError(input, errorId, "Introduce un enlace válido");
      }
      return false;
    }
    hideError(input, errorId);
    return true;
  }

  function validateForm(form) {
    const inputs = form.querySelectorAll("input");
    let isValid = true;

    inputs.forEach((input) => {
      const errorId = input.name + "-error";
      if (!validateField(input, errorId)) {
        isValid = false;
      }
    });

    return isValid;
  }

  [editForm, addForm].forEach((form) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      const errorId = input.name + "-error";
      input.addEventListener("input", () => validateField(input, errorId));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm(form)) {
        alert("Formulario enviado exitosamente");
        form.reset();
      }
    });
  });
});
