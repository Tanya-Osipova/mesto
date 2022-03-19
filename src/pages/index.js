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
import { initialCards, jobInput, nameInput } from '../utils/constants.js';
import { cardList } from '../utils/constants.js';

// Form validator selectors
import { editForm, addForm, selector } from '../utils/constants.js';

// Popup selectors
import { editButton, addButton, submitButtonAdd, submitButtonEdit } from '../utils/constants.js';


// FormValidator.js

const formValidator = {
  edit: new FormValidator(selector, editForm),
  add: new FormValidator(selector, addForm)
}
formValidator.edit.enableValidation();
formValidator.add.enableValidation();


// PopupWithImage.js
const imagePopup = new PopupWithImage('.popup_image');

// handleCardClick
function handleCardClick(title, image,alt) {
  imagePopup.open({title:title, image:image, alt:alt})
}
// create card
function createCard(item) {
  const card = new Card(item, '.card-template_type_default', handleCardClick);
  return card.generateCard();
}

// Section.js
const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => { 
      const card = createCard(cardItem)
      cardsList.addItem(card);
    }
  },
  cardList
);
// initial add cards
cardsList.renderItems(); 


// PopupWithForm.js
const popupFormAdd = new PopupWithForm ('.popup_add', (data) => {
  const newCard = {
    title: data['img-name-input'],
    image: data['img-link-input'],
    alt: data['img-name-input']
  };
  const card = createCard(newCard)
  cardsList.addItem(card);
  formValidator.add.blockSubmitButton();
});

addButton.addEventListener('click', () => popupFormAdd.open());


// UserInfo.js
const userData = new UserInfo ({
  userNameSelector: '.profile__name', 
  userJobSelector: '.profile__job'
})

const popupFormEdit = new PopupWithForm ('.popup_edit', (data) => {
    userData.setUserInfo(data['name-input'],data['job-input'])
    popupFormEdit.close()
});

editButton.addEventListener('click', () => {
  formValidator.edit.resetError();
  formValidator.edit.unblockSubmitButton(submitButtonEdit);
  const inputValues = userData.getUserInfo();
  nameInput.value = inputValues.name;
  jobInput.value = inputValues.job;
  popupFormEdit.open()
});
