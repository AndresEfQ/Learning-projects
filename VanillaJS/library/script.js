const grid = document.querySelector('.grid');
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
  let newBook = new Book(title.value, author.value, language.value, pages.value, isRead.checked);
  newBook.render();
  hideOverlay();
  title.value = ''
  author.value = ''
  language.value = ''
  pages.value = ''
  isRead.checked = false
});

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
    thisBook.classList.add('book');

    const bookInner = document.createElement('div');
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
    read.addEventListener('click', this.toggleRead);
    controls.appendChild(read);
    
    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.addEventListener('click', this.removeBook);
    controls.appendChild(remove);
    
    bookFront.appendChild(controls);
    bookInner.appendChild(bookFront);
    
    const bookBack = document.createElement('div');
    bookBack.classList.add('book-back');
    
    const text = document.createElement('h3');
    text.innerText = `Are you sure you want to remove ${this.title} by ${this.author}`;
    bookBack.appendChild(text);
    
    const confirmRemove = document.createElement('button');
    confirmRemove.innerText = 'Remove';
    bookBack.appendChild(confirmRemove);
    
    bookInner.appendChild(bookBack);
    thisBook.appendChild(bookInner);
    grid.insertBefore(thisBook, openAddBook);
  }
  
  toggleRead = function() {
    console.log(this.innerText);
    if (this.innerText == 'Read') {
      this.classList.remove('read');
      this.innerText = 'Not read';
      console.log('enters here');
      return;
    }
    if (this.innerText == 'Not read'){
      this.classList.add('read');
      this.innerText = 'Read';
      return;
    }
  }
  
  removeBook = function() {
    console.log(this.parentNode.parentNode.parentNode.parentNode)
    /* grid.removeChild(this.parentNode.parentNode); */
    this.parentNode.parentNode.parentNode.parentNode.classList.add('book-flipped');
  }
  
}