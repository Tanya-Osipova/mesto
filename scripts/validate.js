// Show error
const showInputError = (formElement, inputElement, errorMessage, popupObjects) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(popupObjects.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupObjects.errorClass);
};

// Hide error
const hideInputError = (formElement, inputElement, popupObjects) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(popupObjects.inputErrorClass);
  errorElement.classList.remove(popupObjects.errorClass);
  errorElement.textContent = '';
};

// Find invalid input
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Change button state
const setSubmitButtonState = (inputList, buttonElement, popupObjects) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(popupObjects.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(popupObjects.inactiveButtonClass);
  }
}

// Check validity
const checkInputValidity = (formElement, inputElement, popupObjects) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupObjects);
  } else {
    hideInputError(formElement, inputElement, popupObjects);
  }
};

// Event listener for each input
const setEventListeners = (formElement, popupObjects) => {
  const inputList = Array.from(formElement.querySelectorAll(popupObjects.inputSelector));
  const buttonElement = formElement.querySelector(popupObjects.submitButtonSelector);

  setSubmitButtonState(inputList, buttonElement, popupObjects);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, popupObjects);

      setSubmitButtonState(inputList, buttonElement, popupObjects);
    });
  });
};

// Find and process all forms
const enableValidation = (popupObjects) => {
  const formList = Array.from(document.querySelectorAll(popupObjects.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, popupObjects);
  });
};

enableValidation({
  formSelector: '.popup__container-content',
  inputSelector: '.popup__container-input',
  submitButtonSelector: '.popup__container-btn-submit',
  inactiveButtonClass: 'container-btn-submit_disabled',
  inputErrorClass: 'popup__container-input_type_error',
  errorClass: 'popup__container-input-error_active'
}); 