import Card from './Card.js'; 
import FormValidator from './FormValidator.js';
 
// Card List
const initialCards = [
  {
    title: 'Байкал',
    image: 'https://media.istockphoto.com/photos/baikal-landscape-with-an-old-railway-bridge-picture-id623509532?b=1&k=20&m=623509532&s=170667a&w=0&h=opkBV0QoMbVGGKeW1F30odXBxyRaS8cnivSWwm-RQpo=',
  },
  {
    title: 'Гора Эльбрус',
    image: 'https://media.istockphoto.com/photos/pink-sunrise-above-mount-elbrus-is-the-highest-and-most-prominent-in-picture-id1327300920?b=1&k=20&m=1327300920&s=170667a&w=0&h=Ooczpxpy_GY_LzdfYBG-F7unRQohTdpEi0Teohxkoio=',
  },
  {
    title: 'Алтай',
    image: 'https://media.istockphoto.com/photos/sunny-evening-on-lake-teletskoye-picture-id1353240964?b=1&k=20&m=1353240964&s=170667a&w=0&h=Os1zdwJQTP9AXW2reAfRJLFwP9Cw0bEB6L5pLBaSxf0=',
  },
  {
    title: 'Москва',
    image: 'https://media.istockphoto.com/photos/st-basils-cathedral-picture-id502362300?b=1&k=20&m=502362300&s=170667a&w=0&h=uxk8vG5ICAx-sXMGCrZmmuu0712edTEVzeiySuajnLQ=',
  },
  {
    title: 'Кольский Полуостров',
    image: 'https://media.istockphoto.com/photos/northern-lights-on-the-kola-peninsula-picture-id651146176?b=1&k=20&m=651146176&s=170667a&w=0&h=8q_4tEYhlEuPQc34lY8OYOSXEsAHnJdNRjPTaaLRz08=',
  },
  {
    title: 'Петропавловск-Камчатский',
    image: 'https://media.istockphoto.com/photos/panoramic-view-of-the-city-petropavlovskkamchatsky-and-volcanoes-picture-id1316952893?b=1&k=20&m=1316952893&s=170667a&w=0&h=fOjtgi0hC_YdUX1HX5UOm1XeoGbriWGbJMFuyqU9vYk=',
  }
];

// Form validator selectors
const formList = Array.from(document.querySelectorAll('.popup__container-content'));
const selector = {
  inputSelector: '.popup__container-input',
  submitButtonSelector: '.popup__container-btn-submit',
  inactiveButtonClass: 'container-btn-submit_disabled',
  inputErrorClass: 'popup__container-input_type_error',
  errorClass: 'popup__container-input-error_active'
}; 

// Popup selectors
const closeButtons = document.querySelectorAll('.popup__container-btn-close');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add');
const submitButtonAdd = document.querySelector('.popup__container-btn-submit_add');
const submitButtonEdit = document.querySelector('.popup__container-btn-submit_edit');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');

// Error message selectors
const errorTexts = document.querySelectorAll('.popup__container-input-error');
const errorLines = document.querySelectorAll('.popup__container-input');

// Edit profile form selectors
const formEdit = document.querySelector('.popup__container_edit');  
const nameInput = document.querySelector('#name-input'); 
const jobInput = document.querySelector('#job-input');   
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job'); 

// Add place form selectors
const formAdd = document.querySelector('.popup__container_add');  
const formAddReset = document.forms.add;  
const imageNameInput = document.querySelector('#img-name-input'); 
const imageLinkInput = document.querySelector('#img-link-input');  


// Open popup
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
  document.addEventListener('click', handleClick);
}

// Close popup
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
  document.removeEventListener('click', handleClick);
}

// Close popup on esc key 
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Close popup when the user clicks anywhere outside of it
function handleClick(event) {
  if(event.target.classList.contains('popup_opened')) { 
    closePopup(event.target); 
  } 
}

// Close popup on x button
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  });
});

// Remove error message
function removeErrorMessage() {
  errorTexts.forEach(errorText => {
    errorText.textContent = '';
  });
  errorLines.forEach(errorLine => {
    errorLine.classList.remove('popup__container-input_type_error');
  });
}

// Open edit profile
editButton.addEventListener('click', () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  removeErrorMessage();
  submitButtonEdit.setAttribute('disabled', false);
  submitButtonEdit.classList.remove('container-btn-submit_disabled');
  openPopup(editPopup);
});

// Open add place
addButton.addEventListener('click', () => {
  removeErrorMessage();
  formAddReset.reset();
  openPopup(addPopup); 
});

// ==== Form edit ====
function handleEditProfileForm () {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(editPopup);
}

formEdit.addEventListener('submit', handleEditProfileForm);

// ==== Form add ====
function handleAddPlaceForm () {
  const newCard = {
    title: imageNameInput.value,
    image: imageLinkInput.value
  }
  renderCard(newCard);
  closePopup(addPopup);
  formAddReset.reset();
  submitButtonAdd.setAttribute('disabled', true);
  submitButtonAdd.classList.add('container-btn-submit_disabled');
}

formAdd.addEventListener('submit', handleAddPlaceForm);

// ===== Create new cards =====
function renderCard(cardItem) {
  const card = new Card(cardItem, '.card-template_type_default');
  const cardElement = card.generateCard();

  document.querySelector('.cards__list').prepend(cardElement);
}

initialCards.forEach((cardItem) => {
  renderCard(cardItem);
});


// ===== Validate form =====
formList.forEach((formElement) => {
  const form = new FormValidator(selector, formElement);
  form.enableValidation();
});