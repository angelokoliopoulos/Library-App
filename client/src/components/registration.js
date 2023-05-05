import AxiosAPI from "../services/axiosApi";

class Registration {
  constructor() {
    this.modal = document.getElementById("registerModal");
    this.emailInput = document.getElementById("register-username");
    this.passwordInput = document.getElementById("register-password");
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

  async handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    try {
      const response = await AxiosAPI.registerUser({
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
    const registerForm = document.getElementById("registerForm");
    window.addEventListener("click", this.outsideClick.bind(this));
    registerForm.addEventListener("submit", this.handleSubmit.bind(this));
  }

  render() {
    this.modal.style.display = "block";
    this.modal.innerHTML = `<div class="modal-box"id="registerModalBox">
    <form id="registerForm">
      <label for="register-username">Username:</label>
      <input type="text" id="register-username" name="username">
      <label for="register-password">Password:</label>
      <input type="password" id="register-password" name="password">
      <button type="submit" class="Btn" >Sign Up</button>
    </form>
  </div>`;
    this.addListeners();
  }
}

export default Registration;
