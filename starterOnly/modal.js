//-----------------------------------------------------
// DOM Elements

const $modalbg = document.querySelector(".bground");
const $modalBtn = document.querySelectorAll(".btn-signup");
const $formData = document.querySelectorAll(".formData");
const $closeIcon = document.querySelector(".close");
const $form = document.querySelector("form");
const $burgerIcons = document.querySelectorAll(".nav-icon");
const $radioButtons = document.querySelectorAll("input[name='location']");
const $submitBtn = document.getElementById("submitBtn");

//-----------------------------------------------------
// launch or close burger menu

$burgerIcons.forEach((elt) => {
  elt.addEventListener("click", function () {
    document.getElementById("myTopnav").classList.toggle("responsive");
    $burgerIcons.forEach((item) => {
      item.classList.toggle("active");
    });
  });
});

//-----------------------------------------------------
// launch modal form

const launchModal = () => {
  $modalbg.style.display = "block";
};

//-----------------------------------------------------
// Close modal form
const closeModale = () => {
  $modalbg.style.display = "none";
};
$modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
$closeIcon.addEventListener("click", closeModale);

//-----------------------------------------------------
// RegExp
const emailRegEx = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const nameRegEx = new RegExp(/^[a-zA-ZÀ-ÖØ-öø-ÿ-' ]{2,}$/i);
const tournamentRegEx = new RegExp(/^(0|[1-9][0-9]?)$/);
const birthdateRegEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

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
};

$radioButtons.forEach((btn) => {
  btn.addEventListener("change", isLocationChecked);
});

//-----------------------------------------------------
// AddEventListener list
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
$form.birthdate.addEventListener("change", function () {
  InputErrorHandler(this, birthdateRegEx);
});
$form.quantity.addEventListener("change", function () {
  InputErrorHandler(this, tournamentRegEx);
});

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
// Submit verification
//-----------------------------------------------------

$form.addEventListener("submit", function (e) {
  $submitBtn.disabled = true;
  // e.preventDefault();
});
$submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  InputErrorHandler($form.first, nameRegEx);
  InputErrorHandler($form.last, nameRegEx);
  InputErrorHandler($form.email, emailRegEx);
  InputErrorHandler($form.birthdate, birthdateRegEx);
  InputErrorHandler($form.quantity, tournamentRegEx);
  isCheckbox1Checked();
  if (
    InputErrorHandler($form.first, nameRegEx) &&
    InputErrorHandler($form.last, nameRegEx) &&
    InputErrorHandler($form.email, emailRegEx) &&
    InputErrorHandler($form.birthdate, birthdateRegEx) &&
    InputErrorHandler($form.quantity, tournamentRegEx) &&
    isCheckbox1Checked()
  ) {
    $form.reset();
    closeModale();
    console.log("OK");
  }
});
