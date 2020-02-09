const form = document.querySelector('#book-form');
const booklist = document.querySelector('#book-list');

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function({title, author, isbn}) {
    const list = document.querySelector('#book-list');
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${title}</td>
    <td>${author}</td>
    <td>${isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(tr);
}

UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
} 

UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    div.className =  `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 2000);
}

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

function formHandler(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const book = new Book(title, author, isbn);
    const ui = new UI();
    if (title === '' || author === '' || book === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlert('Book Added', 'success');
        ui.clearFields();
    }
   
}

function deleteBookHandler(e) {
    e.preventDefault();
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book deleted', 'success');
}

form.addEventListener('submit', formHandler);
booklist.addEventListener('click', deleteBookHandler);