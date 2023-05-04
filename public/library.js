import BooksApi from "./booksApi.js";

const getUIelements = () => {
  const addBookBtn = document.getElementById("addBook");
  let editStatus = document.querySelector(".edit");
  let deleteBtn = document.querySelector(".delete");
  const booksDiv = document.querySelector(".books");
  const formBtn = document.querySelector("form .btn");
  let bookTitle = document.getElementById("title").value;
  let bookAuthor = document.getElementById("author").value;
  let bookPages = document.getElementById("pages").value;
  let isRead = document.getElementById("isRead").checked;

  return {
    addBookBtn,
    bookTitle,
    bookAuthor,
    bookPages,
    isRead,
    formBtn,
    booksDiv,
    deleteBtn,
  };
};

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages || "No Value";
  this.isRead = isRead;
}

class Library {
  constructor() {
    this.books = [];
    this.div = document.querySelector(".container");
    this.modal = document.getElementById("addBookModal");
    this.form = document.querySelector(".add-book-form");
  }

  openModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }
  outsideClick(e) {
    if (e.target === this.modal) {
      this.closeModal();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { bookTitle, bookAuthor, bookPages, isRead } = getUIelements();

    if (!bookTitle || !bookAuthor) {
      alert("Some Book's Information Missing");
      return;
    }

    let newBook = new Book(bookAuthor, bookTitle, bookPages, isRead);
    BooksApi.postBook(newBook);
    this.addBookToDom(newBook);
    this.closeModal();
  }

  removeBook(e) {
    if (e.target.matches("i")) {
      let book = e.target.parentElement.parentElement.parentElement;
      console.log(book);
      book.remove();
    }
  }

  addBookToDom(book) {
    const { booksDiv } = getUIelements();
    const div = document.createElement("div");
    div.addEventListener("click", this.removeBook.bind(this));
    div.classList.add("card");
    let readStatus = book.isRead == false ? "Not Read" : "Read";
    div.innerHTML = `
<div class="description">
<h2>Title:<span>${book.title}</span></h2>
<h3>Author:<span>${book.author} </span></h3>
<p>Pages:<span>${book.pages}</span> </p>
<p>Read Status:<span>${readStatus}</span> </p>
</div>
<div class="button-group">
<button class="btn edit">Edit Status</button>
<button class="delete"><i class="fas fa-times"></i></button>
</div>

`;
    booksDiv.appendChild(div);
  }

  async renderBooks() {
    const books = await BooksApi.getBooks();
    books.forEach((book) => {
      this.addBookToDom(book);
    });
  }

  addListeners() {
    const { addBookBtn, formBtn } = getUIelements();
    formBtn.addEventListener("click", this.handleSubmit.bind(this));
    addBookBtn.addEventListener("click", this.openModal.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    document.addEventListener("DOMContentLoaded", this.renderBooks.bind(this));
  }
}

const library = new Library();

library.addListeners();
