const addBtn = document.getElementById('showDialog');
const dialog = document.getElementById("dialog");
const submit = document.getElementById('submit');

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

addBtn.addEventListener('click', () => {
    dialog.showModal();
    console.log('help');
});

submit.addEventListener('click', () => {
    addBook();
    console.log(myLibrary.length);
    updateDisplay();
    document.getElementById('bookInfo').reset();
});

function addBook() {
    console.log("button has been clicked");
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    if (document.getElementById('readStatus').checked) {
        read = 'yes';
    } else {
        read = 'no';
    }
    id = crypto.randomUUID();
    const book = new Book(title, author, pages, read, id);
    myLibrary.push(book);
    dialog.close();
}

function updateDisplay() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    myLibrary.forEach(obj => {
        const bookContainer = document.createElement('div');
        bookContainer.id = obj.id;
        bookContainer.classList.add('book');
        outputDiv.appendChild(bookContainer);

        const title = document.createElement('p');
        title.className = 'title';
        const author = document.createElement('p');
        author.className = 'author';
        const pages = document.createElement('p');
        pages.className = 'pages';
        const read = document.createElement('p');
        read.className = 'read';
        const buttonDelete = document.createElement('button');
        buttonDelete.className = 'dialogBtn';
        const buttonRead = document.createElement('button');
        buttonRead.className = 'dialogBtn';

        title.textContent = obj.title;
        author.textContent = 'By: ' + obj.author;
        pages.textContent = obj.pages + ' pages';
        read.textContent = obj.read;


        buttonDelete.textContent = 'Remove Book';
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


