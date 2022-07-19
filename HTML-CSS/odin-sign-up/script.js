const inputs = Array.from(document.getElementsByTagName('input'));
console.log(inputs);

const errors = Array.from(document.querySelectorAll('div span:first-child'));

const form = document.querySelector('form');
const pwd = document.getElementById('pwd');
const confirmPwd = document.getElementById('confirm');
const button = document.querySelector('button');

form.addEventListener('submit', (e) => {
  if (!inputs.every(element => element.validity.valid)) {
    e.preventDefault();
  }
  console.log('submited');
})

button.addEventListener('click', () => {
  for (input of inputs) {
    if (input.validity.valueMissing) {
      input.classList.add('filled');
      input.nextElementSibling.classList.add('visible');
    }
  }
});

for (input of inputs) {
  input.addEventListener('change', (e) => {
    e.target.classList.add('filled');

    if (e.target.validity.valueMissing) {
      e.target.nextElementSibling.classList.add('visible');
    }
  });
}

for (input of inputs) {
  input.addEventListener('change', (e) => {

    if (e.target.validity.patternMismatch || e.target.validity.typeMismatch) {
      e.target.nextElementSibling.nextElementSibling.classList.add('visible');
    }
  });
}

for (input of inputs) {
  input.addEventListener('input', (e) => {
    if (!e.target.validity.valueMissing) {
      e.target.nextElementSibling.classList.remove('visible');
    }
  });
}

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