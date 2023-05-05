import AxiosAPI from "../services/axiosApi";

class Login {
  constructor() {
    this.modal = document.getElementById("loginModal");
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
  addListeners() {
    const loginForm = document.getElementById("login-form");
    window.addEventListener("click", this.outsideClick.bind(this));
  }

  render() {
    this.modal.style.display = "block";
    this.modal.innerHTML = `<div class="modal-box"id="loginModalBox">
    <form id="login-form">
      <label for="login-username">Username:</label>
      <input type="text" id="login-username" name="username">
      <label for="login-password">Password:</label>
      <input type="password" id="login-password" name="password">
      <button type="submit" class="Btn" id="submit">Log In</button>
    </form>
  </div>`;
    this.addListeners();
  }
}

export default Login;
