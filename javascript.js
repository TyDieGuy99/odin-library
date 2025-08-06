const addBtn = document.getElementById('showDialog');
const dialog = document.getElementById("dialog");
const submit = document.getElementById('submit');
const backdrop = document.getElementById('dialogBackdrop')

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
    backdrop.classList.add('open');
});

function closeDialog() {
    backdrop.classList.remove('open');
    clearLabels();
    dialog.close();
}

backdrop.addEventListener('click', function(e) {
    if (e.target === dialog) {
        closeDialog();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDialog();
    }
});

submit.addEventListener('click', () => {
    if (document.getElementById('title').value == "") {
        return false;
    } else if (document.getElementById('author').value == "") {
        return false;
    } else if (document.getElementById('pages').value == "") {
        return false;
    }
    addBook();
    console.log(myLibrary.length);
    updateDisplay();
    clearLabels();
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
    closeDialog();
}

function clearLabels() {
    document.getElementById('bookInfo').reset();
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


