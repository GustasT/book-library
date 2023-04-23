const bookForm = document.getElementById("bookForm");
const helperMessage = document.querySelector(".helper-message");
const bookList = document.getElementById("bookList");

window.onload = function () {
  loadAllBooks();
  loadAllAuthors();
  loadAllCategories();
};

// knygu pridejimas

bookForm.addEventListener("submit", () => {
  event.preventDefault();

  if (!localStorage.getItem("bookList")) {
    localStorage.setItem("bookList", "[]");
  }

  if (
    formAuthor.value.length == 0 ||
    formBookName.value.length == 0 ||
    formCategory.value.length == 0 ||
    formYear.value.length == 0 ||
    formPrice.value.length == 0
  ) {
    helperMessage.innerHTML = "please fill in all the fields!";
  } else if (formPrice.value < 0) {
    helperMessage.innerHTML = "price can not be negative?!";
  } else {
    let id = new Date().getTime();

    let imageUrl = "";

    if (formBookImageUrl.value == "") {
      imageUrl =
        "https://www.fcgov.com/recycling-item-images/img/hard-cover-book.jpg";
    } else {
      imageUrl = formBookImageUrl.value;
    }

    function Book() {
      this.author = formAuthor.value;
      this.bookName = formBookName.value;
      this.category = formCategory.value;
      this.year = formYear.value;
      this.price = formPrice.value;
      this.bookImageUrl = imageUrl;
      this.id = id;
    }

    let book = new Book();

    let booksArray = JSON.parse(localStorage.getItem("bookList"));

    booksArray.push(book);

    // console.log(booksArray);

    const sortById = () => {
      booksArray.sort((a, b) => {
        return b.id - a.id;
      });
    };

    sortById();

    // console.log(booksArray);

    localStorage.setItem("bookList", JSON.stringify(booksArray));

    loadAllBooks();

    loadAllAuthors();

    loadAllCategories();

    helperMessage.innerHTML = "book added!";

    bookForm.reset();
  }
});

// knygu pridejimas

// knygu atvaizdavimas

const formAuthor = document.getElementById("formAuthor");
const formBookName = document.getElementById("formBookName");
const formCategory = document.getElementById("formCategory");
const formYear = document.getElementById("formYear");
const formPrice = document.getElementById("formPrice");
let formBookImageUrl = document.getElementById("formBookImageUrl");

function loadAllBooks() {
  if (!localStorage.getItem("bookList")) {
    localStorage.setItem("bookList", "[]");
  }

  const parsedBooks = JSON.parse(localStorage.getItem("bookList"));

  activeBookArray = parsedBooks;

  // console.log(parsedBooks);

  loadActiveArrayBooks();
}

function loadActiveArrayBooks() {
  bookList.innerHTML = "";

  for (let i = 0; i < activeBookArray.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("id", activeBookArray[i].id);

    li.innerHTML = `
    <div class="book">
      <div class="picture-wrapper">
        <img
          src="${activeBookArray[i].bookImageUrl}"
          alt="."
        />
      </div>
      <div class="text-wrapper">
        <p class="book-author">${activeBookArray[i].author}</p>
        <p class="book-name">${activeBookArray[i].bookName}</p>
        <p class="book-category">${activeBookArray[i].category}</p>
        <p class="book-year">${activeBookArray[i].year}</p>
        <span class="book-price">${activeBookArray[i].price}</span><span>€</span></br>
        <button class="edit-button button">edit</button>
        <button class="delete-button button" onclick="deleteBook(${activeBookArray[i].id})">delete</button>
      </div>
      </div>
 `;

    bookList.appendChild(li);
  }
}

// knygu atvaizdavimas

// autoriu atvaizdavimas

const authorList = document.getElementById("authorList");

function loadAllAuthors() {
  const parsedBooks = JSON.parse(localStorage.getItem("bookList"));

  let authorArray = [];

  for (let i = 0; i < parsedBooks.length; i++) {
    if (!authorArray.includes(parsedBooks[i].author)) {
      authorArray.push(parsedBooks[i].author);
    }
  }

  // console.log(authorArray);

  authorList.innerHTML = "";

  for (let i = 0; i < authorArray.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<label
    >${authorArray[i]}
    <input type="checkbox" id="${authorArray[i]}" onclick="filterByAuthor('${authorArray[i]}')" class="author-checkbox"/>
  </label>
  `;

    authorList.appendChild(li);
  }
}

// autoriu atvaizdavimas

// kategoriju atvaizdavimas

const categoryList = document.getElementById("categoryList");

function loadAllCategories() {
  const parsedBooks = JSON.parse(localStorage.getItem("bookList"));

  let categoryArray = [];

  for (let i = 0; i < parsedBooks.length; i++) {
    if (!categoryArray.includes(parsedBooks[i].category)) {
      categoryArray.push(parsedBooks[i].category);
    }
  }

  // console.log(categoryArray);

  categoryList.innerHTML = "";

  for (let i = 0; i < categoryArray.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<label
    >${categoryArray[i]}
    <input type="checkbox" id="${categoryArray[i]}" onclick="filterByCategory('${categoryArray[i]}')" class="category-checkbox"/>
  </label>`;

    categoryList.appendChild(li);
  }
}

// kategoriju atvaizdavimas

let booksByAuthor = [];

// filtravimas autoriais

function filterByAuthor(author) {
  const authorFilter = document.getElementById(author);

  const filteredBooks = JSON.parse(localStorage.getItem("bookList")).filter(
    (book) => book.author == author
  );

  if (!authorFilter.classList.contains("active-filter")) {
    booksByAuthor.push(...filteredBooks);

    // console.log(booksByAuthor);

    authorFilter.classList.add("active-filter");
  } else {
    booksByAuthor = booksByAuthor.filter(function (book) {
      return book.author != author;
    });

    // console.log(booksByAuthor);

    authorFilter.classList.remove("active-filter");
  }
}

// filtravimas autoriais

// filtracimas kategorijom

let booksByCategory = [];

function filterByCategory(category) {
  const categoryFilter = document.getElementById(category);

  const filteredBooks = JSON.parse(localStorage.getItem("bookList")).filter(
    (book) => book.category == category
  );

  if (!categoryFilter.classList.contains("active-filter")) {
    booksByCategory.push(...filteredBooks);

    // console.log(booksByCategory);

    categoryFilter.classList.add("active-filter");
  } else {
    booksByCategory = booksByCategory.filter(function (book) {
      return book.category != category;
    });

    // console.log(booksByCategory);

    categoryFilter.classList.remove("active-filter");
  }
}

// filtravimas kategorijom

// filtravimas kombinuotas

let activeBookArray = [];

function merge() {
  let ids = new Set(booksByAuthor.map((d) => d.id));
  activeBookArray = [
    ...booksByAuthor,
    ...booksByCategory.filter((d) => !ids.has(d.id)),
  ];

  // console.log(activeBookArray);
}

function loadFilteredBooks() {
  merge();

  if (activeBookArray == false) {
    loadAllBooks();
  } else {
    loadActiveArrayBooks();
  }
}

// filtravimas kombinuotas

// filtru valymas

function clearBooksByAuthor() {
  const checkboxes = document.getElementsByClassName("author-checkbox");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].click();
    }
  }
}

function clearBooksByCategory() {
  const checkboxes = document.getElementsByClassName("category-checkbox");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].click();
    }
  }
}

// filtru valymas

// sortinimas

const sortLowestToHighest = () => {
  activeBookArray.sort((a, b) => {
    return a.price - b.price;
  });
  loadActiveArrayBooks();
};

const sortHighestToLowest = () => {
  activeBookArray.sort((a, b) => {
    return b.price - a.price;
  });
  loadActiveArrayBooks();
};

const sortById = () => {
  activeBookArray.sort((a, b) => {
    return b.id - a.id;
  });
  loadActiveArrayBooks();
};

// sortinimas

// searchinimas

const searchField = document.getElementById("searchField");
const search = searchField.value;

const searchBooks = function (search) {
  let keys = ["author", "bookName", "category", "year", "price"];
  const lowSearch = search.toLowerCase();

  const searchedBooks = activeBookArray.filter((book) =>
    keys.some((key) => String(book[key]).toLowerCase().includes(lowSearch))
  );

  // console.log(searchedBooks);

  activeBookArray = searchedBooks;
};

const searchButton = document.getElementById("searchButton");

function handleSearch() {
  const parsedBooks = JSON.parse(localStorage.getItem("bookList"));
  activeBookArray = parsedBooks;
  searchBooks(searchField.value);
  loadActiveArrayBooks();
  if (activeBookArray == false) {
    helperMessage.innerHTML =
      "no results for this search. try a different keyword";
  }
}

searchButton.addEventListener("click", () => {
  handleSearch();
});

searchField.onkeyup = autoSearch;

function autoSearch() {
  handleSearch();
}

// searchinimas

/// deletinimas

function deleteBook(bookId) {
  const parsedBooks = JSON.parse(localStorage.getItem("bookList"));

  const book = document.getElementById(bookId);

  book.style.animation = "fade-out 0.5s forwards";

  const delayedRemoveHtml = setTimeout(removeHtml, 500);
  console.log(delayedRemoveHtml);

  function removeHtml() {
    book.innerHTML = "";
  }

  const parsedBooksIndex = parsedBooks
    .map(function (x) {
      return x.id;
    })
    .indexOf(bookId);

  parsedBooks.splice(parsedBooksIndex, 1);

  const activeBookArrayIndex = activeBookArray
    .map(function (x) {
      return x.id;
    })
    .indexOf(bookId);

  activeBookArray.splice(activeBookArrayIndex, 1);

  localStorage.setItem("bookList", JSON.stringify(parsedBooks));

  loadAllAuthors();
  loadAllCategories();
}

// deletinimas

// editinimas

const ul = document.getElementById("bookList");

ul.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const textWrapper = button.parentNode;
    const book = textWrapper.parentNode;
    const li = book.parentNode;
    const ul = li.parentNode;

    const bookAuthor = textWrapper.firstElementChild;
    const bookName = bookAuthor.nextElementSibling;
    const bookCategory = bookName.nextElementSibling;
    const bookYear = bookCategory.nextElementSibling;
    const bookPrice = bookYear.nextElementSibling;

    if (button.textContent === "edit") {
      bookAuthor.contentEditable = true;
      bookName.contentEditable = true;
      bookCategory.contentEditable = true;
      bookYear.contentEditable = true;
      bookPrice.contentEditable = true;

      button.textContent = "save";
    } else if ((button.textContent = "save")) {
      bookAuthor.contentEditable = false;
      bookName.contentEditable = false;
      bookCategory.contentEditable = false;
      bookYear.contentEditable = false;
      bookPrice.contentEditable = false;

      button.textContent = "edit";

      // console.log("ir ka dabar?");

      let parsedBooks = JSON.parse(localStorage.getItem("bookList"));

      const editedBook = parsedBooks.filter((book) => {
        return book.id == li.id;
      });

      const editedBookOne = editedBook[0];

      // console.log(editedBookOne);

      editedBookOne.author = bookAuthor.textContent;
      editedBookOne.bookName = bookName.textContent;
      editedBookOne.category = bookCategory.textContent;
      editedBookOne.year = bookYear.textContent;
      editedBookOne.price = bookPrice.textContent;

      // console.log(editedBookOne);

      const result = parsedBooks.map((book) =>
        book.id === editedBookOne.id ? editedBookOne : book
      );

      parsedBooks = result;

      localStorage.setItem("bookList", JSON.stringify(parsedBooks));

      loadAllAuthors();
      loadAllCategories();
    }
  }
});

// editinimas
// -------------------------
// pastabos

// searchinant pazymejus filtrus, jie neveikia, searchina visas knygas
// searchinant pazymejus sortinima,jis neveikia, pereina y default sortinima

// pridedant knyga nusiresetina viskas

// editinant galima pridet raidziu i year / price
