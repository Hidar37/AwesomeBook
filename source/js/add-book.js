/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-shorthand */
/* eslint-disable indent */

const booksContainer = document.getElementById('book-list');
const formContainer = document.getElementById('form');
const bookList = [];
const title = document.getElementById('title');
const author = document.getElementById('author');
// Date
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateDisplay = document.getElementById('date');
// nav link
const bookShow = document.getElementById('book-show');
const bookNew = document.getElementById('book-new');
const showContact = document.getElementById('show-contact');

class BookClass {
    constructor(title, author) {
        this.bookList = bookList;
        this.title = title;
        this.author = author;
    }

    // Remove button method
    removeButton(parentElementNode, btnIndex, rmvBtn, bookData) {
        rmvBtn.addEventListener('click', () => {
            bookData.splice(btnIndex, 1);
            localStorage.setItem('StorageBooks', JSON.stringify(bookData));
            parentElementNode.remove();
            window.location.reload();
        });
    }

    displayBooks() {
        // Feach all Books Data from localStorge
        const bookData = JSON.parse(localStorage.getItem('StorageBooks'));
        bookData.forEach((item) => {
            // Creating Eelments using JS
            const parentNode = document.createElement('div');
            parentNode.className = 'book-container';
            const pTag = document.createElement('p');
            pTag.appendChild(document.createTextNode(`${item.bookTitle} By ${item.bookAuthor}`));
            const removeBtn = document.createElement('button');
            const removeBtnIndex = bookData.indexOf(item);
            removeBtn.setAttribute('class', 'remove');
            parentNode.setAttribute('id', 'book-info');
            pTag.setAttribute('class', 'p-tag');
            removeBtn.setAttribute('class', 'close-btn');
            removeBtn.appendChild(document.createTextNode('Remove'));

            this.removeButton(parentNode, removeBtnIndex, removeBtn, bookData);
            parentNode.append(pTag, removeBtn);
            booksContainer.append(parentNode);
        });
    }

    // Add element method
    add() {
        const bookTitle = this.title.value;
        const bookAuthor = this.author.value;
        const bookObj = {
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
        };

        this.bookList.push(bookObj);
        localStorage.setItem('StorageBooks', JSON.stringify(this.bookList));
        booksContainer.innerText = '';
        this.displayBooks();
        this.title.value = '';
        this.author.value = '';
    }
}

function showDate() {
    const dateObj = new Date();
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDay();
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const secnod = dateObj.getSeconds();
    let amPM = null;
    if (hour >= 12) {
        amPM = 'PM';
    } else {
        amPM = 'AM';
    }
    dateDisplay.innerText = `${month} ${day}th ${year}\\ ${hour}:${minutes}:${secnod}${amPM}`;
}

const btnMethod = new BookClass(title, author);

formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    btnMethod.add();
});

if (localStorage.getItem('StorageBooks') !== null) {
    btnMethod.displayBooks();
} else {
    localStorage.setItem('StorageBooks', JSON.stringify(btnMethod.bookList));
}

setInterval(showDate, 1000);
// Hide and show Pages
// window.addEventListener('load', (event) => {
//   console.log('page is fully loaded');
// });
document.getElementById('new-book').style.display = 'none';
document.getElementById('contact').style.display = 'none';
// showbook
bookShow.addEventListener('click', (even) => {
    even.preventDefault();
    bookShow.style.display = 'block';
    bookNew.style.display = 'none';
    showContact.style.display = 'none';
});
// add Book
bookNew.addEventListener('click', (even) => {
    even.preventDefault();
    bookShow.style.display = 'none';
    bookNew.style.display = 'block';
    showContact.style.display = 'none';
});
// Contact
showContact.addEventListener('click', (even) => {
    even.preventDefault();
    bookNew.style.display = 'none';
    bookShow.style.display = 'none';
    showContact.style.display = 'block';
});