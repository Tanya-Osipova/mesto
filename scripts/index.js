const renderCard = (data) => {
  const cardsList = document.querySelector('.cards__list');
  cardsList.prepend(createCard(data));
  
}

initialCards.forEach(renderCard);

// ==== Card template ====
function createCard(cardData) {
  const cardTemplate = document.querySelector('#cards__item-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardsImage = cardElement.querySelector('.cards__image');
  const popupImage = document.querySelector(".popup__container-modal-image");
  const popupCaption = document.querySelector(".popup__container-caption");
  const imagePopup = document.querySelector('.popup__container-image');
  cardsImage.src = cardData.link;
  cardsImage.alt = cardData.alt;
  cardElement.querySelector('.cards__title').textContent = cardData.name;
  
  // like
  cardElement.querySelector('.cards__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__btn-like_active');
  });

  // delete 
  cardElement.querySelector('.cards__btn-trash').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });

  // modal image
  cardsImage.addEventListener('click', function (evt) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.alt;
    popupCaption.textContent = cardData.alt;
    openPopup(imagePopup); 
  });
  return cardElement;
}

// ==== Popup edit and add ====
const closeButtons = document.querySelectorAll('.popup__container-btn-close');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add');
const editPopup = document.querySelector('.popup__container_edit');
const addPopup = document.querySelector('.popup__container_add');

function openPopup(popupElement) {
  popupElement.parentNode.classList.add('popup_opened');
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => {
  openPopup(editPopup); 
});

addButton.addEventListener('click', () => {
  openPopup(addPopup); 
});

closeButtons.forEach(button => {
  button.addEventListener('click', closePopup);
});


// ==== Form edit ====
const formEdit = document.querySelector('.popup__container_edit');  
const nameInput = document.querySelector('#name-input'); 
const jobInput = document.querySelector('#job-input');   
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job'); 

function handleEditProfileForm (evt) {
	evt.preventDefault(); 
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup()
}

formEdit.addEventListener('submit', handleEditProfileForm);


// ==== Form add ====
const formAdd = document.querySelector('.popup__container_add');  
const resetFormAdd = document.querySelector('#form-add');  
const imageNameInput = document.querySelector('#img-name-input'); 
const imageLinkInput = document.querySelector('#img-link-input');    

function handleAddPlaceForm (evt) {
	evt.preventDefault(); 

  const newCard = {
    name: imageNameInput.value,
    link: imageLinkInput.value,
    alt: imageNameInput.value
  }

  renderCard(newCard)
  closePopup()
  resetFormAdd.reset();
}

formAdd.addEventListener('submit', handleAddPlaceForm);