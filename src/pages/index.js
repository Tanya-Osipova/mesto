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


// Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-38',
  headers: {
    authorization: 'eded85a4-c499-46c1-8280-75a17fa1cbb9',
    'Content-Type': 'application/json'
  }
}); 


// FormValidator.js
const formValidator = {
  edit: new FormValidator(selector, editForm),
  add: new FormValidator(selector, addForm),
  avatar: new FormValidator(selector, updateAvatar)
}
formValidator.edit.enableValidation();
formValidator.add.enableValidation();
formValidator.avatar.enableValidation();

// PopupWithImage
const imagePopup = new PopupWithImage('.popup_image');

// handleCardClick
function handleCardClick(title, image,alt) {
  imagePopup.open({title, image, alt})
}


// handle delete
const popupDelete = new PopupDelete('.popup_delete',(cardId) => {
  const promise = api.deleteCard(cardId)
  promise.then(() => {
    const cardToDelete = document.getElementById(`${cardId}`)
    cardToDelete.remove()
  })
  .catch((err)=> {
    console.log(err)
  })
  return promise
});

// User Info
const userData = new UserInfo ({
  userNameSelector: '.profile__name', 
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__image'
})

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([user, cards]) => {
      userData.setUserInfo({
        name: user.name, 
        job: user.about, 
        avatar: user.avatar, 
        _id: user._id
      });
      cardSection.renderItems(cards); 
  })
  .catch(err => {
    console.log(err); 
  });

  
// Update profile
const popupFormEdit = new PopupWithForm('.popup_edit', (data) => {
  const promise = api.updateProfile(data['name-input'], data['job-input'])
  promise.then((res) => {
    userData.setUserInfo({
      name: res.name, 
      job: res.about, 
      avatar: res.avatar, 
      _id: res._id
    })
  })
  .catch((err)=> {
    console.log(err)
  })
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

// Update avatar
const popupAvatar = new PopupWithForm('.popup_avatar',(data) => {
  const promise = api.updateAvatar(data['avatar-link-input'])
    .then(res =>
      userData.setUserInfo(res)
    )
    .catch((err)=> {
      console.log(err)
    })
  
  return promise
})

const updateAvatarIcon = document.querySelector('.profile__update-icon');
updateAvatarIcon.addEventListener('click', () => {
  formValidator.avatar.blockSubmitButton();
  popupAvatar.open()
});


const cardSection = new Section('.cards__list', (item) => {
  const card = new Card(item, '.card-template_type_default', handleCardClick, popupDelete, api, userData.getUserInfo()._id);

  return card.generateCard()
});

// Popup Add card
const popupFormAdd = new PopupWithForm('.popup_add', (data) => {
  const newCard = {
    name: data['img-name-input'],
    link: data['img-link-input'],
    alt: data['img-name-input'],
    likes: []
  };
  
  const promise = api.addCard(newCard);
  promise.then((res) => {
    cardSection.addItem(res)
  })
  .catch((err)=> {
    console.log(err)
  })

  return promise
});

addButton.addEventListener('click', () => {
  formValidator.add.blockSubmitButton();
  popupFormAdd.open()
});

