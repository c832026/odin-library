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

function appendCardsToContainer() {
    let book;
    for (let i = 0, length = myLibrary.length; i < length; i++) {
        book = myLibrary[i];
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

        // Give cards an index
        bookCard.dataset.index = i;

        // Attach card to the container
        CONTAINER.appendChild(bookCard);
    }   
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
    
    // Re-render the library
    CONTAINER.innerHTML = '';
    appendCardsToContainer();
    addRemoveListeners();

    // Clean the input field in the form
    title.value = '';
    author.value = '';
    pages.value = '';
}

function showForm() {
    ADD_BOOK_CONTAINER.style.display = 'block';
}

function hideForm(event) {
    if (event.target === ADD_BOOK_CONTAINER || event.target === ADD_BOOK_SUBMIT) {
        ADD_BOOK_CONTAINER.style.display = 'none';
    }
}

function addRemoveListeners() {
    const remove_buttons = document.querySelectorAll('button.remove-button');
    remove_buttons.forEach(button => {
        button.addEventListener('click', event => {
            const triggeredCard = event.target.parentNode.parentNode;
            const index = triggeredCard.dataset.index;
            // Delete the book from the library
            myLibrary.splice(index, 1);
            // Re-render the library
            CONTAINER.innerHTML = '';
            appendCardsToContainer();
            addRemoveListeners();
        })
    })
}


const CONTAINER = document.querySelector('#flex-container');
const ADD_BOOK_CONTAINER = document.querySelector('#book-form-container');
const ADD_BUTTON = document.querySelector('.button-div>button');
const ADD_BOOK_SUBMIT = document.querySelector('#addBookSubmit');

// Test, add book objects to the array
for (let i = 0; i < 30; i++) {
    addBookToLibrary(`Book${i}`, 'J.K Rolin', '300', true);
}

// Create and append cards to container using the book in library
appendCardsToContainer();
addRemoveListeners();

ADD_BUTTON.addEventListener('click', showForm);
ADD_BOOK_CONTAINER.addEventListener('click', hideForm);
ADD_BOOK_SUBMIT.addEventListener('click', addBook);