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
    formPrice.value.length == 0 ||
    formBookImageUrl.value.length == 0
  ) {
    helperMessage.innerHTML = "please fill in all the fields!";
  } else if (formPrice.value < 0) {
    helperMessage.innerHTML = "price can not be negative?!";
  } else {
    let id = new Date().getTime();

    function Book() {
      this.author = formAuthor.value;
      this.bookName = formBookName.value;
      this.category = formCategory.value;
      this.year = formYear.value;
      this.price = formPrice.value;
      this.bookImageUrl = formBookImageUrl.value;
      this.id = id;
    }

    let book = new Book();

    let booksArray = JSON.parse(localStorage.getItem("bookList"));

    booksArray.push(book);

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
const formBookImageUrl = document.getElementById("formBookImageUrl");

function loadAllBooks() {
  if (!localStorage.getItem("bookList")) {
    localStorage.setItem("bookList", "[]");
  }

  const parsedBooks = JSON.parse(localStorage.getItem("bookList"));

  console.log(parsedBooks);

  bookList.innerHTML = "";

  for (let i = 0; i < parsedBooks.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `<li>
    <div class="book-dummy">
      <div class="picture-wrapper">
        <img
          src="https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium"
          alt="."
        />
      </div>
      <div>
        <p>${parsedBooks[i].author}</p>
        <p>${parsedBooks[i].bookName}</p>
        <p>${parsedBooks[i].category}</p>
        <p>${parsedBooks[i].year}</p>
        <p>${parsedBooks[i].price}€</p>
      </div>
    </div>
  </li>`;

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

  console.log(authorArray);

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

  console.log(categoryArray);

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

    console.log(booksByAuthor);

    authorFilter.classList.add("active-filter");
  } else {
    booksByAuthor = booksByAuthor.filter(function (book) {
      return book.author != author;
    });

    console.log(booksByAuthor);

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

    console.log(booksByCategory);

    categoryFilter.classList.add("active-filter");
  } else {
    booksByCategory = booksByCategory.filter(function (book) {
      return book.category != category;
    });

    console.log(booksByCategory);

    categoryFilter.classList.remove("active-filter");
  }
}

// filtravimas kategorijom

// ----------------------------------

let activeBookArray = [];

function merge() {
  let ids = new Set(booksByAuthor.map((d) => d.id));
  activeBookArray = [
    ...booksByAuthor,
    ...booksByCategory.filter((d) => !ids.has(d.id)),
  ];

  console.log(activeBookArray);
}

function loadFilteredBooks() {
  merge();

  if (activeBookArray == false) {
    loadAllBooks();
  } else {
    bookList.innerHTML = "";

    for (let i = 0; i < activeBookArray.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = `<li>
    <div class="book-dummy">
      <div class="picture-wrapper">
        <img
          src="https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium"
          alt="."
        />
      </div>
      <div>
        <p>${activeBookArray[i].author}</p>
        <p>${activeBookArray[i].bookName}</p>
        <p>${activeBookArray[i].category}</p>
        <p>${activeBookArray[i].year}</p>
        <p>${activeBookArray[i].price}€</p>
      </div>
    </div>
  </li>`;

      bookList.appendChild(li);
    }
  }
}

// --------------------

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
