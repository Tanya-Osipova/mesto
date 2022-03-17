// import COMPONENTS
import Card from '../components/Card.js'; 
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
// import CONSTANTS
import { initialCards } from '../utils/constants.js';
import { cardList } from '../utils/constants.js';

// Form validator selectors
import { editForm, addForm, selector } from '../utils/constants.js';

// Popup selectors
import { closeButtons, editButton, addButton, submitButtonAdd, submitButtonEdit, editPopup, addPopup } from '../utils/constants.js';

// Edit profile form selectors
import { formEdit, nameInput, jobInput, userName, userJob } from '../utils/constants.js';

// Add place form selectors
import { formAdd, formAddReset, imageNameInput, imageLinkInput } from '../utils/constants.js';


// ===== Validate form =====
const editFormValidator = new FormValidator(selector, editForm);
const addFormValidator = new FormValidator(selector, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
/*
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


nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  editFormValidator.resetError();
  editFormValidator.unblockSubmitButton(submitButtonEdit);
  openPopup(editPopup);

*/

const imagePopup = new PopupWithImage('.popup_image')

// Section.js
const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => { 
      const card = new Card(cardItem, '.card-template_type_default', imagePopup);
      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    }
  },
  cardList
);

cardsList.renderItems(); 

// PopupWithForm.js
const popupFormAdd = new PopupWithForm ('.popup_add', (data) => {
    const newCard = {
      title: data[0],
      image: data[1]
    };
    const card = new Card(newCard, '.card-template_type_default',imagePopup);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
    addFormValidator.blockSubmitButton(submitButtonAdd);
});

addButton.addEventListener('click', () => popupFormAdd.open());

// UserInfo.js
const userData = new UserInfo ({
  userNameSelector: '.profile__name', 
  userJobSelector: '.profile__job'
})

const popupFormEdit = new PopupWithForm ('.popup_edit', (data) => {
    userData.setUserInfo(data[0],data[1])
    popupFormEdit.close()
});

editButton.addEventListener('click', () => {
  editFormValidator.resetError();
  editFormValidator.unblockSubmitButton(submitButtonEdit);
  popupFormEdit.open()
});













// function handleAddPlaceForm () {
//   const newCard = popupFormAdd.getValue();
//   //   {
//   //   title: imageNameInput.value,
//   //   image: imageLinkInput.value
//   // }

//   closePopup(addPopup);
//   addFormValidator.blockSubmitButton(submitButtonAdd);
//   cardList.prepend(renderCard(newCard));

// }
