/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const bookContainer = document.getElementById('book-list');

const formContainer = document.getElementById('form');

const bookList = [];
const title = document.getElementById('title');
const author = document.getElementById('author');

// Remove Button
function removeButton(parentElementNode) {
    parentElementNode.remove();
    window.location.reload();
}

// Dipslay Books
function displayBooks() {
    // Feach all Books Data from localStorge
    const bookData = JSON.parse(localStorage.getItem('StorageBooks'));
    bookData.forEach((item) => {
        // Creating Eelments using JS
        const parentNode = document.createElement('div');
        const pTag = document.createElement('p');
        pTag.appendChild(document.createTextNode(`${item.bookTitle} By ${item.bookAuthor}`));
        const removeBtn = document.createElement('button');
        const hrTag = document.createElement('hr');
        const removeBtnIndex = bookData.indexOf(item);
        removeBtn.setAttribute('class', 'remove');
        removeBtn.appendChild(document.createTextNode('Remove'));
        // Remove Button Logic
        removeBtn.addEventListener('click', () => {
            bookData.splice(removeBtnIndex, 1);
            localStorage.setItem('StorageBooks', JSON.stringify(bookData));
            removeButton(parentNode);
        });
        parentNode.append(pTag, removeBtn, hrTag);
        bookContainer.append(parentNode);
    });
}

if (localStorage.getItem('StorageBooks') !== null) {
    displayBooks();
} else {
    localStorage.setItem('StorageBooks', JSON.stringify(bookList));
}

formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookObj = {
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
    };
    bookList.push(bookObj);
    localStorage.setItem('StorageBooks', JSON.stringify(bookList));
    bookContainer.innerText = '';
    displayBooks();
    title.value = '';
    author.value = '';
});