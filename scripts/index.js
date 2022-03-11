import Card from '../components/Card.js'; 
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
import { cardList } from '../utils/constants.js';

// Form validator selectors
const editForm = document.querySelector('.popup__container-content_edit');
const addForm = document.querySelector('.popup__container-content_add');
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


// ===== Validate form =====
const editFormValidator = new FormValidator(selector, editForm);
const addFormValidator = new FormValidator(selector, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Open popup
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
  document.addEventListener('click', handleClick);
}

// Close popup
export function closePopup(popupElement) {
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

// Open edit profile
function openEditProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  editFormValidator.resetError();
  editFormValidator.unblockSubmitButton(submitButtonEdit);
  openPopup(editPopup);
}
editButton.addEventListener('click', openEditProfile);

// Open add place
function openAddPlace() {
  addFormValidator.resetError();
  formAddReset.reset();
  openPopup(addPopup); 
}
addButton.addEventListener('click', openAddPlace);

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
  closePopup(addPopup);
  formAddReset.reset();
  addFormValidator.blockSubmitButton(submitButtonAdd);
  cardList.prepend(renderCard(newCard));

}

formAdd.addEventListener('submit', handleAddPlaceForm);

// ===== Create new cards =====
/*
function renderCard(cardItem) {
  const card = new Card(cardItem, '.card-template_type_default');
  return card.generateCard();
}

initialCards.forEach((cardItem) => {
  const card = renderCard(cardItem);
  cardList.prepend(card);
});
*/

// Section.js
const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => { 
      const card = new Card(cardItem, '.card-template_type_default');
      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    }
  },
  cardList
);

cardsList.renderItems(); 