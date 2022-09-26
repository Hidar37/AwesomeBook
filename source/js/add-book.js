const bookContainer = document.getElementById('book-list');
const formContainer = document.getElementById('form');

const bookList = [];
const title = document.getElementById('title');
const author = document.getElementById('author');

formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookObj = {
        bookTitle: bookTitle,
        bookAuthor: bookAuthor
    };
    bookList.push(bookObj);
    localStorage.setItem('StorageBooks', JSON.stringify(bookList));
    title.value = '';
    author.value = '';
})