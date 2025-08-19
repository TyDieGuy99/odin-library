const addBtn = document.getElementById('showDialog');
const dialog = document.getElementById("dialog");
const submit = document.getElementById('submit');
const backdrop = document.getElementById('dialogBackdrop');

const pageSortBtn = document.getElementById('pageSortBtn');
const titleSortBtn = document.getElementById('titleSortBtn');
const authorSortBtn = document.getElementById('authorSortBtn');

const myLibrary = [];

//true means its being sorted from least to most pages or from A-Z, false being most to least pages or Z-A
let pageOrder = true;
let titleOrder = true;
let authorOrder = true;
let order = 3; //adding book increases value by 1 before order++

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
    const book1 = new Book('Lord of the Rings: The Fellowship of the Ring', 'J. R. R. Tolkein', 423, 'NEW', crypto.randomUUID(), 1);
    myLibrary.push(book1);
    const book2 = new Book('Dune', 'Frank Herbert', 412, 'NEW', crypto.randomUUID(), 2);
    myLibrary.push(book2);
    const book3 = new Book('1984', 'George Orwell', 328, 'READ', crypto.randomUUID(), 3);
    myLibrary.push(book3);
    updateDisplay();
}

function pageSort() {
    console.log('change order of books by page count');
    pageSortBtn.classList.add('selectedSort');
    titleSortBtn.classList.remove('selectedSort');
    authorSortBtn.classList.remove('selectedSort');
    console.log(pageOrder);
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

function defaultOrder() {
    console.log('this is order of books by when they were added');
    myLibrary.sort(function(a, b){return a.order - b.order});
    pageOrder = true;
    titleOrder = true;
    authorOrder = true;
    updateDisplay();
    pageSortBtn.textContent = 'Pages; Low to High';
    titleSortBtn.textContent = 'Title; (A-Z)';
    authorSortBtn.textContent = 'Author; (A-Z)';
    pageSortBtn.classList.remove('selectedSort');
    titleSortBtn.classList.remove('selectedSort');
    authorSortBtn.classList.remove('selectedSort');
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

pageSortBtn.addEventListener('click', pageSort);

titleSortBtn.addEventListener('click', titleSort);

authorSortBtn.addEventListener('click', authorSort);

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
    defaultOrder();
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