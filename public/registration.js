class Registration {
  constructor() {
    this.registerBtn = document.getElementById("register");
    this.modal = document.getElementById("registerModal");
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
  addListeners() {
    this.registerBtn.addEventListener("click", this.openModal.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
  }
}

const registration = new Registration();

registration.addListeners();
