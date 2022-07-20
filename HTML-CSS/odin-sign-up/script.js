// DOM elements definitions

const inputs = Array.from(document.getElementsByTagName('input'));
console.log(inputs);

const errors = Array.from(document.querySelectorAll('div span:first-child'));

const form = document.querySelector('form');
const email = document.getElementById('mail');
const phone = document.getElementById('phone');
const pwd = document.getElementById('pwd');
const confirmPwd = document.getElementById('confirm');
const button = document.querySelector('button');

// Prevent submission when at least one invalid input. It's needed because of novalidate form

form.addEventListener('submit', (e) => {
  if (!inputs.every(element => element.validity.valid)) {
    e.preventDefault();
  }
})

// Show all error messages for empty inputs when the form is submited

button.addEventListener('click', () => {
  for (input of inputs) {
    if (input.validity.valueMissing) {
      input.classList.add('filled');
      input.nextElementSibling.classList.add('visible');
    }
  }
});

// Hides the error message when the input is filled (eager)

for (input of inputs) {
  input.addEventListener('input', (e) => {
    if (!e.target.validity.valueMissing) {
      e.target.nextElementSibling.classList.remove('visible');
    }
  });
}

// Shows error messages for email or phone pattern missmatch (lazy)

for (input of inputs) {
  input.addEventListener('change', (e) => {
    if (e.target.validity.patternMismatch || e.target.validity.typeMismatch) {
      e.target.nextElementSibling.nextElementSibling.classList.add('visible');
    }  
  });  
}

// Hides error messages for email and phone when the pattern coincides (eager)

email.addEventListener('input', (e) => {
  if (!e.target.validity.typeMismatch) {
    e.target.nextElementSibling.nextElementSibling.classList.remove('visible');
  }  
});  

phone.addEventListener('input', (e) => {
  if (!e.target.validity.patternMismatch) {
    e.target.nextElementSibling.nextElementSibling.classList.remove('visible');
  }  
});

// Checks if the password and password confirmation match. Lazy for password, eager for confirmation

confirmPwd.addEventListener('input', () => {
  if (confirmPwd.value) {

    if (pwd.value !== confirmPwd.value) {
      pwd.nextElementSibling.nextElementSibling.classList.add('visible');
    } 
    if (pwd.value === confirmPwd.value) {
      pwd.nextElementSibling.nextElementSibling.classList.remove('visible');
    }
  }
});

pwd.addEventListener('change', () => {
  if (confirmPwd.value) {

    if (pwd.value !== confirmPwd.value) {
      pwd.nextElementSibling.nextElementSibling.classList.add('visible');
    } 
    if (pwd.value === confirmPwd.value) {
      pwd.nextElementSibling.nextElementSibling.classList.remove('visible');
    }
  }
});