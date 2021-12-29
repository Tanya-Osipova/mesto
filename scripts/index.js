// ===== Creating Cards ====
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://media.istockphoto.com/photos/baikal-landscape-with-an-old-railway-bridge-picture-id623509532?b=1&k=20&m=623509532&s=170667a&w=0&h=opkBV0QoMbVGGKeW1F30odXBxyRaS8cnivSWwm-RQpo=',
    alt: 'Байкал'
  },
  {
    name: 'Гора Эльбрус',
    link: 'https://media.istockphoto.com/photos/pink-sunrise-above-mount-elbrus-is-the-highest-and-most-prominent-in-picture-id1327300920?b=1&k=20&m=1327300920&s=170667a&w=0&h=Ooczpxpy_GY_LzdfYBG-F7unRQohTdpEi0Teohxkoio=',
    alt: 'Гора Эльбрус'
  },
  {
    name: 'Алтай',
    link: 'https://media.istockphoto.com/photos/sunny-evening-on-lake-teletskoye-picture-id1353240964?b=1&k=20&m=1353240964&s=170667a&w=0&h=Os1zdwJQTP9AXW2reAfRJLFwP9Cw0bEB6L5pLBaSxf0=',
    alt: 'Алтай'
  },
  {
    name: 'Москва',
    link: 'https://media.istockphoto.com/photos/st-basils-cathedral-picture-id502362300?b=1&k=20&m=502362300&s=170667a&w=0&h=uxk8vG5ICAx-sXMGCrZmmuu0712edTEVzeiySuajnLQ=',
    alt: 'Москва'
  },
  {
    name: 'Кольский Полуостров',
    link: 'https://media.istockphoto.com/photos/northern-lights-on-the-kola-peninsula-picture-id651146176?b=1&k=20&m=651146176&s=170667a&w=0&h=8q_4tEYhlEuPQc34lY8OYOSXEsAHnJdNRjPTaaLRz08=',
    alt: 'Кольский Полуостров'
  },
  {
    name: 'Петропавловск-Камчатский',
    link: 'https://media.istockphoto.com/photos/panoramic-view-of-the-city-petropavlovskkamchatsky-and-volcanoes-picture-id1316952893?b=1&k=20&m=1316952893&s=170667a&w=0&h=fOjtgi0hC_YdUX1HX5UOm1XeoGbriWGbJMFuyqU9vYk=',
    alt: 'Петропавловск-Камчатский'
  }
];

const cardsList = document.querySelector('.cards__list');
initialCards.map(createCard);

function createCard(element) {
  const cardTemplate = document.querySelector('#cards__item-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  cardElement.querySelector('.cards__image').src = element.link;
  cardElement.querySelector('.cards__image').alt = element.alt;
  cardElement.querySelector('.cards__title').textContent = element.name;
  

  //like
  cardElement.querySelector('.cards__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__btn-like_active');
  });

  //delete 
  cardElement.querySelector('.cards__btn-trash').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });
  
  cardsList.prepend(cardElement);
}



// ==== Popup edit ====
const editBtn = document.querySelector('.profile__btn-edit');
const closeBtn = document.querySelector('.popup__container-btn-close');
const popup = document.querySelector('.popup');

function openPopupEdit() {
  popup.classList.add('popup_opened');
}

function closePopupEdit() {
  popup.classList.remove('popup_opened');
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
    link: imgLinkInput.value,
    alt: imgNameInput.value
  }

  createCard(newCard)
  closePopupAdd()

  imgNameInput.value = '';
  imgLinkInput.value = '';
}

formAdd.addEventListener('submit', formSubmitHandlerAdd);

// ==== Modal image ====

const cardsModal = document.querySelector(".cards-modal");
const cardsImg = document.querySelectorAll(".cards__image");
const cardsModalImg = document.querySelector(".cards-modal__img");
const cardsModalCaption = document.querySelector(".cards-modal__caption");
const cardsModalCloseBtn = document.querySelector(".cards-modal__btn-close");

function openModalImage() {
  cardsModal.classList.add('cards-modal_opened');
  cardsModalImg.src = this.src;
  cardsModalCaption.innerHTML = this.alt;
}

function closeModalImage() {
  cardsModal.classList.remove('cards-modal_opened');
}


cardsImg.forEach(element => {
  element.addEventListener("click", openModalImage);
});

cardsModalCloseBtn.addEventListener("click", closeModalImage);
