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
    if (this.read == 'READ') {
        this.read = 'NEW';
    } else {
        this.read = 'READ';
    }
}

// document.body.addEventListener('keydown', templateBooks);

window.onload = templateBooks();

function templateBooks() {
    console.log('function works');
    const book = new Book('Belladonna', 'Adalyn Grace', 408, 'NEW', crypto.randomUUID());
    myLibrary.push(book);
    const book2 = new Book('Harry Potter and the Prisoner of Azkaban', 'J. K. Rowling', 435, 'READ', crypto.randomUUID());
    myLibrary.push(book2);
    updateDisplay();
};


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
    } else if (document.getElementById('pages').value == "" || document.getElementById('pages').value < 1 || document.getElementById('pages').value > 150000) {
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
        read = 'READ';
    } else {
        read = 'NEW';
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

        const titleBox = document.createElement('div');
        titleBox.className = 'titleBox';
        
        const title= document.createElement('p');
        title.className = 'title';

        const author = document.createElement('p');
        author.className = 'author';
        const pages = document.createElement('p');
        pages.className = 'pages';
        const read = document.createElement('p');
        read.className = 'readStatus';
        if (obj.read === 'READ') {
            read.classList.add('read');
            console.log('you have solved your problem');
        }
        const bookButtons = document.createElement('div');
        bookButtons.className = 'bookButtonsContainer';

        bookContainer.appendChild(read);
        bookContainer.appendChild(titleBox);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);  
        bookContainer.appendChild(bookButtons);

        const buttonRead = document.createElement('button');
        buttonRead.className = 'bookBtn';
        const buttonDelete = document.createElement('button');
        buttonDelete.className = 'bookBtn';
        buttonDelete.id = 'deleteBtn';

        title.textContent = obj.title;
        author.textContent = 'By: ' + obj.author;
        if (obj.pages > 1) {
            pages.textContent = obj.pages + ' pages';
        } else {
            pages.textContent = obj.pages + ' page';
        }
        
        read.textContent = obj.read;
        buttonRead.textContent = 'Read Status'
        buttonRead.onclick = function() {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == bookContainer.id) {
                    myLibrary[i].readStatus();
                    const count = bookContainer.children;
                    count[0].textContent = myLibrary[i].read;
                    count[0].classList.toggle('read');
                }
            }
        };

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

        bookButtons.appendChild(buttonRead);
        bookButtons.appendChild(buttonDelete);

        
        titleBox.appendChild(title);
        const titleBoxHeight = titleBox.offsetHeight;
        console.log(titleBox);
        console.log(title);
        const titleHeight = title.scrollHeight;
        if (titleHeight > titleBoxHeight) {
            const scrollDistance = titleBoxHeight - titleHeight;
            bookContainer.style.setProperty('--title-scroll', `${scrollDistance}px`);
        } else {
            bookContainer.style.setProperty('--title-scroll', '0px');
        }
    });
}