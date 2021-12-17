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
// Test, add objects to the array
for (let i = 0; i < 30; i++) {
    addBookToLibrary('Harry Potter', 'J.K Rolin', '300', true);
}

function showForm(event) {

}


const CONTAINER = document.querySelector('#flex-container');
const ADD_BUTTON = document.querySelector('.button-div>button');

// Create cards using the info from every book objects
for (let i = 0, length = myLibrary.length; i < length; i++) {
    const bookCard = document.createElement('div');
    const book = myLibrary[i];
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

ADD_BUTTON.addEventListener('click', showForm);