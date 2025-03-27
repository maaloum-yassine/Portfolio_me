'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



(function() {
  emailjs.init("XLYsS7bopVh8mvAfw"); 
  const form = document.getElementById("contact-form");
  const sendButton = form.querySelector("[data-form-btn]");
  sendButton.disabled = false;

  function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alert-box");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    alertBox.className = type === "error" ? "error" : "";
    alertBox.style.display = "block";

    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
      fullname: form.fullname.value,
      email: form.email.value,
      message: form.message.value
    };

    sendButton.disabled = true;
    showAlert("Envoi en cours...");

    emailjs.send("service_byhx29f", "template_kn3xyej", formData)
      .then(() => {
        showAlert("Message envoyé avec succès !", "success");
        form.reset();
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
        showAlert("Une erreur est survenue !", "error");
      })
      .finally(() => {
        sendButton.disabled = false;
      });
  });
})();





// Sélectionner tous les boutons d'information et les popups
const infoBtns = document.querySelectorAll('.info-btn');
const popups = document.querySelectorAll('.popup');
const closePopupBtns = document.querySelectorAll('.close-popup');

// Fonction pour ouvrir le popup
infoBtns.forEach(infoBtn => {
  infoBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // Empêche la propagation de l'événement
    const projectId = this.closest('.project-item').getAttribute('data-project');
    const popup = document.querySelector(`.popup[data-project="${projectId}"]`);
    popup.classList.add('visible');
  });
});

// Fonction pour fermer le popup
closePopupBtns.forEach(closePopupBtn => {
  closePopupBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // Empêche la propagation de l'événement
    const popup = this.closest('.popup');
    popup.classList.remove('visible');
  });
});

// Fermer le popup si on clique en dehors
window.addEventListener('click', function(event) {
  popups.forEach(popup => {
    // Si le clic est en dehors du popup, on le ferme
    if (!popup.contains(event.target)) {
      popup.classList.remove('visible');
    }
  });
});
