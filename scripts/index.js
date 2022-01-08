// Popup selectors
const closeButtons = document.querySelectorAll('.popup__container-btn-close');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add');
const addPopupButton = document.querySelector('.popup__container-btn-submit_add');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
const errorTexts = document.querySelectorAll('.popup__container-input-error');

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
  const popupImage = document.querySelector(".popup__container-modal-image");
  const popupCaption = document.querySelector(".popup__container-caption");
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
  cardImage.addEventListener('click', function (evt) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imagePopup); 
  });
  return cardElement;
}

// ==== Popups ====
function openPopup(popupElement) {
  const errorLines = document.querySelectorAll('.popup__container-input_type_error');
  errorLines.forEach(errorLine => {
    errorLine.classList.remove('popup__container-input_type_error');
  })

  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
  document.addEventListener('click', handleClick);
}

function closePopup() {
  const popupOpened = document.querySelector('.popup_opened')
  popupOpened.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
  document.removeEventListener('click', handleClick);

  errorTexts.forEach(error => {
    error.textContent = '';
  });
}

// Close popup on esc key 
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closePopup()
  }
}

// Close the popup when the user clicks anywhere outside of it
function handleClick(event) {
  if(event.target.classList.contains('popup_opened')) { 
    closePopup(); 
  } 
}

// Open profile edit
editButton.addEventListener('click', (event) => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(editPopup);
});

// Open add place
addButton.addEventListener('click', () => {
  openPopup(addPopup); 
  formAddReset.reset();
});

// Close popups
closeButtons.forEach(button => {
  button.addEventListener('click', closePopup);
});


// ==== Form edit ====
function handleEditProfileForm () {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
}

formEdit.addEventListener('submit', (event) => {
  handleEditProfileForm(event)
  closePopup()
});


// ==== Form add ====
function handleAddPlaceForm (evt) {
  const newCard = {
    name: imageNameInput.value,
    link: imageLinkInput.value
  }
  renderCard(newCard)
  closePopup()
  formAddReset.reset();
  addPopupButton.setAttribute('disabled',true);
  addPopupButton.classList.add('container-btn-submit_disabled');
}

formAdd.addEventListener('submit', handleAddPlaceForm);
