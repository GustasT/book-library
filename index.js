const bookForm = document.getElementById("bookForm");
const helperMessage = document.querySelector(".helper-message");
const bookList = document.getElementById("bookList");

window.onload = function () {
  loadAllBooks();
  loadAllAuthors();
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
    function Book() {
      this.author = formAuthor.value;
      this.bookName = formBookName.value;
      this.category = formCategory.value;
      this.year = formYear.value;
      this.price = formPrice.value;
      this.bookImageUrl = formBookImageUrl.value;
    }

    let book = new Book();

    let booksArray = JSON.parse(localStorage.getItem("bookList"));

    booksArray.push(book);

    localStorage.setItem("bookList", JSON.stringify(booksArray));

    loadAllBooks();

    loadAllAuthors();

    helperMessage.innerHTML = "book added!";
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

// knygu filtravimas

// function filterBooks(author) {
//   const filteredBooks = JSON.parse(localStorage.getItem("bookList")).filter(
//     (book) => book.author == author
//   );

//   console.log(filteredBooks);

//   function loadFilteredBooks() {
//     bookList.innerHTML = "";

//     for (let i = 0; i < filteredBooks.length; i++) {
//       let li = document.createElement("li");
//       li.innerHTML = `<li>
//       <div class="book-dummy">
//         <div class="picture-wrapper">
//           <img
//             src="https://www.adobe.com/express/create/cover/media_178ebed46ae02d6f3284c7886e9b28c5bb9046a02.jpeg?width=400&format=jpeg&optimize=medium"
//             alt="."
//           />
//         </div>
//         <div>
//           <p>${filteredBooks[i].author}</p>
//           <p>${filteredBooks[i].bookName}</p>
//           <p>${filteredBooks[i].category}</p>
//           <p>${filteredBooks[i].year}</p>
//           <p>${filteredBooks[i].price}€</p>
//         </div>
//       </div>
//     </li>`;

//       bookList.appendChild(li);
//     }
//   }

//   loadFilteredBooks();
// }

//knygu filtravimas

// filtru atvaizdavimas

// nuo cia gerai----------------------

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
    <input type="checkbox" id="${authorArray[i]}" />
  </label>`;

    authorList.appendChild(li);
  }
}
