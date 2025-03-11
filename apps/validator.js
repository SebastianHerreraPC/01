class formValidator {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll("input");
  }

  showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    input.classList.add("input-error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    input.classList.remove("input-error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  validateField(input, errorId) {
    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        this.showError(input, errorId, "Este campo es obligatorio");
      } else if (input.validity.tooShort) {
        this.showError(
          input,
          errorId,
          `El texto debe tener al menos ${input.minLength} caracteres`
        );
      } else if (input.validity.typeMismatch && input.type === "url") {
        this.showError(input, errorId, "Introduce un enlace válido");
      }
      return false;
    }
    this.hideError(input, errorId);
    return true;
  }

  validateForm() {
    let isValid = true;
    this.inputs.forEach((input) => {
      const errorId = input.name + "-error";
      if (!this.validateField(input, errorId)) {
        isValid = false;
      }
    });
    return isValid;
  }

  attachValidation() {
    this.inputs.forEach((input) => {
      const errorId = input.name + "-error";
      input.addEventListener("input", () => this.validateField(input, errorId));
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        alert("Formulario enviado exitosamente");
        this.form.reset();
      }
    });
  }
}
