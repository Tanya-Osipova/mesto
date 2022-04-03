export default class FormValidator {
  constructor(data, formElementSelector) {
    this._form = formElementSelector;
    this._inputField = data.inputSelector;
    this._inputError = data.inputErrorClass;
    this._submitButton = data.submitButtonSelector;
    this._inactiveButton = data.inactiveButtonClass;
    this._error = data.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputField));
    this._submitButton = this._form.querySelector(this._submitButton);
  }

  enableValidation() {
    this._setEventListeners();
  }
  
  resetError() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    });
  }

  blockSubmitButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._inactiveButton);
  }

  unblockSubmitButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._inactiveButton);
  }
  
  // Show error
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._error);
  };

  // Hide error
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._error);
    errorElement.textContent = '';
  };

  // Find invalid input
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Check validity
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError( inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Event listener for each input
  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this.blockSubmitButton();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        
        if (this._hasInvalidInput(this._inputList)) {
          this.blockSubmitButton();
        } else {
          this.unblockSubmitButton();
        }
      });
    });
  };
}

