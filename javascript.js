const myLibrary = [];

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id
}

function addBook() {
    console.log("button has been clicked");
    title = prompt('Title?');
    author = prompt('Author?');
    pages = prompt('How many pages?');
    read = true;
    id = crypto.randomUUID();
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    console.log(myLibrary.length);
    updateDisplay();
}

function updateDisplay() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    myLibrary.forEach(obj => {
        const p = document.createElement('p');
        p.textContent = Object.values(obj);
        outputDiv.appendChild(p);
    })
}

