// Card list
export const initialCards = [
  {
    title: 'Байкал',
    image: 'https://media.istockphoto.com/photos/baikal-landscape-with-an-old-railway-bridge-picture-id623509532?b=1&k=20&m=623509532&s=170667a&w=0&h=opkBV0QoMbVGGKeW1F30odXBxyRaS8cnivSWwm-RQpo=',
    alt: 'Байкал',
  },
  {
    title: 'Гора Эльбрус',
    image: '',
    alt: 'Гора Эльбрус',
  },
  {
    title: 'Алтай',
    image: 'https://media.istockphoto.com/photos/sunny-evening-on-lake-teletskoye-picture-id1353240964?b=1&k=20&m=1353240964&s=170667a&w=0&h=Os1zdwJQTP9AXW2reAfRJLFwP9Cw0bEB6L5pLBaSxf0=',
    alt: 'Алтай',
  },
  {
    title: 'Москва',
    image: 'https://media.istockphoto.com/photos/st-basils-cathedral-picture-id502362300?b=1&k=20&m=502362300&s=170667a&w=0&h=uxk8vG5ICAx-sXMGCrZmmuu0712edTEVzeiySuajnLQ=',
    alt: 'Москва',
  },
  {
    title: 'Кольский Полуостров',
    image: 'https://media.istockphoto.com/photos/northern-lights-on-the-kola-peninsula-picture-id651146176?b=1&k=20&m=651146176&s=170667a&w=0&h=8q_4tEYhlEuPQc34lY8OYOSXEsAHnJdNRjPTaaLRz08=',
    alt: 'Кольский Полуостров',
  },
  {
    title: 'Петропавловск-Камчатский',
    image: 'https://media.istockphoto.com/photos/panoramic-view-of-the-city-petropavlovskkamchatsky-and-volcanoes-picture-id1316952893?b=1&k=20&m=1316952893&s=170667a&w=0&h=fOjtgi0hC_YdUX1HX5UOm1XeoGbriWGbJMFuyqU9vYk=',
    alt: 'Петропавловск-Камчатский',
  }
];

// Card.js constants
export const imagePopup = document.querySelector('.popup_image');
export const popupImage = document.querySelector('.popup__container-modal-image');
export const popupCaption = document.querySelector('.popup__container-caption');

// Cards
export const cardList = '.cards__list';

 
// Popup selectors
export const closeButtons = document.querySelectorAll('.popup__container-btn-close');
export const editButton = document.querySelector('.profile__btn-edit');
export const addButton = document.querySelector('.profile__btn-add');
export const submitButtonAdd = document.querySelector('.popup__container-btn-submit_add');
export const submitButtonEdit = document.querySelector('.popup__container-btn-submit_edit');
export const editPopup = document.querySelector('.popup_edit');
export const addPopup = document.querySelector('.popup_add');

// Edit profile form selectors
export const formEdit = document.querySelector('.popup__container_edit');  
export const nameInput = document.querySelector('#name-input'); 
export const jobInput = document.querySelector('#job-input');   
export const userName = document.querySelector('.profile__name');
export const userJob = document.querySelector('.profile__job'); 
export const userImage = document.querySelector('.profile__image'); 

// Add place form selectors
export const formAdd = document.querySelector('.popup__container_add');  
export const formAddReset = document.forms.add;  
export const imageNameInput = document.querySelector('#img-name-input'); 
export const imageLinkInput = document.querySelector('#img-link-input'); 

// Form validator selectors
export const editForm = document.querySelector('.popup__container-content_edit');
export const addForm = document.querySelector('.popup__container-content_add');
export const updateAvatar = document.querySelector('.popup__container-content_update');
export const selector = {
  inputSelector: '.popup__container-input',
  submitButtonSelector: '.popup__container-btn-submit',
  inactiveButtonClass: 'container-btn-submit_disabled',
  inputErrorClass: 'popup__container-input_type_error',
  errorClass: 'popup__container-input-error_active'
}; 
