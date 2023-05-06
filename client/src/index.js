import "./css/style.css";
import Login from "./components/login";
import Registration from "./components/registration";
import Library from "./components/library";

// new Login();
// new Registration();
const myLibrary = new Library();

myLibrary.renderBooks();
