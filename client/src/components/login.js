import AxiosAPI from "../services/axiosApi";

class Login {
  constructor() {
    this.modal = document.getElementById("loginModal");
    // this.emailInput = document.getElementById("login-username");
    // this.passwordInput = document.getElementById("login-password");
    this.loginBtn = document.getElementById("loginBtn");
    this.loginBtn.addEventListener("click", this.render.bind(this));
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

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    try {
      const response = await AxiosAPI.loginUser({
        email: email,
        password: password,
      });
      console.log(`this is the response ${response}`);
    } catch (error) {
      console.error(error);
    }

    this.closeModal();
  }
  addListeners() {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", this.handleLogin.bind(this));
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
