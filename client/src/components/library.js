import BooksApi from "../services/axiosApi";

const getUIelements = () => {
  let deleteBtn = document.querySelector(".delete");
  const booksDiv = document.querySelector(".books");
  let bookTitle = document.getElementById("title");
  let bookAuthor = document.getElementById("author");
  let bookPages = document.getElementById("pages");
  let isRead = document.getElementById("isRead");

  return {
    bookTitle,
    bookAuthor,
    bookPages,
    isRead,
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
    this.modal = document.getElementById("addBookModal");
    this.addBookBtn = document.getElementById("addBook");
    this.addBookBtn.addEventListener("click", this.renderModal.bind(this));
  }

  addListeners() {
    const addBookForm = document.getElementById("addBookForm");
    addBookForm.addEventListener("submit", this.handleSubmit.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    // document.addEventListener("DOMContentLoaded", this.renderBooks.bind(this));
  }

  openModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
    this.modal.innerHTML = "";
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

  renderModal() {
    console.log(this.modal);
    this.modal.style.display = "block";
    this.modal.innerHTML = `<div class="modal-box">
    <form  id="addBookForm">
      <h3>Add new book</h3>
      <input
        class="input"
        type="text"
        id="title"
        placeholder="Title"
        required
        maxlength="100"
      />
      <input
        class="input"
        type="text"
        id="author"
        placeholder="Author"
        required
        maxlength="100"
      />
      <input
        class="input"
        type="number"
        id="pages"
        placeholder="Pages"
        required
        max="10000"
      />
      <div class="readStatus">
        <label for="is-read">Have you read it?</label>
        <input class="checkbox" type="checkbox" id="isRead" />
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
    </div>`;
    this.addListeners();
  }
}

export default Library;
