// ===== Creating Cards ======
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  }
];

const cardsList = document.querySelector('.cards__list');
initialCards.map(createCard);
 
function createCard(element) {
  let card = `
    <li class="cards__item">
      <img class="cards__image" src="${element.link}" alt="${element.alt}">
      <button class="cards__btn-trash" type="button"></button>
      <div class="cards__info">
        <h2 class="cards__title">${element.name}</h2>
        <button class="cards__btn-like" type="button"></button>
      </div>
    </li>`;
  cardsList.insertAdjacentHTML('afterbegin', card);
}

// ==== Popup edit ====
const editBtn = document.querySelector('.profile__btn-edit');
const closeBtn = document.querySelector('.popup__container-btn-close');
const popupEdit = document.querySelector('.popup_edit');

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
}

function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopupEdit);
closeBtn.addEventListener('click', closePopupEdit);

// ==== Popup add ====

const addBtn = document.querySelector('.profile__btn-add');
const closeBtnAdd = document.querySelector('.popup__container-btn-close_add');
const popupAdd = document.querySelector('.popup_add');

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

addBtn.addEventListener('click', openPopupAdd);
closeBtnAdd.addEventListener('click', closePopupAdd);


// ==== Form edit ====
let formEdit = document.querySelector('.popup__container_edit');   

function formSubmitHandlerEdit (evt) {
	evt.preventDefault(); 

	let nameInput = document.querySelector('#name-input'); 
	let jobInput = document.querySelector('#job-input');   

  let name = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__job');
  
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopupEdit()
}

formEdit.addEventListener('submit', formSubmitHandlerEdit);


// ==== Form add ====
let formAdd = document.querySelector('.popup__container_add');   

function formSubmitHandlerAdd (evt) {
	evt.preventDefault(); 

	let imgNameInput = document.querySelector('#img-name-input'); 
	let imgLinkInput = document.querySelector('#img-link-input');   

  const newCard = {
    name: imgNameInput.value,
    link: imgLinkInput.value
  }

  createCard(newCard)
  closePopupAdd()
}

formAdd.addEventListener('submit', formSubmitHandlerAdd);

