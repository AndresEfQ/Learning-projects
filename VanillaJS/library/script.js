const grid = document.querySelector('.grid');
const openAddBook = document.querySelector('.add-book');
const addBook = document.querySelector('#add-new-book')
const hidden = document.querySelectorAll('.hidden');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const language = document.querySelector('#language');
const pages = document.querySelector('#pages');
const isRead = document.querySelector('#read');

addBook.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, language.value, pages.value, isRead.checked);
  title.value = ''
  author.value = ''
  language.value = ''
  pages.value = ''
  isRead.checked = false
  renderBooks();
});

let myLibrary = []

class Book {
  constructor(title, author, language, pages, isRead) {
    this.title = title;
    this.author = author; 
    this.language = language;
    this.pages = pages;
    this.isRead = isRead;
  }
  
  render = function() {
    const thisBook = document.createElement('div');
    thisBook.classList.add('book');
    thisBook.dataset.title = `${this.title}-book`;
    
    const bookInner = document.createElement('div');
    bookInner.tabIndex = '0';
    bookInner.dataset.title = `${this.title}-inner`;
    bookInner.addEventListener('blur', function() {this.parentNode.classList.remove('book-flipped')})
    bookInner.classList.add('book-inner');
    
    const bookFront = document.createElement('div');
    bookFront.classList.add('book-front');
    
    const title = document.createElement('h2');
    title.innerText = this.title;
    bookFront.appendChild(title);
    
    const author = document.createElement('p');
    author.innerText = `By: ${this.author}`;
    bookFront.appendChild(author);
    
    const language = document.createElement('p');
    language.innerText = `Language: ${this.language}`;
    bookFront.appendChild(language);
    
    const pages = document.createElement('p');
    pages.innerText = `${this.pages} pages`;
    bookFront.appendChild(pages);
    
    const controls = document.createElement('div');
    controls.classList.add('controls');
    
    const read = document.createElement('button');
    read.innerText = this.isRead ? 'Read' : 'Not read';
    read.classList = this.isRead ? 'read' : '';
    read.classList.add('button');
    read.dataset.title = `${this.title}`;
    read.addEventListener('click', this.toggleRead);
    controls.appendChild(read);
    
    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.classList.add('button');
    remove.dataset.title = `${this.title}`;
    remove.addEventListener('click', this.removeBook);
    controls.appendChild(remove);
    
    bookFront.appendChild(controls);
    bookInner.appendChild(bookFront);
    
    const bookBack = document.createElement('div');
    bookBack.classList.add('book-back');
    
    const text = document.createElement('h2');
    text.innerText = `Are you sure you want to remove ${this.title} by ${this.author}?`;
    bookBack.appendChild(text);
    
    const confirmRemove = document.createElement('button');
    confirmRemove.innerText = 'Remove';
    confirmRemove.classList.add('button');
    confirmRemove.dataset.title = `${this.title}`;
    confirmRemove.addEventListener('click', this.confirmRemove);
    bookBack.appendChild(confirmRemove);
    
    bookInner.appendChild(bookBack);
    thisBook.appendChild(bookInner);
    grid.appendChild(thisBook);
  }
  
  toggleRead = function() {
    const currentBook = myLibrary.find((book) => book.title == this.dataset.title);
    currentBook.isRead = currentBook.isRead ? false : true;
    renderBooks();
  }
  
  removeBook = function() {
    document.querySelector(`[data-title="${this.dataset.title}-book"]`).classList.add('book-flipped');
    document.querySelector(`[data-title="${this.dataset.title}-inner"]`).focus();
  }
  
  confirmRemove = function() {
    myLibrary = myLibrary.filter((book) => book.title != this.dataset.title);
    renderBooks();
  }
}

function addBookToLibrary(title, author, language, pages, isRead) {
  const newBook = new Book(title, author, language, pages, isRead)
  myLibrary.push(newBook);
}

function renderBooks() {
  grid.innerHTML = ''
  myLibrary.forEach((book) => book.render());
  grid.appendChild(openAddBook);
}

// Sample book
const sampleBook = new Book('Piense y hagase rico', 'Napleon Hill', 'Español', '263', false);

myLibrary.push(sampleBook);
renderBooks();