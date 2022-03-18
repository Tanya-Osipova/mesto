// CSS
import './index.css';

// import COMPONENTS
import Card from '../components/Card.js'; 
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';

// import CONSTANTS
import { initialCards } from '../utils/constants.js';
import { cardList } from '../utils/constants.js';

// Form validator selectors
import { editForm, addForm, selector } from '../utils/constants.js';

// Popup selectors
import { editButton, addButton, submitButtonAdd, submitButtonEdit } from '../utils/constants.js';


// FormValidator.js
const editFormValidator = new FormValidator(selector, editForm);
const addFormValidator = new FormValidator(selector, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();


// PopupWithImage.js
const imagePopup = new PopupWithImage('.popup_image');

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
  popupFormEdit.inputFields[0].value = userData.getUserInfo().name;
  popupFormEdit.inputFields[1].value = userData.getUserInfo().job;
  popupFormEdit.open()
});
