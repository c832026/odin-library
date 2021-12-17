let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function appendCardToContainer(book) {
    const bookCard = document.createElement('div');
    for (const attribute in book) {
        const para = document.createElement('div');
        // add Read toggle button
        if (attribute === 'isRead') {
            const togglePara = document.createElement('div');
            const readToggleButton = document.createElement('button');
            if (book[attribute] === true) {
                readToggleButton.textContent = 'Read';
            } else {
                readToggleButton.textContent = 'Unread';
            }

            readToggleButton.classList.add('isRead-button');
            togglePara.appendChild(readToggleButton);
            bookCard.appendChild(togglePara);
        // Or add book title or author
        } else {
            para.textContent = `${attribute}: ${book[attribute]} `;
            bookCard.appendChild(para);
        }
    }
    // Add remove button on each book
    const buttonPara = document.createElement('div');
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.classList.add('remove-button');
    buttonPara.appendChild(button);
    bookCard.appendChild(buttonPara);
    
    // Styling cards
    bookCard.classList.add('bookCard');
    // Attach card to the container
    CONTAINER.appendChild(bookCard);
}

function addBook(event) {
    hideForm(event);
    // Have all the input to form a book object
    let title = document.querySelector('#input-title');
    let author = document.querySelector('#input-author');
    let pages = document.querySelector('#input-pages');
    let isRead;
    const isReadRadios = document.querySelectorAll('input[name="isRead"]');
    isReadRadios.forEach(radio => {
        if (radio.checked === true) {
            isRead = radio.value;
        }
    });
    // Add the book to library
    addBookToLibrary(title.value, author.value, pages.value, (isRead === 'true'));
    
    // Append the book to the container
    const newBook = myLibrary[myLibrary.length - 1];
    appendCardToContainer(newBook);

    // Refresh the input field in the form
    title.value = '';
    author.value = '';
    pages.value = '';
}


const CONTAINER = document.querySelector('#flex-container');
const ADD_BOOK_CONTAINER = document.querySelector('#book-form-container');
const ADD_BUTTON = document.querySelector('.button-div>button');
const ADD_BOOK_SUBMIT = document.querySelector('#addBookSubmit');

// Test, add book objects to the array
for (let i = 0; i < 30; i++) {
    addBookToLibrary('Harry Potter', 'J.K Rolin', '300', true);
}

function showForm() {
    ADD_BOOK_CONTAINER.style.display = 'block';
}

function hideForm(event) {
    if (event.target === ADD_BOOK_CONTAINER || event.target === ADD_BOOK_SUBMIT) {
        ADD_BOOK_CONTAINER.style.display = 'none';
    }
}

// Create and append cards to container using the book in library
for (let i = 0, length = myLibrary.length; i < length; i++) {
    const book = myLibrary[i];
    appendCardToContainer(book);
}

ADD_BUTTON.addEventListener('click', showForm);
ADD_BOOK_CONTAINER.addEventListener('click', hideForm);
ADD_BOOK_SUBMIT.addEventListener('click', addBook);