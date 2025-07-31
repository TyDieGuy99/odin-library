document.getElementById('bookInfo').addEventListener('submit', function(event) {
    event.preventDefault();
    addBook();
    console.log(myLibrary.length);
    updateDisplay();
    document.getElementById('bookInfo').reset();
});

const myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id
}

// const book1 = new Book('Harry Potter', 'J.K. Rowling', 495, true, crypto.randomUUID());
// const book2 = new Book('Dune', 'Some Guy', 1295, false, crypto.randomUUID());
// const book3 = new Book('Green Eggs and Ham', 'Doctor Seus', 24, true, crypto.randomUUID());
// const book4 = new Book('Goosebumps', 'R.L. Stein', 89, true, crypto.randomUUID());
// const book5 = new Book('Game of Thrones', 'Forgot Name', 854, false, crypto.randomUUID());
// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);
// myLibrary.push(book4);
// myLibrary.push(book5);

function addBook() {
    console.log("button has been clicked");
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    if (document.getElementById('yes').checked) {
        read = 'yes';
    } else {
        read = 'no';
    }
    id = crypto.randomUUID();
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
}

function updateDisplay() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    myLibrary.forEach(obj => {
        const p = document.createElement('p');
        const button = document.createElement('button');
        p.textContent = Object.values(obj);
        button.textContent = 'delete the book';
        outputDiv.appendChild(p);
        outputDiv.appendChild(button);
    })
}

