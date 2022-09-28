/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-shorthand */
/* eslint-disable indent */

const booksContainer = document.getElementById('book-list');

const formContainer = document.getElementById('form');

const bookList = [];
const title = document.getElementById('title');
const author = document.getElementById('author');

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

//Date 



const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateDisplay = document.getElementById('date');


setInterval(function () {
	const dateObj = new Date();
	dateDisplay.innerText = `${months[dateObj.getMonth()]} ${dateObj.getDay()}th ${dateObj.getFullYear()}\ ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
}, 1000);
