export default class FormValidator {
  constructor(data, formElementSelector) {
    this._form = formElementSelector;
    this._inputField = data.inputSelector;
    this._inputError = data.inputErrorClass;
    this._submitButton = data.submitButtonSelector;
    this._inactiveButton = data.inactiveButtonClass;
    this._error = data.errorClass;
  }

  enableValidation() {
    this._setEventListeners();
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
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Change button state
  _setSubmitButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(this._inactiveButton);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButton);
    }
  }

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

    const inputList = Array.from(this._form.querySelectorAll(this._inputField));
    const buttonElement = this._form.querySelector(this._submitButton);

    this._setSubmitButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._setSubmitButtonState(inputList, buttonElement); 
      });
    });
  };
}

