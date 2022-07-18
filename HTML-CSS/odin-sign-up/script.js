const inputs = Array.from(document.getElementsByTagName('input'));
console.log(inputs);

for (input of inputs) {
  input.addEventListener('change', (e) => fill(e));
}

function fill(e) {

  e.target.classList.add('filled');
  console.log(element.name + ' filled');
}