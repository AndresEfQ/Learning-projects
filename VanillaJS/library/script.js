const main = document.querySelector('main');
const openAddBook = document.querySelector('.add-book');
const addBook = document.querySelector('#add-new-book')
const inactive = document.querySelector('.inactive');
const hidden = document.querySelectorAll('.hidden');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const language = document.querySelector('#language');
const pages = document.querySelector('#pages');
const isRead = document.querySelector('#read');

function hideOverlay() {
  for (let element of hidden) {
    element.classList.add('hidden');
  }
}

openAddBook.addEventListener('click', () => {
  for (let element of hidden) {
    element.classList.remove('hidden');
  }
});

inactive.addEventListener('click', hideOverlay);

addBook.addEventListener('submit', (e) => {
  e.preventDefault();
/*   console.log(e.target) */
  let newBook = new Book(title.value, author.value, language.value, pages.value, isRead.checked);
/*   localStorage.setItem(title.value, JSON.stringify(newBook));
  library.push(newBook); */
  newBook.render();
  hideOverlay();
})

class Book {
  constructor(title, author, language, pages, isRead) {
    this.title = title;
    this.author = author; 
    this.language = language;
    this.pages = pages;
    this.isRead = isRead;
  }

  render = function() {
    console.log(this);
    const thisBook = document.createElement('div');
    thisBook.classList.add('Book');
    
    const title = document.createElement('h2');
    title.innerText = this.title;
    thisBook.appendChild(title);
    
    const author = document.createElement('p');
    author.innerText = `By: ${this.author}`;
    thisBook.appendChild(author);
    
    const language = document.createElement('p');
    language.innerText = `Language: ${this.language}`;
    thisBook.appendChild(language);
    
    const pages = document.createElement('p');
    pages.innerText = `${this.pages} pages`;
    thisBook.appendChild(pages);
    
    const controls = document.createElement('div');
    controls.classList.add('controls');
    
    const read = document.createElement('button');
    read.innerText = this.isRead ? 'Read' : 'Not read';
    read.addEventListener('click', this.toggleRead);
    controls.appendChild(read);
    
    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.addEventListener('click', this.removeBook);
    controls.appendChild(remove);
    
    thisBook.appendChild(controls);

    main.insertBefore(thisBook, openAddBook);
  }
  
  toggleRead = function() {
    console.log('change read status'); // TODO write function
  }
  
  removeBook = function() {
    console.log('Remove book'); // TODO write function
  }
  
}