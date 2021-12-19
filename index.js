// ==== Popup ====
const editBtn = document.querySelector(".profile__btn-edit");
const closeBtn = document.querySelector(".popup__container-btn-close");
const popup = document.querySelector(".popup");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);


// ==== Form ====
let formElement = document.querySelector(".popup__container");   

function formSubmitHandler (evt) {
	evt.preventDefault(); 

	let nameInput = document.querySelector("#name-input"); 
	let jobInput = document.querySelector("#job-input");   

  nameInput = nameInput.value;
  jobInput = jobInput.value;
  
  let name = document.querySelector(".profile__name");
  let job = document.querySelector(".profile__job");
  
  name.textContent = nameInput;
  job.textContent = jobInput;

  closePopup()
}

formElement.addEventListener("submit", formSubmitHandler);
