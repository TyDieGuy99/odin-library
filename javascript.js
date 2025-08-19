const addBtn = document.getElementById('showDialog');
const dialog = document.getElementById("dialog");
const submit = document.getElementById('submit');
const backdrop = document.getElementById('dialogBackdrop');

const pageSort = document.getElementById('pageSortBtn');
const titleSort = document.getElementById('titleSortBtn');
const authorSort = document.getElementById('authorSortBtn');

const myLibrary = [];

//0 means its being sorted from least to most pages or from A-Z, 1 being most to least pages or Z-A
let pageOrder = 0;
let titleOrder = 0;
let authorOrder = 0;
let order = 1; //adding book increases value by 1 before order++, set to 1 for 2 pre-added books in library

function Book(title, author, pages, read, id, order) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.order = order;
}

Book.prototype.readStatus = function() {
    if (this.read == 'READ') {
        this.read = 'NEW';
    } else {
        this.read = 'READ';
    }
}

window.onload = templateBooks();

function templateBooks() {
    console.log('function works');
    const book = new Book('Belladonna', 'Adalyn Grace', 408, 'NEW', crypto.randomUUID(), 0);
    myLibrary.push(book);
    const book2 = new Book('Harry Potter and the Prisoner of Azkaban', 'J. K. Rowling', 435, 'READ', crypto.randomUUID(), 1);
    myLibrary.push(book2);
    updateDisplay();
};

function testFunction() {
    console.log('change order of books by page count');
    if (pageOrder == 0) {
        myLibrary.sort(function(a, b){return a.pages - b.pages});
        pageOrder = 1;
    } else {
        myLibrary.sort(function(a, b){return b.pages - a.pages});
        pageOrder = 0;
    }
    updateDisplay();
}
function testFunction2() {
    console.log('change order of books by title');
    myLibrary.sort(function(a, b){
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleOrder == 0) {
            titleSort.textContent = 'Sort by Title (Z-A)';
            titleOrder = 1;
            if (titleA < titleB) {
                return -1; // a before b
            }
            if (titleA > titleB) {
                return 1; // b before a
            }
            return 0; //equal 
        } else {
            titleSort.textContent = 'Sort by Title (A-Z)';
            titleOrder = 0;
            if (titleA < titleB) {
                return 1; // b before a
            }
            if (titleA > titleB) {
                return -1; // a before b
            }
            return 0; //equal
        }
        
    });
    updateDisplay();
}
function testFunction3() {
    console.log('change order of books by author');
    myLibrary.sort(function(a, b){
        const authorA = a.author.toUpperCase();
        const authorB = b.author.toUpperCase();
        if (authorOrder == 0) {
            authorSort.textContent = 'Sort by Author (Z-A)';
            authorOrder = 1;
            if (authorA < authorB) {
                return -1;
            }
            if (authorA > authorB) {
                return 1;
            }
            return 0;
        } else {
            authorSort.textContent = 'Sort by Author (A-Z)';
            authorOrder = 0;
            if (authorA < authorB) {
                return 1;
            }
            if (authorA > authorB) {
                return -1;
            }
            return 0;
        }
    });
    updateDisplay();
}
function defaultOrder() {
    console.log('this is order of books by when they were added');
    myLibrary.sort(function(a, b){return a.order - b.order});
    pageOrder = 0;
    titleOrder = 0;
    authorOrder = 0;
    updateDisplay();
    pageSort.textContent = 'Sort by Page Count &uarr;';
    titleSort.textContent = 'Sort by Title (A-Z)';
    authorSort.textContent = 'Sort by Author (A-Z)';
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
    } else if (document.getElementById('pages').value == "" || document.getElementById('pages').value < 1 || document.getElementById('pages').value > 150000) {
        return false;
    }
    addBook();
    console.log(myLibrary.length);
    updateDisplay();
    clearLabels();
});

function addBook() {
    console.log("Book has been added");
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;
    if (document.getElementById('readStatus').checked) {
        read = 'READ';
    } else {
        read = 'NEW';
    }
    id = crypto.randomUUID();
    order++;
    const book = new Book(title, author, pages, read, id, order);
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
        const titleHeight = title.scrollHeight;
        if (titleHeight > titleBoxHeight) {
            const scrollDistance = titleBoxHeight - titleHeight;
            bookContainer.style.setProperty('--title-scroll', `${scrollDistance}px`);
        } else {
            bookContainer.style.setProperty('--title-scroll', '0px');
        }
    });
}