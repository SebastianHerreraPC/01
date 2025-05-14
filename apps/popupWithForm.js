import { Popup } from "./popups.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    console.log("Input values collected:", inputValues);
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("Form submitted");
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
    console.log("Form reset and popup closed");
  }
}
