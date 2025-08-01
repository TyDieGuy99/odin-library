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

Book.prototype.readStatus = function() {
    if (this.read == 'yes') {
        this.read = 'no';
    } else {
        this.read = 'yes';
    }
}

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
        const bookContainer = document.createElement('div');
        bookContainer.id = obj.id;
        outputDiv.appendChild(bookContainer);

        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');
        const buttonDelete = document.createElement('button');
        const buttonRead = document.createElement('button');

        title.textContent = obj.title;
        author.textContent = obj.author;
        pages.textContent = obj.pages;
        read.textContent = obj.read;


        buttonDelete.textContent = 'delete the book';
        buttonDelete.onclick = function() {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == bookContainer.id) {
                    myLibrary.splice(i, 1);
                    bookContainer.remove();
                    return;
                }
            } 
        };

        buttonRead.textContent = 'Read Status'
        buttonRead.onclick = function() {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == bookContainer.id) {
                    myLibrary[i].readStatus();
                    const count = bookContainer.children;
                    count[3].textContent = myLibrary[i].read;
                }
            }
        };

        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);
        bookContainer.appendChild(read);
        bookContainer.appendChild(buttonDelete);
        bookContainer.appendChild(buttonRead);
    })
}



