const dialog = document.getElementById("dialog");
const backdrop = document.getElementById('dialogBackdrop');
//if user presses ESQ or clicks outside of box close the dialog
backdrop.addEventListener('click', function(e) {
    if (e.target === dialog) {
        console.log(e.target);
        closeDialog();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDialog();
    }
});

//dialog related buttons
const addBtn = document.getElementById('showDialog');
const submitBtn = document.getElementById('submit');
const xBtns = [document.getElementById('closeBtn'), document.getElementById('cancelBtn')];
addBtn.addEventListener('click', addBook);
submitBtn.addEventListener('click', submitBook);
for (let i = 0; i < xBtns.length; i++) {
    xBtns[i].addEventListener('click', closeDialog);
}

//sort buttons
const defaultSortBtn = document.getElementById('defaultSortBtn');
const pageSortBtn = document.getElementById('pageSortBtn');
const titleSortBtn = document.getElementById('titleSortBtn');
const authorSortBtn = document.getElementById('authorSortBtn');
defaultSortBtn.addEventListener('click', defaultSort);
pageSortBtn.addEventListener('click', pageSort);
titleSortBtn.addEventListener('click', titleSort);
authorSortBtn.addEventListener('click', authorSort);

//true means its being sorted from least to most pages or from A-Z, false being most to least pages or Z-A
let pageOrder = true;
let titleOrder = true;
let authorOrder = true;
let order = 0; //adding book increases value by 1 before order++

const myLibrary = [];

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

//can be commented out if don't want manually added books
window.onload = templateBooks();
function templateBooks() {
    const book1 = new Book('Lord of the Rings: The Fellowship of the Ring', 'J. R. R. Tolkein', 423, 'NEW', crypto.randomUUID(), order++);
    myLibrary.push(book1);
    const book2 = new Book('Dune', 'Frank Herbert', 412, 'NEW', crypto.randomUUID(), order++);
    myLibrary.push(book2);
    const book3 = new Book('1984', 'George Orwell', 328, 'READ', crypto.randomUUID(), order++);
    myLibrary.push(book3);
    updateDisplay();
}

//functions go below here
function addBookToArray() {
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
    const book = new Book(title, author, pages, read, id, order++);
    myLibrary.push(book);
}

function pageSort() {
    console.log('change order of books by page count');
    pageSortBtn.classList.add('selectedSort');
    titleSortBtn.classList.remove('selectedSort');
    authorSortBtn.classList.remove('selectedSort');

    titleSortBtn.textContent = 'Title; (A-Z)';
    authorSortBtn.textContent = 'Author; (A-Z)';

    if (pageOrder == true) {
        pageSortBtn.textContent = 'Pages; Low to High';
        myLibrary.sort(function(a, b){
        return a.pages - b.pages});
    } else {
        pageSortBtn.textContent = 'Pages; High to Low';
        myLibrary.sort(function(a, b){
        return b.pages - a.pages});
    }
    pageOrder = !pageOrder;
    updateDisplay();
}

function titleSort() {
    console.log('change order of books by title');
    titleSortBtn.classList.add('selectedSort');
    pageSortBtn.classList.remove('selectedSort');
    authorSortBtn.classList.remove('selectedSort');

    pageSortBtn.textContent = 'Pages; Low to High';
    authorSortBtn.textContent = 'Author; (A-Z)';

    myLibrary.sort(function(a, b){
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleOrder == true) {
            titleSortBtn.textContent = 'Title; (A-Z)';
            if (titleA < titleB) {
                return -1; // a before b
            }
            if (titleA > titleB) {
                return 1; // b before a
            }
            return 0; //equal 
        } else {
            titleSortBtn.textContent = 'Title; (Z-A)';
            if (titleA < titleB) {
                return 1; // b before a
            }
            if (titleA > titleB) {
                return -1; // a before b
            }
            return 0; //equal
        }
    });
    titleOrder = !titleOrder;
    updateDisplay();
}

function authorSort() {
    console.log('change order of books by author');
    authorSortBtn.classList.add('selectedSort');
    pageSortBtn.classList.remove('selectedSort');
    titleSortBtn.classList.remove('selectedSort');

    pageSortBtn.textContent = 'Pages; Low to High';
    titleSortBtn.textContent = 'Title; (A-Z)';

    myLibrary.sort(function(a, b){
        const authorA = a.author.toUpperCase();
        const authorB = b.author.toUpperCase();
        if (authorOrder == true) {
            authorSortBtn.textContent = 'Author; (A-Z)';
            if (authorA < authorB) {
                return -1;
            }
            if (authorA > authorB) {
                return 1;
            }
            return 0;
        } else {
            authorSortBtn.textContent = 'Author; (Z-A)';
            
            if (authorA < authorB) {
                return 1;
            }
            if (authorA > authorB) {
                return -1;
            }
            return 0;
        }
    });
    authorOrder = !authorOrder;
    updateDisplay();
}

function defaultSort() {
    console.log('this is order of books by when they were added');
    myLibrary.sort(function(a, b){return a.order - b.order});
    updateDisplay();

    pageOrder = true;
    titleOrder = true;
    authorOrder = true;

    pageSortBtn.textContent = 'Pages; Low to High';
    titleSortBtn.textContent = 'Title; (A-Z)';
    authorSortBtn.textContent = 'Author; (A-Z)';

    pageSortBtn.classList.remove('selectedSort');
    titleSortBtn.classList.remove('selectedSort');
    authorSortBtn.classList.remove('selectedSort');
}

//pulls up dialog to put in book info
function addBook() {
    dialog.showModal();
    backdrop.classList.add('open');
}

function closeDialog() {
    dialog.close();
    backdrop.classList.remove('open');
    document.getElementById('bookInfo').reset();
}

//puts book into the array, check for valid inputs
function submitBook() {
    if (document.getElementById('title').value == "") {
        return false;
    } else if (document.getElementById('author').value == "") {
        return false;
    } else if (document.getElementById('pages').value == "" || document.getElementById('pages').value < 1 || document.getElementById('pages').value > 150000) {
        return false;
    }
    addBookToArray();
    console.log(myLibrary.length);
    updateDisplay();
    document.getElementById('bookInfo').reset();
    closeDialog();
    defaultOrder();
}

function updateDisplay() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = '';

    myLibrary.forEach(addedBook => {
        const bookContainer = document.createElement('div');
        bookContainer.id = addedBook.id;
        bookContainer.classList.add('book');
        libraryDiv.appendChild(bookContainer);
        
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
        if (addedBook.read === 'READ') {
            read.classList.add('read');
        }

        const bookButtons = document.createElement('div');
        bookButtons.className = 'bookButtonsContainer';

        bookContainer.appendChild(read);
        bookContainer.appendChild(titleBox);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);  
        bookContainer.appendChild(bookButtons);

        titleBox.appendChild(title);
        const titleBoxHeight = titleBox.offsetHeight;
        const titleHeight = title.scrollHeight;
        if (titleHeight > titleBoxHeight) {
            const scrollDistance = titleBoxHeight - titleHeight;
            bookContainer.style.setProperty('--title-scroll', `${scrollDistance}px`);
        } else {
            bookContainer.style.setProperty('--title-scroll', '0px');
        }

        const buttonRead = document.createElement('button');
        buttonRead.className = 'bookBtn';
        const buttonDelete = document.createElement('button');
        buttonDelete.className = 'bookBtn';
        buttonDelete.id = 'deleteBtn';

        title.textContent = addedBook.title;
        author.textContent = 'By: ' + addedBook.author;
        if (addedBook.pages > 1) {
            pages.textContent = addedBook.pages + ' pages';
        } else {
            pages.textContent = addedBook.pages + ' page';
        }
        
        read.textContent = addedBook.read;
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
    });
}