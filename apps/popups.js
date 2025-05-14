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
