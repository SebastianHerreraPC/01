export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByClick = this._closeByClick.bind(this);
  }

  open() {
    this._popup.style.display = "block";
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.style.display = "none";
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closeByClick(evt) {
    if (
      evt.target === this._popup ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._closeByClick);
  }
}
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    console.log("PopupWithForm constructor:", { popupSelector, this: this });
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log("Form input values collected:", formValues);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("Form submit event triggered");
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this._form.reset();
    console.log("Popup closed and form reset");
  }
}
