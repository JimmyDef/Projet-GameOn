//-----------------------------------------------------
// DOM Elements
const $burgerIcons = document.querySelectorAll(".nav-icon");
const $modal = document.getElementById("modal");
const $closeForm = document.getElementById("close-form");
const $modalBtn = document.querySelectorAll(".btn-signup");
const $modalThanking = document.getElementById("thanking");
const $closeThanking = document.querySelectorAll(".close-thanking");
const $form = document.querySelector("form");
const $formData = document.querySelectorAll(".formData");
const $radioButtons = document.querySelectorAll("input[name='location']");
const $submitBtn = document.getElementById("submitBtn");
const $body = document.querySelector("body");

//-----------------------------------------------------
// Display burger menu

$burgerIcons.forEach((elt) => {
  elt.addEventListener("click", function () {
    document.getElementById("myTopnav").classList.toggle("responsive");
    $burgerIcons.forEach((item) => {
      item.classList.toggle("active");
    });
  });
});

//-----------------------------------------------------
// display modal form

const launchModal = () => {
  $modal.style.display = "block";
  $body.style.overflow = "hidden";
};
const closeModale = () => {
  $modal.style.display = "none";
  $body.style.overflow = "scroll";
};

$modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
$closeForm.addEventListener("click", closeModale);

//-----------------------------------------------------
// display thanking modal
const launchThanking = () => {
  $modalThanking.style.display = "block";
};
const closeThanking = () => {
  $modalThanking.style.display = "none";
};
$closeThanking.forEach((btn) => btn.addEventListener("click", closeThanking));

//-----------------------------------------------------
// RegExp
const emailRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const nameRegEx = new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]{2,}$/i);
const tournamentRegEx = new RegExp(/^(0|[1-9][0-9]?)$/);
const birthdateRegEx = new RegExp(
  /^(19[0-9]{2}|20[0-1][0-9]|2020)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
);

//-----------------------------------------------------
// Function display error msg
//-----------------------------------------------------
const InputErrorHandler = (input, regEx) => {
  const $formData = input.closest("div.formData");
  if (regEx.test(input.value)) {
    $formData.setAttribute("data-error-visible", "");
    return true;
  }
  $formData.setAttribute("data-error-visible", "true");
};

//-----------------------------------------------------
// Function verification age over 13
//-----------------------------------------------------

function isOver13(birthDate) {
  const todaysDate = new Date();
  const yearNow = todaysDate.getFullYear();
  const monthNow = todaysDate.getMonth() + 1;
  const dayNow = todaysDate.getDate();

  const [birthYear, birthMonth, birthDay] = birthDate.split("-").map(Number);

  let age = yearNow - birthYear;

  // Has the person's birthday already passed this year?
  if (monthNow < birthMonth || (monthNow === birthMonth && dayNow < birthDay)) {
    age--;
  }
  // is the person over 13 ? true / false
  return age >= 13;
}
//-----------------------------------------------------
// Function to check  birthdate
//-----------------------------------------------------
const isBirthdateValid = () => {
  const $inputBirthdate = $form.birthdate;
  const $formData = $inputBirthdate.closest("div.formData");
  if (
    birthdateRegEx.test($inputBirthdate.value) &&
    isOver13($inputBirthdate.value)
  ) {
    $formData.setAttribute("data-error-visible", "");
    return true;
  }
  $formData.setAttribute("data-error-visible", "true");
};

//-----------------------------------------------------
// Function to check radio button
//-----------------------------------------------------
let tournamentLocation;

const isLocationChecked = () => {
  for (const button of $radioButtons) {
    const $formData = button.closest("div.formData");
    if (button.checked) {
      tournamentLocation = button.value;

      $formData.setAttribute("data-error-visible", "");
      break;
    }
    $formData.setAttribute("data-error-visible", "true");
  }

  return tournamentLocation !== undefined;
};

//-----------------------------------------------------
// Function to check *Conditions* checkbox
//-----------------------------------------------------

const isCheckbox1Checked = () => {
  const $formData = $form.checkbox1.closest("div.formData");
  if ($form.checkbox1.checked) {
    $formData.setAttribute("data-error-visible", "");
    return true;
  }
  $formData.setAttribute("data-error-visible", "true");
};

//-----------------------------------------------------
// AddEventListener listener after focus lost
//-----------------------------------------------------
$form.first.addEventListener("change", function () {
  InputErrorHandler(this, nameRegEx);
});
$form.last.addEventListener("change", function () {
  InputErrorHandler(this, nameRegEx);
});
$form.email.addEventListener("change", function () {
  InputErrorHandler(this, emailRegEx);
});
$form.quantity.addEventListener("change", function () {
  InputErrorHandler(this, tournamentRegEx);
});

//-----------------------------------------------------
// Submit verifications
//-----------------------------------------------------

$form.addEventListener("submit", function (e) {
  $submitBtn.disabled = true;
});
$submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  InputErrorHandler($form.first, nameRegEx);
  InputErrorHandler($form.last, nameRegEx);
  InputErrorHandler($form.email, emailRegEx);
  isBirthdateValid();
  InputErrorHandler($form.quantity, tournamentRegEx);
  isCheckbox1Checked();
  isLocationChecked();
  if (
    InputErrorHandler($form.first, nameRegEx) &&
    InputErrorHandler($form.last, nameRegEx) &&
    InputErrorHandler($form.email, emailRegEx) &&
    isBirthdateValid() &&
    InputErrorHandler($form.quantity, tournamentRegEx) &&
    isCheckbox1Checked() &&
    isLocationChecked()
  ) {
    $form.reset();
    tournamentLocation = undefined;
    closeModale();
    launchThanking();
  }
});
