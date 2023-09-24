// function editNav() {
//   const x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

// -------------------
// Burger Menu
// -------------------

const burgerIcons = document.querySelectorAll(".nav-icon");

// console.log("🚀 ~ navList:", navList);

burgerIcons.forEach((elt) => {
  elt.addEventListener("click", function () {
    document.getElementById("myTopnav").classList.toggle("responsive");
    burgerIcons.forEach((item) => {
      item.classList.toggle("active");
    });
  });
});

// DOM Elements

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".btn-signup");
const formData = document.querySelectorAll(".formData");
const closeIcon = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
closeIcon.addEventListener("click", closeModale);

function closeModale() {
  modalbg.style.display = "none";
}
