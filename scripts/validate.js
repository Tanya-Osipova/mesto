// add class error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add('popup__container-input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__container-input-error_active');
};


// remove class error
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__container-input_type_error');
  errorElement.classList.remove('popup__container-input-error_active');
  errorElement.textContent = '';
};


// find invalid input
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


// change button state
const setSubmitButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('container-btn-submit_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('container-btn-submit_disabled');
  }
}

// check validity
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


// event listener for each input
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__container-input'));
  const buttonElement = formElement.querySelector('.popup__container-btn-submit');

  setSubmitButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);

      setSubmitButtonState(inputList, buttonElement);
    });
  });
};

// find and process all forms
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container-content'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

