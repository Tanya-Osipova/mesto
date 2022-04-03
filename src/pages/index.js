// Import CSS
import './index.css';

// Import COMPONENTS
import Card from '../components/Card.js'; 
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDelete from '../components/PopupDelete';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api';

// Import CONSTANTS
import { jobInput, nameInput, userImage } from '../utils/constants.js';
import { cardList } from '../utils/constants.js';

// Form validator selectors
import { editForm, addForm, updateAvatar, selector } from '../utils/constants.js';

// Popup selectors
import { editButton, addButton } from '../utils/constants.js';


// FormValidator.js
const formValidator = {
  edit: new FormValidator(selector, editForm),
  add: new FormValidator(selector, addForm),
  update: new FormValidator(selector, updateAvatar)
}
formValidator.edit.enableValidation();
formValidator.add.enableValidation();
formValidator.update.enableValidation();


// PopupWithImage.js
const imagePopup = new PopupWithImage('.popup_image');


// handleCardClick
function handleCardClick(title, image,alt) {
  imagePopup.open({title:title, image:image, alt:alt})
}


// handle delete
const popupDelete = new PopupDelete('.popup_delete',(cardId) => {
  const promise = api.deleteCard(cardId)

  return promise
});


// Create card
function createCard(item) {
  const card = new Card(item, '.card-template_type_default', handleCardClick, popupDelete, api, userData.getId());
  return card.generateCard();
}


// UserInfo.js
const userData = new UserInfo ({
  userNameSelector: '.profile__name', 
  userJobSelector: '.profile__job',
})

const popupFormEdit = new PopupWithForm('.popup_edit', (data) => {
    userData.setUserInfo(data['name-input'], data['job-input'])
    const promise = api.updateProfile(data['name-input'], data['job-input'])

    return promise
});

editButton.addEventListener('click', () => {
  formValidator.edit.resetError();
  formValidator.edit.unblockSubmitButton();
  const inputValues = userData.getUserInfo();
  nameInput.value = inputValues.name;
  jobInput.value = inputValues.job;
  popupFormEdit.open()
});


// Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: 'eded85a4-c499-46c1-8280-75a17fa1cbb9',
    'Content-Type': 'application/json'
  }
}); 

// Get Initial Cards
api.getInitialCards()
  .then((result) => {
    const cardsList = new Section({
      items: result,
      renderer: (cardItem) => { 
        const card = createCard(cardItem)
        cardsList.addItem(card);
      }
    },
    cardList
    );
    cardsList.renderItems(); 
  })
  .catch((err) => {
    console.log(err); 
  }); 

// Get user info
api.getInfo()
  .then((result) => {
    userData.setUserInfo(result.name, result.about, result.avatar);
    userData.setId(result._id);
    userImage.src = result.avatar;
  
  })
  .catch((err) => {
    console.log(err); 
  }); 
  
// Add card
const popupFormAdd = new PopupWithForm('.popup_add', (data) => {
  const newCard = {
    name: data['img-name-input'],
    link: data['img-link-input'],
    alt: data['img-name-input'],
    likes: []
  };
  
  formValidator.add.blockSubmitButton();
  const promise = api.addCard(newCard);

  return promise
});

addButton.addEventListener('click', () => popupFormAdd.open());

  

// Update avatar
const popupAvatar = new PopupWithForm('.popup_avatar',(data) => {
  const promise = api.updateAvatar(data['avatar-link-input'])
    .then(res =>
      console.log(res))
  userImage.src = data['avatar-link-input'];
  
  return promise
})

const updateAvatarIcon = document.querySelector('.profile__update-icon');
updateAvatarIcon.addEventListener('click', () => popupAvatar.open());
