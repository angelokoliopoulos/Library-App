import "./css/style.css";
import Login from "./components/login";
import Registration from "./components/registration";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = new Login();
const registrationForm = new Registration();
loginBtn.addEventListener("click", () => {
  loginForm.render();
});

registerBtn.addEventListener("click", () => {
  registrationForm.render();
});
