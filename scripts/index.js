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

// ==== Draw cards ====
const renderCard = (data) => {
  const cardsList = document.querySelector('.cards__list');
  cardsList.prepend(createCard(data));
}

initialCards.forEach(renderCard);

// ==== Card template ====
function createCard(cardData) {
  const cardTemplate = document.querySelector('#cards__item-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const popupImage = document.querySelector('.popup__container-modal-image');
  const popupCaption = document.querySelector('.popup__container-caption');
  const imagePopup = document.querySelector('.popup_image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.cards__title').textContent = cardData.name;
  
  // Like
  cardElement.querySelector('.cards__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__btn-like_active');
  });

  // Delete 
  cardElement.querySelector('.cards__btn-trash').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });

  // Modal image
  cardImage.addEventListener('click', function () {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imagePopup); 
  });
  return cardElement;
}

// ==== Popups ====

// Remove error message
function removeErrorMessage() {
  errorTexts.forEach(errorText => {
    errorText.textContent = '';
  });
  errorLines.forEach(errorLine => {
    errorLine.classList.remove('popup__container-input_type_error');
  });
}

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
    name: imageNameInput.value,
    link: imageLinkInput.value
  }
  renderCard(newCard);
  closePopup(addPopup);
  formAddReset.reset();
  submitButtonAdd.setAttribute('disabled', true);
  submitButtonAdd.classList.add('container-btn-submit_disabled');
}

formAdd.addEventListener('submit', handleAddPlaceForm);
