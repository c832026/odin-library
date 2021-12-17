let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
    this.isRead = (this.isRead === true) ? false : true;
}


function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

function appendCardsToContainer() {
    let book;
    // Generate book cards using the info of each books in myLibrary array
    for (let i = 0, length = myLibrary.length; i < length; i++) {
        book = myLibrary[i];
        const bookCard = document.createElement('div');

        for (const property in book) {
            const para = document.createElement('div');
            // Add toggle button for "Read" or "Unread"
            if (property === 'isRead') {
                const togglePara = document.createElement('div');
                const readToggleButton = document.createElement('button');
                if (book[property] === true) {
                    // Set button text to "Read" or "Unread" and setting seperate class for styling
                    readToggleButton.textContent = 'Read';
                    readToggleButton.classList.add('isRead');
                } else {
                    readToggleButton.textContent = 'Unread';
                    readToggleButton.classList.add('unRead');
                }

                readToggleButton.classList.add('isRead-button');
                togglePara.appendChild(readToggleButton);
                bookCard.appendChild(togglePara);
            // Add title and author in the book card
            } else if (book.hasOwnProperty(property)) {
                para.textContent = `${property}: ${book[property]} `;
                bookCard.appendChild(para);
            }
        }
        // Add remove button in each book card
        const buttonPara = document.createElement('div');
        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.classList.add('remove-button');
        buttonPara.appendChild(button);
        bookCard.appendChild(buttonPara);
        
        // Styling card
        bookCard.classList.add('bookCard');

        // Give card an index
        bookCard.dataset.index = i;

        // Attach card to the container
        CONTAINER.appendChild(bookCard);
    }   
}

function addBook(event) {
    hideForm(event);
    // Using all the input to form a book object
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
    // Add the book object to Mylibrary
    addBookToLibrary(title.value, author.value, pages.value, (isRead === 'true'));
    
    // Re-render the library container
    renderLibrary();

    // Clean the input fields of the form
    title.value = '';
    author.value = '';
    pages.value = '';
}

function showForm() {
    ADD_BOOK_CONTAINER.style.display = 'block';
    const inputTitle = document.querySelector('#input-title');
    inputTitle.focus();
}

function hideForm(event) {
    if (event.target === ADD_BOOK_CONTAINER || event.target === ADD_BOOK_SUBMIT) {
        ADD_BOOK_CONTAINER.style.display = 'none';
    }
}

function addReadToggle() {
    // Set click listeners on every isRead buttons
    let isReadButtons = document.querySelectorAll('.isRead-button');
    isReadButtons.forEach(button => {
        button.addEventListener('click', event => {
            // Toggle the text to "Read" or "Unread"
            const isReadButton = event.target;
            isReadButton.textContent = (isReadButton.textContent === 'Read' ? 'Unread': 'Read');
            // Toggle the color
            isReadButton.classList.toggle('isRead');
            isReadButton.classList.toggle('unRead');
            // Toggle the isRead status in book object
            const index = isReadButton.parentNode.parentNode.dataset.index;
            myLibrary[index].toggleRead();
        });
    });
}

function addRemoveListeners() {
    // Set click-listeners on every remove-button
    const remove_buttons = document.querySelectorAll('button.remove-button');
    remove_buttons.forEach(button => {
        button.addEventListener('click', event => {
            // Get the index of the clicked node
            const triggeredCard = event.target.parentNode.parentNode;
            const index = triggeredCard.dataset.index;
            // Delete the book from Mylibrary
            myLibrary.splice(index, 1);
            // Re-render the library container
            renderLibrary();
        })
    })
}

function renderLibrary() {
    CONTAINER.innerHTML = '';
    appendCardsToContainer();
    addReadToggle();
    addRemoveListeners();
}


const CONTAINER = document.querySelector('#flex-container');
const ADD_BOOK_CONTAINER = document.querySelector('#book-form-container');
const ADD_BUTTON = document.querySelector('.button-div>button');
const ADD_BOOK_SUBMIT = document.querySelector('#addBookSubmit');

// Show the form after click the 'New Book' button
ADD_BUTTON.addEventListener('click', showForm);
// Add the book the library after clicked the submit button
ADD_BOOK_SUBMIT.addEventListener('click', addBook);
// Hide the form after clicked elsewhere but the form
ADD_BOOK_CONTAINER.addEventListener('click', hideForm);

// Default books for demonstration
addBookToLibrary(`Harry Potter`, 'J. K. Rowling', '223', true);
addBookToLibrary(`Game of Thrones`, 'George Martin', '864', false);

// Create and append book cards to container using the book objects in Mylibrary
renderLibrary();