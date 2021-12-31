
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
initialCards.forEach(createCard);

// ==== Card template ====
function createCard(element) {
  const cardTemplate = document.querySelector('#cards__item-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const popupImg = document.querySelector(".popup__container-modal-image");
  const popupCaption = document.querySelector(".popup__container-caption");
  const imagePopup = document.querySelector('.popup__container-image');

  cardElement.querySelector('.cards__image').src = element.link;
  cardElement.querySelector('.cards__image').alt = element.alt;
  cardElement.querySelector('.cards__title').textContent = element.name;
  
  // like
  cardElement.querySelector('.cards__btn-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__btn-like_active');
  });

  // delete 
  cardElement.querySelector('.cards__btn-trash').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });

  // modal image
  cardElement.querySelector('.cards__image').addEventListener('click', function (evt) {
    popupImg.src = evt.target.src;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup); 
  });

  cardsList.prepend(cardElement);
}

// ==== Popup edit and add ====
const closeBtn = document.querySelectorAll('.popup__container-btn-close');
const editBtn = document.querySelector('.profile__btn-edit');
const addBtn = document.querySelector('.profile__btn-add');
const editPopup = document.querySelector('.popup__container_edit');
const addPopup = document.querySelector('.popup__container_add');

function openPopup(popupElement) {
  popupElement.parentNode.classList.add('popup_opened');
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', function () {
  openPopup(editPopup); 
});

addBtn.addEventListener('click', function () {
  openPopup(addPopup); 
});

closeBtn.forEach(button => {
  button.addEventListener('click', closePopup);
});


// ==== Form edit ====
const formEdit = document.querySelector('.popup__container_edit');   

function formSubmitHandlerEdit (evt) {
	evt.preventDefault(); 

	let nameInput = document.querySelector('#name-input'); 
	let jobInput = document.querySelector('#job-input');   

  let name = document.querySelector('.profile__name');
  let job = document.querySelector('.profile__job');
  
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closePopup()
}

formEdit.addEventListener('submit', formSubmitHandlerEdit);


// ==== Form add ====
const formAdd = document.querySelector('.popup__container_add');   

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
  closePopup()

  imgNameInput.value = '';
  imgLinkInput.value = '';
}

formAdd.addEventListener('submit', formSubmitHandlerAdd);