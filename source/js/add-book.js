/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
const bookContainer = document.getElementById('book-list');

const formContainer = document.getElementById('form');

const bookList = [];
const title = document.getElementById('title');
const author = document.getElementById('author');

class BookInit {
    constructor(bookTitle, bookAuthor) {
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
    }
}

class BookFunctionality {
    constructor() {
        this.bookList = bookList;
    }

    addBook() {
        // const bookTitle = title.value;
        // const bookAuthor = author.value;
        // const bookObj = {
        //     bookTitle: bookTitle,
        //     bookAuthor: bookAuthor,
        // };
        const bookClassObj = new BookInit(title.value, author.value);
        this.bookList.push(bookClassObj);
        localStorage.setItem('StorageBooks', JSON.stringify(this.bookList));
        bookContainer.innerText = '';
        this.displayBooks();
        bookClassObj.bookTitle.value = '';
        bookClassObj.bookAuthor.value = '';
    }

    // Remove Button
    removeButton(buttonNode, bookArray, btnIndex, parentElementNode) {
        this.buttonNode.addEventListener('click', () => {
            this.bookArray.splice(this.btnIndex, 1);
            localStorage.setItem('StorageBooks', JSON.stringify(this.bookArray));
            this.parentElementNode.remove();
            window.location.reload();
        });
    }

    // Dipslay Books
    displayBooks() {
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
            removeButton(removeBtn, bookData, removeBtnIndex, parentNode);
            parentNode.append(pTag, removeBtn, hrTag);
            bookContainer.append(parentNode);
        });
    }
}

// =========================================
if (localStorage.getItem('StorageBooks') !== null) {
    displayBooks();
} else {
    localStorage.setItem('StorageBooks', JSON.stringify(bookList));
}

formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
});
